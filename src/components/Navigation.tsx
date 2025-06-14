
import { useState } from 'react';
import { Menu, X, User, LogOut, Trophy, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { Link } from 'react-router-dom';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { stats } = useUserStats();

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              VocabMaster
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'flashcard', 'challenge', 'leaderboard', 'rewards'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`capitalize font-medium transition-colors ${
                  activeSection === item
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {item === 'home' ? 'Home' : 
                 item === 'flashcard' ? 'Study' :
                 item === 'challenge' ? 'Challenge' :
                 item === 'leaderboard' ? 'Leaderboard' :
                 'Rewards'}
              </button>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Stats */}
                {stats && (
                  <div className="hidden sm:flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-orange-600">
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">{stats.total_xp}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-purple-600">
                      <Trophy className="w-4 h-4" />
                      <span className="font-medium">Lv.{stats.level}</span>
                    </div>
                  </div>
                )}
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:block">Profile</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => handleNavClick('profile')}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('stats')}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        <Trophy className="w-4 h-4" />
                        <span>Statistics</span>
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="space-y-2">
              {['home', 'flashcard', 'challenge', 'leaderboard', 'rewards'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-4 py-2 capitalize font-medium transition-colors ${
                    activeSection === item
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {item === 'home' ? 'Home' : 
                   item === 'flashcard' ? 'Study' :
                   item === 'challenge' ? 'Challenge' :
                   item === 'leaderboard' ? 'Leaderboard' :
                   'Rewards'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
