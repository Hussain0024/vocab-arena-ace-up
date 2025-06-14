
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create word packs table
CREATE TABLE public.word_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  category TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  color TEXT DEFAULT 'gradient-purple',
  total_words INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create words table
CREATE TABLE public.words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_pack_id UUID REFERENCES public.word_packs(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  pronunciation TEXT,
  part_of_speech TEXT,
  definition TEXT NOT NULL,
  example TEXT,
  synonyms TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user progress table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  word_pack_id UUID REFERENCES public.word_packs(id) ON DELETE CASCADE,
  learned_words INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  last_studied TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, word_pack_id)
);

-- Create user stats table
CREATE TABLE public.user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  words_learned INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'Trophy',
  reward_xp INTEGER DEFAULT 0,
  requirement_type TEXT NOT NULL, -- 'words_learned', 'streak_days', 'sessions_completed'
  requirement_value INTEGER NOT NULL
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create daily challenges table
CREATE TABLE public.daily_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE DEFAULT CURRENT_DATE,
  word_id UUID REFERENCES public.words(id),
  challenge_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user daily progress table
CREATE TABLE public.user_daily_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES public.daily_challenges(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, challenge_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Word packs: Everyone can read, only authenticated users
CREATE POLICY "Anyone can view word packs" ON public.word_packs
  FOR SELECT USING (true);

-- Words: Everyone can read
CREATE POLICY "Anyone can view words" ON public.words
  FOR SELECT USING (true);

-- User progress: Users can only see their own progress
CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- User stats: Users can only see their own stats
CREATE POLICY "Users can view own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- Achievements: Everyone can read
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (true);

-- User achievements: Users can only see their own achievements
CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily challenges: Everyone can read
CREATE POLICY "Anyone can view daily challenges" ON public.daily_challenges
  FOR SELECT USING (true);

-- User daily progress: Users can only see their own progress
CREATE POLICY "Users can view own daily progress" ON public.user_daily_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own daily progress" ON public.user_daily_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own daily progress" ON public.user_daily_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)));
  
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample word packs
INSERT INTO public.word_packs (title, description, difficulty, category, is_premium, color, total_words) VALUES
('GRE Essentials', 'Master 500 high-frequency GRE words', 'Advanced', 'Exam Prep', false, 'gradient-purple', 500),
('Business English', 'Professional vocabulary for workplace', 'Intermediate', 'Professional', false, 'gradient-blue', 300),
('IELTS Academic', 'Academic words for IELTS success', 'Advanced', 'Exam Prep', true, 'gradient-green', 400),
('Daily Conversation', 'Common words for everyday use', 'Beginner', 'General', false, 'gradient-orange', 200);

-- Insert sample words for GRE Essentials pack
INSERT INTO public.words (word_pack_id, word, pronunciation, part_of_speech, definition, example, synonyms)
SELECT 
  (SELECT id FROM public.word_packs WHERE title = 'GRE Essentials' LIMIT 1),
  'Obfuscate',
  '/ˈɒbfəskeɪt/',
  'verb',
  'To deliberately make something unclear or difficult to understand',
  'The politician tried to obfuscate the real issues during the debate.',
  ARRAY['confuse', 'complicate', 'muddle', 'bewilder'];

INSERT INTO public.words (word_pack_id, word, pronunciation, part_of_speech, definition, example, synonyms)
SELECT 
  (SELECT id FROM public.word_packs WHERE title = 'GRE Essentials' LIMIT 1),
  'Serendipity',
  '/ˌsɛrənˈdɪpɪti/',
  'noun',
  'The occurrence of events by chance in a happy or beneficial way',
  'Finding the perfect apartment was pure serendipity.',
  ARRAY['coincidence', 'fortune', 'luck', 'chance'];

-- Insert sample achievements
INSERT INTO public.achievements (name, description, icon, reward_xp, requirement_type, requirement_value) VALUES
('First Steps', 'Complete your first lesson', 'Star', 25, 'words_learned', 1),
('Week Warrior', 'Maintain a 7-day streak', 'Calendar', 100, 'streak_days', 7),
('Century Club', 'Learn 100 words', 'Trophy', 200, 'words_learned', 100),
('Streak Master', 'Maintain a 30-day streak', 'Calendar', 500, 'streak_days', 30),
('Vocabulary Veteran', 'Learn 1000 words', 'Trophy', 1000, 'words_learned', 1000),
('Quiz Champion', 'Score 100% on 10 quizzes', 'Star', 300, 'sessions_completed', 10);
