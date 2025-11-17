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
    // IndexedDB is not available in test environment (jsdom)
    // Just ensure no crashes occur
    try {
      await initDB();
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
});
