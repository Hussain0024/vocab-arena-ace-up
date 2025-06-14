
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface WordPack {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  is_premium: boolean;
  color: string;
  total_words: number;
  learned_words?: number;
  progress?: number;
}

export const useWordPacks = () => {
  const [wordPacks, setWordPacks] = useState<WordPack[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchWordPacks();
  }, [user]);

  const fetchWordPacks = async () => {
    try {
      // Fetch word packs
      const { data: packs, error: packsError } = await supabase
        .from('word_packs')
        .select('*')
        .order('created_at', { ascending: false });

      if (packsError) throw packsError;

      if (user) {
        // Fetch user progress for each pack
        const { data: progress, error: progressError } = await supabase
          .from('user_progress')
          .select('word_pack_id, learned_words')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        // Merge progress data with word packs
        const packsWithProgress = packs.map(pack => {
          const userProgress = progress?.find(p => p.word_pack_id === pack.id);
          const learnedWords = userProgress?.learned_words || 0;
          return {
            ...pack,
            learned_words: learnedWords,
            progress: pack.total_words > 0 ? Math.round((learnedWords / pack.total_words) * 100) : 0
          };
        });

        setWordPacks(packsWithProgress);
      } else {
        // For non-authenticated users, show packs without progress
        const packsWithoutProgress = packs.map(pack => ({
          ...pack,
          learned_words: 0,
          progress: 0
        }));
        setWordPacks(packsWithoutProgress);
      }
    } catch (error) {
      console.error('Error fetching word packs:', error);
      // Fallback to empty array if there's an error
      setWordPacks([]);
    } finally {
      setLoading(false);
    }
  };

  return { wordPacks, loading, refetch: fetchWordPacks };
};
