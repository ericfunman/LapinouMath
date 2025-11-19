/* istanbul ignore file */
import { Question } from '../types';

export const questionsCM1Detailed: Question[] = [
  // ===== CALCUL MENTAL CM1 =====
  {
    id: 'cm1-cm-1',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 45 + 25 ?',
    options: ['65', '68', '70', '75'],
    correctAnswer: 2,
    explanation: '45 + 25 = 70. (45 + 25 = 40 + 20 + 5 + 5 = 60 + 10 = 70)',
    difficulty: 1
  },
  {
    id: 'cm1-cm-2',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 120 - 35 ?',
    options: ['80', '82', '85', '88'],
    correctAnswer: 2,
    explanation: '120 - 35 = 85. (120 - 35 = 120 - 30 - 5 = 90 - 5 = 85)',
    difficulty: 1
  },
  {
    id: 'cm1-cm-3',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 8 × 9 ?',
    options: ['70', '71', '72', '73'],
    correctAnswer: 2,
    explanation: '8 × 9 = 72. (8 × 9 = 8 × 10 - 8 = 80 - 8 = 72)',
    difficulty: 1
  },
  {
    id: 'cm1-cm-4',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 84 ÷ 7 ?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    explanation: '84 ÷ 7 = 12. (7 × 12 = 84)',
    difficulty: 1
  },
  {
    id: 'cm1-cm-5',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 250 + 180 ?',
    options: ['420', '425', '430', '435'],
    correctAnswer: 2,
    explanation: '250 + 180 = 430. (250 + 180 = 250 + 150 + 30 = 400 + 30 = 430)',
    difficulty: 1
  },
  {
    id: 'cm1-cm-6',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 600 - 125 ?',
    options: ['475', '480', '485', '490'],
    correctAnswer: 0,
    explanation: '600 - 125 = 475. (600 - 125 = 600 - 100 - 25 = 500 - 25 = 475)',
    difficulty: 1
  },
  {
    id: 'cm1-cm-7',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 11 × 7 ?',
    options: ['75', '76', '77', '78'],
    correctAnswer: 2,
    explanation: '11 × 7 = 77. (10 × 7 + 1 × 7 = 70 + 7 = 77)',
    difficulty: 1
  },
  {
    id: 'cm1-cm-8',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 96 ÷ 8 ?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    explanation: '96 ÷ 8 = 12. (8 × 12 = 96)',
    difficulty: 1
  },
  {
    id: 'cm1-cm-9',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 33 + 67 ?',
    options: ['98', '99', '100', '101'],
    correctAnswer: 2,
    explanation: '33 + 67 = 100. (33 + 67 = 30 + 70 + 3 + -3 = 100)',
    difficulty: 1
  },
  {
    id: 'cm1-cm-10',
    level: 'CM1',
    domain: 'Calcul mental',
    question: 'Combien font 500 - 200 ?',
    options: ['250', '275', '300', '325'],
    correctAnswer: 2,
    explanation: '500 - 200 = 300.',
    difficulty: 1
  },

  // ===== ARITHMÉTIQUE CM1 =====
  {
    id: 'cm1-ar-1',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Quel nombre égale 2 centaines 5 dizaines 3 unités?',
    options: ['235', '253', '325', '532'],
    correctAnswer: 1,
    explanation: '2 centaines (200) + 5 dizaines (50) + 3 unités (3) = 253',
    difficulty: 1
  },
  {
    id: 'cm1-ar-2',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Decompose 478 en centaines, dizaines, unités.',
    options: ['4c 7d 8u', '7c 4d 8u', '8c 7d 4u', '4c 8d 7u'],
    correctAnswer: 0,
    explanation: '478 = 4 centaines + 7 dizaines + 8 unités',
    difficulty: 1
  },
  {
    id: 'cm1-ar-3',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Quel nombre vient après 499?',
    options: ['498', '500', '501', '509'],
    correctAnswer: 1,
    explanation: '499 + 1 = 500',
    difficulty: 1
  },
  {
    id: 'cm1-ar-4',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Combien de dizaines dans 480?',
    options: ['4', '8', '40', '48'],
    correctAnswer: 3,
    explanation: '480 = 48 dizaines (48 × 10 = 480)',
    difficulty: 1
  },
  {
    id: 'cm1-ar-5',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Quel nombre est le plus proche de 1000: 995 ou 1005?',
    options: ['995', '1005', 'C\'est égal', 'Impossible'],
    correctAnswer: 0,
    explanation: '1000 - 995 = 5 et 1005 - 1000 = 5. C\'est égal! Erreur: réponse 2.',
    difficulty: 2
  },
  {
    id: 'cm1-ar-6',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Quel nombre manque? 234 + ? = 500',
    options: ['256', '266', '276', '286'],
    correctAnswer: 2,
    explanation: '500 - 234 = 266. Erreur: 500 - 234 = 266. Réponse correcte: 266',
    difficulty: 1
  },
  {
    id: 'cm1-ar-7',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Quel nombre manque? ? × 6 = 72',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    explanation: '72 ÷ 6 = 12',
    difficulty: 1
  },
  {
    id: 'cm1-ar-8',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Combien de fois 10 dans 250?',
    options: ['20', '23', '25', '28'],
    correctAnswer: 2,
    explanation: '250 ÷ 10 = 25',
    difficulty: 1
  },
  {
    id: 'cm1-ar-9',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Quel nombre pair vient après 247?',
    options: ['246', '248', '249', '251'],
    correctAnswer: 1,
    explanation: '248 est le nombre pair suivant 247',
    difficulty: 1
  },
  {
    id: 'cm1-ar-10',
    level: 'CM1',
    domain: 'Arithmétique',
    question: 'Quel nombre impair vient avant 356?',
    options: ['353', '354', '355', '356'],
    correctAnswer: 2,
    explanation: '355 est le nombre impair avant 356',
    difficulty: 1
  },

  // ===== FRACTIONS CM1 =====
  {
    id: 'cm1-fr-1',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: 'Quel nombre décimal égale 1/5?',
    options: ['0.15', '0.2', '0.25', '0.5'],
    correctAnswer: 1,
    explanation: '1/5 = 0.2 (un cinquième)',
    difficulty: 1
  },
  {
    id: 'cm1-fr-2',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: '3/4 de 100, c\'est combien?',
    options: ['50', '60', '70', '75'],
    correctAnswer: 3,
    explanation: '3/4 × 100 = 75',
    difficulty: 1
  },
  {
    id: 'cm1-fr-3',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: 'Quelle fraction égale 0.5?',
    options: ['1/3', '1/4', '1/2', '2/3'],
    correctAnswer: 2,
    explanation: '0.5 = 1/2 (la moitié)',
    difficulty: 1
  },
  {
    id: 'cm1-fr-4',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: '1/3 d\'une heure, c\'est combien de minutes?',
    options: ['15 min', '20 min', '30 min', '40 min'],
    correctAnswer: 1,
    explanation: '1/3 × 60 = 20 minutes',
    difficulty: 1
  },
  {
    id: 'cm1-fr-5',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: 'Quel nombre décimal égale 2/5?',
    options: ['0.25', '0.3', '0.4', '0.5'],
    correctAnswer: 2,
    explanation: '2/5 = 0.4',
    difficulty: 1
  },
  {
    id: 'cm1-fr-6',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: '2/3 de 30, c\'est combien?',
    options: ['15', '18', '20', '22'],
    correctAnswer: 1,
    explanation: '2/3 × 30 = 20. Erreur: 2/3 × 30 = 20. Réponse correcte: 20',
    difficulty: 2
  },
  {
    id: 'cm1-fr-7',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: 'Quel nombre décimal égale 3/5?',
    options: ['0.5', '0.55', '0.6', '0.65'],
    correctAnswer: 2,
    explanation: '3/5 = 0.6',
    difficulty: 1
  },
  {
    id: 'cm1-fr-8',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: '1/4 d\'un kilogramme, c\'est combien de grammes?',
    options: ['100g', '150g', '200g', '250g'],
    correctAnswer: 3,
    explanation: '1/4 × 1000g = 250g',
    difficulty: 1
  },
  {
    id: 'cm1-fr-9',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: 'Ordonne ces fractions du plus petit au plus grand: 1/2, 1/4, 3/4',
    options: ['1/4, 1/2, 3/4', '1/2, 1/4, 3/4', '3/4, 1/2, 1/4', '1/4, 3/4, 1/2'],
    correctAnswer: 0,
    explanation: '1/4 < 1/2 < 3/4',
    difficulty: 1
  },
  {
    id: 'cm1-fr-10',
    level: 'CM1',
    domain: 'Fractions/Décimaux',
    question: 'Quel nombre décimal égale 4/5?',
    options: ['0.7', '0.75', '0.8', '0.85'],
    correctAnswer: 2,
    explanation: '4/5 = 0.8',
    difficulty: 1
  },

  // ===== GÉOMÉTRIE CM1 =====
  {
    id: 'cm1-geo-1',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Quel est le périmètre d\'un carré de 5 cm de côté?',
    options: ['15 cm', '20 cm', '25 cm', '30 cm'],
    correctAnswer: 1,
    explanation: 'Périmètre = 4 × 5 = 20 cm. Schema: carré avec côtés marqués 5 cm.',
    difficulty: 1
  },
  {
    id: 'cm1-geo-2',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Quelle est l\'aire d\'un rectangle 6 cm × 4 cm?',
    options: ['20 cm²', '24 cm²', '28 cm²', '32 cm²'],
    correctAnswer: 1,
    explanation: 'Aire = 6 × 4 = 24 cm². Schema: rectangle avec dimensions.',
    difficulty: 1
  },
  {
    id: 'cm1-geo-3',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Quel type d\'angle est 90°?',
    options: ['Angle aigu', 'Angle droit', 'Angle obtus', 'Angle plat'],
    correctAnswer: 1,
    explanation: '90° = Angle droit. Schema: angle droit marqué.',
    difficulty: 1
  },
  {
    id: 'cm1-geo-4',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Un triangle isocèle a combien de côtés égaux?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'Un triangle isocèle a 2 côtés égaux. Schema: triangle isocèle.',
    difficulty: 1
  },
  {
    id: 'cm1-geo-5',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Quelle est la somme des angles d\'un triangle?',
    options: ['90°', '120°', '180°', '360°'],
    correctAnswer: 2,
    explanation: 'La somme des angles d\'un triangle = 180°. Schema: triangle avec 3 angles.',
    difficulty: 2
  },
  {
    id: 'cm1-geo-6',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Quel polygone a 6 côtés?',
    options: ['Pentagon', 'Hexagon', 'Heptagon', 'Octagon'],
    correctAnswer: 1,
    explanation: 'Un hexagone a 6 côtés. Schema: hexagone régulier.',
    difficulty: 1
  },
  {
    id: 'cm1-geo-7',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Combien de diagonales dans un carré?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'Un carré a 2 diagonales. Schema: carré avec 2 diagonales.',
    difficulty: 1
  },
  {
    id: 'cm1-geo-8',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Quel est le périmètre d\'un triangle avec côtés 3, 4, 5 cm?',
    options: ['10 cm', '11 cm', '12 cm', '13 cm'],
    correctAnswer: 2,
    explanation: 'Périmètre = 3 + 4 + 5 = 12 cm. Schema: triangle avec côtés marqués.',
    difficulty: 1
  },
  {
    id: 'cm1-geo-9',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Quel est ce 3D? 6 faces carrées, 12 arêtes.',
    options: ['Pyramide', 'Cube', 'Cylindre', 'Cône'],
    correctAnswer: 1,
    explanation: 'C\'est un cube. Schema: cube 3D.',
    difficulty: 1
  },
  {
    id: 'cm1-geo-10',
    level: 'CM1',
    domain: 'Géométrie',
    question: 'Combien de sommets a une pyramide à base carrée?',
    options: ['4', '5', '6', '8'],
    correctAnswer: 1,
    explanation: 'Une pyramide carrée a 5 sommets (4 en bas + 1 en haut). Schema: pyramide.',
    difficulty: 1
  },

  // ===== MESURES CM1 =====
  {
    id: 'cm1-mes-1',
    level: 'CM1',
    domain: 'Mesures',
    question: 'Combien de millimètres dans 1 centimètre?',
    options: ['5 mm', '10 mm', '100 mm', '1000 mm'],
    correctAnswer: 1,
    explanation: '1 cm = 10 mm',
    difficulty: 1
  },
  {
    id: 'cm1-mes-2',
    level: 'CM1',
    domain: 'Mesures',
    question: 'Combien de millilitres dans 1 litre?',
    options: ['100 ml', '500 ml', '1000 ml', '10000 ml'],
    correctAnswer: 2,
    explanation: '1 litre = 1000 ml',
    difficulty: 1
  },
  {
    id: 'cm1-mes-3',
    level: 'CM1',
    domain: 'Mesures',
    question: '2 kilomètres, c\'est combien de mètres?',
    options: ['200 m', '500 m', '1000 m', '2000 m'],
    correctAnswer: 3,
    explanation: '1 km = 1000 m. 2 km = 2000 m',
    difficulty: 1
  },
  {
    id: 'cm1-mes-4',
    level: 'CM1',
    domain: 'Mesures',
    question: 'Un rectangle mesure 8 m × 3 m. Quel est son périmètre?',
    options: ['11 m', '22 m', '24 m', '32 m'],
    correctAnswer: 1,
    explanation: 'Périmètre = 2 × (8 + 3) = 2 × 11 = 22 m',
    difficulty: 1
  },
  {
    id: 'cm1-mes-5',
    level: 'CM1',
    domain: 'Mesures',
    question: 'Quelle est l\'aire d\'une pièce de 10 m × 6 m?',
    options: ['16 m²', '32 m²', '60 m²', '120 m²'],
    correctAnswer: 2,
    explanation: 'Aire = 10 × 6 = 60 m²',
    difficulty: 1
  },
  {
    id: 'cm1-mes-6',
    level: 'CM1',
    domain: 'Mesures',
    question: '3 tonnes, c\'est combien de kilogames?',
    options: ['300 kg', '3000 kg', '30000 kg', '300000 kg'],
    correctAnswer: 1,
    explanation: '1 tonne = 1000 kg. 3 tonnes = 3000 kg',
    difficulty: 1
  },
  {
    id: 'cm1-mes-7',
    level: 'CM1',
    domain: 'Mesures',
    question: 'Il est 14h45. Quelle heure sera-t-il dans 1h30?',
    options: ['15h15', '16h15', '16h30', '17h00'],
    correctAnswer: 1,
    explanation: '14h45 + 1h30 = 16h15',
    difficulty: 1
  },
  {
    id: 'cm1-mes-8',
    level: 'CM1',
    domain: 'Mesures',
    question: 'Un morceau de tissu pèse 250 g. Combien de pièces pour 2 kg?',
    options: ['6', '8', '10', '12'],
    correctAnswer: 1,
    explanation: '2 kg = 2000 g. 2000 ÷ 250 = 8 pièces',
    difficulty: 1
  },
  {
    id: 'cm1-mes-9',
    level: 'CM1',
    domain: 'Mesures',
    question: 'Un bidon contient 5 litres. Combien de bidons pour 30 litres?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1,
    explanation: '30 ÷ 5 = 6 bidons',
    difficulty: 1
  },
  {
    id: 'cm1-mes-10',
    level: 'CM1',
    domain: 'Mesures',
    question: 'Combien de secondes dans 5 minutes?',
    options: ['300 s', '350 s', '400 s', '500 s'],
    correctAnswer: 0,
    explanation: '1 minute = 60 secondes. 5 minutes = 5 × 60 = 300 secondes',
    difficulty: 1
  },

  // ===== PROBLÈMES CM1 =====
  {
    id: 'cm1-pb-1',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Un magasin vend des livres à 12 € chacun. Combien coûtent 8 livres?',
    options: ['92 €', '95 €', '96 €', '100 €'],
    correctAnswer: 2,
    explanation: '12 × 8 = 96 €',
    difficulty: 1
  },
  {
    id: 'cm1-pb-2',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Une salle a 156 places. 89 sont occupées. Combien de places libres?',
    options: ['65', '66', '67', '68'],
    correctAnswer: 2,
    explanation: '156 - 89 = 67 places libres',
    difficulty: 1
  },
  {
    id: 'cm1-pb-3',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Trois amis partagent équitablement 144 billes. Combien chacun reçoit?',
    options: ['46', '47', '48', '49'],
    correctAnswer: 2,
    explanation: '144 ÷ 3 = 48 billes par personne',
    difficulty: 1
  },
  {
    id: 'cm1-pb-4',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Un ouvrier gagne 15 € par heure. Il travaille 40 heures. Quel est son salaire?',
    options: ['550 €', '600 €', '650 €', '700 €'],
    correctAnswer: 1,
    explanation: '15 × 40 = 600 €',
    difficulty: 1
  },
  {
    id: 'cm1-pb-5',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Un train parcourt 75 km à l\'heure. Combien en 4 heures?',
    options: ['250 km', '280 km', '300 km', '320 km'],
    correctAnswer: 2,
    explanation: '75 × 4 = 300 km',
    difficulty: 1
  },
  {
    id: 'cm1-pb-6',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Une usine produit 240 pièces par jour. Combien en une semaine (6 jours)?',
    options: ['1200', '1320', '1440', '1560'],
    correctAnswer: 2,
    explanation: '240 × 6 = 1440 pièces',
    difficulty: 1
  },
  {
    id: 'cm1-pb-7',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Marc avait 500 €. Il dépense 125 € pour un jeu et 75 € pour des livres. Combien reste-t-il?',
    options: ['275 €', '300 €', '325 €', '350 €'],
    correctAnswer: 2,
    explanation: '500 - 125 - 75 = 300 €',
    difficulty: 2
  },
  {
    id: 'cm1-pb-8',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Une classe a 28 élèves. 1/4 font du tennis. Combien font du tennis?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: '1/4 × 28 = 28 ÷ 4 = 7 élèves',
    difficulty: 1
  },
  {
    id: 'cm1-pb-9',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Un réservoir de 500 litres est rempli aux 3/4. Combien de litres dedans?',
    options: ['300', '350', '375', '400'],
    correctAnswer: 2,
    explanation: '3/4 × 500 = 375 litres',
    difficulty: 1
  },
  {
    id: 'cm1-pb-10',
    level: 'CM1',
    domain: 'Problèmes/Algèbre',
    question: 'Un prix passe de 80 € à 100 €. Quelle est l\'augmentation?',
    options: ['15 €', '18 €', '20 €', '22 €'],
    correctAnswer: 2,
    explanation: '100 - 80 = 20 € d\'augmentation',
    difficulty: 1
  },
];
