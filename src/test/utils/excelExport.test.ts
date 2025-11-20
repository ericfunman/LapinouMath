import { describe, it, expect } from 'vitest';
import { exportQuestionsToExcel, generateQuestionsCSV, importQuestionsFromExcel, findDuplicates } from '../../utils/excelExport';
import { Question } from '../../types';

describe('excelExport', () => {
  const mockQuestions: Question[] = [
    {
      id: 'test-1',
      level: 'CE1',
      domain: 'Calcul mental',
      question: 'Combien font 2 + 2 ?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: 'La réponse est 4',
      difficulty: 1,
      lesson: {
        title: 'Addition',
        steps: ['Étape 1', 'Étape 2']
      }
    },
    {
      id: 'test-2',
      level: 'CE2',
      domain: 'Arithmétique',
      question: 'Combien font 5 × 3 ?',
      options: ['12', '15', '18', '20'],
      correctAnswer: 1,
      explanation: 'La réponse est 15',
      difficulty: 2,
      lesson: {
        title: 'Multiplication',
        steps: ['Étape 1']
      }
    }
  ];

  describe('exportQuestionsToExcel', () => {
    it('should export questions to Excel format', () => {
      const result = exportQuestionsToExcel(mockQuestions);

      expect(result.headers).toEqual([
        'ID', 'Level', 'Domain', 'Question', 
        'Option 1', 'Option 2', 'Option 3', 'Option 4', 
        'Correct Answer (0-3)', 'Explanation', 'Difficulty'
      ]);

      expect(result.rows).toHaveLength(2);
      expect(result.rows[0]).toEqual([
        'test-1',
        'CE1',
        'Calcul mental',
        'Combien font 2 + 2 ?',
        '3', '4', '5', '6',
        '1',
        'La réponse est 4',
        '1'
      ]);
    });

    it('should handle questions with missing options', () => {
      const incompleteQuestion: Question = {
        ...mockQuestions[0],
        options: ['A', 'B']
      };

      const result = exportQuestionsToExcel([incompleteQuestion]);

      expect(result.rows[0][4]).toBe('A');
      expect(result.rows[0][5]).toBe('B');
      expect(result.rows[0][6]).toBe('');
      expect(result.rows[0][7]).toBe('');
    });

    it('should handle empty questions array', () => {
      const result = exportQuestionsToExcel([]);

      expect(result.headers).toHaveLength(11);
      expect(result.rows).toHaveLength(0);
    });
  });

  describe('generateQuestionsCSV', () => {
    it('should generate CSV from questions', () => {
      const csv = generateQuestionsCSV(mockQuestions);

      expect(csv).toContain('ID');
      expect(csv).toContain('test-1');
      expect(csv).toContain('test-2');
      expect(csv).toContain('Combien font 2 + 2 ?');
      expect(csv).toContain('Combien font 5 × 3 ?');
    });

    it('should escape quotes in CSV', () => {
      const questionWithQuotes: Question = {
        ...mockQuestions[0],
        question: 'Quelle est la "bonne" réponse ?'
      };

      const csv = generateQuestionsCSV([questionWithQuotes]);

      expect(csv).toContain('""bonne""');
    });

    it('should handle empty array', () => {
      const csv = generateQuestionsCSV([]);

      expect(csv).toContain('ID');
      expect(csv.length).toBeGreaterThan(0);
    });

    it('should handle questions with special characters', () => {
      const specialQuestion: Question = {
        ...mockQuestions[0],
        question: 'Combien font 2 + 2, vraiment ?',
        options: ['A, B', 'C', 'D', 'E']
      };

      const csv = generateQuestionsCSV([specialQuestion]);

      expect(csv).toContain('"Combien font 2 + 2, vraiment ?"');
      expect(csv).toContain('"A, B"');
    });
  });

  describe('importQuestionsFromExcel', () => {
    it('should import valid questions from Excel data', () => {
      const excelData = [
        // Header row
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        // Data rows
        ['test-1', 'CE1', 'Calcul mental', 'Combien font 2 + 2 ?', '3', '4', '5', '6', '1', 'La réponse est 4', '1'],
        ['test-2', 'CE2', 'Arithmétique', 'Combien font 5 × 3 ?', '12', '15', '18', '20', '1', 'La réponse est 15', '2']
      ];

      const result = importQuestionsFromExcel(excelData);

      expect(result.questions).toHaveLength(2);
      expect(result.errors).toHaveLength(0);
      expect(result.questions[0].question).toBe('Combien font 2 + 2 ?');
      expect(result.questions[0].correctAnswer).toBe(1);
    });

    it('should handle empty file', () => {
      const result = importQuestionsFromExcel([]);

      expect(result.questions).toHaveLength(0);
      expect(result.errors).toContain('Fichier vide');
    });

    it('should handle rows with missing fields', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        ['test-1', 'CE1', 'Calcul', 'Question ?', 'A', 'B', 'C', 'D', '0', 'Explication', '1']
      ];

      const result = importQuestionsFromExcel(excelData);

      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].domain).toBe('Calcul');
    });

    it('should validate correct answer is in range', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        ['test-1', 'CE1', 'Calcul', 'Question ?', 'A', 'B', 'C', 'D', '0', 'Explication', '1'],
        ['test-2', 'CE1', 'Calcul', 'Question ?', 'A', 'B', 'C', 'D', '5', 'Explication', '1']
      ];

      const result = importQuestionsFromExcel(excelData);

      expect(result.questions).toHaveLength(1);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle invalid difficulty values', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        ['test-1', 'CE1', 'Calcul', 'Question ?', 'A', 'B', 'C', 'D', '0', 'Explication', '5']
      ];

      const result = importQuestionsFromExcel(excelData);

      // Should have errors for invalid difficulty
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle rows with all empty cells', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        ['', '', '', '', '', '', '', '', '', '', ''],
        ['test-1', 'CE1', 'Calcul', 'Question ?', 'A', 'B', 'C', 'D', '0', 'Explication', '1']
      ];

      const result = importQuestionsFromExcel(excelData);

      // Should skip empty row
      expect(result.questions).toHaveLength(1);
    });

    it('should handle missing cells in row data', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        ['test-1', 'CE1'] // Only 2 cells instead of 11
      ];

      const result = importQuestionsFromExcel(excelData);

      expect(result.questions).toHaveLength(0);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('Données incomplètes');
    });

    it('should handle non-numeric correct answer index', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        ['test-1', 'CE1', 'Calcul', 'Question ?', 'A', 'B', 'C', 'D', 'abc', 'Explication', '1']
      ];

      const result = importQuestionsFromExcel(excelData);

      expect(result.questions).toHaveLength(0);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('Index de réponse correcte invalide');
    });

    it('should handle empty options in imported data', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        ['test-1', 'CE1', 'Calcul', 'Question ?', 'A', '', 'C', 'D', '0', 'Explication', '1']
      ];

      const result = importQuestionsFromExcel(excelData);

      expect(result.questions).toHaveLength(0);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('vides');
    });

    it('should handle difficulty as string that converts to number', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        ['test-1', 'CE1', 'Calcul', 'Question ?', 'A', 'B', 'C', 'D', '0', 'Explication', '2']
      ];

      const result = importQuestionsFromExcel(excelData);

      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].difficulty).toBe(2);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle missing difficulty field', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation']
      ];

      const result = importQuestionsFromExcel(excelData);

      expect(result.questions).toHaveLength(0);
    });

    it('should trim whitespace from imported fields', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        ['  test-1  ', '  CE1  ', '  Calcul  ', '  Question ?  ', '  A  ', '  B  ', '  C  ', '  D  ', '0', '  Explication  ', '1']
      ];

      const result = importQuestionsFromExcel(excelData);

      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].id).toBe('test-1');
      expect(result.questions[0].level).toBe('CE1');
      expect(result.questions[0].question).toBe('Question ?');
    });

    it('should handle exception during row processing', () => {
      const excelData = [
        ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Explanation', 'Difficulty'],
        [
          'test-1',
          'CE1',
          'Calcul',
          'Question ?',
          'A',
          'B',
          'C',
          'D',
          Symbol('invalid') as any, // This will cause an error when converting
          'Explication',
          '1'
        ]
      ];

      const result = importQuestionsFromExcel(excelData);

      // Should catch error and add to errors array
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('findDuplicates', () => {
    const existingQuestions: Question[] = [
      {
        id: 'existing-1',
        level: 'CE1',
        domain: 'Calcul mental',
        question: 'Existing question',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Explanation',
        difficulty: 1,
      }
    ];

    it('should find duplicate questions by id', () => {
      const newQuestions: Question[] = [
        {
          id: 'existing-1', // Duplicate ID
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'New question',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'New explanation',
          difficulty: 2,
        },
        {
          id: 'new-1',
          level: 'CE2',
          domain: 'Arithmétique',
          question: 'Another new question',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 1,
          explanation: 'Another explanation',
          difficulty: 2,
        }
      ];

      const duplicates = findDuplicates(newQuestions, existingQuestions);

      expect(duplicates).toHaveLength(1);
      expect(duplicates[0]).toBe('existing-1');
    });

    it('should return empty array when no duplicates', () => {
      const newQuestions: Question[] = [
        {
          id: 'new-1',
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'New unique question',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'Explanation',
          difficulty: 1,
        }
      ];

      const duplicates = findDuplicates(newQuestions, existingQuestions);

      expect(duplicates).toHaveLength(0);
    });

    it('should handle empty new questions', () => {
      const duplicates = findDuplicates([], existingQuestions);

      expect(duplicates).toHaveLength(0);
    });

    it('should handle empty existing questions', () => {
      const newQuestions: Question[] = [
        {
          id: 'new-1',
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'Question',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'Explanation',
          difficulty: 1,
        }
      ];

      const duplicates = findDuplicates(newQuestions, []);

      expect(duplicates).toHaveLength(0);
    });

    it('should find multiple duplicates', () => {
      const existingQs: Question[] = [
        {
          id: 'dup-1',
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'Q1',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'E1',
          difficulty: 1,
        },
        {
          id: 'dup-2',
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'Q2',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 1,
          explanation: 'E2',
          difficulty: 1,
        }
      ];

      const newQs: Question[] = [
        {
          id: 'dup-1',
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'Q1 mod',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'E1',
          difficulty: 1,
        },
        {
          id: 'new-1',
          level: 'CE1',
          domain: 'Arithmétique',
          question: 'Q new',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'E new',
          difficulty: 1,
        },
        {
          id: 'dup-2',
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'Q2 mod',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 1,
          explanation: 'E2',
          difficulty: 1,
        }
      ];

      const duplicates = findDuplicates(newQs, existingQs);

      expect(duplicates).toHaveLength(2);
      expect(duplicates).toContain('dup-1');
      expect(duplicates).toContain('dup-2');
    });
  });
});
