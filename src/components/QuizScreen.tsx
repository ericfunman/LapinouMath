import { useState, useEffect } from 'react';
import { GradeLevel, MathDomain, Question } from '../types';
import { getRandomQuestions } from '../data/questions';
import { reportQuestionError } from '../utils/database';
import emailjs from '@emailjs/browser';

interface Props {
  level: GradeLevel;
  domain: MathDomain;
  onComplete: (correctCount: number, totalCount: number) => void;
  onExit: () => void;
}

export default function QuizScreen({ level, domain, onComplete, onExit }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const [reportedQuestions, setReportedQuestions] = useState<Set<string>>(new Set());
  const [showReportSuccess, setShowReportSuccess] = useState(false);

  useEffect(() => {
    const quizQuestions = getRandomQuestions(level, domain, 10);
    setQuestions(quizQuestions);
  }, [level, domain]);

  useEffect(() => {
    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      const options = [...question.options];
      const correctOption = options[question.correctAnswer];
      
      // Mélanger les options
      const shuffled = [...options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
      const newCorrectIndex = shuffled.indexOf(correctOption);
      setCorrectAnswerIndex(newCorrectIndex);
      
      // Debug
      console.log('Question:', question.question);
      console.log('Options originales:', options);
      console.log('Index correct original:', question.correctAnswer);
      console.log('Bonne réponse:', correctOption);
      console.log('Options mélangées:', shuffled);
      console.log('Nouvel index correct:', newCorrectIndex);
    }
  }, [questions, currentQuestionIndex]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="text-xl text-gray-800 font-semibold mb-4">Aucune question disponible</p>
          <p className="text-gray-600 mb-6">
            Désolé, il n'y a pas de questions disponibles pour {domain} en {level}.
          </p>
          <button
            onClick={onExit}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 font-semibold"
          >
            Retour au tableau de bord
          </button>
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

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score.correct, score.total);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowLesson(false);
    }
  };

  const toggleLesson = () => {
    setShowLesson(!showLesson);
  };

  const handleReportError = async () => {
    try {
      // Save to IndexedDB
      await reportQuestionError({
        questionId: currentQuestion.id,
        level,
        domain,
        questionText: currentQuestion.question,
        userNote: 'Signalé comme fautif par l\'utilisateur'
      });
      
      // Try to send email automatically
      try {
        // Initialize EmailJS with public key
        emailjs.init('ShHyWcGX4s7YtH8lH');
        
        await emailjs.send(
          'service_305dfu9',
          'template_xphq7n2',
          {
            to_email: 'lapinae@gmail.com',
            reports_count: 1,
            level: level,
            domain: domain,
            questionText: currentQuestion.question,
            userNote: 'Signalé comme fautif par l\'utilisateur',
            questionId: currentQuestion.id,
            timestamp: new Date().toLocaleString(),
            reports_text: `Rapport d'erreur:\n- Niveau: ${level}\n- Domaine: ${domain}\n- Question: ${currentQuestion.question}\n- Date: ${new Date().toLocaleString()}`
          }
        );
        console.log('✅ Email envoyé automatiquement');
      } catch (emailError) {
        console.warn('⚠️ Email automatique non envoyé (rapport sauvegardé en local):', emailError);
      }
      
      setReportedQuestions(prev => new Set([...prev, currentQuestion.id]));
      setShowReportSuccess(true);
      setTimeout(() => setShowReportSuccess(false), 2000);
    } catch (error) {
      console.error('Erreur lors du signalement:', error);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{domain}</h2>
            <p className="text-gray-600">Niveau {level}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Progression</p>
              <p className="text-lg font-bold text-primary">
                {currentQuestionIndex + 1} / {questions.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-lg font-bold text-success">
                {score.correct} / {score.total}
              </p>
            </div>
            <button
              onClick={onExit}
              className="text-red-500 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-100"
            >
              ❌ Quitter
            </button>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4 flex-1">
              <span className="text-6xl">🐰</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentQuestion.question}
                </h3>
              </div>
            </div>
            <button
              onClick={handleReportError}
              disabled={reportedQuestions.has(currentQuestion.id)}
              title="Signaler une erreur dans cette question"
              className={`px-3 py-2 rounded-lg whitespace-nowrap text-sm font-semibold transition-all ${
                reportedQuestions.has(currentQuestion.id)
                  ? 'bg-gray-200 text-gray-500 cursor-default'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 cursor-pointer'
              }`}
            >
              {reportedQuestions.has(currentQuestion.id) ? '✓ Signalé' : '⚠️ Signaler'}
            </button>
            {showReportSuccess && (
              <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm">
                ✓ Erreur signalée
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {shuffledOptions.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === correctAnswerIndex;
              const showResult = selectedAnswer !== null;

              let bgColor = 'bg-gray-100 hover:bg-gray-200';
              if (showResult) {
                if (isCorrect) {
                  bgColor = 'bg-green-200 border-2 border-green-500';
                } else if (isSelected && !isCorrect) {
                  bgColor = 'bg-red-200 border-2 border-red-500';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`${bgColor} p-4 rounded-xl text-left text-lg font-semibold transition-all ${
                    selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {option}
                  {showResult && isCorrect && ' ✅'}
                  {showResult && isSelected && !isCorrect && ' ❌'}
                </button>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {currentQuestion.lesson && (
              <button
                onClick={toggleLesson}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                {showLesson ? '📖 Masquer le cours' : '📖 Voir le cours'}
              </button>
            )}
            {showExplanation && (
              <button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-bold hover:shadow-lg transition-shadow"
              >
                {isLastQuestion ? '🎉 Terminer' : '➡️ Question suivante'}
              </button>
            )}
          </div>
        </div>

        {/* Lesson */}
        {showLesson && currentQuestion.lesson && (
          <div className="bg-blue-50 rounded-2xl shadow-xl p-6 mb-6">
            <h4 className="text-xl font-bold text-blue-800 mb-4">
              📚 {currentQuestion.lesson.title}
            </h4>
            <div className="space-y-3">
              {currentQuestion.lesson.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className={`rounded-2xl shadow-xl p-6 ${
            selectedAnswer === correctAnswerIndex
              ? 'bg-green-50'
              : 'bg-red-50'
          }`}>
            <h4 className="text-xl font-bold mb-3">
              {selectedAnswer === correctAnswerIndex
                ? '✅ Bravo ! Bonne réponse !'
                : '❌ Pas tout à fait...'}
            </h4>
            <p className="text-gray-700 text-lg">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
