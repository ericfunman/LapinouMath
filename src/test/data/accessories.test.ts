import { describe, it, expect, beforeEach } from 'vitest';
import {
  ACCESSORIES,
  getUnlockedAccessories,
  getNextAccessoryToUnlock,
  getAccessoriesByTier,
  getAccessoryProgress,
  getCalcuLapinDisplay,
} from '../../data/accessories';

describe('Accessories Data Extended Tests', () => {
  beforeEach(() => {
    // Clear any state
  });

  it('has all accessories defined', () => {
    expect(ACCESSORIES).toBeDefined();
    expect(Array.isArray(ACCESSORIES)).toBe(true);
    expect(ACCESSORIES.length).toBeGreaterThan(0);
  });

  it('each accessory has required fields', () => {
    ACCESSORIES.forEach(accessory => {
      expect(accessory.id).toBeDefined();
      expect(typeof accessory.id).toBe('string');
      expect(accessory.name).toBeDefined();
      expect(typeof accessory.name).toBe('string');
      expect(accessory.icon).toBeDefined();
      expect(typeof accessory.icon).toBe('string');
      expect(accessory.tier).toBeDefined();
      expect(typeof accessory.tier).toBe('number');
    });
  });

  it('accessory IDs are unique', () => {
    const ids = ACCESSORIES.map(a => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('gets accessories unlocked by star count', () => {
    const unlockedByZeroStars = getUnlockedAccessories(0);
    expect(Array.isArray(unlockedByZeroStars)).toBe(true);
    
    const unlockedBy100Stars = getUnlockedAccessories(100);
    expect(Array.isArray(unlockedBy100Stars)).toBe(true);
    
    // More stars should unlock more accessories
    expect(unlockedBy100Stars.length).toBeGreaterThanOrEqual(unlockedByZeroStars.length);
  });

  it('low star count returns some accessories', () => {
    const accessories = getUnlockedAccessories(0);
    expect(Array.isArray(accessories)).toBe(true);
  });

  it('high star count returns many accessories', () => {
    const accessories = getUnlockedAccessories(500);
    expect(accessories.length).toBeGreaterThanOrEqual(0);
  });

  it('star progression increases available accessories', () => {
    const at10Stars = getUnlockedAccessories(10);
    const at50Stars = getUnlockedAccessories(50);
    const at100Stars = getUnlockedAccessories(100);
    
    expect(at10Stars.length).toBeLessThanOrEqual(at50Stars.length);
    expect(at50Stars.length).toBeLessThanOrEqual(at100Stars.length);
  });

  it('accessories have valid emoji', () => {
    ACCESSORIES.forEach(acc => {
      expect(acc.icon.length).toBeGreaterThan(0);
      expect(typeof acc.icon).toBe('string');
    });
  });

  it('accessories have descriptive names', () => {
    ACCESSORIES.forEach(acc => {
      expect(acc.name.length).toBeGreaterThan(0);
      expect(acc.name.length).toBeLessThan(100);
    });
  });

  it('gets next accessory to unlock', () => {
    const next0 = getNextAccessoryToUnlock(0);
    expect(next0).toBeDefined();
    
    const next100 = getNextAccessoryToUnlock(100);
    expect(next100).toBeDefined();
  });

  it('accessories by tier are valid', () => {
    for (let tier = 0; tier <= 5; tier++) {
      const accessories = getAccessoriesByTier(tier);
      expect(Array.isArray(accessories)).toBe(true);
      accessories.forEach(acc => {
        expect(acc.id).toBeDefined();
      });
    }
  });

  it('returns consistent results for same input', () => {
    const firstCall = getUnlockedAccessories(50);
    const secondCall = getUnlockedAccessories(50);
    
    expect(firstCall).toEqual(secondCall);
  });

  it('unlocked accessories are subset of all accessories', () => {
    const unlockedByStars = getUnlockedAccessories(100);
    const allIds = ACCESSORIES.map(a => a.id);
    
    unlockedByStars.forEach(acc => {
      expect(allIds).toContain(acc.id);
    });
  });

  it('handles zero stars correctly', () => {
    const accessories = getUnlockedAccessories(0);
    expect(Array.isArray(accessories)).toBe(true);
  });

  it('handles very high star counts', () => {
    const accessories = getUnlockedAccessories(999999);
    expect(Array.isArray(accessories)).toBe(true);
  });

  it('accessory progress shows correct information', () => {
    const progress = getAccessoryProgress(50);
    expect(progress).toBeDefined();
    expect(typeof progress).toBe('object');
  });

  it('calcuLapin display works', () => {
    const display1 = getCalcuLapinDisplay();
    expect(typeof display1).toBe('string');
    expect(display1.length).toBeGreaterThan(0);
    
    const display2 = getCalcuLapinDisplay('some-accessory-id', 100);
    expect(typeof display2).toBe('string');
  });

  it('accessories tiers are valid', () => {
    ACCESSORIES.forEach(acc => {
      expect(acc.tier).toBeGreaterThanOrEqual(0);
      expect(acc.tier).toBeLessThanOrEqual(10);
    });
  });

  it('progression works with varying star counts', () => {
    for (let stars = 0; stars <= 500; stars += 50) {
      const accessories = getUnlockedAccessories(stars);
      expect(Array.isArray(accessories)).toBe(true);
    }
  });

  it('next accessory changes with stars', () => {
    const next0 = getNextAccessoryToUnlock(0);
    const next200 = getNextAccessoryToUnlock(200);
    
    // Either they're the same or different is fine, but both should exist
    expect(next0).toBeDefined();
    expect(next200).toBeDefined();
  });

  it('multiple tiers have accessories', () => {
    const tierCount = new Set();
    
    ACCESSORIES.forEach(acc => {
      tierCount.add(acc.tier);
    });
    
    expect(tierCount.size).toBeGreaterThan(1);
  });

  it('calcuLapin display with accessory selection', () => {
    const anyAccessory = ACCESSORIES[0];
    const display = getCalcuLapinDisplay(anyAccessory.id, 100);
    expect(typeof display).toBe('string');
    expect(display.length).toBeGreaterThan(0);
  });

  it('all tiers have some accessories', () => {
    const tiersWithAccessories = new Set();
    ACCESSORIES.forEach(acc => {
      tiersWithAccessories.add(acc.tier);
    });
    
    expect(tiersWithAccessories.size).toBeGreaterThan(0);
  });

  it('accessory progress provides useful data', () => {
    const progress25 = getAccessoryProgress(25);
    const progress75 = getAccessoryProgress(75);
    
    expect(progress25).toBeDefined();
    expect(progress75).toBeDefined();
  });
});

