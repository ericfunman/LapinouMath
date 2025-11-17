import { allQuestions } from '../data/questions';
import { GRADE_LEVELS, MATH_DOMAINS } from '../data/constants';

export function getQuestionStats() {
  const stats = {
    total: allQuestions.length,
    byLevel: {} as Record<string, number>,
    byDomain: {} as Record<string, number>,
    byLevelAndDomain: {} as Record<string, Record<string, number>>
  };

  // Initialiser les compteurs
  for (const level of GRADE_LEVELS) {
    stats.byLevel[level] = 0;
    stats.byLevelAndDomain[level] = {};
    for (const domain of MATH_DOMAINS) {
      stats.byLevelAndDomain[level][domain] = 0;
    }
  }

  for (const domain of MATH_DOMAINS) {
    stats.byDomain[domain] = 0;
  }

  // Compter les questions
  for (const question of allQuestions) {
    stats.byLevel[question.level] = (stats.byLevel[question.level] || 0) + 1;
    stats.byDomain[question.domain] = (stats.byDomain[question.domain] || 0) + 1;
    
    if (!stats.byLevelAndDomain[question.level]) {
      stats.byLevelAndDomain[question.level] = {};
    }
    stats.byLevelAndDomain[question.level][question.domain] = 
      (stats.byLevelAndDomain[question.level][question.domain] || 0) + 1;
  }

  return stats;
}

// Afficher les stats au démarrage (console)
if (import.meta.env.DEV) {
  const stats = getQuestionStats();
  console.log('📊 Statistiques des questions LapinouMath:');
  console.log(`Total: ${stats.total} questions`);
  console.log('\nPar niveau:');
  for (const [level, count] of Object.entries(stats.byLevel)) {
    console.log(`  ${level}: ${count} questions`);
  }
  console.log('\nPar domaine:');
  for (const [domain, count] of Object.entries(stats.byDomain)) {
    console.log(`  ${domain}: ${count} questions`);
  }
}
