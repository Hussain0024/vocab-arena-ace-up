
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Clock, Zap } from 'lucide-react';
import { useUserStats } from '@/hooks/useUserStats';
import { useAuth } from '@/contexts/AuthContext';

const GameStats = () => {
  const { stats, loading } = useUserStats();
  const { user } = useAuth();

  // Mock data for charts (would be replaced with real data from API)
  const weeklyData = [
    { day: 'Mon', xp: 120, words: 8 },
    { day: 'Tue', xp: 150, words: 12 },
    { day: 'Wed', xp: 200, words: 15 },
    { day: 'Thu', xp: 180, words: 10 },
    { day: 'Fri', xp: 220, words: 18 },
    { day: 'Sat', xp: 160, words: 14 },
    { day: 'Sun', xp: 190, words: 16 }
  ];

  const categoryData = [
    { name: 'GRE', value: 35, color: '#8B5CF6' },
    { name: 'Business', value: 25, color: '#3B82F6' },
    { name: 'Academic', value: 20, color: '#10B981' },
    { name: 'General', value: 20, color: '#F59E0B' }
  ];

  if (loading) {
    return (
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Analytics</h2>
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="h-20 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user || !stats) {
    return (
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Analytics</h2>
          <div className="text-center text-gray-600">
            Sign in to view your learning analytics
          </div>
        </div>
      </div>
    );
  }

  const performanceStats = {
    accuracy: 87, // This would come from actual quiz/challenge data
    avgSessionTime: 12,
    wordsPerSession: 15,
    bestStreak: stats.streak_days
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Analytics</h2>
        
        {/* Performance Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Total XP</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.total_xp}</p>
            <p className="text-xs text-green-600">Level {stats.level}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Words Learned</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.words_learned}</p>
            <p className="text-xs text-blue-600">Keep going!</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Avg Session</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{performanceStats.avgSessionTime}m</p>
            <p className="text-xs text-orange-600">Perfect pace!</p>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Streak Days</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.streak_days}</p>
            <p className="text-xs text-purple-600">Keep it up!</p>
          </div>
        </div>
        
        {/* Weekly Progress Chart */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Weekly Progress</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis hide />
                <Bar dataKey="xp" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Learning Categories */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Learning Categories</h3>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Study Streak Calendar */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Study Streak</h3>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(35)].map((_, i) => {
              const hasActivity = Math.random() > 0.3;
              const intensity = Math.floor(Math.random() * 4) + 1;
              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-sm ${
                    hasActivity
                      ? intensity === 1
                        ? 'bg-green-100'
                        : intensity === 2
                        ? 'bg-green-200'
                        : intensity === 3
                        ? 'bg-green-400'
                        : 'bg-green-600'
                      : 'bg-gray-100'
                  }`}
                  title={hasActivity ? `${intensity * 5} XP earned` : 'No activity'}
                ></div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
