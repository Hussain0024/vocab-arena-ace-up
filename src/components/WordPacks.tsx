
import { Lock, Star, BookOpen, Zap, Users, Clock } from 'lucide-react';
import { useWordPacks } from '@/hooks/useWordPacks';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const WordPacks = () => {
  const { wordPacks, loading } = useWordPacks();
  const { user } = useAuth();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Exam Prep': return '🎓';
      case 'Professional': return '💼';
      case 'General': return '💬';
      case 'Academic': return '📚';
      default: return '📖';
    }
  };

  if (loading) {
    return (
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Word Packs</h2>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-8 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Word Packs</h2>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{wordPacks.length} packs</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {['All', 'Exam Prep', 'Professional', 'Academic', 'General'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === 'All'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          {wordPacks.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No word packs available yet.</p>
            </div>
          ) : (
            wordPacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover relative overflow-hidden"
              >
                {pack.is_premium && !user && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${pack.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl">{getCategoryIcon(pack.category)}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">{pack.title}</h3>
                      {pack.is_premium && (
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          PRO
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{pack.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(pack.difficulty)}`}>
                        {pack.difficulty}
                      </span>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{pack.total_words} words</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>~{Math.ceil(pack.total_words / 10)} min</span>
                        </div>
                      </div>
                    </div>
                    
                    {user && pack.progress !== undefined && (
                      <>
                        <div className="progress-bar mb-3">
                          <div 
                            className={`progress-fill bg-gradient-to-r from-purple-500 to-blue-500`}
                            style={{ width: `${pack.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>{pack.learned_words}/{pack.total_words} learned</span>
                          <span>{pack.progress}% complete</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>4.8</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-orange-500" />
                          <span>+{Math.floor(pack.total_words * 0.2)} XP</span>
                        </div>
                      </div>
                      
                      {user ? (
                        <button 
                          className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                            pack.is_premium && !user
                              ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700' 
                              : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                          }`}
                          disabled={pack.is_premium && !user}
                        >
                          {pack.progress === 0 ? 'Start Learning' : 
                           pack.progress === 100 ? 'Review' : 'Continue'}
                        </button>
                      ) : (
                        <Link
                          to="/auth"
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                        >
                          Sign In to Start
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {wordPacks.length > 0 && (
          <div className="text-center mt-6">
            <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
              View All Packs ({wordPacks.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WordPacks;
