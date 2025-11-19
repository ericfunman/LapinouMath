import React, { useState } from 'react';
import { Question, InteractiveQuestion } from '../../types';
import GeometryCanvas from './GeometryCanvas';

interface InteractiveQuestionContainerProps {
  question: Question | InteractiveQuestion;
  onAnswerSelect?: (answerIndex: number) => void;
  onInteractionDetected?: (elementId: string, action: string) => void;
  isAnswered?: boolean;
  selectedAnswer?: number;
  showCorrectness?: boolean;
}

/**
 * InteractiveQuestionContainer Component
 * Handles both standard multiple-choice and interactive questions
 * Provides unified interface for question rendering
 * 
 * Features:
 * - Automatic detection of interactive vs standard questions
 * - Answer validation
 * - Visual feedback
 * - Accessibility support
 */
export const InteractiveQuestionContainer: React.FC<InteractiveQuestionContainerProps> = ({
  question,
  onAnswerSelect,
  onInteractionDetected,
  isAnswered = false,
  selectedAnswer,
  showCorrectness = false,
}) => {
  const [interactionLog, setInteractionLog] = useState<
    { elementId: string; action: string; timestamp: number }[]
  >([]);

  const isInteractive = (q: Question | InteractiveQuestion): q is InteractiveQuestion => {
    return 'isInteractive' in q && q.isInteractive === true;
  };

  const handleInteraction = (elementId: string, action: string) => {
    const newLog = {
      elementId,
      action,
      timestamp: Date.now(),
    };
    setInteractionLog((prev) => [...prev, newLog]);
    onInteractionDetected?.(elementId, action);
  };

  const getOptionColor = (index: number): string => {
    if (!showCorrectness) return 'bg-blue-50 hover:bg-blue-100';

    if (index === question.correctAnswer) {
      return 'bg-green-100 border-green-500';
    }

    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'bg-red-100 border-red-500';
    }

    return 'bg-blue-50 hover:bg-blue-100';
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
      {/* Question Title */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">{question.question}</h2>
        <p className="text-sm text-gray-500 mt-2">
          Difficulté: {'⭐'.repeat(question.difficulty)}
        </p>
      </div>

      {/* Interactive Canvas (if applicable) */}
      {isInteractive(question) && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {question.expectedInteraction.description}
          </h3>
          <GeometryCanvas
            question={question}
            onInteraction={handleInteraction}
          />
        </div>
      )}

      {/* Multiple Choice Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect?.(index)}
            disabled={isAnswered}
            className={`w-full p-3 rounded-lg border-2 text-left font-medium transition-all ${
              selectedAnswer === index
                ? 'border-blue-500 bg-blue-100'
                : `border-gray-200 ${getOptionColor(index)}`
            } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="text-lg font-bold text-blue-600 mr-3">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
            {showCorrectness && index === question.correctAnswer && (
              <span className="ml-2 text-green-600 font-bold">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Explanation (shown after answer) */}
      {showCorrectness && (
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-800 mb-2">Explication:</h4>
          <p className="text-gray-700">{question.explanation}</p>
          
          {isInteractive(question) && interactionLog.length > 0 && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-xs font-semibold text-gray-600 mb-1">Interactions détectées:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {interactionLog.slice(-3).map((log, idx) => (
                  <li key={idx} className="text-gray-600">
                    • {log.elementId}: {log.action}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Hint for Interactive Questions */}
      {isInteractive(question) && !isAnswered && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            💡 <span className="font-semibold">Indice:</span> Interagissez avec le diagramme pour
            explorer la géométrie avant de répondre.
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveQuestionContainer;
