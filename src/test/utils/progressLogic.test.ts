import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  updateProgressWithStars,
  unlockNextDomain,
  unlockNextLevel,
  calculateTotalStars,
  calculateQuickChallengeBonus
} from '../../utils/progressLogic';
import { UserProfile } from '../../types';
import * as questionsModule from '../../data/questions';

describe('progressLogic', () => {
  const createMockProfile = (): UserProfile => ({
    id: 'test-profile',
    name: 'Test User',
    avatar: '🐰',
    currentLevel: 'CE1',
    progress: {
      'CE1': {
        'Calcul mental': { unlocked: true, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Arithmétique': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Géométrie': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Fractions/Décimaux': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Mesures': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Problèmes/Algèbre': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Bonus - Défi Rapide': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
      },
      'CE2': {
        'Calcul mental': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Arithmétique': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Géométrie': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Fractions/Décimaux': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Mesures': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Problèmes/Algèbre': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Bonus - Défi Rapide': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
      },
      'CM1': {
        'Calcul mental': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Arithmétique': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Géométrie': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Fractions/Décimaux': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Mesures': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Problèmes/Algèbre': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Bonus - Défi Rapide': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
      },
      'CM2': {
        'Calcul mental': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Arithmétique': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Géométrie': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Fractions/Décimaux': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Mesures': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Problèmes/Algèbre': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Bonus - Défi Rapide': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
      },
      '6ème': {
        'Calcul mental': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Arithmétique': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Géométrie': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Fractions/Décimaux': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Mesures': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Problèmes/Algèbre': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Bonus - Défi Rapide': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
      },
      '5ème': {
        'Calcul mental': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Arithmétique': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Géométrie': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Fractions/Décimaux': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Mesures': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Problèmes/Algèbre': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Bonus - Défi Rapide': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
      },
      '4ème': {
        'Calcul mental': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Arithmétique': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Géométrie': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Fractions/Décimaux': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Mesures': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Problèmes/Algèbre': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        'Bonus - Défi Rapide': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
      },
    },
    totalStars: 0,
    accessories: [],
    unlockedAccessories: [],
    createdAt: new Date(),
  });

  describe('updateProgressWithStars', () => {
    it('should award 1 star for 50% success rate with 5+ questions', () => {
      const profile = createMockProfile();
      const domainProgress = profile.progress['CE1']['Calcul mental'];
      
      const stars = updateProgressWithStars(domainProgress, 3, 5);
      
      expect(stars).toBe(1);
      expect(domainProgress.questionsAnswered).toBe(5);
      expect(domainProgress.correctAnswers).toBe(3);
      expect(domainProgress.stars).toBe(1);
    });

    it('should award 2 stars for 60% success rate with 10+ questions', () => {
      const profile = createMockProfile();
      const domainProgress = profile.progress['CE1']['Calcul mental'];
      
      const stars = updateProgressWithStars(domainProgress, 6, 10);
      
      expect(stars).toBe(2);
      expect(domainProgress.questionsAnswered).toBe(10);
      expect(domainProgress.correctAnswers).toBe(6);
    });

    it('should award 3 stars for 75% success rate with 15+ questions', () => {
      const profile = createMockProfile();
      const domainProgress = profile.progress['CE1']['Calcul mental'];
      
      const stars = updateProgressWithStars(domainProgress, 12, 15);
      
      expect(stars).toBe(3);
      expect(domainProgress.questionsAnswered).toBe(15);
      expect(domainProgress.correctAnswers).toBe(12);
    });

    it('should not award stars for insufficient questions', () => {
      const profile = createMockProfile();
      const domainProgress = profile.progress['CE1']['Calcul mental'];
      
      const stars = updateProgressWithStars(domainProgress, 3, 4);
      
      expect(stars).toBe(0);
      expect(domainProgress.stars).toBe(0);
    });

    it('should accumulate progress across multiple calls', () => {
      const profile = createMockProfile();
      const domainProgress = profile.progress['CE1']['Calcul mental'];
      
      updateProgressWithStars(domainProgress, 2, 5);
      expect(domainProgress.questionsAnswered).toBe(5);
      
      updateProgressWithStars(domainProgress, 3, 5);
      expect(domainProgress.questionsAnswered).toBe(10);
      expect(domainProgress.correctAnswers).toBe(5);
    });

    it('should handle 100% correct answers', () => {
      const profile = createMockProfile();
      const domainProgress = profile.progress['CE1']['Calcul mental'];
      
      const stars = updateProgressWithStars(domainProgress, 15, 15);
      
      expect(stars).toBe(3);
      expect(domainProgress.correctAnswers).toBe(15);
    });

    it('should handle 0% correct answers', () => {
      const profile = createMockProfile();
      const domainProgress = profile.progress['CE1']['Calcul mental'];
      
      const stars = updateProgressWithStars(domainProgress, 0, 15);
      
      expect(stars).toBe(0);
      expect(domainProgress.correctAnswers).toBe(0);
    });
  });

  describe('unlockNextDomain', () => {
    it('should unlock next domain when earning 1+ star', () => {
      const profile = createMockProfile();
      
      unlockNextDomain(profile, { level: 'CE1', domain: 'Calcul mental' }, 1);
      
      expect(profile.progress['CE1']['Arithmétique'].unlocked).toBe(true);
    });

    it('should unlock next domain when earning 3 stars', () => {
      const profile = createMockProfile();
      
      unlockNextDomain(profile, { level: 'CE1', domain: 'Calcul mental' }, 3);
      
      expect(profile.progress['CE1']['Arithmétique'].unlocked).toBe(true);
    });

    it('should not unlock domain with 0 stars', () => {
      const profile = createMockProfile();
      
      unlockNextDomain(profile, { level: 'CE1', domain: 'Calcul mental' }, 0);
      
      expect(profile.progress['CE1']['Arithmétique'].unlocked).toBe(false);
    });

    it('should not unlock domain if it is the last domain', () => {
      const profile = createMockProfile();
      
      unlockNextDomain(profile, { level: 'CE1', domain: 'Bonus - Défi Rapide' }, 1);
      
      // No error should occur
      expect(profile).toBeDefined();
    });

    it('should handle invalid domain gracefully', () => {
      const profile = createMockProfile();
      
      unlockNextDomain(profile, { level: 'CE1', domain: 'Calcul mental' }, 1);
      
      // Should still unlock next domain
      expect(profile.progress['CE1']['Arithmétique'].unlocked).toBe(true);
    });

    it('should not unlock domain for negative stars', () => {
      const profile = createMockProfile();
      
      unlockNextDomain(profile, { level: 'CE1', domain: 'Calcul mental' }, -1);
      
      expect(profile.progress['CE1']['Arithmétique'].unlocked).toBe(false);
    });
  });

  describe('unlockNextLevel', () => {
    beforeEach(() => {
      // Mock getAvailableDomains to return our test domains
      vi.spyOn(questionsModule, 'getAvailableDomains').mockImplementation((level: string) => {
        const domains: Record<string, string[]> = {
          'CE1': ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre', 'Bonus - Défi Rapide'],
          'CE2': ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre', 'Bonus - Défi Rapide'],
          'CM1': ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre', 'Bonus - Défi Rapide'],
          'CM2': ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre', 'Bonus - Défi Rapide'],
        };
        return domains[level] || [];
      });
    });

    it('should unlock next level when all domains have 2+ stars', () => {
      const profile = createMockProfile();
      
      // Set all CE1 domains to 2+ stars
      for (const domain of Object.values(profile.progress['CE1'])) {
        domain.stars = 2;
      }
      
      unlockNextLevel(profile, { level: 'CE1', domain: 'Calcul mental' });
      
      expect(profile.progress['CE2']['Calcul mental'].unlocked).toBe(true);
      expect(profile.currentLevel).toBe('CE2');
    });

    it('should not unlock next level if domains have < 2 stars', () => {
      const profile = createMockProfile();
      
      // Set only some domains to 2+ stars
      profile.progress['CE1']['Calcul mental'].stars = 2;
      profile.progress['CE1']['Arithmétique'].stars = 1; // Only 1 star
      
      unlockNextLevel(profile, { level: 'CE1', domain: 'Calcul mental' });
      
      expect(profile.progress['CE2']['Calcul mental'].unlocked).toBe(false);
      expect(profile.currentLevel).toBe('CE1');
    });

    it('should not unlock next level if exactly at last level', () => {
      const profile = createMockProfile();
      profile.currentLevel = '4ème';
      
      // Set all domains to 2+ stars
      for (const domain of Object.values(profile.progress['4ème'])) {
        domain.stars = 2;
      }
      
      unlockNextLevel(profile, { level: '4ème', domain: 'Calcul mental' });
      
      // Should remain at 4ème since it's the last level
      expect(profile.currentLevel).toBe('4ème');
    });

    it('should handle missing level progress gracefully', () => {
      const profile = createMockProfile();
      delete profile.progress['CE2']; // Remove CE2 progress
      
      unlockNextLevel(profile, { level: 'CE1', domain: 'Calcul mental' });
      
      // Should not crash
      expect(profile.currentLevel).toBe('CE1');
    });

    it('should upgrade from CE1 to CE2 correctly', () => {
      const profile = createMockProfile();
      
      // Set all CE1 domains to 2+ stars
      for (const domain of Object.values(profile.progress['CE1'])) {
        domain.stars = 2;
      }
      
      unlockNextLevel(profile, { level: 'CE1', domain: 'Géométrie' });
      
      expect(profile.currentLevel).toBe('CE2');
      expect(profile.progress['CE2']['Calcul mental'].unlocked).toBe(true);
    });

    it('should upgrade from CM2 to 6ème correctly', () => {
      const profile = createMockProfile();
      profile.currentLevel = 'CM2';
      
      // Set all CM2 domains to 2+ stars
      for (const domain of Object.values(profile.progress['CM2'])) {
        domain.stars = 2;
      }
      
      unlockNextLevel(profile, { level: 'CM2', domain: 'Calcul mental' });
      
      expect(profile.currentLevel).toBe('6ème');
    });
  });

  describe('calculateTotalStars', () => {
    it('should return 0 for new profile', () => {
      const profile = createMockProfile();
      
      const total = calculateTotalStars(profile);
      
      expect(total).toBe(0);
    });

    it('should sum all stars from all domains', () => {
      const profile = createMockProfile();
      
      // Add stars to various domains
      profile.progress['CE1']['Calcul mental'].stars = 3;
      profile.progress['CE1']['Arithmétique'].stars = 2;
      profile.progress['CE1']['Géométrie'].stars = 1;
      profile.progress['CE2']['Calcul mental'].stars = 3;
      
      const total = calculateTotalStars(profile);
      
      expect(total).toBe(9);
    });

    it('should handle profiles with many stars', () => {
      const profile = createMockProfile();
      
      // Max out all domains
      for (const level of Object.values(profile.progress)) {
        for (const domain of Object.values(level)) {
          domain.stars = 3;
        }
      }
      
      const total = calculateTotalStars(profile);
      
      // 7 levels × 7 domains × 3 stars = 147
      expect(total).toBe(147);
    });

    it('should handle mixed star counts', () => {
      const profile = createMockProfile();
      
      let starCount = 0;
      let currentStar = 1;
      for (const level of Object.values(profile.progress)) {
        for (const domain of Object.values(level)) {
          domain.stars = currentStar;
          starCount += currentStar;
          currentStar = (currentStar % 3) + 1;
        }
      }
      
      const total = calculateTotalStars(profile);
      
      expect(total).toBe(starCount);
    });
  });

  describe('calculateQuickChallengeBonus', () => {
    it('should calculate bonus for perfect score', () => {
      const bonus = calculateQuickChallengeBonus(20, 20);
      
      expect(bonus).toBe(10);
    });

    it('should calculate bonus for 50% score', () => {
      const bonus = calculateQuickChallengeBonus(10, 20);
      
      expect(bonus).toBe(5);
    });

    it('should calculate bonus for 75% score', () => {
      const bonus = calculateQuickChallengeBonus(15, 20);
      
      expect(bonus).toBe(7);
    });

    it('should return 0 for zero correct answers', () => {
      const bonus = calculateQuickChallengeBonus(0, 20);
      
      expect(bonus).toBe(0);
    });

    it('should return 0 for zero total questions', () => {
      const bonus = calculateQuickChallengeBonus(0, 0);
      
      expect(bonus).toBe(0);
    });

    it('should return 0 for zero total questions regardless of correct', () => {
      const bonus = calculateQuickChallengeBonus(5, 0);
      
      expect(bonus).toBe(0);
    });

    it('should handle decimal rounding', () => {
      const bonus = calculateQuickChallengeBonus(1, 3);
      
      // 1/3 * 10 = 3.33... → 3
      expect(bonus).toBe(3);
    });

    it('should handle small scores', () => {
      const bonus = calculateQuickChallengeBonus(1, 20);
      
      expect(bonus).toBe(0);
    });

    it('should handle edge case of 1 question', () => {
      const bonus = calculateQuickChallengeBonus(1, 1);
      
      expect(bonus).toBe(10);
    });
  });
});
