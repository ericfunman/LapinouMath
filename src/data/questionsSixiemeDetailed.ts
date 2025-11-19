/* istanbul ignore file */
import { Question } from '../types';

export const questionsSixiemeDetailed: Question[] = [
  // ===== CALCUL MENTAL 6ème =====
  {
    id: '6e-cm-1',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font 0.5 + 0.3 ?',
    options: ['0.7', '0.8', '0.9', '1.0'],
    correctAnswer: 0,
    explanation: '0.5 + 0.3 = 0.8. Erreur: 0.5 + 0.3 = 0.8',
    difficulty: 1
  },
  {
    id: '6e-cm-2',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font 25% de 80 ?',
    options: ['15', '18', '20', '25'],
    correctAnswer: 2,
    explanation: '25% = 1/4. 80 ÷ 4 = 20',
    difficulty: 1
  },
  {
    id: '6e-cm-3',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font 1.5 × 4 ?',
    options: ['5', '5.5', '6', '6.5'],
    correctAnswer: 2,
    explanation: '1.5 × 4 = 6',
    difficulty: 1
  },
  {
    id: '6e-cm-4',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font 12² (12 au carré)?',
    options: ['120', '124', '144', '200'],
    correctAnswer: 2,
    explanation: '12² = 12 × 12 = 144',
    difficulty: 1
  },
  {
    id: '6e-cm-5',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font √144 (racine carrée)?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    explanation: '√144 = 12 (car 12² = 144)',
    difficulty: 1
  },
  {
    id: '6e-cm-6',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font 30% de 200?',
    options: ['50', '55', '60', '65'],
    correctAnswer: 2,
    explanation: '30% de 200 = 0.3 × 200 = 60',
    difficulty: 1
  },
  {
    id: '6e-cm-7',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font 0.25 × 8?',
    options: ['1.5', '2', '2.5', '3'],
    correctAnswer: 1,
    explanation: '0.25 × 8 = 2',
    difficulty: 1
  },
  {
    id: '6e-cm-8',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font 2³ (2 au cube)?',
    options: ['6', '8', '12', '16'],
    correctAnswer: 1,
    explanation: '2³ = 2 × 2 × 2 = 8',
    difficulty: 1
  },
  {
    id: '6e-cm-9',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font 50% de 300?',
    options: ['100', '120', '150', '180'],
    correctAnswer: 2,
    explanation: '50% = 1/2. 300 ÷ 2 = 150',
    difficulty: 1
  },
  {
    id: '6e-cm-10',
    level: '6ème',
    domain: 'Calcul mental',
    question: 'Combien font √25?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    explanation: '√25 = 5 (car 5² = 25)',
    difficulty: 1
  },

  // ===== ARITHMÉTIQUE 6ème =====
  {
    id: '6e-ar-1',
    level: '6ème',
    domain: 'Arithmétique',
    question: 'Quel est le PPCM de 4 et 6?',
    options: ['8', '10', '12', '18'],
    correctAnswer: 2,
    explanation: 'PPCM(4,6) = 12 (multiples communs: 12, 24...)',
    difficulty: 1
  },
  {
    id: '6e-ar-2',
    level: '6ème',
    domain: 'Arithmétique',
    question: 'Quel nombre n\'est PAS premier: 13, 15, 17, 19?',
    options: ['13', '15', '17', '19'],
    correctAnswer: 1,
    explanation: '15 = 3 × 5 n\'est pas premier',
    difficulty: 1
  },
  {
    id: '6e-ar-3',
    level: '6ème',
    domain: 'Arithmétique',
    question: 'Quelle est la décomposition de 12 en nombres premiers?',
    options: ['2 × 6', '2² × 3', '3 × 4', '2 × 2 × 3'],
    correctAnswer: 1,
    explanation: '12 = 2² × 3 = 4 × 3',
    difficulty: 1
  },
  {
    id: '6e-ar-4',
    level: '6ème',
    domain: 'Arithmétique',
    question: 'Quel est le PGCD de 18 et 24?',
    options: ['2', '4', '6', '12'],
    correctAnswer: 2,
    explanation: 'PGCD(18,24) = 6',
    difficulty: 1
  },
  {
    id: '6e-ar-5',
    level: '6ème',
    domain: 'Arithmétique',
    question: 'Combien de diviseurs a le nombre 12?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: 'Diviseurs de 12: 1, 2, 3, 4, 6, 12 = 6 diviseurs',
    difficulty: 1
  },
  {
    id: '6e-ar-6',
    level: '6ème',
    domain: 'Arithmétique',
    question: '2487 est-il divisible par 3?',
    options: ['Oui', 'Non', 'Impossible', 'Besoin de calcul'],
    correctAnswer: 0,
    explanation: '2+4+8+7=21, 21÷3=7, donc oui',
    difficulty: 1
  },
  {
    id: '6e-ar-7',
    level: '6ème',
    domain: 'Arithmétique',
    question: 'Le nombre 100 arrondi au dixième le plus proche?',
    options: ['99', '100', '101', 'Impossible'],
    correctAnswer: 1,
    explanation: 'Arrondir 100 au dixième = 100 (pas de décimales)',
    difficulty: 1
  },
  {
    id: '6e-ar-8',
    level: '6ème',
    domain: 'Arithmétique',
    question: 'Quel nombre est plus proche de 1000: 995 ou 1005?',
    options: ['995', '1005', 'Égal', 'Impossible'],
    correctAnswer: 2,
    explanation: '1000 - 995 = 5 et 1005 - 1000 = 5. C\'est égal!',
    difficulty: 1
  },
  {
    id: '6e-ar-9',
    level: '6ème',
    domain: 'Arithmétique',
    question: 'Quel est le plus petit multiple commun de 2 et 3?',
    options: ['2', '3', '5', '6'],
    correctAnswer: 3,
    explanation: 'PPCM(2,3) = 6',
    difficulty: 1
  },
  {
    id: '6e-ar-10',
    level: '6ème',
    domain: 'Arithmétique',
    question: '456 divisé par 100 donne?',
    options: ['4.56', '45.6', '456', '4560'],
    correctAnswer: 0,
    explanation: '456 ÷ 100 = 4.56',
    difficulty: 1
  },

  // ===== FRACTIONS/DÉCIMAUX 6ème =====
  {
    id: '6e-fr-1',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: 'Simplifie la fraction 6/9.',
    options: ['1/2', '2/3', '3/4', '4/5'],
    correctAnswer: 1,
    explanation: '6/9 = 2/3 (divisé par 3)',
    difficulty: 1
  },
  {
    id: '6e-fr-2',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: 'Additionne 1/3 + 1/6.',
    options: ['1/6', '2/6', '3/6', '1/2'],
    correctAnswer: 3,
    explanation: '1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2',
    difficulty: 1
  },
  {
    id: '6e-fr-3',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: 'Multiplie 2/3 × 3/4.',
    options: ['1/2', '1/3', '1/4', '3/5'],
    correctAnswer: 0,
    explanation: '2/3 × 3/4 = 6/12 = 1/2',
    difficulty: 1
  },
  {
    id: '6e-fr-4',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: 'Convertis 3/5 en décimal.',
    options: ['0.5', '0.6', '0.7', '0.8'],
    correctAnswer: 1,
    explanation: '3/5 = 0.6',
    difficulty: 1
  },
  {
    id: '6e-fr-5',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: 'Convertis 0.75 en fraction.',
    options: ['1/2', '2/3', '3/4', '4/5'],
    correctAnswer: 2,
    explanation: '0.75 = 75/100 = 3/4',
    difficulty: 1
  },
  {
    id: '6e-fr-6',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: 'Divise 3/4 ÷ 1/2.',
    options: ['1/2', '3/8', '3/2', '2/3'],
    correctAnswer: 2,
    explanation: '3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2',
    difficulty: 2
  },
  {
    id: '6e-fr-7',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: 'Simplifie 15/25.',
    options: ['1/2', '2/3', '3/5', '4/5'],
    correctAnswer: 2,
    explanation: '15/25 = 3/5 (divisé par 5)',
    difficulty: 1
  },
  {
    id: '6e-fr-8',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: '7/8 - 3/8 égale?',
    options: ['1/8', '2/8', '3/8', '4/8'],
    correctAnswer: 3,
    explanation: '7/8 - 3/8 = 4/8 = 1/2',
    difficulty: 1
  },
  {
    id: '6e-fr-9',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: 'Convertis 1/8 en décimal.',
    options: ['0.08', '0.125', '0.18', '0.5'],
    correctAnswer: 1,
    explanation: '1/8 = 0.125',
    difficulty: 1
  },
  {
    id: '6e-fr-10',
    level: '6ème',
    domain: 'Fractions/Décimaux',
    question: 'Quel est l\'équivalent de 20%?',
    options: ['1/3', '1/4', '1/5', '2/5'],
    correctAnswer: 2,
    explanation: '20% = 1/5',
    difficulty: 1
  },

  // ===== GÉOMÉTRIE 6ème =====
  {
    id: '6e-geo-1',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Le périmètre d\'un cercle s\'appelle?',
    options: ['Diamètre', 'Rayon', 'Circonférence', 'Arc'],
    correctAnswer: 2,
    explanation: 'La circonférence = 2πr. Schema: cercle avec circonférence marquée.',
    difficulty: 1
  },
  {
    id: '6e-geo-2',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Calcule la circonférence d\'un cercle de rayon 5 cm (π≈3,14).',
    options: ['15.7 cm', '31.4 cm', '78.5 cm', '157 cm'],
    correctAnswer: 1,
    explanation: 'C = 2πr = 2 × 3.14 × 5 = 31.4 cm',
    difficulty: 1
  },
  {
    id: '6e-geo-3',
    level: '6ème',
    domain: 'Géométrie',
    question: 'L\'aire d\'un cercle se calcule avec?',
    options: ['πr', '2πr', 'πr²', '2πr²'],
    correctAnswer: 2,
    explanation: 'Aire du cercle = πr²',
    difficulty: 1
  },
  {
    id: '6e-geo-4',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Calcule l\'aire d\'un cercle de rayon 3 cm (π≈3,14).',
    options: ['9.42 cm²', '18.84 cm²', '28.26 cm²', '56.52 cm²'],
    correctAnswer: 2,
    explanation: 'A = πr² = 3.14 × 9 = 28.26 cm²',
    difficulty: 1
  },
  {
    id: '6e-geo-5',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Un triangle rectangle a ses 3 angles qui somment à?',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: 1,
    explanation: 'La somme des angles d\'un triangle = 180°',
    difficulty: 1
  },
  {
    id: '6e-geo-6',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Combien de faces a un prisme triangulaire?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Un prisme triangulaire a 5 faces (2 triangles + 3 rectangles). Schema: prisme triangulaire.',
    difficulty: 1
  },
  {
    id: '6e-geo-7',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Qu\'est-ce qu\'une tangente à un cercle?',
    options: ['Une droite qui touche en 1 point', 'Une corde', 'Un rayon', 'Un diamètre'],
    correctAnswer: 0,
    explanation: 'Une tangente touche le cercle en exactement un point. Schema: cercle avec tangente.',
    difficulty: 2
  },
  {
    id: '6e-geo-8',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Un angle inscrit dans un cercle intercepte un arc de 80°. L\'angle mesure?',
    options: ['40°', '80°', '120°', '160°'],
    correctAnswer: 0,
    explanation: 'L\'angle inscrit = arc/2 = 80/2 = 40°',
    difficulty: 2
  },
  {
    id: '6e-geo-9',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Quel est le volume d\'un cube de 4 cm d\'arête?',
    options: ['12 cm³', '16 cm³', '48 cm³', '64 cm³'],
    correctAnswer: 3,
    explanation: 'Volume = arête³ = 4³ = 64 cm³. Schema: cube avec arête marquée.',
    difficulty: 1
  },
  {
    id: '6e-geo-10',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Quel est le volume d\'un pavé droit 5 cm × 3 cm × 2 cm?',
    options: ['10 cm³', '15 cm³', '30 cm³', '60 cm³'],
    correctAnswer: 2,
    explanation: 'Volume = 5 × 3 × 2 = 30 cm³',
    difficulty: 1
  },

  // ===== MESURES 6ème =====
  {
    id: '6e-mes-1',
    level: '6ème',
    domain: 'Mesures',
    question: 'Combien de centimètres cubes dans 1 litre?',
    options: ['100 cm³', '500 cm³', '1000 cm³', '10000 cm³'],
    correctAnswer: 2,
    explanation: '1 litre = 1000 cm³',
    difficulty: 1
  },
  {
    id: '6e-mes-2',
    level: '6ème',
    domain: 'Mesures',
    question: '2.5 km = combien de mètres?',
    options: ['25 m', '250 m', '2500 m', '25000 m'],
    correctAnswer: 2,
    explanation: '1 km = 1000 m. 2.5 km = 2500 m',
    difficulty: 1
  },
  {
    id: '6e-mes-3',
    level: '6ème',
    domain: 'Mesures',
    question: 'Convertis 3.5 heures en minutes.',
    options: ['150 min', '180 min', '210 min', '240 min'],
    correctAnswer: 2,
    explanation: '3.5 h = 3h 30min = 180 + 30 = 210 minutes',
    difficulty: 1
  },
  {
    id: '6e-mes-4',
    level: '6ème',
    domain: 'Mesures',
    question: 'Quel est l\'angle complémentaire de 35°?',
    options: ['55°', '65°', '145°', '325°'],
    correctAnswer: 0,
    explanation: 'Angle complémentaire = 90° - 35° = 55°',
    difficulty: 1
  },
  {
    id: '6e-mes-5',
    level: '6ème',
    domain: 'Mesures',
    question: 'Quel est l\'angle supplémentaire de 60°?',
    options: ['30°', '90°', '120°', '300°'],
    correctAnswer: 2,
    explanation: 'Angle supplémentaire = 180° - 60° = 120°',
    difficulty: 1
  },
  {
    id: '6e-mes-6',
    level: '6ème',
    domain: 'Mesures',
    question: '1500 g = combien de kg?',
    options: ['0.15 kg', '1.5 kg', '15 kg', '150 kg'],
    correctAnswer: 1,
    explanation: '1500 g = 1.5 kg',
    difficulty: 1
  },
  {
    id: '6e-mes-7',
    level: '6ème',
    domain: 'Mesures',
    question: 'Combien de millilitres dans 2.5 litres?',
    options: ['25 ml', '250 ml', '2500 ml', '25000 ml'],
    correctAnswer: 2,
    explanation: '1 litre = 1000 ml. 2.5 litres = 2500 ml',
    difficulty: 1
  },
  {
    id: '6e-mes-8',
    level: '6ème',
    domain: 'Mesures',
    question: 'Une surface de 1 hectare = combien de m²?',
    options: ['100 m²', '1000 m²', '10000 m²', '100000 m²'],
    correctAnswer: 2,
    explanation: '1 hectare = 10000 m²',
    difficulty: 1
  },
  {
    id: '6e-mes-9',
    level: '6ème',
    domain: 'Mesures',
    question: '0.5 tonnes = combien de kg?',
    options: ['50 kg', '500 kg', '5000 kg', '50000 kg'],
    correctAnswer: 1,
    explanation: '1 tonne = 1000 kg. 0.5 tonnes = 500 kg',
    difficulty: 1
  },
  {
    id: '6e-mes-10',
    level: '6ème',
    domain: 'Mesures',
    question: 'Convertis 45 minutes en fraction d\'heure.',
    options: ['1/2', '2/3', '3/4', '5/6'],
    correctAnswer: 2,
    explanation: '45 minutes = 45/60 = 3/4 d\'heure',
    difficulty: 1
  },

  // ===== PROBLÈMES 6ème =====
  {
    id: '6e-pb-1',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un article coûte 50 € et augmente de 20%. Quel est le nouveau prix?',
    options: ['55 €', '58 €', '60 €', '65 €'],
    correctAnswer: 2,
    explanation: '20% de 50 = 10 €. 50 + 10 = 60 €',
    difficulty: 1
  },
  {
    id: '6e-pb-2',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un solde de 30% sur un prix de 200 €. Prix final?',
    options: ['140 €', '150 €', '160 €', '170 €'],
    correctAnswer: 0,
    explanation: '30% de 200 = 60 €. 200 - 60 = 140 €',
    difficulty: 1
  },
  {
    id: '6e-pb-3',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un triangle a un angle de 60° et un de 70°. Le 3e angle?',
    options: ['40°', '50°', '60°', '70°'],
    correctAnswer: 1,
    explanation: '180° - 60° - 70° = 50°',
    difficulty: 1
  },
  {
    id: '6e-pb-4',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: 3x + 5 = 14. x égale?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
    explanation: '3x = 14 - 5 = 9. x = 9/3 = 3',
    difficulty: 1
  },
  {
    id: '6e-pb-5',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: 2x - 3 = 7. x égale?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: '2x = 7 + 3 = 10. x = 10/2 = 5',
    difficulty: 1
  },
  {
    id: '6e-pb-6',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'Une voiture parcourt 480 km en 6 heures. Vitesse moyenne?',
    options: ['70 km/h', '75 km/h', '80 km/h', '85 km/h'],
    correctAnswer: 2,
    explanation: '480 ÷ 6 = 80 km/h',
    difficulty: 1
  },
  {
    id: '6e-pb-7',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un magasin vend 250 articles en 5 jours. Moyenne par jour?',
    options: ['40', '45', '50', '55'],
    correctAnswer: 2,
    explanation: '250 ÷ 5 = 50 articles par jour',
    difficulty: 1
  },
  {
    id: '6e-pb-8',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: x/2 = 10. x égale?',
    options: ['5', '10', '15', '20'],
    correctAnswer: 3,
    explanation: 'x = 10 × 2 = 20',
    difficulty: 1
  },
  {
    id: '6e-pb-9',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un prix passe de 100 € à 75 €. Quel est le pourcentage de réduction?',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: 2,
    explanation: '(100-75)/100 = 25/100 = 25%',
    difficulty: 1
  },
  {
    id: '6e-pb-10',
    level: '6ème',
    domain: 'Problèmes/Algèbre',
    question: 'La surface d\'un carré est 49 m². Quelle est la longueur du côté?',
    options: ['5 m', '6 m', '7 m', '8 m'],
    correctAnswer: 2,
    explanation: '√49 = 7 m',
    difficulty: 1
  },
];
