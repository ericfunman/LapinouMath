import { describe, it, expect } from 'vitest';
import { getQuestionsByLevel, getQuestionsByDomain, getRandomQuestions, getAllQuestions } from '../../data/questions';

describe('Questions Utils', () => {
  it('should return all questions', () => {
    const questions = getAllQuestions();
    expect(questions.length).toBeGreaterThan(0);
    expect(questions.length).toBe(2100); // Vérifier qu'on a bien 2100 questions
  });

  it('should filter questions by level', () => {
    const ce1Questions = getQuestionsByLevel('CE1');
    expect(ce1Questions.length).toBeGreaterThan(0);
    expect(ce1Questions.every(q => q.level === 'CE1')).toBe(true);
  });

  it('should filter questions by domain', () => {
    const calcQuestions = getQuestionsByDomain('CE1', 'Calcul mental');
    expect(calcQuestions.length).toBeGreaterThan(0);
    expect(calcQuestions.every(q => q.level === 'CE1' && q.domain === 'Calcul mental')).toBe(true);
  });

  it('should return random questions', () => {
    const randomQuestions = getRandomQuestions('CE1', 'Calcul mental', 10);
    expect(randomQuestions.length).toBeLessThanOrEqual(10);
  });

  it('should have valid question structure', () => {
    const questions = getAllQuestions();
    const firstQuestion = questions[0];
    
    expect(firstQuestion.id).toBeDefined();
    expect(firstQuestion.level).toBeDefined();
    expect(firstQuestion.domain).toBeDefined();
    expect(firstQuestion.question).toBeDefined();
    expect(firstQuestion.options).toHaveLength(4);
    expect(firstQuestion.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(firstQuestion.correctAnswer).toBeLessThan(4);
    expect(firstQuestion.explanation).toBeDefined();
  });

  it('should have all 7 levels represented', () => {
    const levels = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'];
    
    levels.forEach(level => {
      const levelQuestions = getQuestionsByLevel(level);
      expect(levelQuestions.length).toBeGreaterThan(0);
      expect(levelQuestions.length).toBe(300); // 300 questions par niveau
    });
  });

  it('should have all 6 domains per level', () => {
    const domains = ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'];
    
    domains.forEach(domain => {
      const domainQuestions = getQuestionsByDomain('CE1', domain);
      expect(domainQuestions.length).toBeGreaterThan(0);
      expect(domainQuestions.length).toBe(50); // 50 questions par domaine
    });
  });
});
