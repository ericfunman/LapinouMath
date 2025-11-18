import { describe, it, expect } from 'vitest';
import { getQuestionStats } from '../../utils/questionStats';

describe('QuestionStats Utils', () => {
  it('should calculate total questions count', () => {
    const stats = getQuestionStats();
    expect(stats.total).toBeGreaterThan(0);
    expect(stats.total).toBeGreaterThanOrEqual(2900); // 250 CE1 + 1500 CE2-4ème + générées
  });

  it('should have stats for all grade levels', () => {
    const stats = getQuestionStats();
    const levels = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'];
    
    levels.forEach(level => {
      expect(stats.byLevel[level]).toBeGreaterThan(0);
      expect(stats.byLevelAndDomain[level]).toBeDefined();
    });
  });

  it('should have stats for all domains', () => {
    const stats = getQuestionStats();
    const domains = [
      'Calcul mental',
      'Arithmétique',
      'Géométrie',
      'Fractions/Décimaux',
      'Mesures',
      'Problèmes/Algèbre'
    ];
    
    domains.forEach(domain => {
      expect(stats.byDomain[domain]).toBeGreaterThan(0);
    });
  });

  it('should have correct total when summing by level', () => {
    const stats = getQuestionStats();
    const sumByLevel = Object.values(stats.byLevel).reduce((a, b) => a + b, 0);
    expect(sumByLevel).toBe(stats.total);
  });

  it('should have correct total when summing by domain', () => {
    const stats = getQuestionStats();
    const sumByDomain = Object.values(stats.byDomain).reduce((a, b) => a + b, 0);
    expect(sumByDomain).toBe(stats.total);
  });

  it('should have correct distribution across levels', () => {
    const stats = getQuestionStats();
    // CE1 should have at least 240 questions from levelsByLevel
    expect(stats.byLevel['CE1']).toBeGreaterThanOrEqual(240);
  });

  it('should have correct distribution across domains', () => {
    const stats = getQuestionStats();
    // Each domain should have >= 300 questions (across all levels)
    expect(stats.byDomain['Calcul mental']).toBeGreaterThanOrEqual(300);
    expect(stats.byDomain['Arithmétique']).toBeGreaterThanOrEqual(400);
  });

  it('should have stats for level and domain combination', () => {
    const stats = getQuestionStats();
    expect(stats.byLevelAndDomain['CE1']).toBeDefined();
    expect(stats.byLevelAndDomain['CE1']['Calcul mental']).toBeGreaterThan(0);
  });
});
