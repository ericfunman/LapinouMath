import { allGeneratedQuestions } from './generatedQuestions';
import {
  ce1MentalMath, ce1Arithmetic, ce1Numbers, ce1Comparison, ce1Measures,
  ce2MentalMath, ce2Arithmetic, ce2Fractions, ce2Measurements, ce2Problems,
  cm1MentalMath, cm1Arithmetic, cm1Fractions, cm1Measurements, cm1Problems,
  cm2MentalMath, cm2Arithmetic, cm2Fractions, cm2Measurements, cm2Problems,
  sixiemeMentalMath, sixiemeArithmetic, sixiemeFractions, sixiemeGeometry, sixiemeProblems,
  cinquiemeMentalMath, cinquiemeArithmetic, cinquiemeProportions, cinquiemeGeometry3D, cinquiemeProblems,
  quatriemeMentalMath, quatriemeTrigonometry, quatriemeProblems,
} from './questionsByLevel';
import { Question } from '../types';
import { saveQuestions } from '../utils/database';

// Combiner toutes les questions niveaux CE1-4ème par domaine
const buildLevelQuestions = (): Record<string, Question[]> => {
  const levelQuestions: Record<string, Question[]> = {};
  let idCounter = 10000; // ID unique pour les nouvelles questions
  
  const mapQuestionFormat = (q: any, level: string, domain: string): Question => {
    return {
      id: `level-${level}-${domain}-${idCounter++}`,
      level: level as any,
      domain: domain as any,
      question: q.q,
      options: q.opts,
      correctAnswer: q.ans,
      explanation: q.exp,
      difficulty: 2, // Par défaut niveau 2 (moyen)
    };
  };
  
  // Map domaines pour CE1 (traduction anglais → français)
  const mapCE1Domain = (domain: string): string => {
    const domainMap: Record<string, string> = {
      'mentalMath': 'Calcul mental',
      'arithmetic': 'Arithmétique',
      'numbers': 'Arithmétique',
      'comparison': 'Arithmétique',
      'measurements': 'Mesures',
      'fractions': 'Fractions/Décimaux',
      'problems': 'Problèmes/Algèbre',
    };
    return domainMap[domain] || domain;
  };

  
  // CE1
  const ce1Questions = [
    ...ce1MentalMath.map(q => mapQuestionFormat(q, 'CE1', mapCE1Domain('mentalMath'))),
    ...ce1Arithmetic.map(q => mapQuestionFormat(q, 'CE1', mapCE1Domain('arithmetic'))),
    ...ce1Numbers.map(q => mapQuestionFormat(q, 'CE1', mapCE1Domain('numbers'))),
    ...ce1Comparison.map(q => mapQuestionFormat(q, 'CE1', mapCE1Domain('comparison'))),
    ...ce1Measures.map(q => mapQuestionFormat(q, 'CE1', mapCE1Domain('measurements'))),
  ];
  levelQuestions['CE1'] = ce1Questions;
  
  // CE2
  const ce2Questions = [
    ...ce2MentalMath.map(q => mapQuestionFormat(q, 'CE2', 'mentalMath')),
    ...ce2Arithmetic.map(q => mapQuestionFormat(q, 'CE2', 'arithmetic')),
    ...ce2Fractions.map(q => mapQuestionFormat(q, 'CE2', 'fractions')),
    ...ce2Measurements.map(q => mapQuestionFormat(q, 'CE2', 'measurements')),
    ...ce2Problems.map(q => mapQuestionFormat(q, 'CE2', 'problems')),
  ];
  levelQuestions['CE2'] = ce2Questions;
  
  // CM1
  const cm1Questions = [
    ...cm1MentalMath.map(q => mapQuestionFormat(q, 'CM1', 'mentalMath')),
    ...cm1Arithmetic.map(q => mapQuestionFormat(q, 'CM1', 'arithmetic')),
    ...cm1Fractions.map(q => mapQuestionFormat(q, 'CM1', 'fractions')),
    ...cm1Measurements.map(q => mapQuestionFormat(q, 'CM1', 'measurements')),
    ...cm1Problems.map(q => mapQuestionFormat(q, 'CM1', 'problems')),
  ];
  levelQuestions['CM1'] = cm1Questions;
  
  // CM2
  const cm2Questions = [
    ...cm2MentalMath.map(q => mapQuestionFormat(q, 'CM2', 'mentalMath')),
    ...cm2Arithmetic.map(q => mapQuestionFormat(q, 'CM2', 'arithmetic')),
    ...cm2Fractions.map(q => mapQuestionFormat(q, 'CM2', 'fractions')),
    ...cm2Measurements.map(q => mapQuestionFormat(q, 'CM2', 'measurements')),
    ...cm2Problems.map(q => mapQuestionFormat(q, 'CM2', 'problems')),
  ];
  levelQuestions['CM2'] = cm2Questions;
  
  // 6ème
  const sixiemeQuestions = [
    ...sixiemeMentalMath.map(q => mapQuestionFormat(q, '6ème', 'mentalMath')),
    ...sixiemeArithmetic.map(q => mapQuestionFormat(q, '6ème', 'arithmetic')),
    ...sixiemeFractions.map(q => mapQuestionFormat(q, '6ème', 'fractions')),
    ...sixiemeGeometry.map(q => mapQuestionFormat(q, '6ème', 'geometry')),
    ...sixiemeProblems.map(q => mapQuestionFormat(q, '6ème', 'problems')),
  ];
  levelQuestions['6ème'] = sixiemeQuestions;
  
  // 5ème
  const cinquiemeQuestions = [
    ...cinquiemeMentalMath.map(q => mapQuestionFormat(q, '5ème', 'algebra')),
    ...cinquiemeArithmetic.map(q => mapQuestionFormat(q, '5ème', 'arithmetic')),
    ...cinquiemeProportions.map(q => mapQuestionFormat(q, '5ème', 'proportions')),
    ...cinquiemeGeometry3D.map(q => mapQuestionFormat(q, '5ème', 'geometry3D')),
    ...cinquiemeProblems.map(q => mapQuestionFormat(q, '5ème', 'problems')),
  ];
  levelQuestions['5ème'] = cinquiemeQuestions;
  
  // 4ème
  const quatriemeQuestions = [
    ...quatriemeMentalMath.map(q => mapQuestionFormat(q, '4ème', 'algebra')),
    ...quatriemeTrigonometry.map(q => mapQuestionFormat(q, '4ème', 'trigonometry')),
    ...quatriemeProblems.map(q => mapQuestionFormat(q, '4ème', 'problems')),
  ];
  levelQuestions['4ème'] = quatriemeQuestions;
  
  return levelQuestions;
};

const levelQuestionsMap = buildLevelQuestions();
const allLevelQuestions = Object.values(levelQuestionsMap).flat();

// Combiner toutes les questions (CE1-4ème + niveaux générés, sans l'ancien CE1 qui est maintenant dans levelQuestionsMap)
export const allQuestions: Question[] = [
  ...allLevelQuestions,
  ...allGeneratedQuestions,
];

// Variable pour stocker les questions chargées depuis IndexedDB
let cachedQuestions: Question[] | null = null;
let isInitialized = false;

// Initialiser IndexedDB avec les questions du code
export async function initializeQuestions(): Promise<void> {
  if (isInitialized) return;
  
  try {
    // Toujours réimporter les questions du code pour forcer un refresh
    console.log('📥 Import de', allQuestions.length, 'questions vers IndexedDB...');
    await saveQuestions(allQuestions);
    cachedQuestions = allQuestions;
    console.log('✅ Questions importées avec succès');
    
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
