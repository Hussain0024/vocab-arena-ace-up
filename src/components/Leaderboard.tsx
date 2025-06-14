
import { Trophy, Star, TrendingUp, Users, Globe, Heart } from 'lucide-react';

const Leaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "SC",
      xp: 15420,
      streak: 32,
      isYou: false,
      change: "+2"
    },
    {
      rank: 2,
      name: "Alex Rivera",
      avatar: "AR", 
      xp: 14890,
      streak: 28,
      isYou: false,
      change: "-1"
    },
    {
      rank: 3,
      name: "You",
      avatar: "YU",
      xp: 14125,
      streak: 15,
      isYou: true,
      change: "+1"
    },
    {
      rank: 4,
      name: "David Park",
      avatar: "DP",
      xp: 13750,
      streak: 22,
      isYou: false,
      change: "-2"
    },
    {
      rank: 5,
      name: "Emma Stone",
      avatar: "ES",
      xp: 12980,
      streak: 18,
      isYou: false,
      change: "0"
    }
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'gradient-orange';
      case 2: return 'bg-gray-400';
      case 3: return 'bg-amber-600';
      default: return 'bg-gray-300';
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600 bg-green-100';
    if (change.startsWith('-')) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <section className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Weekly</span>
          </div>
        </div>
        
        {/* Leaderboard Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-xl p-1">
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-white rounded-lg shadow-sm text-game-purple font-medium">
            <Globe className="w-4 h-4" />
            <span>Global</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-gray-600 hover:text-gray-800">
            <Heart className="w-4 h-4" />
            <span>Friends</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-gray-600 hover:text-gray-800">
            <Users className="w-4 h-4" />
            <span>Local</span>
          </button>
        </div>
        
        {/* Top 3 Podium */}
        <div className="mb-8">
          <div className="flex items-end justify-center space-x-4 mb-4">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                  {leaderboardData[1].avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{leaderboardData[1].name}</p>
              <p className="text-xs text-gray-600">{leaderboardData[1].xp.toLocaleString()} XP</p>
            </div>
            
            {/* 1st Place */}
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 gradient-orange rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 animate-bounce-in">
                  {leaderboardData[0].avatar}
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 gradient-orange rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-sm font-bold text-gray-800 mb-1">{leaderboardData[0].name}</p>
              <p className="text-xs text-gray-600">{leaderboardData[0].xp.toLocaleString()} XP</p>
            </div>
            
            {/* 3rd Place */}
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                  {leaderboardData[2].avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{leaderboardData[2].name}</p>
              <p className="text-xs text-gray-600">{leaderboardData[2].xp.toLocaleString()} XP</p>
            </div>
          </div>
        </div>
        
        {/* Full Leaderboard */}
        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all ${
                user.isYou
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-md'
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getRankColor(user.rank)}`}>
                  {user.rank <= 3 ? (
                    user.rank === 1 ? <Trophy className="w-4 h-4" /> : user.rank
                  ) : (
                    user.rank
                  )}
                </div>
                
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  user.isYou ? 'gradient-purple' : 'bg-gray-400'
                }`}>
                  {user.avatar}
                </div>
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`font-semibold ${user.isYou ? 'text-purple-800' : 'text-gray-800'}`}>
                    {user.name}
                  </h3>
                  {user.isYou && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                      You
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{user.xp.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 gradient-orange rounded-full"></div>
                    <span>{user.streak} day streak</span>
                  </div>
                </div>
              </div>
              
              {/* Rank Change */}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getChangeColor(user.change)}`}>
                {user.change !== "0" ? user.change : "—"}
              </div>
            </div>
          ))}
        </div>
        
        {/* Your Stats Summary */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100">
          <h3 className="font-semibold text-gray-800 mb-3">Your Weekly Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-purple-600">156</p>
              <p className="text-xs text-gray-600">Words Learned</p>
            </div>
            <div>
              <p className="text-lg font-bold text-orange-600">15</p>
              <p className="text-xs text-gray-600">Day Streak</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">3rd</p>
              <p className="text-xs text-gray-600">Global Rank</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
