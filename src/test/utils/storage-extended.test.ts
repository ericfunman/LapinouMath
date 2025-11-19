import { describe, it, expect, beforeEach } from 'vitest';
import {
  createProfile,
  getAllProfiles,
  saveProfile,
  deleteProfile,
  getProfile,
  migrateProfile,
} from '../../utils/storage';

describe('Storage Extended Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates profile with correct defaults', () => {
    const profile = createProfile('Alice', 'CE1');
    
    expect(profile.name).toBe('Alice');
    expect(profile.currentLevel).toBe('CE1');
    expect(profile.totalStars).toBe(0);
    expect(profile.avatar).toBe('🐰');
    expect(profile.id).toBeDefined();
    expect(profile.progress).toBeDefined();
    expect(profile.accessories).toBeDefined();
  });

  it('saves and retrieves multiple profiles', () => {
    const profile1 = createProfile('Alice', 'CE1');
    const profile2 = createProfile('Bob', 'CM1');
    const profile3 = createProfile('Charlie', 'CE2');
    
    const retrieved = getAllProfiles();
    
    expect(retrieved).toBeDefined();
    expect(Array.isArray(retrieved)).toBe(true);
  });

  it('saves profile with progress data', () => {
    const profile = createProfile('David', 'CM2');
    profile.totalStars = 50;
    profile.progress = {
      'Calcul mental': { correct: 10, total: 20 },
      'Géométrie': { correct: 5, total: 10 },
    };
    
    saveProfile(profile);
    const retrieved = getProfile(profile.id);
    
    expect(retrieved).toBeDefined();
    expect(retrieved?.totalStars).toBe(50);
  });

  it('updates existing profile', () => {
    const profile = createProfile('Eve', 'CE1');
    profile.totalStars = 25;
    
    saveProfile(profile);
    
    const updated = getProfile(profile.id);
    expect(updated?.totalStars).toBe(25);
  });

  it('deletes profile successfully', () => {
    const profile = createProfile('Frank', 'CE2');
    const id = profile.id;
    
    deleteProfile(id);
    
    const retrieved = getProfile(id);
    expect(retrieved).toBeNull();
  });

  it('handles profile deletion of non-existent profile', () => {
    deleteProfile('non-existent-id');
    // Should not throw
    expect(true).toBe(true);
  });

  it('migrates profile to new version', () => {
    const oldProfile = createProfile('Grace', 'CE1');
    // Profile created with createProfile should already have all fields
    const migrated = migrateProfile(oldProfile);
    
    expect(migrated).toBeDefined();
    expect(migrated.id).toBe(oldProfile.id);
    expect(migrated.progress).toBeDefined();
  });

  it('handles profile with accessories', () => {
    const profile = createProfile('Henry', 'CM1');
    profile.accessories = ['hat-1', 'glasses-2'];
    profile.unlockedAccessories = ['hat-1', 'glasses-2', 'tail-3'];
    
    saveProfile(profile);
    const retrieved = getProfile(profile.id);
    
    expect(retrieved?.accessories).toContain('hat-1');
  });

  it('retrieves all profiles in correct format', () => {
    createProfile('Profile1', 'CE1');
    createProfile('Profile2', 'CE2');
    createProfile('Profile3', 'CM1');
    
    const all = getAllProfiles();
    
    expect(Array.isArray(all)).toBe(true);
    all.forEach(p => {
      expect(p.id).toBeDefined();
      expect(p.name).toBeDefined();
      expect(p.currentLevel).toBeDefined();
    });
  });

  it('handles profile with empty progress', () => {
    const profile = createProfile('Iris', 'CM2');
    profile.progress = {};
    
    saveProfile(profile);
    const retrieved = getProfile(profile.id);
    
    expect(retrieved?.progress).toEqual({});
  });

  it('migrates profile with partial fields', () => {
    const partialProfile: any = {
      id: 'test-123',
      name: 'Jack',
      avatar: '🐰',
      currentLevel: 'CE1',
      totalStars: 0,
      progress: {},
      accessories: [],
    };
    
    const migrated = migrateProfile(partialProfile);
    
    expect(migrated.id).toBe('test-123');
    expect(migrated.name).toBe('Jack');
  });

  it('saves profile with large star count', () => {
    const profile = createProfile('Kelly', 'CM1');
    profile.totalStars = 9999;
    
    saveProfile(profile);
    const retrieved = getProfile(profile.id);
    
    expect(retrieved?.totalStars).toBe(9999);
  });

  it('handles profile name with special characters', () => {
    const profile = createProfile('Léa-Marie 123!', 'CE2');
    
    saveProfile(profile);
    const retrieved = getProfile(profile.id);
    
    expect(retrieved?.name).toBe('Léa-Marie 123!');
  });

  it('creates profiles with all grade levels', () => {
    const levels = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'] as const;
    
    levels.forEach((level, index) => {
      const profile = createProfile(`Student${index}`, level);
      expect(profile.currentLevel).toBe(level);
    });
  });

  it('retrieves correct profile when multiple exist', () => {
    createProfile('User1', 'CE1');
    const profile2 = createProfile('User2', 'CM1');
    createProfile('User3', 'CE2');
    
    const retrieved = getProfile(profile2.id);
    
    expect(retrieved?.name).toBe('User2');
    expect(retrieved?.currentLevel).toBe('CM1');
  });

  it('handles profile update with new accessories', () => {
    const profile = createProfile('Mia', 'CM2');
    profile.accessories = ['item-1'];
    
    saveProfile(profile);
    
    const retrieved = getProfile(profile.id);
    retrieved!.accessories = ['item-1', 'item-2'];
    saveProfile(retrieved!);
    
    const final = getProfile(profile.id);
    expect(final?.accessories).toContain('item-2');
  });

  it('profile migration preserves important fields', () => {
    const oldFormat: any = {
      id: 'legacy-123',
      name: 'Legacy User',
      avatar: '🐰',
      currentLevel: 'CE1',
      totalStars: 42,
      progress: { 'Math': { correct: 5, total: 10 } },
      accessories: [],
      createdAt: new Date(),
    };
    
    const migrated = migrateProfile(oldFormat);
    
    expect(migrated.id).toBe('legacy-123');
    expect(migrated.name).toBe('Legacy User');
    expect(migrated.totalStars).toBe(42);
  });
});
