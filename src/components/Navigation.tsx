
import { useState } from 'react';
import { Book, Trophy, User, Star, Settings, Zap, Gift, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const navItems = [
    { id: 'home', icon: Book, label: 'Learn' },
    { id: 'flashcard', icon: Zap, label: 'Cards' },
    { id: 'challenge', icon: Star, label: 'Daily' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'rewards', icon: Gift, label: 'Rewards' },
    { id: 'subscription', icon: Trophy, label: 'Premium' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center">
            <Book className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-game-purple to-game-blue bg-clip-text text-transparent">
            VocabChamp
          </span>
        </div>
        
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="flex justify-center mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-1 max-w-full mx-auto overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-white/20 backdrop-blur-sm shadow-sm text-game-purple'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/10'
              }`}
            >
              <item.icon className="w-4 h-4 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
