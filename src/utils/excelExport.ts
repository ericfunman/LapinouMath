/**
 * Excel Export/Import utilities for questions
 * Handles exporting all questions to Excel and importing new questions
 */

import { Question, InteractiveQuestion, type GradeLevel, type MathDomain } from '../types';

/**
 * Safely convert unknown value to string with type checking
 */
function safeString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return String(value);
  return fallback;
}

/**
 * Export questions to Excel format (as CSV-like data)
 * Returns data suitable for xlsx library
 */
export function exportQuestionsToExcel(questions: (Question | InteractiveQuestion)[]) {
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
export function importQuestionsFromExcel(data: unknown[][]): { questions: Question[], errors: string[] } {
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

      const correctAnswerIndex = Number.parseInt(String(row[8]), 10);
      if (Number.isNaN(correctAnswerIndex) || correctAnswerIndex < 0 || correctAnswerIndex > 3) {
        errors.push(`Ligne ${i + 1}: Index de réponse correcte invalide (doit être 0-3)`);
        continue;
      }

      const difficulty = Number.parseInt(String(row[10]), 10) || 2;
      if (difficulty < 1 || difficulty > 3) {
        errors.push(`Ligne ${i + 1}: Difficulté invalide (doit être 1, 2 ou 3)`);
        continue;
      }

      const options = [
        safeString(row[4]).trim(),
        safeString(row[5]).trim(),
        safeString(row[6]).trim(),
        safeString(row[7]).trim(),
      ];

      // Check that all options are non-empty
      if (options.some(opt => !opt)) {
        errors.push(`Ligne ${i + 1}: Une ou plusieurs options sont vides`);
        continue;
      }

      const question: Question = {
        id: safeString(row[0], `imported-${i}`).trim(),
        level: safeString(row[1]).trim() as GradeLevel,
        domain: safeString(row[2]).trim() as MathDomain,
        question: safeString(row[3]).trim(),
        options,
        correctAnswer: correctAnswerIndex,
        explanation: safeString(row[9]).trim(),
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
export function generateQuestionsCSV(questions: (Question | InteractiveQuestion)[]): string {
  const { headers, rows } = exportQuestionsToExcel(questions);
  
  const csvHeaders = headers.map(h => `"${h}"`).join(',');
  const csvRows = rows.map(row => 
    row.map(cell => {
      const str = String(cell);
      // Escape quotes and wrap in quotes if contains comma or quotes
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replaceAll('"', '""')}"`;
      }
      return str;
    }).join(',')
  );

  return [csvHeaders, ...csvRows].join('\n');
}
