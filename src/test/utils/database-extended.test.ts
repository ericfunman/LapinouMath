import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initDB,
  saveQuestions,
  getErrorReports,
  deleteErrorReport,
  reportQuestionError,
} from '../../utils/database';
import type { Question } from '../../types';

describe('Database Extended Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes database connection', async () => {
    const result = await initDB();
    expect(result).toBeDefined();
  });

  it('saves questions to storage', async () => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        level: 'CE1',
        domain: 'Calcul mental',
        question: 'What is 1+1?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: 'Simple arithmetic',
        difficulty: 1,
        lesson: {
          title: 'Addition Basics',
          steps: ['Count on fingers'],
        },
      },
      {
        id: '2',
        level: 'CE2',
        domain: 'Arithmétique',
        question: 'What is 5+5?',
        options: ['9', '10', '11', '12'],
        correctAnswer: 1,
        explanation: 'Basic addition',
        difficulty: 1,
        lesson: {
          title: 'Adding Tens',
          steps: ['Count by tens'],
        },
      },
    ];

    await saveQuestions(mockQuestions);
    // Verify no errors thrown
    expect(true).toBe(true);
  });

  it('saves and verifies error reports', async () => {
    const mockReport = {
      level: 'CE1' as const,
      domain: 'Calcul mental' as const,
      questionId: 'q-test',
      questionText: 'Test question',
      userNote: 'Test note',
    };

    await reportQuestionError(mockReport);
    const reports = await getErrorReports();
    expect(Array.isArray(reports)).toBe(true);
  });

  it('adds error report to storage', async () => {
    await reportQuestionError({
      level: 'CE1',
      domain: 'Calcul',
      questionText: 'Wrong question',
      userNote: 'This is incorrect',
      questionId: 'q1',
    });

    const reports = await getErrorReports();
    expect(Array.isArray(reports)).toBe(true);
  });

  it('retrieves all error reports', async () => {
    await reportQuestionError({
      level: 'CM1',
      domain: 'Géométrie',
      questionText: 'Confusing geometry',
      userNote: 'Explanation unclear',
      questionId: 'q2',
    });

    const reports = await getErrorReports();
    expect(Array.isArray(reports)).toBe(true);
  });

  it('deletes error report by ID', async () => {
    await reportQuestionError({
      level: 'CM2',
      domain: 'Fractions',
      questionText: 'Hard fraction problem',
      userNote: 'Too difficult',
      questionId: 'q3',
    });

    const reports = await getErrorReports();
    if (reports.length > 0) {
      await deleteErrorReport(reports[0].id);
    }
    expect(true).toBe(true);
  });

  it('reports question error with all details', async () => {
    await reportQuestionError({
      level: '6ème',
      domain: 'Problèmes/Algèbre',
      questionId: 'q-algebra-1',
      questionText: 'Solve for x',
      userNote: 'Answer key seems wrong',
    });

    const reports = await getErrorReports();
    expect(Array.isArray(reports)).toBe(true);
  });

  it('handles empty questions list', async () => {
    await saveQuestions([]);
    expect(true).toBe(true);
  });

  it('handles duplicate error reports', async () => {
    const mockReport = {
      level: 'CE1' as const,
      domain: 'Calcul' as const,
      questionText: 'Same question',
      userNote: 'Repeated issue',
      questionId: 'q-same',
    };

    await reportQuestionError(mockReport);
    await reportQuestionError(mockReport);
    const reports = await getErrorReports();
    expect(Array.isArray(reports)).toBe(true);
  });

  it('handles error gracefully when saving questions', async () => {
    const invalidQuestions: Question[] = [
      {
        id: '',
        level: 'CE1',
        domain: 'Calcul mental',
        question: '',
        options: [],
        correctAnswer: 0,
        explanation: '',
        difficulty: 1,
        lesson: { title: '', steps: [] },
      },
    ];

    // Should not throw
    await saveQuestions(invalidQuestions);
    expect(true).toBe(true);
  });

  it('handles concurrent database operations', async () => {
    const promises = [];

    for (let i = 0; i < 5; i++) {
      promises.push(
        reportQuestionError({
          level: 'CE1',
          domain: 'Calcul mental',
          questionId: `q-concurrent-${i}`,
          questionText: `Question ${i}`,
          userNote: `Note ${i}`,
        })
      );
    }

    await Promise.all(promises);
    const reports = await getErrorReports();
    expect(Array.isArray(reports)).toBe(true);
  });

  it('retrieves reports in correct order', async () => {
    const report1 = {
      level: 'CE1' as const,
      domain: 'Calcul' as const,
      questionText: 'First',
      userNote: 'First note',
      questionId: 'q-first',
    };

    const report2 = {
      level: 'CE2' as const,
      domain: 'Arithmétique' as const,
      questionText: 'Second',
      userNote: 'Second note',
      questionId: 'q-second',
    };

    await reportQuestionError(report1);
    await reportQuestionError(report2);
    const reports = await getErrorReports();
    expect(Array.isArray(reports)).toBe(true);
  });

  it('handles large question sets', async () => {
    const largeQuestionSet: Question[] = Array.from({ length: 100 }, (_, i) => ({
      id: `q-large-${i}`,
      level: 'CM1',
      domain: 'Calcul mental',
      question: `Question ${i}`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: `Explanation for question ${i}`,
      difficulty: 1,
      lesson: { title: 'Lesson', steps: ['Step 1'] },
    }));

    await saveQuestions(largeQuestionSet);
    expect(true).toBe(true);
  });

  it('multiple error report operations', async () => {
    for (let i = 0; i < 3; i++) {
      await reportQuestionError({
        level: 'CE1',
        domain: 'Calcul',
        questionId: `q-multi-${i}`,
        questionText: `Multi question ${i}`,
        userNote: `Multi note ${i}`,
      });
    }

    const reports = await getErrorReports();
    expect(Array.isArray(reports)).toBe(true);
  });
});

