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
import {
  ce2HardMentalMath, ce2HardArithmetic, ce2HardProblems,
  cm1HardMentalMath, cm1HardArithmetic, cm1HardFractions, cm1HardProblems,
  cm2HardMentalMath, cm2HardArithmetic, cm2HardProblems,
  sixiemeHardMentalMath, sixiemeHardArithmetic, sixiemeHardProblems,
  cinquiemeHardMentalMath, cinquiemeHardArithmetic, cinquiemeHardProblems,
  quatriemeHardMentalMath, quatriemeHardArithmetic, quatriemeHardProblems,
} from './questionsHard';
import { allKangourouQuestions } from './kangourouQuestions';
import { Question } from '../types';
import { saveQuestions } from '../utils/database';

// Combiner toutes les questions niveaux CE1-4ème par domaine
const buildLevelQuestions = (): Record<string, Question[]> => {
  const levelQuestions: Record<string, Question[]> = {};
  let idCounter = 10000; // ID unique pour les nouvelles questions
  
  const mapQuestionFormat = (q: any, level: string, domain: string, difficulty: 1 | 2 | 3 = 2): Question => {
    return {
      id: `level-${level}-${domain}-${idCounter++}`,
      level: level as any,
      domain: domain as any,
      question: q.q,
      options: q.opts,
      correctAnswer: q.ans,
      explanation: q.exp,
      difficulty,
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
    ...allKangourouQuestions.filter(q => q.level === 'CE1').map(q => mapQuestionFormat(q, 'CE1', 'Kangourou')),
  ];
  levelQuestions['CE1'] = ce1Questions;
  
  // CE2 + CE2 HARD
  const ce2Questions = [
    ...ce2MentalMath.map(q => mapQuestionFormat(q, 'CE2', 'Calcul mental', 1)),
    ...ce2Arithmetic.map(q => mapQuestionFormat(q, 'CE2', 'Arithmétique', 1)),
    ...ce2Fractions.map(q => mapQuestionFormat(q, 'CE2', 'Fractions/Décimaux', 1)),
    ...ce2Measurements.map(q => mapQuestionFormat(q, 'CE2', 'Mesures', 1)),
    ...ce2Problems.map(q => mapQuestionFormat(q, 'CE2', 'Problèmes/Algèbre', 1)),
    ...ce2HardMentalMath.map(q => mapQuestionFormat(q, 'CE2', 'Calcul mental', 3)),
    ...ce2HardArithmetic.map(q => mapQuestionFormat(q, 'CE2', 'Arithmétique', 3)),
    ...ce2HardProblems.map(q => mapQuestionFormat(q, 'CE2', 'Problèmes/Algèbre', 3)),
    ...allKangourouQuestions.filter(q => q.level === 'CE2').map(q => mapQuestionFormat(q, 'CE2', 'Kangourou')),
  ];
  levelQuestions['CE2'] = ce2Questions;
  
  // CM1 + CM1 HARD
  const cm1Questions = [
    ...cm1MentalMath.map(q => mapQuestionFormat(q, 'CM1', 'Calcul mental', 1)),
    ...cm1Arithmetic.map(q => mapQuestionFormat(q, 'CM1', 'Arithmétique', 1)),
    ...cm1Fractions.map(q => mapQuestionFormat(q, 'CM1', 'Fractions/Décimaux', 1)),
    ...cm1Measurements.map(q => mapQuestionFormat(q, 'CM1', 'Mesures', 1)),
    ...cm1Problems.map(q => mapQuestionFormat(q, 'CM1', 'Problèmes/Algèbre', 1)),
    ...cm1HardMentalMath.map(q => mapQuestionFormat(q, 'CM1', 'Calcul mental', 3)),
    ...cm1HardArithmetic.map(q => mapQuestionFormat(q, 'CM1', 'Arithmétique', 3)),
    ...cm1HardFractions.map(q => mapQuestionFormat(q, 'CM1', 'Fractions/Décimaux', 3)),
    ...cm1HardProblems.map(q => mapQuestionFormat(q, 'CM1', 'Problèmes/Algèbre', 3)),
    ...allKangourouQuestions.filter(q => q.level === 'CM1').map(q => mapQuestionFormat(q, 'CM1', 'Kangourou')),
  ];
  levelQuestions['CM1'] = cm1Questions;
  
  // CM2 + CM2 HARD
  const cm2Questions = [
    ...cm2MentalMath.map(q => mapQuestionFormat(q, 'CM2', 'Calcul mental', 1)),
    ...cm2Arithmetic.map(q => mapQuestionFormat(q, 'CM2', 'Arithmétique', 1)),
    ...cm2Fractions.map(q => mapQuestionFormat(q, 'CM2', 'Fractions/Décimaux', 1)),
    ...cm2Measurements.map(q => mapQuestionFormat(q, 'CM2', 'Mesures', 1)),
    ...cm2Problems.map(q => mapQuestionFormat(q, 'CM2', 'Problèmes/Algèbre', 1)),
    ...cm2HardMentalMath.map(q => mapQuestionFormat(q, 'CM2', 'Calcul mental', 3)),
    ...cm2HardArithmetic.map(q => mapQuestionFormat(q, 'CM2', 'Arithmétique', 3)),
    ...cm2HardProblems.map(q => mapQuestionFormat(q, 'CM2', 'Problèmes/Algèbre', 3)),
    ...allKangourouQuestions.filter(q => q.level === 'CM2').map(q => mapQuestionFormat(q, 'CM2', 'Kangourou')),
  ];
  levelQuestions['CM2'] = cm2Questions;
  
  // 6ème + 6ème HARD
  const sixiemeQuestions = [
    ...sixiemeMentalMath.map(q => mapQuestionFormat(q, '6ème', 'Calcul mental', 1)),
    ...sixiemeArithmetic.map(q => mapQuestionFormat(q, '6ème', 'Arithmétique', 1)),
    ...sixiemeFractions.map(q => mapQuestionFormat(q, '6ème', 'Fractions/Décimaux', 1)),
    ...sixiemeGeometry.map(q => mapQuestionFormat(q, '6ème', 'Géométrie', 1)),
    ...sixiemeProblems.map(q => mapQuestionFormat(q, '6ème', 'Problèmes/Algèbre', 1)),
    ...sixiemeHardMentalMath.map(q => mapQuestionFormat(q, '6ème', 'Calcul mental', 3)),
    ...sixiemeHardArithmetic.map(q => mapQuestionFormat(q, '6ème', 'Arithmétique', 3)),
    ...sixiemeHardProblems.map(q => mapQuestionFormat(q, '6ème', 'Problèmes/Algèbre', 3)),
    ...allKangourouQuestions.filter(q => q.level === '6ème').map(q => mapQuestionFormat(q, '6ème', 'Kangourou')),
  ];
  levelQuestions['6ème'] = sixiemeQuestions;
  
  // 5ème + 5ème HARD
  const cinquiemeQuestions = [
    ...cinquiemeMentalMath.map(q => mapQuestionFormat(q, '5ème', 'Calcul mental', 1)),
    ...cinquiemeArithmetic.map(q => mapQuestionFormat(q, '5ème', 'Arithmétique', 1)),
    ...cinquiemeProportions.map(q => mapQuestionFormat(q, '5ème', 'Proportions', 1)),
    ...cinquiemeGeometry3D.map(q => mapQuestionFormat(q, '5ème', 'Géométrie', 1)),
    ...cinquiemeProblems.map(q => mapQuestionFormat(q, '5ème', 'Problèmes/Algèbre', 1)),
    ...cinquiemeHardMentalMath.map(q => mapQuestionFormat(q, '5ème', 'Calcul mental', 3)),
    ...cinquiemeHardArithmetic.map(q => mapQuestionFormat(q, '5ème', 'Arithmétique', 3)),
    ...cinquiemeHardProblems.map(q => mapQuestionFormat(q, '5ème', 'Problèmes/Algèbre', 3)),
    ...allKangourouQuestions.filter(q => q.level === '5ème').map(q => mapQuestionFormat(q, '5ème', 'Kangourou')),
  ];
  levelQuestions['5ème'] = cinquiemeQuestions;
  
  // 4ème + 4ème HARD
  const quatriemeQuestions = [
    ...quatriemeMentalMath.map(q => mapQuestionFormat(q, '4ème', 'Calcul mental', 1)),
    ...quatriemeTrigonometry.map(q => mapQuestionFormat(q, '4ème', 'Géométrie', 1)),
    ...quatriemeProblems.map(q => mapQuestionFormat(q, '4ème', 'Problèmes/Algèbre', 1)),
    ...quatriemeHardMentalMath.map(q => mapQuestionFormat(q, '4ème', 'Calcul mental', 3)),
    ...quatriemeHardArithmetic.map(q => mapQuestionFormat(q, '4ème', 'Arithmétique', 3)),
    ...quatriemeHardProblems.map(q => mapQuestionFormat(q, '4ème', 'Problèmes/Algèbre', 3)),
    ...allKangourouQuestions.filter(q => q.level === '4ème').map(q => mapQuestionFormat(q, '4ème', 'Kangourou')),
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

export function getAvailableDomains(level: string): string[] {
  const allQuestions = getAllQuestions();
  const levelQuestions = allQuestions.filter(q => q.level === level);
  const uniqueDomains = [...new Set(levelQuestions.map(q => q.domain))];
  
  // Ordre personnalisé des domaines
  const domainOrder = ['Calcul mental', 'Arithmétique', 'Fractions/Décimaux', 'Mesures', 'Géométrie', 'Problèmes/Algèbre', 'Proportions', 'Kangourou'];
  
  // Ensure Kangourou is always included (bonus domain)
  if (!uniqueDomains.includes('Kangourou')) {
    uniqueDomains.push('Kangourou');
  }
  
  return uniqueDomains.sort((a, b) => domainOrder.indexOf(a) - domainOrder.indexOf(b));
}
