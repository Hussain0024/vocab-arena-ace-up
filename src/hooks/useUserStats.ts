
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserStats {
  total_xp: number;
  streak_days: number;
  words_learned: number;
  level: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserStats();
    } else {
      setStats(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // No stats found, create default stats
        const { data: newStats, error: insertError } = await supabase
          .from('user_stats')
          .insert([{ user_id: user.id }])
          .select()
          .single();

        if (insertError) throw insertError;
        setStats(newStats);
      } else if (error) {
        throw error;
      } else {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = async (updates: Partial<UserStats>) => {
    if (!user || !stats) return;

    try {
      const { data, error } = await supabase
        .from('user_stats')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setStats(data);
    } catch (error) {
      console.error('Error updating user stats:', error);
    }
  };

  return { stats, loading, updateStats, refetch: fetchUserStats };
};
