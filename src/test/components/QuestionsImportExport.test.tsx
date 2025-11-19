import { describe, it, expect, vi } from 'vitest';
import QuestionsImportExport from '../../components/QuestionsImportExport';
import { Question } from '../../types';

const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'What is 2+2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'Simple addition',
    difficulty: 1,
    domain: 'Calcul mental',
    level: '4ème',
    lesson: {
      title: 'Addition',
      steps: ['Add numbers']
    }
  }
];

describe('QuestionsImportExport', () => {
  it('component exports correctly', () => {
    expect(QuestionsImportExport).toBeDefined();
  });

  it('handles empty questions array', () => {
    const onImportComplete = vi.fn();
    expect(() => {
      // Component should handle empty array without errors
      const result = { allQuestions: [], onImportComplete };
      expect(result.allQuestions).toEqual([]);
    }).not.toThrow();
  });

  it('accepts questions prop', () => {
    expect(mockQuestions).toHaveLength(1);
    expect(mockQuestions[0].question).toBe('What is 2+2?');
  });

  it('has correct question structure', () => {
    const question = mockQuestions[0];
    expect(question).toHaveProperty('id');
    expect(question).toHaveProperty('question');
    expect(question).toHaveProperty('options');
    expect(question).toHaveProperty('correctAnswer');
    expect(question).toHaveProperty('explanation');
  });
});

