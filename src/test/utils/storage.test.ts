import { describe, it, expect, beforeEach } from 'vitest';
import { createProfile, getAllProfiles, saveProfile, deleteProfile, getProfile } from '../../utils/storage';

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should create a new profile', () => {
    const profile = createProfile('Test User', 'CE1');
    
    expect(profile.name).toBe('Test User');
    expect(profile.currentLevel).toBe('CE1');
    expect(profile.totalStars).toBe(0);
    expect(profile.avatar).toBe('🐰');
    expect(profile.id).toBeDefined();
  });

  it('should save and retrieve a profile', () => {
    const profile = createProfile('Alice', 'CE2');
    const retrieved = getProfile(profile.id);
    
    expect(retrieved).not.toBeNull();
    expect(retrieved?.name).toBe('Alice');
    expect(retrieved?.currentLevel).toBe('CE2');
  });

  it('should get all profiles', () => {
    createProfile('User1', 'CE1');
    createProfile('User2', 'CM1');
    
    const profiles = getAllProfiles();
    expect(profiles.length).toBeGreaterThanOrEqual(2);
  });

  it('should delete a profile', () => {
    const profile = createProfile('To Delete', 'CE1');
    deleteProfile(profile.id);
    
    const retrieved = getProfile(profile.id);
    expect(retrieved).toBeNull();
  });

  it('should update profile progress', () => {
    const profile = createProfile('Progress Test', 'CE1');
    profile.totalStars = 5;
    saveProfile(profile);
    
    const retrieved = getProfile(profile.id);
    expect(retrieved?.totalStars).toBe(5);
  });

  it('should initialize progress for all levels and domains', () => {
    const profile = createProfile('Full Test', 'CE1');
    
    expect(profile.progress['CE1']).toBeDefined();
    expect(profile.progress['CE1']['Calcul mental']).toBeDefined();
    expect(profile.progress['CE1']['Calcul mental'].unlocked).toBe(true);
    expect(profile.progress['CE1']['Arithmétique'].unlocked).toBe(false);
  });
});
