import { UserProfile, GradeLevel, MathDomain } from '../types';
import { getAvailableDomains } from '../data/questions';

/**
 * Calculate and update domain progress stars based on performance
 * @param domainProgress The domain progress object to update
 * @param correctCount Number of correct answers
 * @param totalCount Total number of questions
 * @returns Number of stars earned
 */
export function updateProgressWithStars(
  domainProgress: UserProfile['progress'][GradeLevel][MathDomain],
  correctCount: number,
  totalCount: number
): number {
  domainProgress.questionsAnswered += totalCount;
  domainProgress.correctAnswers += correctCount;
  
  const successRate = domainProgress.correctAnswers / domainProgress.questionsAnswered;
  
  if (successRate >= 0.75 && domainProgress.questionsAnswered >= 15) {
    domainProgress.stars = 3;
  } else if (successRate >= 0.6 && domainProgress.questionsAnswered >= 10) {
    domainProgress.stars = 2;
  } else if (successRate >= 0.5 && domainProgress.questionsAnswered >= 5) {
    domainProgress.stars = 1;
  }
  
  return domainProgress.stars;
}

/**
 * Unlock the next domain when current domain earns stars
 * @param updatedProfile The profile to update
 * @param selectedDomain The currently completed domain
 * @param stars Number of stars earned
 */
export function unlockNextDomain(
  updatedProfile: UserProfile,
  selectedDomain: { level: GradeLevel; domain: MathDomain },
  stars: number
): void {
  const availableDomains = getAvailableDomains(selectedDomain.level);
  const currentDomainIndex = availableDomains.indexOf(selectedDomain.domain);
  
  if (stars >= 1 && currentDomainIndex >= 0 && currentDomainIndex < availableDomains.length - 1) {
    const nextDomain = availableDomains[currentDomainIndex + 1] as MathDomain;
    const nextDomainProgress = updatedProfile.progress[selectedDomain.level]?.[nextDomain];
    if (nextDomainProgress) {
      nextDomainProgress.unlocked = true;
    }
  }
}

/**
 * Unlock the next level when all domains of current level are completed with 2+ stars
 * @param updatedProfile The profile to update
 * @param selectedDomain The currently completed domain
 */
export function unlockNextLevel(
  updatedProfile: UserProfile,
  selectedDomain: { level: GradeLevel; domain: MathDomain }
): void {
  const availableDomains = getAvailableDomains(selectedDomain.level);
  const LEVELS_ORDER: GradeLevel[] = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'];
  
  const currentLevelProgress = updatedProfile.progress[selectedDomain.level];
  if (!currentLevelProgress) return;

  const allDomainsCompleted = availableDomains.every(domain => 
    currentLevelProgress[domain as MathDomain]?.stars >= 2
  );

  if (allDomainsCompleted) {
    const currentLevelIndex = LEVELS_ORDER.indexOf(selectedDomain.level);
    
    if (currentLevelIndex >= 0 && currentLevelIndex < LEVELS_ORDER.length - 1) {
      const nextLevel = LEVELS_ORDER[currentLevelIndex + 1];
      const nextLevelProgress = updatedProfile.progress[nextLevel];
      if (nextLevelProgress) {
        const calcMentalProgress = nextLevelProgress['Calcul mental'];
        if (calcMentalProgress) {
          calcMentalProgress.unlocked = true;
          updatedProfile.currentLevel = nextLevel;
        }
      }
    }
  }
}

/**
 * Calculate total stars from a profile's progress
 * @param profile The user profile
 * @returns Total number of stars earned
 */
export function calculateTotalStars(profile: UserProfile): number {
  return Object.values(profile.progress)
    .flatMap(level => Object.values(level || {}))
    .reduce((sum, domain) => sum + (domain?.stars || 0), 0);
}

/**
 * Calculate quick challenge bonus stars
 * @param correctCount Number of correct answers
 * @param totalCount Total number of questions
 * @returns Bonus stars earned
 */
export function calculateQuickChallengeBonus(correctCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.floor((correctCount / totalCount) * 10);
}
