import { useState, useEffect, useRef } from 'react';
import { GradeLevel, Question, InteractiveQuestion } from '../types';
import { getRandomQuestions } from '../data/questions';
import RabbitAvatar, { AnimationType } from './RabbitAvatar';

interface Props {
  readonly level: GradeLevel;
  readonly onComplete: (correctCount: number, totalCount: number) => void;
  readonly onExit: () => void;
}

// Fonction de mélange utilisant l'algorithme Fisher-Yates
// Plus robuste que sort() avec Math.random() pour éviter les biais
// Math.random() est acceptable ici car il s'agit d'un contexte éducatif
// (mélange de questions), pas de sécurité cryptographique
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // NOSONAR: S2245 - Math.random() suffisant pour mélange éducatif
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuickChallenge({ level, onComplete, onExit }: Readonly<Props>) {
  const [questions, setQuestions] = useState<(Question | InteractiveQuestion)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(5);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [rabbitAnimation, setRabbitAnimation] = useState<AnimationType>('idle');

  useEffect(() => {
    const allDomains = ['Calcul mental', 'Arithmétique', 'Fractions/Décimaux', 'Mesures', 'Géométrie', 'Problèmes/Algèbre', 'Kangourou'] as const;
    const allQuestions: (Question | InteractiveQuestion)[] = [];
    
    for (const domain of allDomains) {
      const domainQuestions = getRandomQuestions(level, domain, 3);
      allQuestions.push(...domainQuestions);
    }
    
    // NOSONAR: S2245 - Math.random() suffisant pour variété pédagogique, pas de sécurité cryptographique
    const shuffledQuestions = shuffleArray([...allQuestions]).slice(0, 20);
    setQuestions(shuffledQuestions);
  }, [level]);

  // Timer countdown
  useEffect(() => {
    if (selectedAnswer !== null) return;
    if (questions.length === 0) return;

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
  }, [selectedAnswer, questions.length]);

  // Mélanger les options quand la question change
  useEffect(() => {
    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      const options = [...question.options];
      const correctOption = options[question.correctAnswer];
      
      const shuffledOpts = shuffleArray([...options]);
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
  
  // Expression du lapin selon l'état
  const getRabbitExpression = () => {
    if (selectedAnswer === null) return 'focused';
    return selectedAnswer === correctAnswerIndex ? 'happy' : 'sad';
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const isCorrect = answerIndex === correctAnswerIndex;
    const newTotal = score.total + 1;
    const newCorrect = score.correct + (isCorrect ? 1 : 0);
    
    setScore({
      correct: newCorrect,
      total: newTotal
    });
    
    // Animation du lapin selon la réponse
    setRabbitAnimation(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setRabbitAnimation('idle'), 1500);
    
    // Auto-avance après 1.5s
    const timer = setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        // Dernière question - terminer le quiz
        onComplete(newCorrect, newTotal);
      } else {
        // Passer à la question suivante
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }, 1500);
    autoAdvanceTimerRef.current = timer;
  };

  const handleTimeUp = () => {
    setSelectedAnswer(-1); // Marquer comme "pas de réponse"
    setShowExplanation(true);
    const newTotal = score.total + 1;
    setScore(prev => ({
      ...prev,
      total: newTotal
    }));
    
    // Auto-avance après 1.5s
    const timer = setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        // Dernière question - terminer le quiz
        onComplete(score.correct, newTotal);
      } else {
        // Passer à la question suivante
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }, 1500);
    autoAdvanceTimerRef.current = timer;
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-4">
      {/* Rabbit Avatar */}
      <div className="fixed top-4 right-4 z-50">
        <RabbitAvatar
          variant="classic"
          expression={getRabbitExpression()}
          animation={rabbitAnimation}
          accessories={['hat-party', 'glasses-star']}
          size={100}
        />
      </div>

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
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-2xl text-lg font-semibold transition-all transform ${getButtonClass()}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Explication avec auto-avance */}
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
            const isLastQ = currentQuestionIndex === questions.length - 1;
            return (
              <div className={`p-4 rounded-xl mb-6 ${getExplClass()}`}>
                <p className={`font-semibold mb-2 ${getTextClass()}`}>
                  {getMessage()}
                </p>
                <p className="text-gray-700 mb-3">
                  {currentQuestion.explanation}
                </p>
                {isLastQ ? (
                  <div className="bg-white bg-opacity-50 rounded p-2 text-center">
                    <p className="text-sm font-semibold text-primary">🎉 Quiz terminé !</p>
                  </div>
                ) : (
                  <div className="bg-white bg-opacity-50 rounded p-2 text-center">
                    <p className="text-sm font-semibold text-primary">Passage automatique...</p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
