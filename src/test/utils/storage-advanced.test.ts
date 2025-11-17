import { describe, it, expect, beforeEach } from 'vitest';
import { getAllProfiles, createProfile, getProfile, deleteProfile, saveProfile } from '../../utils/storage';
import { GRADE_LEVELS } from '../../data/constants';

describe('Advanced Storage Scenarios', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle null profile gracefully', () => {
    const nullProfile = getProfile('non-existent-id');
    expect(nullProfile).toBeNull();
  });

  it('should handle empty profile list', () => {
    const profiles = getAllProfiles();
    expect(Array.isArray(profiles)).toBe(true);
    expect(profiles.length).toBe(0);
  });

  it('should handle multiple rapid profile creations', () => {
    const p1 = createProfile('User1', 'CE1');
    const p2 = createProfile('User2', 'CE2');
    const p3 = createProfile('User3', 'CM1');

    const profiles = getAllProfiles();
    expect(profiles).toHaveLength(3);
    expect(p1.id).not.toBe(p2.id);
    expect(p2.id).not.toBe(p3.id);
  });

  it('should properly track progress for all domains', () => {
    const profile = createProfile('TestUser', 'CE1');
    expect(profile.progress['CE1']).toBeDefined();
    
    const domains = Object.keys(profile.progress['CE1']);
    expect(domains.length).toBeGreaterThan(0);
    
    domains.forEach(domain => {
      expect(profile.progress['CE1'][domain].questionsAnswered).toBe(0);
      expect(profile.progress['CE1'][domain].correctAnswers).toBe(0);
      expect(profile.progress['CE1'][domain].stars).toBe(0);
    });
  });

  it('should handle saveProfile with existing profile', () => {
    const profile = createProfile('User', 'CE1');
    profile.totalStars = 10;
    profile.name = 'Updated User';

    saveProfile(profile);
    const retrievedProfile = getProfile(profile.id);
    
    expect(retrievedProfile).not.toBeNull();
    expect(retrievedProfile?.totalStars).toBe(10);
    expect(retrievedProfile?.name).toBe('Updated User');
  });

  it('should maintain profile integrity after delete', () => {
    const p1 = createProfile('User1', 'CE1');
    const p2 = createProfile('User2', 'CE2');
    
    deleteProfile(p1.id);
    const profiles = getAllProfiles();
    
    expect(profiles).toHaveLength(1);
    expect(profiles[0].id).toBe(p2.id);
    expect(getProfile(p1.id)).toBeNull();
  });

  it('should initialize all grade levels', () => {
    const profile = createProfile('TestUser', 'CE1');
    
    GRADE_LEVELS.forEach(level => {
      expect(profile.progress[level]).toBeDefined();
      if (level === 'CE1') {
        // First level should have Calcul mental unlocked
        expect(profile.progress[level]['Calcul mental']?.unlocked).toBe(true);
      } else {
        // Other levels should be locked initially
        Object.values(profile.progress[level]).forEach(domain => {
          expect(domain.unlocked).toBe(false);
        });
      }
    });
  });

  it('should calculate total stars correctly', () => {
    const profile = createProfile('User', 'CE1');
    
    // Simulate earning stars
    const levels = Object.keys(profile.progress);
    let expectedStars = 0;
    
    levels.forEach((level) => {
      const domains = Object.keys(profile.progress[level]);
      domains.forEach((domain, domainIndex) => {
        profile.progress[level][domain].stars = Math.min(domainIndex + 1, 3);
        expectedStars += profile.progress[level][domain].stars;
      });
    });

    profile.totalStars = expectedStars;
    saveProfile(profile);
    
    const retrieved = getProfile(profile.id);
    expect(retrieved?.totalStars).toBe(expectedStars);
  });
});
