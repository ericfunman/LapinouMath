// Script pour trouver les questions sans énoncé
import { allQuestions } from './src/data/questions.ts';

console.log('Analyse des 2100 questions...\n');

const emptyQuestions = allQuestions.filter(q => 
  !q.question || 
  q.question.trim() === '' || 
  (q.question.includes('Question') && q.question.includes('niveau'))
);

console.log(`✓ Total questions: ${allQuestions.length}`);
console.log(`✗ Questions sans énoncé: ${emptyQuestions.length}\n`);

if (emptyQuestions.length > 0) {
  console.log('QUESTIONS SANS ÉNONCÉ:');
  console.log('='.repeat(80));
  
  emptyQuestions.forEach((q, index) => {
    console.log(`\n[${index + 1}] ID: ${q.id}`);
    console.log(`    Niveau: ${q.level} | Domaine: ${q.domain}`);
    console.log(`    Énoncé: "${q.question}"`);
    console.log(`    Réponses: ${q.options.join(' | ')}`);
  });
  
  console.log('\n' + '='.repeat(80));
  console.log(`\nRÉCAPITULATIF PAR NIVEAU:`);
  
  const byLevel = {};
  emptyQuestions.forEach(q => {
    if (!byLevel[q.level]) byLevel[q.level] = 0;
    byLevel[q.level]++;
  });
  
  Object.entries(byLevel).sort().forEach(([level, count]) => {
    console.log(`  ${level}: ${count} questions`);
  });
  
  console.log(`\nRÉCAPITULATIF PAR DOMAINE:`);
  
  const byDomain = {};
  emptyQuestions.forEach(q => {
    if (!byDomain[q.domain]) byDomain[q.domain] = 0;
    byDomain[q.domain]++;
  });
  
  Object.entries(byDomain).sort().forEach(([domain, count]) => {
    console.log(`  ${domain}: ${count} questions`);
  });
} else {
  console.log('✅ Toutes les questions ont un énoncé!');
}
