
import { useState } from 'react';
import { Calendar, Zap, CheckCircle, Clock, Award } from 'lucide-react';

const DailyChallenge = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  const todaysWord = {
    word: "Serendipity",
    pronunciation: "/ˌsɛrənˈdɪpɪti/",
    definition: "The occurrence of events by chance in a happy or beneficial way"
  };
  
  const questions = [
    {
      question: "What does 'serendipity' mean?",
      options: [
        "A planned discovery",
        "A fortunate accident",
        "A scientific method",
        "A type of philosophy"
      ],
      correct: 1
    },
    {
      question: "Which sentence uses 'serendipity' correctly?",
      options: [
        "The serendipity was carefully planned",
        "It was pure serendipity that led to the discovery",
        "He studied serendipity in school",
        "The serendipity failed to work"
      ],
      correct: 1
    },
    {
      question: "What is a synonym for 'serendipity'?",
      options: [
        "Misfortune",
        "Planning",
        "Coincidence",
        "Intention"
      ],
      correct: 2
    }
  ];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1500);
  };

  return (
    <section className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Daily Challenge</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Day 7</span>
          </div>
        </div>
        
        {/* Word of the Day */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 mb-6 border border-orange-100">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-orange-700">Word of the Day</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{todaysWord.word}</h3>
          <p className="text-gray-600 text-sm mb-3">{todaysWord.pronunciation}</p>
          <p className="text-gray-700">{todaysWord.definition}</p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>5 min challenge</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-orange-500" />
                <span>+50 XP</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Challenge Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">Score: {score}/{questions.length}</span>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill bg-orange-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  showResult
                    ? index === questions[currentQuestion].correct
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                    : selectedAnswer === index
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showResult && index === questions[currentQuestion].correct
                      ? 'border-green-500 bg-green-500'
                      : showResult && selectedAnswer === index && index !== questions[currentQuestion].correct
                      ? 'border-red-500 bg-red-500' 
                      : selectedAnswer === index
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-300'
                  }`}>
                    {showResult && index === questions[currentQuestion].correct && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                    {showResult && selectedAnswer === index && index !== questions[currentQuestion].correct && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                    {selectedAnswer === index && !showResult && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Streak Counter */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Current Streak</p>
              <p className="text-2xl font-bold text-game-purple">7 days</p>
            </div>
            <div className="flex space-x-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full gradient-orange"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyChallenge;
