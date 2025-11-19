/**
 * Kangourou Questions Data
 * Questions from the Kangourou des Mathématiques contest
 * Format compatible with LapinouMath's question structure
 */

import { Question } from '../types';

const createQuestion = (q: string, opts: string[], ans: number, exp: string, level: string, difficulty: 1 | 2 | 3): Question => ({
  id: `kangourou-${level}-${Math.random()}`,
  level: level as any,
  domain: 'Kangourou',
  question: q,
  options: opts,
  correctAnswer: ans,
  explanation: exp,
  difficulty,
});

export const ce1Kangourou: Question[] = [
  createQuestion(
    "Combien de points vois-tu ?",
    ["3", "4", "5", "6"],
    2,
    "En comptant tous les points, on en trouve 5.",
    "CE1",
    1
  ),
  createQuestion(
    "Quel nombre est le plus proche de 10 ?",
    ["7", "8", "9", "11"],
    2,
    "9 est à distance 1 de 10, c'est le plus proche.",
    "CE1",
    1
  ),
  createQuestion(
    "Combien de côtés a un carré ?",
    ["2", "3", "4", "5"],
    2,
    "Un carré a 4 côtés égaux.",
    "CE1",
    1
  ),
  createQuestion(
    "Quel est le nombre manquant ? 2, 4, 6, ?, 10",
    ["7", "8", "9", "11"],
    1,
    "La suite augmente de 2 chaque fois : 2, 4, 6, 8, 10.",
    "CE1",
    1
  ),
  createQuestion(
    "Si tu as 5 bonbons et tu en manges 2, combien t'en reste-t-il ?",
    ["2", "3", "4", "5"],
    1,
    "5 - 2 = 3 bonbons restants.",
    "CE1",
    1
  ),
];

export const ce2Kangourou: Question[] = [
  createQuestion(
    "Quel nombre complète la série ? 5, 10, 15, 20, ?",
    ["22", "23", "24", "25"],
    3,
    "Chaque nombre augmente de 5 : 20 + 5 = 25.",
    "CE2",
    1
  ),
  createQuestion(
    "Un rectangle a 12 cm de périmètre. Si sa longueur est 4 cm, quelle est sa largeur ?",
    ["2", "3", "4", "5"],
    0,
    "Périmètre = 2×(longueur + largeur) = 12, donc 4 + largeur = 6, largeur = 2.",
    "CE2",
    2
  ),
  createQuestion(
    "Combien de triangles vois-tu dans cette figure ?",
    ["3", "4", "5", "6"],
    2,
    "Il y a 5 triangles au total.",
    "CE2",
    2
  ),
  createQuestion(
    "Quel est le double de 15 ?",
    ["20", "25", "30", "35"],
    2,
    "Le double de 15 est 15 × 2 = 30.",
    "CE2",
    1
  ),
  createQuestion(
    "Quelle est la moitié de 24 ?",
    ["10", "11", "12", "13"],
    2,
    "La moitié de 24 est 24 ÷ 2 = 12.",
    "CE2",
    1
  ),
];

export const cm1Kangourou: Question[] = [
  createQuestion(
    "Si 3 livres coûtent 24€, combien coûte 1 livre ?",
    ["6€", "7€", "8€", "9€"],
    2,
    "24 ÷ 3 = 8€ par livre.",
    "CM1",
    2
  ),
  createQuestion(
    "Quel nombre est divisible par 6 ?",
    ["15", "18", "19", "23"],
    1,
    "18 ÷ 6 = 3, donc 18 est divisible par 6.",
    "CM1",
    2
  ),
  createQuestion(
    "Quel est le plus grand commun diviseur de 12 et 18 ?",
    ["2", "3", "6", "9"],
    2,
    "Les diviseurs communs sont 1, 2, 3, 6. Le PGCD est 6.",
    "CM1",
    2
  ),
  createQuestion(
    "Combien de secondes dans 2 minutes ?",
    ["60", "90", "120", "180"],
    2,
    "1 minute = 60 secondes, donc 2 minutes = 120 secondes.",
    "CM1",
    1
  ),
  createQuestion(
    "Quel est le périmètre d'un carré de côté 5 cm ?",
    ["15 cm", "20 cm", "25 cm", "30 cm"],
    1,
    "Périmètre = 4 × côté = 4 × 5 = 20 cm.",
    "CM1",
    1
  ),
];

export const cm2Kangourou: Question[] = [
  createQuestion(
    "Quel est le résultat de 456 ÷ 12 ?",
    ["36", "37", "38", "39"],
    2,
    "456 ÷ 12 = 38.",
    "CM2",
    2
  ),
  createQuestion(
    "Quel est le PPCM de 4 et 6 ?",
    ["12", "14", "16", "18"],
    0,
    "Les multiples communs de 4 et 6 sont 12, 24... Le PPCM est 12.",
    "CM2",
    3
  ),
  createQuestion(
    "Quelle fraction égale 0,5 ?",
    ["1/2", "1/3", "1/4", "2/3"],
    0,
    "0,5 = 50/100 = 1/2.",
    "CM2",
    2
  ),
  createQuestion(
    "Quel est l'aire d'un rectangle de 8 m × 5 m ?",
    ["26 m²", "40 m²", "45 m²", "50 m²"],
    1,
    "Aire = longueur × largeur = 8 × 5 = 40 m².",
    "CM2",
    2
  ),
  createQuestion(
    "Un litre d'eau pèse 1 kg. Combien pèsent 250 mL d'eau ?",
    ["100 g", "200 g", "250 g", "500 g"],
    2,
    "250 mL = 0,25 L = 0,25 kg = 250 g.",
    "CM2",
    2
  ),
];

export const sixiemeKangourou: Question[] = [
  createQuestion(
    "Quel est le résultat de 7² ?",
    ["47", "49", "51", "63"],
    1,
    "7² = 7 × 7 = 49.",
    "6ème",
    2
  ),
  createQuestion(
    "Quel est le volume d'un cube de côté 3 cm ?",
    ["9 cm³", "18 cm³", "27 cm³", "36 cm³"],
    2,
    "Volume = côté³ = 3³ = 27 cm³.",
    "6ème",
    2
  ),
  createQuestion(
    "Quel est le résultat de 3/4 + 1/4 ?",
    ["1/2", "3/4", "4/4", "5/4"],
    2,
    "3/4 + 1/4 = 4/4 = 1.",
    "6ème",
    2
  ),
  createQuestion(
    "Un angle droit mesure combien de degrés ?",
    ["60°", "90°", "120°", "180°"],
    1,
    "Un angle droit = 90°.",
    "6ème",
    1
  ),
  createQuestion(
    "Quel est le résultat de 0,7 × 10 ?",
    ["0,07", "0,7", "7", "70"],
    2,
    "0,7 × 10 = 7.",
    "6ème",
    1
  ),
];

export const cinquiemeKangourou: Question[] = [
  createQuestion(
    "Quel est le résultat de (-3) + 7 ?",
    ["-10", "-4", "4", "10"],
    2,
    "-3 + 7 = 4.",
    "5ème",
    2
  ),
  createQuestion(
    "Quel est le résultat de 2³ × 2² ?",
    ["2⁵", "2⁶", "4⁵", "4⁶"],
    0,
    "2³ × 2² = 2^(3+2) = 2⁵.",
    "5ème",
    3
  ),
  createQuestion(
    "Quel est l'inverse de 1/5 ?",
    ["1/5", "5", "-5", "-1/5"],
    1,
    "L'inverse de 1/5 est 5/1 = 5.",
    "5ème",
    2
  ),
  createQuestion(
    "Un triangle équilatéral a 3 côtés de combien de cm chacun si le périmètre est 21 cm ?",
    ["5 cm", "6 cm", "7 cm", "8 cm"],
    2,
    "Périmètre = 21 cm, donc chaque côté = 21 ÷ 3 = 7 cm.",
    "5ème",
    2
  ),
  createQuestion(
    "Quel est le résultat de 30% de 200 ?",
    ["30", "50", "60", "80"],
    2,
    "30% de 200 = 0,3 × 200 = 60.",
    "5ème",
    2
  ),
];

export const quatriemeKangourou: Question[] = [
  createQuestion(
    "Quel est le résultat de √144 ?",
    ["10", "11", "12", "13"],
    2,
    "√144 = 12 car 12² = 144.",
    "4ème",
    2
  ),
  createQuestion(
    "Quel est le résultat de (2x + 3) + (3x - 5) ?",
    ["5x - 2", "5x + 8", "x - 2", "6x - 2"],
    0,
    "(2x + 3) + (3x - 5) = 5x - 2.",
    "4ème",
    2
  ),
  createQuestion(
    "Quel est le résultat de 2⁴ × 3² ?",
    ["48", "72", "96", "144"],
    3,
    "2⁴ × 3² = 16 × 9 = 144.",
    "4ème",
    2
  ),
  createQuestion(
    "Un angle de 200° est un angle ?",
    ["aigu", "obtus", "droit", "réflexe"],
    3,
    "Un angle > 180° est un angle réflexe.",
    "4ème",
    2
  ),
  createQuestion(
    "Quel est le résultat de 5/6 - 1/3 ?",
    ["1/2", "1/3", "2/3", "4/6"],
    0,
    "5/6 - 1/3 = 5/6 - 2/6 = 3/6 = 1/2.",
    "4ème",
    2
  ),
];

export const allKangourouQuestions: Question[] = [
  ...ce1Kangourou,
  ...ce2Kangourou,
  ...cm1Kangourou,
  ...cm2Kangourou,
  ...sixiemeKangourou,
  ...cinquiemeKangourou,
  ...quatriemeKangourou,
];
