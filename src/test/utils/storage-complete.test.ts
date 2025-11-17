import { describe, it, expect } from 'vitest';
import { getProfile, saveProfile, getAllProfiles, deleteProfile } from '../../utils/storage';
import { GRADE_LEVELS, MATH_DOMAINS } from '../../data/constants';

function createTestProfile(id: string, name: string) {
  const progress: Record<string, Record<string, any>> = {};
  
  GRADE_LEVELS.forEach(level => {
    progress[level] = {};
    MATH_DOMAINS.forEach(domain => {
      progress[level][domain] = {
        questionsAnswered: 0,
        correctAnswers: 0,
        stars: 0,
        unlocked: true,
      };
    });
  });

  return {
    id,
    name,
    avatar: '🐰',
    currentLevel: 'CE1' as const,
    progress,
    accessories: [],
    unlockedAccessories: [],
    totalStars: 0,
    createdAt: new Date(),
  };
}

describe('Storage Utils', () => {
  it('should save and retrieve a profile', () => {
    localStorage.clear();
    const profile = createTestProfile('test-1', 'Test Profile');

    saveProfile(profile);
    const retrieved = getProfile('test-1');

    expect(retrieved?.name).toBe('Test Profile');
  });

  it('should get all profiles', () => {
    localStorage.clear();
    const profile1 = createTestProfile('test-1', 'Profile 1');
    const profile2 = createTestProfile('test-2', 'Profile 2');

    saveProfile(profile1);
    saveProfile(profile2);

    const allProfiles = getAllProfiles();
    expect(allProfiles.length).toBe(2);
  });

  it('should delete a profile', () => {
    localStorage.clear();
    const profile = createTestProfile('test-1', 'Profile to Delete');

    saveProfile(profile);
    expect(getProfile('test-1')).toBeDefined();

    deleteProfile('test-1');
    expect(getProfile('test-1')).toBeNull();
  });

  it('should persist profiles to localStorage', () => {
    localStorage.clear();
    const profile = createTestProfile('test-persist', 'Persist Profile');

    saveProfile(profile);

    const stored = localStorage.getItem('lapinoumath_profiles');
    expect(stored).toBeDefined();
    
    const parsed = JSON.parse(stored!);
    expect(parsed).toContainEqual(expect.objectContaining({ id: 'test-persist' }));
  });

  it('should load profiles from localStorage', () => {
    localStorage.clear();
    const profile = createTestProfile('test-load', 'Load Profile');

    localStorage.setItem('lapinoumath_profiles', JSON.stringify([profile]));

    const retrieved = getProfile('test-load');
    expect(retrieved?.name).toBe('Load Profile');
  });

  it('should handle duplicate profile IDs by updating', () => {
    localStorage.clear();
    const profile1 = createTestProfile('test-dup', 'First');
    saveProfile(profile1);

    const profile2 = createTestProfile('test-dup', 'Second');
    saveProfile(profile2);

    const all = getAllProfiles();
    const matching = all.filter(p => p.id === 'test-dup');
    expect(matching.length).toBe(1);
    expect(matching[0].name).toBe('Second');
  });

  it('should handle empty profiles list', () => {
    localStorage.clear();
    const all = getAllProfiles();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBe(0);
  });
});
