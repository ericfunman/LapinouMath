/**
 * Excel Export/Import utilities for questions
 * Handles exporting all questions to Excel and importing new questions
 */

import { Question } from '../types';

/**
 * Export questions to Excel format (as CSV-like data)
 * Returns data suitable for xlsx library
 */
export function exportQuestionsToExcel(questions: Question[]) {
  // Prepare header row
  const headers = ['ID', 'Level', 'Domain', 'Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer (0-3)', 'Explanation', 'Difficulty'];
  
  // Convert questions to rows
  const rows = questions.map(q => [
    q.id,
    q.level,
    q.domain,
    q.question,
    q.options[0] || '',
    q.options[1] || '',
    q.options[2] || '',
    q.options[3] || '',
    q.correctAnswer.toString(),
    q.explanation,
    q.difficulty.toString(),
  ]);

  return { headers, rows };
}

/**
 * Parse imported Excel data and convert to Question objects
 * @param data Array of rows from Excel file
 * @returns Array of validated Question objects
 */
export function importQuestionsFromExcel(data: any[]): { questions: Question[], errors: string[] } {
  const questions: Question[] = [];
  const errors: string[] = [];

  if (data.length === 0) {
    errors.push('Fichier vide');
    return { questions, errors };
  }

  // Skip header row (row 0)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    try {
      // Validate required fields
      if (!row[0] || !row[1] || !row[2] || !row[3] || !row[4] || row.length < 10) {
        errors.push(`Ligne ${i + 1}: Données incomplètes`);
        continue;
      }

      const correctAnswerIndex = parseInt(row[8]);
      if (isNaN(correctAnswerIndex) || correctAnswerIndex < 0 || correctAnswerIndex > 3) {
        errors.push(`Ligne ${i + 1}: Index de réponse correcte invalide (doit être 0-3)`);
        continue;
      }

      const difficulty = parseInt(row[10]) || 2;
      if (difficulty < 1 || difficulty > 3) {
        errors.push(`Ligne ${i + 1}: Difficulté invalide (doit être 1, 2 ou 3)`);
        continue;
      }

      const options = [
        (row[4] || '').toString().trim(),
        (row[5] || '').toString().trim(),
        (row[6] || '').toString().trim(),
        (row[7] || '').toString().trim(),
      ];

      // Check that all options are non-empty
      if (options.some(opt => !opt)) {
        errors.push(`Ligne ${i + 1}: Une ou plusieurs options sont vides`);
        continue;
      }

      const question: Question = {
        id: (row[0] || `imported-${i}`).toString().trim(),
        level: (row[1] || '').toString().trim() as any,
        domain: (row[2] || '').toString().trim() as any,
        question: (row[3] || '').toString().trim(),
        options,
        correctAnswer: correctAnswerIndex,
        explanation: (row[9] || '').toString().trim(),
        difficulty: difficulty as 1 | 2 | 3,
      };

      questions.push(question);
    } catch (err) {
      errors.push(`Ligne ${i + 1}: Erreur de traitement - ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  }

  return { questions, errors };
}

/**
 * Detect duplicate questions
 * Returns the IDs of questions that already exist in the database
 */
export function findDuplicates(newQuestions: Question[], existingQuestions: Question[]): string[] {
  const duplicates: string[] = [];
  const existingIds = new Set(existingQuestions.map(q => q.id));

  for (const newQ of newQuestions) {
    if (existingIds.has(newQ.id)) {
      duplicates.push(newQ.id);
    }
  }

  return duplicates;
}

/**
 * Generate CSV string from questions (fallback for Excel export)
 */
export function generateQuestionsCSV(questions: Question[]): string {
  const { headers, rows } = exportQuestionsToExcel(questions);
  
  const csvHeaders = headers.map(h => `"${h}"`).join(',');
  const csvRows = rows.map(row => 
    row.map(cell => {
      const str = String(cell);
      // Escape quotes and wrap in quotes if contains comma or quotes
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(',')
  );

  return [csvHeaders, ...csvRows].join('\n');
}
