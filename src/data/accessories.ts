/**
 * Accessory system for LapinoMath
 * Unlockable decorations and customizations for CalcuLapin mascot
 * Players unlock more accessories as they progress through the game
 */

export const ACCESSORIES = [
  // TIER 1 - Starting accessories (unlocked at 10 stars)
  {
    id: 'bunny-hat-red',
    name: '🎩 Chapeau rouge',
    icon: '🐰🎩',
    category: 'hat',
    requiredStars: 10,
    tier: 1,
    description: 'Un beau chapeau rouge pour CalcuLapin'
  },
  {
    id: 'bunny-glasses',
    name: '👓 Lunettes intelligentes',
    icon: '🐰👓',
    category: 'glasses',
    requiredStars: 10,
    tier: 1,
    description: 'Les lunettes du savant lapin'
  },
  {
    id: 'bunny-bow-tie',
    name: '🎀 Nœud papillon bleu',
    icon: '🐰🎀',
    category: 'bow',
    requiredStars: 10,
    tier: 1,
    description: 'Un nœud papillon élégant'
  },

  // TIER 2 - Mid-tier accessories (unlocked at 50 stars)
  {
    id: 'bunny-crown',
    name: '👑 Couronne royale',
    icon: '🐰👑',
    category: 'hat',
    requiredStars: 50,
    tier: 2,
    description: 'Une couronne pour le roi des mathématiques !'
  },
  {
    id: 'bunny-sunglasses',
    name: '😎 Lunettes de soleil',
    icon: '🐰😎',
    category: 'glasses',
    requiredStars: 50,
    tier: 2,
    description: 'Cool et génial avec les lunettes de soleil'
  },
  {
    id: 'bunny-scarf-stars',
    name: '⭐ Écharpe scintillante',
    icon: '🐰✨',
    category: 'scarf',
    requiredStars: 50,
    tier: 2,
    description: 'Une écharpe magique remplie d\'étoiles'
  },

  // TIER 3 - Advanced accessories (unlocked at 100 stars)
  {
    id: 'bunny-wizard-hat',
    name: '🧙 Chapeau de magicien',
    icon: '🐰🧙',
    category: 'hat',
    requiredStars: 100,
    tier: 3,
    description: 'Le chapeau des grands mathématiciens magiciens'
  },
  {
    id: 'bunny-monocle',
    name: '🧐 Monocle chic',
    icon: '🐰🧐',
    category: 'glasses',
    requiredStars: 100,
    tier: 3,
    description: 'L\'accessoire du gentleman lapin'
  },
  {
    id: 'bunny-medal',
    name: '🏅 Médaille de champion',
    icon: '🐰🏅',
    category: 'bow',
    requiredStars: 100,
    tier: 3,
    description: 'La médaille des champions des maths'
  },

  // TIER 4 - Legendary accessories (unlocked at 200 stars)
  {
    id: 'bunny-rocket',
    name: '🚀 Fusée turbo',
    icon: '🐰🚀',
    category: 'background',
    requiredStars: 200,
    tier: 4,
    description: 'Un turbo mathématique !'
  },
  {
    id: 'bunny-rainbow',
    name: '🌈 Arc-en-ciel magique',
    icon: '🐰🌈',
    category: 'background',
    requiredStars: 200,
    tier: 4,
    description: 'CalcuLapin voyage sur un arc-en-ciel'
  },
  {
    id: 'bunny-fire',
    name: '🔥 Superpuissance feu',
    icon: '🐰🔥',
    category: 'background',
    requiredStars: 200,
    tier: 4,
    description: 'Un lapin en feu... de passion pour les maths !'
  },

  // TIER 5 - Ultimate accessories (unlocked at 500 stars)
  {
    id: 'bunny-ultimate',
    name: '⚡ Forme suprême',
    icon: '🐰⚡',
    category: 'hat',
    requiredStars: 500,
    tier: 5,
    description: 'La transformation ultime du lapin mathématique'
  },
  {
    id: 'bunny-legendary',
    name: '🌟 Forme légendaire',
    icon: '🐰🌟',
    category: 'glasses',
    requiredStars: 500,
    tier: 5,
    description: 'CalcuLapin légendaire, gardien des mathématiques'
  },
] as const;

/**
 * Get accessories unlocked for a given number of stars
 */
export function getUnlockedAccessories(totalStars: number) {
  return ACCESSORIES.filter(acc => totalStars >= acc.requiredStars);
}

/**
 * Get the next accessory to unlock
 */
export function getNextAccessoryToUnlock(totalStars: number) {
  const locked = ACCESSORIES.filter(acc => totalStars < acc.requiredStars);
  if (locked.length === 0) return null;
  return locked.reduce((prev, current) => 
    current.requiredStars < prev.requiredStars ? current : prev
  );
}

/**
 * Get accessories grouped by tier
 */
export function getAccessoriesByTier(tier: number) {
  return ACCESSORIES.filter(acc => acc.tier === tier);
}

/**
 * Get progress toward next accessory tier
 */
export function getAccessoryProgress(totalStars: number) {
  const currentTier = Math.min(
    5,
    Math.max(1, Math.floor(totalStars / 50) + 1)
  );

  const unlockedCount = getUnlockedAccessories(totalStars).length;
  const nextAccessory = getNextAccessoryToUnlock(totalStars);

  return {
    currentTier,
    unlockedCount,
    totalCount: ACCESSORIES.length,
    nextAccessory,
    starsUntilNext: nextAccessory
      ? Math.max(0, nextAccessory.requiredStars - totalStars)
      : 0,
  };
}
