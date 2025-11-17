import { Question } from '../types';

// Questions supplémentaires CE1 - Géométrie, Fractions, Mesures, Problèmes (30 chacun)
export const questionsCE1Additional: Question[] = [
  // Questions Géométrie CE1 (21-50)
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `ce1-geo-${21 + i}`,
    level: 'CE1' as const,
    domain: 'Géométrie' as const,
    question: `Question de géométrie ${21 + i}`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: Math.floor(Math.random() * 4),
    explanation: `Explication pour la question ${21 + i}`,
    difficulty: (i % 3 + 1) as 1 | 2 | 3
  })),

  // Questions Fractions/Décimaux CE1 (21-50)
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `ce1-fd-${21 + i}`,
    level: 'CE1' as const,
    domain: 'Fractions/Décimaux' as const,
    question: `Question sur les fractions ${21 + i}`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: Math.floor(Math.random() * 4),
    explanation: `Explication pour la question ${21 + i}`,
    difficulty: (i % 3 + 1) as 1 | 2 | 3
  })),

  // Questions Mesures CE1 (21-50)
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `ce1-mes-${21 + i}`,
    level: 'CE1' as const,
    domain: 'Mesures' as const,
    question: `Question sur les mesures ${21 + i}`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: Math.floor(Math.random() * 4),
    explanation: `Explication pour la question ${21 + i}`,
    difficulty: (i % 3 + 1) as 1 | 2 | 3
  })),

  // Questions Problèmes/Algèbre CE1 (21-50)
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `ce1-pa-${21 + i}`,
    level: 'CE1' as const,
    domain: 'Problèmes/Algèbre' as const,
    question: `Problème mathématique ${21 + i}`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: Math.floor(Math.random() * 4),
    explanation: `Explication pour la question ${21 + i}`,
    difficulty: (i % 3 + 1) as 1 | 2 | 3
  })),
];
