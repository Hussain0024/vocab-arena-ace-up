
import { useState } from 'react';
import { Gift, Calendar, Coins, Star, Trophy, Zap } from 'lucide-react';

const RewardsSection = () => {
  const [claimedToday, setClaimedToday] = useState(false);
  
  const dailyRewards = [
    { day: 1, reward: '10 XP', icon: Star, claimed: true },
    { day: 2, reward: '15 XP', icon: Star, claimed: true },
    { day: 3, reward: '20 XP', icon: Star, claimed: true },
    { day: 4, reward: '25 XP', icon: Coins, claimed: true },
    { day: 5, reward: '30 XP', icon: Coins, claimed: true },
    { day: 6, reward: '35 XP', icon: Coins, claimed: true },
    { day: 7, reward: '50 XP + Bonus Pack', icon: Trophy, claimed: false, isToday: true },
  ];

  const achievements = [
    {
      title: 'First Steps',
      description: 'Complete your first flashcard session',
      reward: '25 XP',
      completed: true,
      icon: Star
    },
    {
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      reward: '100 XP',
      completed: true,
      icon: Calendar
    },
    {
      title: 'Word Master',
      description: 'Learn 100 new words',
      reward: '200 XP + Premium Pack',
      completed: false,
      progress: 67,
      icon: Trophy
    },
    {
      title: 'Battle Champion',
      description: 'Win 10 multiplayer battles',
      reward: '150 XP',
      completed: false,
      progress: 3,
      icon: Zap
    }
  ];

  const handleClaimReward = () => {
    setClaimedToday(true);
    // Here you would typically call an API to claim the reward
  };

  return (
    <section className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Daily Rewards</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span>1,250 XP</span>
          </div>
        </div>

        {/* Daily Streak Rewards */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Daily Streak</h3>
            <div className="flex items-center space-x-1 text-sm text-purple-600">
              <Calendar className="w-4 h-4" />
              <span>Day 6 of 7</span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dailyRewards.map((day) => (
              <div
                key={day.day}
                className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-xs transition-all ${
                  day.claimed
                    ? 'bg-green-100 border-2 border-green-300'
                    : day.isToday
                    ? 'bg-white border-2 border-purple-300 shadow-lg animate-pulse'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {day.claimed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="w-2 h-2 text-white" />
                  </div>
                )}
                <day.icon className={`w-4 h-4 mb-1 ${
                  day.claimed ? 'text-green-600' : day.isToday ? 'text-purple-600' : 'text-gray-400'
                }`} />
                <span className={`font-medium ${
                  day.claimed ? 'text-green-700' : day.isToday ? 'text-purple-700' : 'text-gray-500'
                }`}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleClaimReward}
            disabled={claimedToday}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
              claimedToday
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'gradient-purple text-white hover:opacity-90 shadow-lg'
            }`}
          >
            {claimedToday ? 'Reward Claimed!' : 'Claim Today\'s Reward (35 XP)'}
          </button>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.completed ? 'gradient-green' : 'bg-gray-300'
                  }`}>
                    <achievement.icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    
                    {!achievement.completed && achievement.progress !== undefined && (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.title === 'Word Master' ? '100' : '10'}</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill bg-purple-500"
                            style={{ width: `${(achievement.progress / (achievement.title === 'Word Master' ? 100 : 10)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600">{achievement.reward}</span>
                      {achievement.completed && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Challenge */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Weekly Challenge</h3>
              <p className="text-sm text-gray-600">Ends in 2 days</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">
            Learn 50 new words this week to unlock the Premium Word Pack!
          </p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>32/50 words</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill bg-orange-500" style={{ width: '64%' }}></div>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-lg font-bold text-orange-600">Reward: Premium Pack + 300 XP</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
