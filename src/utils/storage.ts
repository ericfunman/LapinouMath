import { UserProfile, GradeLevel } from '../types';
import { GRADE_LEVELS } from '../data/constants';
import { saveProfiles as saveToIndexedDB, loadProfiles as loadFromIndexedDB } from './database';
import { getAvailableDomains } from '../data/questions';

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
    const availableDomains = getAvailableDomains(gradeLevel);
    availableDomains.forEach(domain => {
      // Kangourou is always unlocked (bonus domain), others only unlock on first level or with stars
      const isKangourou = domain === 'Kangourou';
      const isFirstDomain = domain === 'Calcul mental';
      progress[gradeLevel][domain] = {
        questionsAnswered: 0,
        correctAnswers: 0,
        stars: 0,
        unlocked: gradeLevel === level && (isFirstDomain || isKangourou),
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

// Migration: Add missing domains (like Kangourou) to existing profiles
// Also ensure Kangourou is always unlocked
export function migrateProfile(profile: UserProfile): UserProfile {
  let updated = false;
  
  GRADE_LEVELS.forEach(gradeLevel => {
    if (!profile.progress[gradeLevel]) {
      profile.progress[gradeLevel] = {};
      updated = true;
    }
    
    const availableDomains = getAvailableDomains(gradeLevel);
    availableDomains.forEach(domain => {
      const isKangourou = domain === 'Kangourou';
      
      if (!profile.progress[gradeLevel][domain]) {
        // Create missing domain (Kangourou is always unlocked)
        profile.progress[gradeLevel][domain] = {
          questionsAnswered: 0,
          correctAnswers: 0,
          stars: 0,
          unlocked: isKangourou,
        };
        updated = true;
      } else if (isKangourou && !profile.progress[gradeLevel][domain].unlocked) {
        // Ensure Kangourou is always unlocked if it exists but is locked
        profile.progress[gradeLevel][domain].unlocked = true;
        updated = true;
      }
    });
  });
  
  if (updated) {
    saveProfile(profile);
  }
  
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
