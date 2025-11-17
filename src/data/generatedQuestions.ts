import { Question, GradeLevel, MathDomain } from '../types';

// Générateur de questions pour tous les niveaux (CE2, CM1, CM2, 6ème, 5ème, 4ème)
const generateQuestions = (level: GradeLevel): Question[] => {
  const domains: MathDomain[] = [
    'Calcul mental',
    'Arithmétique',
    'Géométrie',
    'Fractions/Décimaux',
    'Mesures',
    'Problèmes/Algèbre'
  ];

  const questions: Question[] = [];
  const levelPrefix = level.toLowerCase().replace('è', 'e').replace('ème', '');

  domains.forEach((domain, domainIndex) => {
    const domainCode = ['cm', 'ar', 'geo', 'fd', 'mes', 'pa'][domainIndex];
    
    for (let i = 1; i <= 50; i++) {
      questions.push({
        id: `${levelPrefix}-${domainCode}-${i}`,
        level,
        domain,
        question: `Question ${domain} niveau ${level} - ${i}`,
        options: ['Réponse A', 'Réponse B', 'Réponse C', 'Réponse D'],
        correctAnswer: Math.floor(Math.random() * 4),
        explanation: `Explication de la question ${i} pour ${domain} niveau ${level}`,
        difficulty: ((i % 3) + 1) as 1 | 2 | 3
      });
    }
  });

  return questions;
};

// Générer les questions pour chaque niveau
export const questionsCE2 = generateQuestions('CE2');
export const questionsCM1 = generateQuestions('CM1');
export const questionsCM2 = generateQuestions('CM2');
export const questions6eme = generateQuestions('6ème');
export const questions5eme = generateQuestions('5ème');
export const questions4eme = generateQuestions('4ème');

// Exporter toutes les questions
export const allGeneratedQuestions = [
  ...questionsCE2,
  ...questionsCM1,
  ...questionsCM2,
  ...questions6eme,
  ...questions5eme,
  ...questions4eme
];
