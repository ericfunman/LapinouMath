import { useState, useEffect } from 'react';
import { GradeLevel, Question } from '../types';
import { getRandomQuestions } from '../data/questions';

interface Props {
  readonly level: GradeLevel;
  readonly onComplete: (correctCount: number, totalCount: number) => void;
  readonly onExit: () => void;
}

export default function QuickChallenge({ level, onComplete, onExit }: Readonly<Props>) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(5);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const [isQuizActive, setIsQuizActive] = useState(true);

  // Initialiser les questions mélangées de tous les domaines
  useEffect(() => {
    const allDomains = ['Calcul mental', 'Arithmétique', 'Fractions/Décimaux', 'Mesures', 'Géométrie', 'Problèmes/Algèbre'] as const;
    const allQuestions: Question[] = [];
    
    for (const domain of allDomains) {
      const domainQuestions = getRandomQuestions(level, domain, 5);
      allQuestions.push(...domainQuestions);
    }
    
    // Mélanger et prendre 20 questions
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 20);
    setQuestions(shuffledQuestions);
  }, [level]);

  // Timer countdown
  useEffect(() => {
    if (!isQuizActive || selectedAnswer !== null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Temps écoulé - passer à la question suivante
          handleTimeUp();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizActive, selectedAnswer]);

  // Mélanger les options quand la question change
  useEffect(() => {
    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      const options = [...question.options];
      const correctOption = options[question.correctAnswer];
      
      const shuffledOpts = [...options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffledOpts);
      const newCorrectIndex = shuffledOpts.indexOf(correctOption);
      setCorrectAnswerIndex(newCorrectIndex);
      
      setTimeLeft(5);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [questions, currentQuestionIndex]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="text-xl text-gray-800 font-semibold mb-4">Chargement...</p>
          <p className="text-gray-600 mb-6">Initialisation du défi rapide</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const isCorrect = answerIndex === correctAnswerIndex;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleTimeUp = () => {
    setSelectedAnswer(-1); // Marquer comme "pas de réponse"
    setShowExplanation(true);
    setScore(prev => ({
      ...prev,
      total: prev.total + 1
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsQuizActive(false);
      onComplete(score.correct, score.total);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-left">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
                ⚡ Défi Rapide
              </h1>
              <p className="text-gray-600 text-sm">Réponds avant que le temps s&apos;écoule !</p>
            </div>
            <button
              onClick={onExit}
              className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
              title="Quitter"
            >
              ✕
            </button>
          </div>

          {/* Barre de progression */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Question {currentQuestionIndex + 1}/{questions.length}
              </span>
              <span className="text-sm font-semibold text-primary">
                Score: {score.correct}/{score.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-red-500 h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Timer */}
          <div className="text-center">
            {(() => {
              const timerClass = timeLeft <= 2 ? 'bg-red-500 text-white animate-pulse' : 'bg-yellow-100 text-yellow-600';
              return (
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full font-bold text-2xl ${timerClass}`}>
                  {timeLeft}s
                </div>
              );
            })()}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {shuffledOptions.map((option, index) => {
              const getButtonClass = (): string => {
                if (selectedAnswer === null) {
                  return 'bg-gray-100 hover:bg-yellow-200 border-2 border-transparent hover:border-yellow-400 cursor-pointer hover:scale-105';
                }
                if (index === correctAnswerIndex) {
                  return 'bg-green-500 text-white border-2 border-green-600';
                }
                if (selectedAnswer === index) {
                  return 'bg-red-500 text-white border-2 border-red-600';
                }
                return 'bg-gray-100 border-2 border-transparent opacity-50';
              };
              return (
                <button
                  key={`${currentQuestionIndex}-${index}`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null || !isQuizActive}
                  className={`w-full p-4 rounded-2xl text-lg font-semibold transition-all transform ${getButtonClass()}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Explication */}
          {showExplanation && (() => {
            const getExplClass = (): string => {
              if (selectedAnswer === correctAnswerIndex) {
                return 'bg-green-100 border-2 border-green-500';
              }
              return selectedAnswer === -1 ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-red-100 border-2 border-red-500';
            };
            const getTextClass = (): string => {
              if (selectedAnswer === correctAnswerIndex) {
                return 'text-green-700';
              }
              return selectedAnswer === -1 ? 'text-yellow-700' : 'text-red-700';
            };
            const getMessage = (): string => {
              if (selectedAnswer === correctAnswerIndex) {
                return '✅ Correct !';
              }
              return selectedAnswer === -1 ? '⏱️ Temps écoulé !' : '❌ Incorrect';
            };
            return (
              <div className={`p-4 rounded-xl mb-6 ${getExplClass()}`}>
                <p className={`font-semibold mb-2 ${getTextClass()}`}>
                  {getMessage()}
                </p>
                <p className="text-gray-700">
                  {currentQuestion.explanation}
                </p>
              </div>
            );
          })()}

          {/* Bouton suivant */}
          {showExplanation && (() => {
            const btnClass = isLastQuestion
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
              : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:opacity-90';
            const btnText = isLastQuestion ? '🎉 Terminer le défi' : 'Question suivante →';
            return (
              <button
                onClick={handleNext}
                className={`w-full p-4 rounded-xl font-semibold text-white text-lg transition-all ${btnClass}`}
              >
                {btnText}
              </button>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
