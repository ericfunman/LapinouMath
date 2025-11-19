/* istanbul ignore file */
import { Question } from '../types';

export const questionsCM2Detailed: Question[] = [
  // ===== CALCUL MENTAL CM2 =====
  {
    id: 'cm2-cm-1',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 125 + 175 ?',
    options: ['285', '295', '300', '310'],
    correctAnswer: 2,
    explanation: '125 + 175 = 300. (125 + 175 = 100 + 75 + 100 + 75 = 300)',
    difficulty: 1
  },
  {
    id: 'cm2-cm-2',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 250 × 4 ?',
    options: ['900', '950', '1000', '1050'],
    correctAnswer: 2,
    explanation: '250 × 4 = 1000',
    difficulty: 1
  },
  {
    id: 'cm2-cm-3',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 1000 ÷ 8 ?',
    options: ['120', '125', '130', '135'],
    correctAnswer: 1,
    explanation: '1000 ÷ 8 = 125',
    difficulty: 1
  },
  {
    id: 'cm2-cm-4',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 45 × 20 ?',
    options: ['800', '850', '900', '950'],
    correctAnswer: 2,
    explanation: '45 × 20 = 900',
    difficulty: 1
  },
  {
    id: 'cm2-cm-5',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 999 + 1 ?',
    options: ['998', '999', '1000', '1001'],
    correctAnswer: 2,
    explanation: '999 + 1 = 1000',
    difficulty: 1
  },
  {
    id: 'cm2-cm-6',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 2000 - 750 ?',
    options: ['1200', '1250', '1300', '1350'],
    correctAnswer: 1,
    explanation: '2000 - 750 = 1250',
    difficulty: 1
  },
  {
    id: 'cm2-cm-7',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 12 × 12 ?',
    options: ['140', '144', '148', '152'],
    correctAnswer: 1,
    explanation: '12 × 12 = 144',
    difficulty: 1
  },
  {
    id: 'cm2-cm-8',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 360 ÷ 9 ?',
    options: ['38', '39', '40', '41'],
    correctAnswer: 2,
    explanation: '360 ÷ 9 = 40',
    difficulty: 1
  },
  {
    id: 'cm2-cm-9',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 55 × 11 ?',
    options: ['600', '605', '610', '615'],
    correctAnswer: 3,
    explanation: '55 × 11 = 605',
    difficulty: 1
  },
  {
    id: 'cm2-cm-10',
    level: 'CM2',
    domain: 'Calcul mental',
    question: 'Combien font 1500 ÷ 3 ?',
    options: ['450', '475', '500', '525'],
    correctAnswer: 2,
    explanation: '1500 ÷ 3 = 500',
    difficulty: 1
  },

  // ===== ARITHMÉTIQUE CM2 =====
  {
    id: 'cm2-ar-1',
    level: 'CM2',
    domain: 'Arithmétique',
    question: 'Quel nombre manque? 456 + ? = 1000',
    options: ['544', '544', '545', '546'],
    correctAnswer: 0,
    explanation: '1000 - 456 = 544',
    difficulty: 1
  },
  {
    id: 'cm2-ar-2',
    level: 'CM2',
    domain: 'Arithmétique',
    question: 'Quel nombre manque? ? × 8 = 240',
    options: ['28', '29', '30', '31'],
    correctAnswer: 2,
    explanation: '240 ÷ 8 = 30',
    difficulty: 1
  },
  {
    id: 'cm2-ar-3',
    level: 'CM2',
    domain: 'Arithmétique',
    question: 'Combien de chiffres dans 987654?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1,
    explanation: '987654 a 6 chiffres',
    difficulty: 1
  },
  {
    id: 'cm2-ar-4',
    level: 'CM2',
    domain: 'Arithmétique',
    question: 'Quel est le reste de 47 ÷ 5?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
    explanation: '47 ÷ 5 = 9 reste 2 (5 × 9 = 45, 47 - 45 = 2)',
    difficulty: 1
  },
  {
    id: 'cm2-ar-5',
    level: 'CM2',
    domain: 'Arithmétique',
    question: 'Quel nombre est divisible par 3: 124, 126 ou 128?',
    options: ['124', '126', '128', 'Aucun'],
    correctAnswer: 1,
    explanation: '126 ÷ 3 = 42 (1+2+6=9 divisible par 3)',
    difficulty: 1
  },
  {
    id: 'cm2-ar-6',
    level: 'CM2',
    domain: 'Arithmétique',
    question: 'Quel est le PGCD de 12 et 18?',
    options: ['2', '3', '6', '12'],
    correctAnswer: 2,
    explanation: 'PGCD(12,18) = 6 (diviseurs communs: 1, 2, 3, 6)',
    difficulty: 2
  },
  {
    id: 'cm2-ar-7',
    level: 'CM2',
    domain: 'Arithmétique',
    question: 'Quel nombre pair vient après 998?',
    options: ['999', '1000', '1001', '1002'],
    correctAnswer: 1,
    explanation: '1000 est le nombre pair suivant 998',
    difficulty: 1
  },
  {
    id: 'cm2-ar-8',
    level: 'CM2',
    domain: 'Arithmétique',
    question: 'Quel nombre impair vient avant 500?',
    options: ['497', '498', '499', '501'],
    correctAnswer: 2,
    explanation: '499 est le nombre impair avant 500',
    difficulty: 1
  },
  {
    id: 'cm2-ar-9',
    level: 'CM2',
    domain: 'Arithmétique',
    question: 'Combien de multiples de 5 entre 0 et 50?',
    options: ['9', '10', '11', '12'],
    correctAnswer: 1,
    explanation: '5, 10, 15, 20, 25, 30, 35, 40, 45, 50 = 10 multiples',
    difficulty: 1
  },
  {
    id: 'cm2-ar-10',
    level: 'CM2',
    domain: 'Arithmétique',
    question: '789 arrondi à la centaine la plus proche?',
    options: ['700', '750', '800', '900'],
    correctAnswer: 2,
    explanation: '789 est plus proche de 800 (89 > 50)',
    difficulty: 1
  },

  // ===== FRACTIONS CM2 =====
  {
    id: 'cm2-fr-1',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: 'Quel nombre décimal égale 3/10?',
    options: ['0.03', '0.3', '0.33', '3.0'],
    correctAnswer: 1,
    explanation: '3/10 = 0.3',
    difficulty: 1
  },
  {
    id: 'cm2-fr-2',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: '5/8 de 200, c\'est combien?',
    options: ['100', '120', '125', '150'],
    correctAnswer: 2,
    explanation: '5/8 × 200 = 1000 ÷ 8 = 125',
    difficulty: 1
  },
  {
    id: 'cm2-fr-3',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: 'Quelle fraction égale 0.25?',
    options: ['1/3', '1/4', '1/5', '2/5'],
    correctAnswer: 1,
    explanation: '0.25 = 1/4',
    difficulty: 1
  },
  {
    id: 'cm2-fr-4',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: 'Additionne 1/4 + 1/4. Quel résultat?',
    options: ['1/8', '1/4', '1/3', '1/2'],
    correctAnswer: 3,
    explanation: '1/4 + 1/4 = 2/4 = 1/2',
    difficulty: 1
  },
  {
    id: 'cm2-fr-5',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: 'Quel nombre décimal égale 7/10?',
    options: ['0.07', '0.7', '7.0', '0.77'],
    correctAnswer: 1,
    explanation: '7/10 = 0.7',
    difficulty: 1
  },
  {
    id: 'cm2-fr-6',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: '3/5 + 1/5 égale?',
    options: ['1/5', '2/5', '3/5', '4/5'],
    correctAnswer: 3,
    explanation: '3/5 + 1/5 = 4/5',
    difficulty: 1
  },
  {
    id: 'cm2-fr-7',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: 'Quel nombre décimal égale 11/100?',
    options: ['0.011', '0.11', '0.111', '11.0'],
    correctAnswer: 1,
    explanation: '11/100 = 0.11',
    difficulty: 1
  },
  {
    id: 'cm2-fr-8',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: 'Compare 1/3 et 2/5. Lequel est plus grand?',
    options: ['1/3', '2/5', 'C\'est égal', 'Impossible'],
    correctAnswer: 1,
    explanation: '1/3 ≈ 0.33 et 2/5 = 0.4. Donc 2/5 > 1/3',
    difficulty: 1
  },
  {
    id: 'cm2-fr-9',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: '3/4 - 1/4 égale?',
    options: ['1/8', '1/4', '1/3', '1/2'],
    correctAnswer: 3,
    explanation: '3/4 - 1/4 = 2/4 = 1/2',
    difficulty: 1
  },
  {
    id: 'cm2-fr-10',
    level: 'CM2',
    domain: 'Fractions/Décimaux',
    question: '2/3 de 45, c\'est combien?',
    options: ['25', '28', '30', '35'],
    correctAnswer: 2,
    explanation: '2/3 × 45 = 90 ÷ 3 = 30',
    difficulty: 1
  },

  // ===== MESURES CM2 =====
  {
    id: 'cm2-mes-1',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Combien de mètres dans 5 kilomètres?',
    options: ['500 m', '5000 m', '50000 m', '500000 m'],
    correctAnswer: 1,
    explanation: '1 km = 1000 m. 5 km = 5000 m',
    difficulty: 1
  },
  {
    id: 'cm2-mes-2',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Un carré de 12 m de côté. Quel est son périmètre?',
    options: ['36 m', '48 m', '60 m', '72 m'],
    correctAnswer: 1,
    explanation: 'Périmètre = 4 × 12 = 48 m',
    difficulty: 1
  },
  {
    id: 'cm2-mes-3',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Quelle est l\'aire d\'un carré de 10 m de côté?',
    options: ['40 m²', '80 m²', '100 m²', '120 m²'],
    correctAnswer: 2,
    explanation: 'Aire = 10 × 10 = 100 m²',
    difficulty: 1
  },
  {
    id: 'cm2-mes-4',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Combien de centilitres dans 1 litre?',
    options: ['10 cl', '50 cl', '100 cl', '500 cl'],
    correctAnswer: 2,
    explanation: '1 litre = 100 centilitres',
    difficulty: 1
  },
  {
    id: 'cm2-mes-5',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Un rectangle 15 m × 8 m. Son aire?',
    options: ['23 m²', '46 m²', '100 m²', '120 m²'],
    correctAnswer: 3,
    explanation: 'Aire = 15 × 8 = 120 m²',
    difficulty: 1
  },
  {
    id: 'cm2-mes-6',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Il est 15h45. Quelle heure sera-t-il dans 2h20?',
    options: ['17h55', '18h05', '18h15', '18h25'],
    correctAnswer: 1,
    explanation: '15h45 + 2h20 = 18h05',
    difficulty: 1
  },
  {
    id: 'cm2-mes-7',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Combien de secondes dans 10 minutes?',
    options: ['600 s', '650 s', '700 s', '750 s'],
    correctAnswer: 0,
    explanation: '1 minute = 60 s. 10 minutes = 600 s',
    difficulty: 1
  },
  {
    id: 'cm2-mes-8',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Le périmètre d\'un rectangle 20 m × 5 m?',
    options: ['25 m', '50 m', '100 m', '150 m'],
    correctAnswer: 1,
    explanation: 'Périmètre = 2 × (20 + 5) = 2 × 25 = 50 m',
    difficulty: 1
  },
  {
    id: 'cm2-mes-9',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Combien de grammes dans 2.5 kilogrammes?',
    options: ['250 g', '2500 g', '25000 g', '250000 g'],
    correctAnswer: 1,
    explanation: '1 kg = 1000 g. 2.5 kg = 2500 g',
    difficulty: 1
  },
  {
    id: 'cm2-mes-10',
    level: 'CM2',
    domain: 'Mesures',
    question: 'Un cylindre de 10 cm de haut. Quelle unité mesure le volume?',
    options: ['cm', 'cm²', 'cm³', 'cm⁴'],
    correctAnswer: 2,
    explanation: 'Le volume se mesure en cm³ (centimètres cubes)',
    difficulty: 1
  },

  // ===== GÉOMÉTRIE CM2 =====
  {
    id: 'cm2-geo-1',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'Combien d\'angles a un hexagone?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1,
    explanation: 'Un hexagone a 6 angles. Schema: hexagone régulier.',
    difficulty: 1
  },
  {
    id: 'cm2-geo-2',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'La somme des angles d\'un quadrilatère?',
    options: ['180°', '270°', '360°', '540°'],
    correctAnswer: 2,
    explanation: 'La somme des angles d\'un quadrilatère = 360°. Schema: 4 angles.',
    difficulty: 1
  },
  {
    id: 'cm2-geo-3',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'Un triangle rectangle a combien d\'angles droits?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 1,
    explanation: 'Un triangle rectangle a 1 angle droit (90°). Schema: triangle rectangle.',
    difficulty: 1
  },
  {
    id: 'cm2-geo-4',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'Qu\'est-ce qu\'une médiatrice?',
    options: ['Une ligne du triangle', 'Une ligne perpendiculaire au milieu', 'Un côté du triangle', 'Impossible'],
    correctAnswer: 1,
    explanation: 'La médiatrice est une droite perpendiculaire au milieu d\'un segment. Schema: segment avec médiatrice.',
    difficulty: 2
  },
  {
    id: 'cm2-geo-5',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'Quel est ce 3D? 8 sommets, 12 arêtes, 6 faces rectangulaires.',
    options: ['Cube', 'Pavé droit', 'Pyramide', 'Prisme'],
    correctAnswer: 1,
    explanation: 'C\'est un pavé droit (ou parallélépipède). Schema: pavé 3D.',
    difficulty: 1
  },
  {
    id: 'cm2-geo-6',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'Combien de faces a une pyramide triangulaire?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'Une pyramide triangulaire a 4 faces (1 base + 3 latérales). Schema: pyramide triangulaire.',
    difficulty: 1
  },
  {
    id: 'cm2-geo-7',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'Un cercle a combien d\'axes de symétrie?',
    options: ['1', '2', '4', 'Infini'],
    correctAnswer: 3,
    explanation: 'Un cercle a une infinité d\'axes de symétrie. Schema: cercle avec axes.',
    difficulty: 2
  },
  {
    id: 'cm2-geo-8',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'Qu\'est-ce qu\'une bissectrice?',
    options: ['Une ligne perpendiculaire', 'Une ligne qui divise un angle en 2 parties égales', 'Un côté', 'Impossible'],
    correctAnswer: 1,
    explanation: 'La bissectrice divise un angle en 2 angles égaux. Schema: angle avec bissectrice.',
    difficulty: 1
  },
  {
    id: 'cm2-geo-9',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'Combien de sommets a un cylindre?',
    options: ['0', '1', '2', '4'],
    correctAnswer: 0,
    explanation: 'Un cylindre n\'a pas de sommets. Schema: cylindre.',
    difficulty: 1
  },
  {
    id: 'cm2-geo-10',
    level: 'CM2',
    domain: 'Géométrie',
    question: 'Le rayon d\'un cercle est 5 cm. Quel est le diamètre?',
    options: ['2.5 cm', '5 cm', '10 cm', '15 cm'],
    correctAnswer: 2,
    explanation: 'Diamètre = 2 × rayon = 2 × 5 = 10 cm. Schema: cercle avec rayon et diamètre.',
    difficulty: 1
  },

  // ===== PROBLÈMES CM2 =====
  {
    id: 'cm2-pb-1',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: 'Un magasin achète 15 boîtes de 24 crayons. Combien au total?',
    options: ['300', '330', '360', '390'],
    correctAnswer: 2,
    explanation: '15 × 24 = 360 crayons',
    difficulty: 1
  },
  {
    id: 'cm2-pb-2',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: 'Un livre coûte 18 €. Un client en achète 5. Il paie avec 100 €. Combien de monnaie?',
    options: ['8 €', '9 €', '10 €', '12 €'],
    correctAnswer: 2,
    explanation: '18 × 5 = 90 €. 100 - 90 = 10 € de monnaie',
    difficulty: 1
  },
  {
    id: 'cm2-pb-3',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: '2/5 d\'une classe de 30 élèves font du sport. Combien?',
    options: ['10', '12', '15', '18'],
    correctAnswer: 2,
    explanation: '2/5 × 30 = 60 ÷ 5 = 12 élèves',
    difficulty: 1
  },
  {
    id: 'cm2-pb-4',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: 'Un train parcourt 240 km en 3 heures. Quelle est sa vitesse moyenne par heure?',
    options: ['70 km/h', '75 km/h', '80 km/h', '85 km/h'],
    correctAnswer: 2,
    explanation: '240 ÷ 3 = 80 km/h',
    difficulty: 1
  },
  {
    id: 'cm2-pb-5',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: 'Un fermier a 120 poules. 1/4 sont blanches. Combien de poules blanches?',
    options: ['25', '28', '30', '35'],
    correctAnswer: 2,
    explanation: '1/4 × 120 = 120 ÷ 4 = 30 poules blanches',
    difficulty: 1
  },
  {
    id: 'cm2-pb-6',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: 'Une piscine contient 50 000 litres. On en vide 1/5. Combien reste-t-il?',
    options: ['10000 L', '30000 L', '40000 L', '45000 L'],
    correctAnswer: 2,
    explanation: '1/5 × 50000 = 10000. 50000 - 10000 = 40000 L',
    difficulty: 1
  },
  {
    id: 'cm2-pb-7',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: 'Un gâteau pèse 800 g. On le coupe en 8 parts égales. Chaque part pèse?',
    options: ['90 g', '95 g', '100 g', '105 g'],
    correctAnswer: 2,
    explanation: '800 ÷ 8 = 100 g par part',
    difficulty: 1
  },
  {
    id: 'cm2-pb-8',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: 'Un prix augmente de 20%. Si c\'était 100 €, quel est le nouveau prix?',
    options: ['110 €', '115 €', '120 €', '125 €'],
    correctAnswer: 2,
    explanation: '20% de 100 = 20 €. 100 + 20 = 120 €',
    difficulty: 1
  },
  {
    id: 'cm2-pb-9',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: 'Une équipe marque 3 buts par match. Après 12 matchs, combien au total?',
    options: ['30', '33', '36', '39'],
    correctAnswer: 2,
    explanation: '3 × 12 = 36 buts',
    difficulty: 1
  },
  {
    id: 'cm2-pb-10',
    level: 'CM2',
    domain: 'Problèmes/Algèbre',
    question: 'Un jardin rectangulaire 24 m × 15 m. Quelle est son aire?',
    options: ['300 m²', '330 m²', '360 m²', '390 m²'],
    correctAnswer: 2,
    explanation: 'Aire = 24 × 15 = 360 m²',
    difficulty: 1
  },
];
