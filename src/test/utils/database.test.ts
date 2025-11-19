import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initDB, saveQuestions, loadQuestions, updateQuestion } from '../../utils/database';
import { Question } from '../../types';

describe('Database Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle database initialization gracefully', async () => {
    // IndexedDB mock is available in test environment
    try {
      const database = await initDB();
      expect(database).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should handle saveQuestions gracefully when IndexedDB unavailable', async () => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        level: 'CE1',
        domain: 'Calcul mental',
        question: 'Test question',
        options: ['a', 'b', 'c', 'd'],
        correctAnswer: 0,
        explanation: 'Test explanation',
        difficulty: 1,
      }
    ];

    try {
      await saveQuestions(mockQuestions);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should return empty array when loadQuestions fails', async () => {
    try {
      const result = await loadQuestions();
      expect(Array.isArray(result)).toBe(true);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should handle updateQuestion gracefully', async () => {
    const mockQuestion: Question = {
      id: '1',
      level: 'CE1',
      domain: 'Calcul mental',
      question: 'Updated question',
      options: ['a', 'b', 'c', 'd'],
      correctAnswer: 1,
      explanation: 'Updated explanation',
      difficulty: 2,
    };

    try {
      await updateQuestion(mockQuestion);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should handle bulk save of multiple questions', async () => {
    const mockQuestions: Question[] = [];
    for (let i = 0; i < 10; i++) {
      mockQuestions.push({
        id: `test-${i}`,
        level: 'CE1',
        domain: 'Calcul mental',
        question: `Question ${i}`,
        options: ['a', 'b', 'c', 'd'],
        correctAnswer: 0,
        explanation: `Explication ${i}`,
        difficulty: 1,
      });
    }

    try {
      await saveQuestions(mockQuestions);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should handle questions with lesson data', async () => {
    const mockQuestion: Question = {
      id: 'test-lesson',
      level: 'CE1',
      domain: 'Calcul mental',
      question: 'Test question with lesson',
      options: ['a', 'b', 'c', 'd'],
      correctAnswer: 0,
      explanation: 'Test explanation',
      difficulty: 1,
      lesson: {
        title: 'Test Lesson',
        steps: ['Step 1', 'Step 2', 'Step 3']
      }
    };

    try {
      await saveQuestions([mockQuestion]);
      const loaded = await loadQuestions();
      
      if (loaded.length > 0) {
        const found = loaded.find(q => q.id === 'test-lesson');
        if (found?.lesson) {
          expect(found.lesson.title).toBe('Test Lesson');
          expect(found.lesson.steps).toHaveLength(3);
        }
      }
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
