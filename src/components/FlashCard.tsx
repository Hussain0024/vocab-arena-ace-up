import { useState } from 'react';
import { Volume2, Star, RotateCcw, Check, X, Users, Crown, Clock } from 'lucide-react';

const FlashCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameMode, setGameMode] = useState('solo'); // 'solo' or 'multiplayer'
  const [isInLobby, setIsInLobby] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const currentWord = {
    word: "Obfuscate",
    pronunciation: "/ˈɒbfəskeɪt/",
    partOfSpeech: "verb",
    definition: "To deliberately make something unclear or difficult to understand",
    example: "The politician tried to obfuscate the real issues during the debate.",
    synonyms: ["confuse", "complicate", "muddle", "bewilder"],
    difficulty: "Advanced",
    category: "GRE Essentials"
  };

  const mockPlayers = [
    { id: 1, name: "Alex", avatar: "🎯", score: 150, isReady: true },
    { id: 2, name: "Sarah", avatar: "🌟", score: 120, isReady: true },
    { id: 3, name: "Mike", avatar: "🚀", score: 0, isReady: false },
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (known: boolean) => {
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setIsFlipped(false);
      // Here you would typically load the next word
    }, 1500);
  };

  const startMultiplayerGame = () => {
    setIsInLobby(true);
    setGameMode('multiplayer');
  };

  const joinGame = () => {
    setGameStarted(true);
    setIsInLobby(false);
  };

  const backToSolo = () => {
    setGameMode('solo');
    setIsInLobby(false);
    setGameStarted(false);
  };

  if (gameMode === 'multiplayer' && isInLobby) {
    return (
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={backToSolo}
              className="text-game-purple hover:text-game-purple-dark"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800">Multiplayer Lobby</h2>
            <div className="w-8"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Word Battle Arena</h3>
              <p className="text-gray-600">Compete with friends in real-time!</p>
            </div>

            <div className="space-y-3 mb-6">
              {mockPlayers.map((player) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-lg">{player.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{player.name}</p>
                      <p className="text-sm text-gray-500">Score: {player.score}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${player.isReady ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                </div>
              ))}
            </div>

            <button
              onClick={joinGame}
              className="w-full gradient-purple text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Start Battle! 🏆
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (gameMode === 'multiplayer' && gameStarted) {
    return (
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Multiplayer Header */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={backToSolo}
              className="text-game-purple hover:text-game-purple-dark"
            >
              ← Exit
            </button>
            <div className="flex items-center space-x-2 text-orange-600">
              <Clock className="w-4 h-4" />
              <span className="font-bold">0:45</span>
            </div>
          </div>

          {/* Score Board */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              {mockPlayers.slice(0, 2).map((player, index) => (
                <div key={player.id} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span>{player.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{player.name}</p>
                    <p className="text-lg font-bold text-game-purple">{player.score}</p>
                  </div>
                  {index === 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                </div>
              ))}
            </div>
          </div>

          {/* Rest of the flashcard UI remains the same */}
          <div className="relative">
            <div 
              className={`flip-card ${isFlipped ? 'flipped' : ''} h-80 perspective-1000 cursor-pointer`}
              onClick={handleFlip}
            >
              <div className="flip-card-inner">
                {/* Front of card */}
                <div className="flip-card-front">
                  <div className="h-full bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 flex flex-col justify-center items-center gradient-purple">
                    <div className="text-center">
                      <div className="mb-4">
                        <span className="text-xs font-medium text-white/80 bg-white/20 px-3 py-1 rounded-full">
                          {currentWord.category}
                        </span>
                      </div>
                      
                      <h1 className="text-3xl font-bold text-white mb-2">
                        {currentWord.word}
                      </h1>
                      
                      <p className="text-white/80 text-lg mb-4">
                        {currentWord.pronunciation}
                      </p>
                      
                      <div className="flex justify-center space-x-4">
                        <button 
                          className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Volume2 className="w-5 h-5 text-white" />
                        </button>
                        
                        <button 
                          className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Star className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      
                      <p className="text-white/60 text-sm mt-6">
                        Tap to reveal meaning
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Back of card */}
                <div className="flip-card-back">
                  <div className="h-full bg-white rounded-2xl shadow-lg border-2 border-green-100 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-800">{currentWord.word}</h2>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {currentWord.partOfSpeech}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Definition</h3>
                        <p className="text-gray-800">{currentWord.definition}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Example</h3>
                        <p className="text-gray-600 italic">"{currentWord.example}"</p>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Synonyms</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentWord.synonyms.map((synonym, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {synonym}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            {isFlipped && (
              <div className="flex justify-center space-x-4 mt-6 animate-slide-up">
                <button
                  onClick={() => handleAnswer(false)}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span>Learn Again</span>
                </button>
                
                <button
                  onClick={() => handleAnswer(true)}
                  className="flex items-center space-x-2 px-6 py-3 gradient-green hover:opacity-90 text-white rounded-xl font-medium transition-colors"
                >
                  <Check className="w-5 h-5" />
                  <span>Got It!</span>
                </button>
              </div>
            )}
            
            {/* Result feedback */}
            {showResult && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl animate-bounce-in">
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="w-16 h-16 gradient-green rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-lg font-bold text-gray-800 mb-1">Great job!</p>
                  <p className="text-sm text-gray-600">+10 XP earned</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Solo Mode (default)
  return (
    <section className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Flashcard</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Card 15/50</span>
            <div className="w-20 bg-gray-200 rounded-full h-1">
              <div className="w-1/3 bg-game-purple h-1 rounded-full transition-all duration-300"></div>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setGameMode('solo')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              gameMode === 'solo' 
                ? 'bg-game-purple text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Solo Practice
          </button>
          <button
            onClick={startMultiplayerGame}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
              gameMode === 'multiplayer' 
                ? 'bg-game-purple text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Battle Mode</span>
          </button>
        </div>
        
        <div className="relative">
          <div 
            className={`flip-card ${isFlipped ? 'flipped' : ''} h-80 perspective-1000 cursor-pointer`}
            onClick={handleFlip}
          >
            <div className="flip-card-inner">
              {/* Front of card */}
              <div className="flip-card-front">
                <div className="h-full bg-white rounded-2xl shadow-lg border-2 border-purple-100 p-6 flex flex-col justify-center items-center gradient-purple">
                  <div className="text-center">
                    <div className="mb-4">
                      <span className="text-xs font-medium text-white/80 bg-white/20 px-3 py-1 rounded-full">
                        {currentWord.category}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {currentWord.word}
                    </h1>
                    
                    <p className="text-white/80 text-lg mb-4">
                      {currentWord.pronunciation}
                    </p>
                    
                    <div className="flex justify-center space-x-4">
                      <button 
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Volume2 className="w-5 h-5 text-white" />
                      </button>
                      
                      <button 
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Star className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    
                    <p className="text-white/60 text-sm mt-6">
                      Tap to reveal meaning
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Back of card */}
              <div className="flip-card-back">
                <div className="h-full bg-white rounded-2xl shadow-lg border-2 border-green-100 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{currentWord.word}</h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {currentWord.partOfSpeech}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Definition</h3>
                      <p className="text-gray-800">{currentWord.definition}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Example</h3>
                      <p className="text-gray-600 italic">"{currentWord.example}"</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Synonyms</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentWord.synonyms.map((synonym, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {synonym}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          {isFlipped && (
            <div className="flex justify-center space-x-4 mt-6 animate-slide-up">
              <button
                onClick={() => handleAnswer(false)}
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Learn Again</span>
              </button>
              
              <button
                onClick={() => handleAnswer(true)}
                className="flex items-center space-x-2 px-6 py-3 gradient-green hover:opacity-90 text-white rounded-xl font-medium transition-colors"
              >
                <Check className="w-5 h-5" />
                <span>Got It!</span>
              </button>
            </div>
          )}
          
          {/* Result feedback */}
          {showResult && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl animate-bounce-in">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 gradient-green rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-bold text-gray-800 mb-1">Great job!</p>
                <p className="text-sm text-gray-600">+10 XP earned</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <button className="flex items-center space-x-2 mx-auto text-game-purple hover:text-game-purple-dark transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Reset Card</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlashCard;
