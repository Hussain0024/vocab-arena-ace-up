
import { User, Star, Trophy, Calendar, BookOpen, Zap, Settings, Crown } from 'lucide-react';

const ProfileDashboard = () => {
  const userStats = {
    name: "Alex Rivera",
    level: 12,
    xp: 14125,
    xpToNext: 1875,
    totalXp: 16000,
    streak: 15,
    wordsLearned: 1247,
    totalWords: 2500,
    joinDate: "March 2024",
    rank: "Word Warrior",
    achievements: [
      { name: "First Steps", description: "Complete your first lesson", earned: true },
      { name: "Week Warrior", description: "Maintain a 7-day streak", earned: true },
      { name: "Century Club", description: "Learn 100 words", earned: true },
      { name: "Streak Master", description: "Maintain a 30-day streak", earned: false },
      { name: "Vocabulary Veteran", description: "Learn 1000 words", earned: true },
      { name: "Quiz Champion", description: "Score 100% on 10 quizzes", earned: false }
    ],
    recentActivity: [
      { action: "Completed GRE Essentials Pack", xp: 50, time: "2 hours ago" },
      { action: "Daily Challenge completed", xp: 25, time: "1 day ago" },
      { action: "Learned 15 new words", xp: 75, time: "2 days ago" },
      { action: "Won multiplayer challenge", xp: 100, time: "3 days ago" }
    ]
  };

  const progressPercentage = (userStats.xp / userStats.totalXp) * 100;
  const wordsPercentage = (userStats.wordsLearned / userStats.totalWords) * 100;

  return (
    <section className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{userStats.name}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">{userStats.rank}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <span>Level {userStats.level}</span>
                <span>Joined {userStats.joinDate}</span>
              </div>
            </div>
          </div>
          
          {/* XP Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Level Progress</span>
              <span className="text-sm">{userStats.xp}/{userStats.totalXp} XP</span>
            </div>
            <div className="bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-white/80 mt-1">{userStats.xpToNext} XP to next level</p>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{userStats.streak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 gradient-green rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{userStats.wordsLearned}</p>
                <p className="text-sm text-gray-600">Words Learned</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{userStats.xp.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total XP</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">3rd</p>
                <p className="text-sm text-gray-600">Global Rank</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vocabulary Progress */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Vocabulary Progress</h3>
            <span className="text-sm text-gray-600">
              {userStats.wordsLearned}/{userStats.totalWords}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill gradient-green"
              style={{ width: `${wordsPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {userStats.totalWords - userStats.wordsLearned} words remaining
          </p>
        </div>
        
        {/* Achievements */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {userStats.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl text-center transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  achievement.earned ? 'bg-yellow-500' : 'bg-gray-300'
                }`}>
                  <Trophy className={`w-4 h-4 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <p className={`text-xs font-medium ${
                  achievement.earned ? 'text-yellow-800' : 'text-gray-500'
                }`}>
                  {achievement.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {userStats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+{activity.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDashboard;
