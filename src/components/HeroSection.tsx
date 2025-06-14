
import { Trophy, Star, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="px-4 py-8 mt-32">
      <div className="max-w-md mx-auto text-center">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-8 h-8 gradient-orange rounded-full animate-bounce-in opacity-80"></div>
          <div className="absolute -top-2 -right-6 w-6 h-6 gradient-green rounded-full animate-bounce-in opacity-60" style={{animationDelay: '0.2s'}}></div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Level Up Your
            <span className="block bg-gradient-to-r from-game-purple to-game-blue bg-clip-text text-transparent">
              Vocabulary Game
            </span>
          </h1>
        </div>
        
        <p className="text-gray-600 mb-6 text-lg">
          Master words through gamified learning. Compete with friends and track your progress!
        </p>
        
        <div className="flex justify-center space-x-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 gradient-purple rounded-xl flex items-center justify-center mb-2 mx-auto">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs text-gray-600">Compete</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center mb-2 mx-auto">
              <Star className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs text-gray-600">Earn XP</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 gradient-green rounded-xl flex items-center justify-center mb-2 mx-auto">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs text-gray-600">Social</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Daily Streak</p>
              <p className="text-2xl font-bold text-game-purple">7 days</p>
            </div>
            <div className="flex space-x-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full gradient-orange animate-bounce-in"
                  style={{animationDelay: `${i * 0.1}s`}}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
