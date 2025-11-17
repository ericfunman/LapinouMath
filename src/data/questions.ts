import { questionsCE1 } from './questionsCE1';
import { questionsCE1Additional } from './questionsCE1Additional';
import { allGeneratedQuestions } from './generatedQuestions';
import { Question } from '../types';

// Fusionner toutes les questions CE1
const allCE1Questions = [...questionsCE1, ...questionsCE1Additional];

// Combiner toutes les questions (CE1 + niveaux générés)
export const allQuestions: Question[] = [
  ...allCE1Questions,
  ...allGeneratedQuestions,
];

export function getQuestionsByLevel(level: string): Question[] {
  return allQuestions.filter(q => q.level === level);
}

export function getQuestionsByDomain(level: string, domain: string): Question[] {
  return allQuestions.filter(q => q.level === level && q.domain === domain);
}

export function getRandomQuestions(level: string, domain: string, count: number): Question[] {
  const questions = getQuestionsByDomain(level, domain);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
}
