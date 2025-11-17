import { UserProfile, GradeLevel } from '../types';
import { GRADE_LEVELS, MATH_DOMAINS } from '../data/constants';

const STORAGE_KEY = 'lapinoumath_profiles';

export function getAllProfiles(): UserProfile[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProfile(profile: UserProfile): void {
  const profiles = getAllProfiles();
  const index = profiles.findIndex(p => p.id === profile.id);
  
  if (index >= 0) {
    profiles[index] = profile;
  } else {
    profiles.push(profile);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

export function createProfile(name: string, level: GradeLevel): UserProfile {
  const progress: UserProfile['progress'] = {};
  
  GRADE_LEVELS.forEach(gradeLevel => {
    progress[gradeLevel] = {};
    MATH_DOMAINS.forEach(domain => {
      progress[gradeLevel][domain] = {
        questionsAnswered: 0,
        correctAnswers: 0,
        stars: 0,
        unlocked: gradeLevel === level && domain === 'Calcul mental',
      };
    });
  });

  const profile: UserProfile = {
    id: Date.now().toString(),
    name,
    avatar: '🐰',
    currentLevel: level,
    progress,
    accessories: [],
    unlockedAccessories: [],
    totalStars: 0,
    createdAt: new Date(),
  };

  saveProfile(profile);
  return profile;
}

export function deleteProfile(id: string): void {
  const profiles = getAllProfiles().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

export function getProfile(id: string): UserProfile | null {
  const profiles = getAllProfiles();
  return profiles.find(p => p.id === id) || null;
}
