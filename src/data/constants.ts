import { Accessory } from '../types';

export const ACCESSORIES: Accessory[] = [
  { id: 'hat1', name: 'Chapeau magicien', type: 'hat', icon: '🎩', requiredStars: 5 },
  { id: 'hat2', name: 'Casquette', type: 'hat', icon: '🧢', requiredStars: 10 },
  { id: 'hat3', name: 'Couronne', type: 'hat', icon: '👑', requiredStars: 20 },
  { id: 'glasses1', name: 'Lunettes de soleil', type: 'glasses', icon: '🕶️', requiredStars: 8 },
  { id: 'glasses2', name: 'Lunettes rondes', type: 'glasses', icon: '👓', requiredStars: 15 },
  { id: 'bow1', name: 'Nœud papillon', type: 'bow', icon: '🎀', requiredStars: 12 },
  { id: 'bow2', name: 'Nœud rouge', type: 'bow', icon: '🎗️', requiredStars: 18 },
  { id: 'scarf1', name: 'Écharpe bleue', type: 'scarf', icon: '🧣', requiredStars: 25 },
  { id: 'bg1', name: 'Fond étoilé', type: 'background', icon: '⭐', requiredStars: 30 },
  { id: 'bg2', name: 'Fond arc-en-ciel', type: 'background', icon: '🌈', requiredStars: 40 },
];

export const GRADE_LEVELS = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'] as const;

export const MATH_DOMAINS = [
  'Calcul mental',
  'Arithmétique',
  'Géométrie',
  'Fractions/Décimaux',
  'Mesures',
  'Problèmes/Algèbre'
] as const;

export const QUESTIONS_PER_DOMAIN = 20;
export const QUESTIONS_TO_UNLOCK_NEXT = 15;
export const MIN_SUCCESS_RATE = 0.75;
