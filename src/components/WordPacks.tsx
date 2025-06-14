
import { Lock, Star, BookOpen, Zap } from 'lucide-react';

const WordPacks = () => {
  const wordPacks = [
    {
      id: 1,
      title: "GRE Essentials",
      description: "Master 500 high-frequency GRE words",
      difficulty: "Advanced",
      progress: 65,
      totalWords: 500,
      learnedWords: 325,
      category: "Exam Prep",
      isPremium: false,
      color: "gradient-purple"
    },
    {
      id: 2,
      title: "Business English",
      description: "Professional vocabulary for workplace",
      difficulty: "Intermediate",
      progress: 40,
      totalWords: 300,
      learnedWords: 120,
      category: "Professional",
      isPremium: false,
      color: "gradient-blue"
    },
    {
      id: 3,
      title: "IELTS Academic",
      description: "Academic words for IELTS success",
      difficulty: "Advanced",
      progress: 20,
      totalWords: 400,
      learnedWords: 80,
      category: "Exam Prep",
      isPremium: true,
      color: "gradient-green"
    },
    {
      id: 4,
      title: "Daily Conversation",
      description: "Common words for everyday use",
      difficulty: "Beginner",
      progress: 85,
      totalWords: 200,
      learnedWords: 170,
      category: "General",
      isPremium: false,
      color: "gradient-orange"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Word Packs</h2>
          <button className="text-game-purple text-sm font-medium hover:text-game-purple-dark transition-colors">
            View All
          </button>
        </div>
        
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {['All', 'Exam Prep', 'Professional', 'General'].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === 'All'
                  ? 'bg-game-purple text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          {wordPacks.map((pack) => (
            <div
              key={pack.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover relative overflow-hidden"
            >
              {pack.isPremium && (
                <div className="absolute top-3 right-3">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${pack.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">{pack.title}</h3>
                    <span className="text-xs text-gray-500">{pack.category}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{pack.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(pack.difficulty)}`}>
                      {pack.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">
                      {pack.learnedWords}/{pack.totalWords} words
                    </span>
                  </div>
                  
                  <div className="progress-bar mb-3">
                    <div 
                      className={`progress-fill ${pack.color.replace('gradient-', 'bg-game-')}`}
                      style={{ width: `${pack.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-3 h-3 text-orange-500" />
                        <span>+{Math.floor(pack.totalWords * 0.1)} XP</span>
                      </div>
                    </div>
                    
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                      pack.isPremium 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700' 
                        : `${pack.color} hover:opacity-90`
                    }`}>
                      {pack.isPremium ? 'Upgrade' : 'Continue'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WordPacks;
