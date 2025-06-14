
import { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import WordPacks from '../components/WordPacks';
import FlashCard from '../components/FlashCard';
import DailyChallenge from '../components/DailyChallenge';
import Leaderboard from '../components/Leaderboard';
import ProfileDashboard from '../components/ProfileDashboard';
import GameStats from '../components/GameStats';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <HeroSection />
            <WordPacks />
          </>
        );
      case 'flashcard':
        return <FlashCard />;
      case 'challenge':
        return <DailyChallenge />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <ProfileDashboard />;
      case 'stats':
        return <GameStats />;
      default:
        return (
          <>
            <HeroSection />
            <WordPacks />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <main className="pb-20">
        {renderSection()}
      </main>
      
      {/* Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 space-y-3">
        <button
          onClick={() => setActiveSection('flashcard')}
          className="w-14 h-14 gradient-purple rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all card-hover"
        >
          <div className="w-6 h-6 bg-white rounded-sm"></div>
        </button>
        
        <button
          onClick={() => setActiveSection('stats')}
          className="w-12 h-12 gradient-blue rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all card-hover"
        >
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </button>
      </div>
      
      {/* Navigation Pills */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/95 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200">
          <div className="flex space-x-2">
            {[
              { id: 'home', label: '🏠' },
              { id: 'challenge', label: '⭐' },
              { id: 'leaderboard', label: '🏆' },
              { id: 'profile', label: '👤' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeSection === item.id
                    ? 'bg-game-purple text-white shadow-md'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
