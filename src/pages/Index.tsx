
import { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import WordPacks from '../components/WordPacks';
import FlashCard from '../components/FlashCard';
import DailyChallenge from '../components/DailyChallenge';
import Leaderboard from '../components/Leaderboard';
import ProfileDashboard from '../components/ProfileDashboard';
import GameStats from '../components/GameStats';
import SubscriptionPage from '../components/SubscriptionPage';
import RewardsSection from '../components/RewardsSection';

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
      case 'subscription':
        return <SubscriptionPage />;
      case 'rewards':
        return <RewardsSection />;
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
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="pb-20 pt-32">
        {renderSection()}
      </main>
      
      {/* Navigation Pills - Alternative navigation at bottom for mobile users */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/20 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30">
          <div className="flex space-x-2">
            {[
              { id: 'home', label: '🏠' },
              { id: 'flashcard', label: '⚡' },
              { id: 'challenge', label: '⭐' },
              { id: 'rewards', label: '🎁' },
              { id: 'subscription', label: '👑' },
              { id: 'profile', label: '👤' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeSection === item.id
                    ? 'bg-game-purple text-white shadow-md'
                    : 'hover:bg-white/20'
                }`}
                title={item.id}
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
