import React, { useState } from 'react';
import {
  createMedianQuestion,
  createRightAngleQuestion,
  createCircleDiameterQuestion,
  createSymmetryQuestion,
  createAngleMeasurementQuestion,
} from './interactive/interactiveQuestionBuilders';
import { InteractiveQuestionContainer } from './interactive';
import { InteractiveQuestion } from '../types';

/**
 * Demo Page for Interactive Geometry Questions
 * Shows all 5 sample questions with their visual geometries
 * 
 * Access via: http://localhost:5173/demo or add to your router
 */

type QuestionType =
  | 'median'
  | 'rightAngle'
  | 'circleDiameter'
  | 'symmetry'
  | 'angleMeasurement';

export const InteractiveDemo: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType>('median');
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<QuestionType>>(
    new Set()
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<QuestionType, number>>({
    median: -1,
    rightAngle: -1,
    circleDiameter: -1,
    symmetry: -1,
    angleMeasurement: -1,
  });

  const questionMap: Record<QuestionType, InteractiveQuestion> = {
    median: createMedianQuestion(),
    rightAngle: createRightAngleQuestion(),
    circleDiameter: createCircleDiameterQuestion(),
    symmetry: createSymmetryQuestion(),
    angleMeasurement: createAngleMeasurementQuestion(),
  };

  const currentQuestion = questionMap[selectedQuestion];
  const isAnswered = answeredQuestions.has(selectedQuestion);
  const selectedAnswer = selectedAnswers[selectedQuestion];

  const handleAnswerSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [selectedQuestion]: index,
      }));
      setAnsweredQuestions((prev) => new Set(prev).add(selectedQuestion));
    }
  };

  const handleNextQuestion = () => {
    const questions: QuestionType[] = [
      'median',
      'rightAngle',
      'circleDiameter',
      'symmetry',
      'angleMeasurement',
    ];
    const currentIndex = questions.indexOf(selectedQuestion);
    const nextIndex = (currentIndex + 1) % questions.length;
    setSelectedQuestion(questions[nextIndex]);
  };

  const handlePreviousQuestion = () => {
    const questions: QuestionType[] = [
      'median',
      'rightAngle',
      'circleDiameter',
      'symmetry',
      'angleMeasurement',
    ];
    const currentIndex = questions.indexOf(selectedQuestion);
    const previousIndex =
      currentIndex === 0 ? questions.length - 1 : currentIndex - 1;
    setSelectedQuestion(questions[previousIndex]);
  };

  const handleReset = () => {
    setAnsweredQuestions(new Set());
    setSelectedAnswers({
      median: -1,
      rightAngle: -1,
      circleDiameter: -1,
      symmetry: -1,
      angleMeasurement: -1,
    });
  };

  const getQuestionLabel = (type: QuestionType): string => {
    const labels: Record<QuestionType, string> = {
      median: '📐 Médiane du Triangle',
      rightAngle: '⊥ Angle Droit',
      circleDiameter: '⭕ Diamètre du Cercle',
      symmetry: '🔄 Symétrie du Triangle',
      angleMeasurement: '📏 Mesure d\'Angle',
    };
    return labels[type];
  };

  const getQuestionDescription = (type: QuestionType): string => {
    const descriptions: Record<QuestionType, string> = {
      median: '6ème - Géométrie | Interaction: Clic',
      rightAngle: '5ème - Géométrie | Interaction: Clic',
      circleDiameter: '6ème - Géométrie | Interaction: Clic',
      symmetry: '5ème - Géométrie | Interaction: Dessin',
      angleMeasurement: '5ème - Géométrie | Interaction: Mesure',
    };
    return descriptions[type];
  };

  const answeredCount = answeredQuestions.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎨 Démo Questions Géométriques Interactives
          </h1>
          <p className="text-gray-600 text-lg">
            Phase 1 - 5 questions avec dessins interactifs
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {(
            [
              'median',
              'rightAngle',
              'circleDiameter',
              'symmetry',
              'angleMeasurement',
            ] as QuestionType[]
          ).map((qType) => {
            const answered = answeredQuestions.has(qType);
            const correct = answered && selectedAnswers[qType] === questionMap[qType].correctAnswer;
            
            const buttonClass = selectedQuestion === qType
              ? 'ring-2 ring-blue-500 shadow-lg'
              : '';
            
            let bgClass = 'bg-white text-gray-700 hover:bg-gray-50';
            if (correct) {
              bgClass = 'bg-green-100 text-green-800';
            } else if (answered) {
              bgClass = 'bg-red-100 text-red-800';
            }
            
            let icon = '⭕';
            if (correct) {
              icon = '✅';
            } else if (answered) {
              icon = '❌';
            }
            
            return (
              <button
                key={qType}
                onClick={() => setSelectedQuestion(qType)}
                className={`p-4 rounded-lg font-semibold transition-all ${buttonClass} ${bgClass}`}
              >
                <div className="text-xs md:text-sm">{icon}</div>
                <div className="text-xs mt-1">{getQuestionLabel(qType)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Question Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {getQuestionLabel(selectedQuestion)}
              </h2>
              <p className="text-sm text-gray-500">
                {getQuestionDescription(selectedQuestion)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {answeredCount}/5
              </div>
              <p className="text-xs text-gray-500">répondues</p>
            </div>
          </div>
        </div>

        {/* Interactive Question */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <InteractiveQuestionContainer
            question={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            isAnswered={isAnswered}
            selectedAnswer={selectedAnswer}
            showCorrectness={isAnswered}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <button
              onClick={handlePreviousQuestion}
              className="flex-1 md:flex-none px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              ← Précédente
            </button>
            <button
              onClick={handleNextQuestion}
              className="flex-1 md:flex-none px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Suivante →
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex-1 md:flex-none px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            🔄 Réinitialiser
          </button>
        </div>

        {/* Results Summary */}
        {answeredCount === 5 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-500">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              🎉 Quiz Terminé!
            </h3>
            <p className="text-gray-700 mb-4">
              Tu as répondu à toutes les 5 questions interactives avec succès.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(
                [
                  'median',
                  'rightAngle',
                  'circleDiameter',
                  'symmetry',
                  'angleMeasurement',
                ] as QuestionType[]
              ).map((qType) => {
                const correct = selectedAnswers[qType] === questionMap[qType].correctAnswer;
                const bgClass = correct ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
                const text = correct ? '✅ Correct' : '❌ Incorrect';
                
                return (
                  <div
                    key={qType}
                    className={`p-3 rounded text-center font-semibold ${bgClass}`}
                  >
                    {text}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Panel */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-800 mb-2">💡 À Propos de cette Démo</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              ✅ <strong>5 questions géométriques</strong> avec canvas interactif
            </li>
            <li>
              ✅ <strong>3 types d'interactions:</strong> Clic, Dessin, Mesure
            </li>
            <li>
              ✅ <strong>Dessins générés</strong> avec react-konva + konva.js
            </li>
            <li>
              ✅ <strong>Tests automatiques</strong> (17/17 passing)
            </li>
            <li>
              ✅ <strong>Compatible</strong> avec ton système de questions existant
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
