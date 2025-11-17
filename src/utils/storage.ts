import { UserProfile, GradeLevel } from '../types';
import { GRADE_LEVELS, MATH_DOMAINS } from '../data/constants';
import { saveProfiles as saveToIndexedDB, loadProfiles as loadFromIndexedDB } from './database';

const STORAGE_KEY = 'lapinoumath_profiles';

// Fonction pour synchroniser IndexedDB et LocalStorage
async function syncProfilesToIndexedDB(profiles: UserProfile[]): Promise<void> {
  try {
    await saveToIndexedDB(profiles);
  } catch (error) {
    console.error('Erreur de synchronisation IndexedDB:', error);
  }
}

// Fonction pour charger depuis IndexedDB en priorité
async function loadProfilesWithFallback(): Promise<UserProfile[]> {
  try {
    const indexedDBProfiles = await loadFromIndexedDB();
    if (indexedDBProfiles.length > 0) {
      // Sync vers LocalStorage comme backup
      localStorage.setItem(STORAGE_KEY, JSON.stringify(indexedDBProfiles));
      return indexedDBProfiles;
    }
  } catch (error) {
    console.warn('IndexedDB non disponible, utilisation de LocalStorage', error);
  }
  
  // Fallback vers LocalStorage
  const data = localStorage.getItem(STORAGE_KEY);
  const profiles = data ? JSON.parse(data) : [];
  
  // Tenter de sync vers IndexedDB
  if (profiles.length > 0) {
    syncProfilesToIndexedDB(profiles);
  }
  
  return profiles;
}

export function getAllProfiles(): UserProfile[] {
  const data = localStorage.getItem(STORAGE_KEY);
  const profiles = data ? JSON.parse(data) : [];
  
  // Sync async vers IndexedDB (non bloquant)
  syncProfilesToIndexedDB(profiles);
  
  return profiles;
}

export async function getAllProfilesAsync(): Promise<UserProfile[]> {
  return loadProfilesWithFallback();
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
  
  // Sync async vers IndexedDB (non bloquant)
  syncProfilesToIndexedDB(profiles);
}

let profileIdCounter = 0;

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
    id: `${Date.now()}-${profileIdCounter++}`,
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
  
  // Sync async vers IndexedDB (non bloquant)
  syncProfilesToIndexedDB(profiles);
}

export function getProfile(id: string): UserProfile | null {
  const profiles = getAllProfiles();
  return profiles.find(p => p.id === id) || null;
}
