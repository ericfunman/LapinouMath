import { questionsCE1 } from './questionsCE1';
import { questionsCE1Additional } from './questionsCE1Additional';
import { allGeneratedQuestions } from './generatedQuestions';
import { Question } from '../types';
import { loadQuestions, saveQuestions } from '../utils/database';

// Fusionner toutes les questions CE1
const allCE1Questions = [...questionsCE1, ...questionsCE1Additional];

// Combiner toutes les questions (CE1 + niveaux générés)
export const allQuestions: Question[] = [
  ...allCE1Questions,
  ...allGeneratedQuestions,
];

// Variable pour stocker les questions chargées depuis IndexedDB
let cachedQuestions: Question[] | null = null;
let isInitialized = false;

// Initialiser IndexedDB avec les questions du code
export async function initializeQuestions(): Promise<void> {
  if (isInitialized) return;
  
  try {
    const dbQuestions = await loadQuestions();
    
    if (dbQuestions.length === 0) {
      // Première fois : importer les questions du code vers IndexedDB
      console.log('📥 Import initial de', allQuestions.length, 'questions vers IndexedDB...');
      await saveQuestions(allQuestions);
      cachedQuestions = allQuestions;
      console.log('✅ Questions importées avec succès');
    } else {
      // Utiliser les questions de la base
      cachedQuestions = dbQuestions as Question[];
      console.log('✅', cachedQuestions.length, 'questions chargées depuis IndexedDB');
    }
    
    isInitialized = true;
  } catch (error) {
    console.warn('⚠️ IndexedDB non disponible, utilisation des questions du code', error);
    cachedQuestions = allQuestions;
    isInitialized = true;
  }
}

// Obtenir toutes les questions (avec fallback synchrone)
export function getAllQuestions(): Question[] {
  return cachedQuestions || allQuestions;
}

// Version async pour garantir le chargement depuis IndexedDB
export async function getAllQuestionsAsync(): Promise<Question[]> {
  await initializeQuestions();
  return cachedQuestions || allQuestions;
}

export function getQuestionsByLevel(level: string): Question[] {
  const questions = getAllQuestions();
  return questions.filter(q => q.level === level);
}

export function getQuestionsByDomain(level: string, domain: string): Question[] {
  const questions = getAllQuestions();
  return questions.filter(q => q.level === level && q.domain === domain);
}

export function getRandomQuestions(level: string, domain: string, count: number): Question[] {
  const questions = getQuestionsByDomain(level, domain);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
}
