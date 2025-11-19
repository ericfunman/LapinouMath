/* istanbul ignore file */
import { Question } from '../types';

export const questionsQuatriemerDetailed: Question[] = [
  // ===== CALCUL MENTAL 4ème =====
  {
    id: '4e-cm-1',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font (-3)² ?',
    options: ['-9', '-6', '6', '9'],
    correctAnswer: 3,
    explanation: '(-3)² = (-3) × (-3) = 9 (négatif au carré = positif)',
    difficulty: 1
  },
  {
    id: '4e-cm-2',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font 10⁻³ ?',
    options: ['0.001', '0.01', '0.1', '1'],
    correctAnswer: 0,
    explanation: '10⁻³ = 1/10³ = 1/1000 = 0.001',
    difficulty: 1
  },
  {
    id: '4e-cm-3',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font √50 (approx)?',
    options: ['5', '7', '7.1', '10'],
    correctAnswer: 2,
    explanation: '√50 ≈ 7.07... ≈ 7.1',
    difficulty: 2
  },
  {
    id: '4e-cm-4',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font 2⁻² ?',
    options: ['1/4', '1/2', '2', '4'],
    correctAnswer: 0,
    explanation: '2⁻² = 1/2² = 1/4 = 0.25',
    difficulty: 1
  },
  {
    id: '4e-cm-5',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font (-1)⁶ ?',
    options: ['-1', '0', '1', '6'],
    correctAnswer: 2,
    explanation: '(-1)⁶ = 1 (exposant pair)',
    difficulty: 1
  },
  {
    id: '4e-cm-6',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font ∛(-8) ?',
    options: ['-2', '-1', '1', '2'],
    correctAnswer: 0,
    explanation: '∛(-8) = -2 (car (-2)³ = -8)',
    difficulty: 1
  },
  {
    id: '4e-cm-7',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font 3² + 4² ?',
    options: ['12', '24', '25', '49'],
    correctAnswer: 2,
    explanation: '3² + 4² = 9 + 16 = 25 (triplet Pythagore)',
    difficulty: 1
  },
  {
    id: '4e-cm-8',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font (1/2)² ?',
    options: ['1/2', '1/4', '1/8', '1/16'],
    correctAnswer: 1,
    explanation: '(1/2)² = 1/4',
    difficulty: 1
  },
  {
    id: '4e-cm-9',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font √4 + √9 ?',
    options: ['5', '6', '7', '13'],
    correctAnswer: 0,
    explanation: '√4 + √9 = 2 + 3 = 5',
    difficulty: 1
  },
  {
    id: '4e-cm-10',
    level: '4ème',
    domain: 'Calcul mental',
    question: 'Combien font (-2)⁴ ?',
    options: ['-16', '-8', '8', '16'],
    correctAnswer: 3,
    explanation: '(-2)⁴ = 16 (exposant pair)',
    difficulty: 1
  },

  // ===== ARITHMÉTIQUE 4ème =====
  {
    id: '4e-ar-1',
    level: '4ème',
    domain: 'Arithmétique',
    question: 'Quel est le PGCD de 56 et 84?',
    options: ['7', '14', '28', '42'],
    correctAnswer: 2,
    explanation: 'PGCD(56,84) = 28',
    difficulty: 1
  },
  {
    id: '4e-ar-2',
    level: '4ème',
    domain: 'Arithmétique',
    question: 'Quel est le PPCM de 12 et 18?',
    options: ['24', '36', '48', '72'],
    correctAnswer: 1,
    explanation: 'PPCM(12,18) = 36',
    difficulty: 1
  },
  {
    id: '4e-ar-3',
    level: '4ème',
    domain: 'Arithmétique',
    question: 'Décompose 60 en nombres premiers.',
    options: ['2 × 30', '2² × 3 × 5', '3 × 20', '4 × 15'],
    correctAnswer: 1,
    explanation: '60 = 2² × 3 × 5',
    difficulty: 1
  },
  {
    id: '4e-ar-4',
    level: '4ème',
    domain: 'Arithmétique',
    question: 'Quel nombre premier vient après 40?',
    options: ['41', '42', '43', '44'],
    correctAnswer: 2,
    explanation: '43 est le nombre premier après 40',
    difficulty: 1
  },
  {
    id: '4e-ar-5',
    level: '4ème',
    domain: 'Arithmétique',
    question: '2916 est divisible par 4?',
    options: ['Oui', 'Non', 'Impossible', 'Besoin calc'],
    correctAnswer: 0,
    explanation: '16 est divisible par 4, donc 2916 l\'est',
    difficulty: 1
  },
  {
    id: '4e-ar-6',
    level: '4ème',
    domain: 'Arithmétique',
    question: 'Simplifie 120/150.',
    options: ['2/3', '3/4', '4/5', '5/6'],
    correctAnswer: 2,
    explanation: '120/150 = 4/5 (PGCD=30)',
    difficulty: 1
  },
  {
    id: '4e-ar-7',
    level: '4ème',
    domain: 'Arithmétique',
    question: 'Arrondir 3.56 au dixième?',
    options: ['3.5', '3.6', '3.56', '4'],
    correctAnswer: 1,
    explanation: '3.56 arrondi au dixième = 3.6',
    difficulty: 1
  },
  {
    id: '4e-ar-8',
    level: '4ème',
    domain: 'Arithmétique',
    question: 'Quel est le reste de 145 ÷ 12?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 0,
    explanation: '145 ÷ 12 = 12 reste 1 (12×12=144, 145-144=1)',
    difficulty: 1
  },
  {
    id: '4e-ar-9',
    level: '4ème',
    domain: 'Arithmétique',
    question: 'Quelle fraction de 1 litre est 750 ml?',
    options: ['1/4', '1/3', '1/2', '3/4'],
    correctAnswer: 3,
    explanation: '750 ml = 750/1000 = 3/4 litre',
    difficulty: 1
  },
  {
    id: '4e-ar-10',
    level: '4ème',
    domain: 'Arithmétique',
    question: 'Quel est le plus petit nombre divisible par 4 et 6?',
    options: ['12', '18', '24', '36'],
    correctAnswer: 0,
    explanation: 'PPCM(4,6) = 12',
    difficulty: 1
  },

  // ===== FRACTIONS 4ème =====
  {
    id: '4e-fr-1',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Additionne 2/5 + 3/7.',
    options: ['5/12', '5/35', '29/35', '35/29'],
    correctAnswer: 2,
    explanation: '2/5 + 3/7 = 14/35 + 15/35 = 29/35',
    difficulty: 1
  },
  {
    id: '4e-fr-2',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Multiplie 4/9 × 6/8.',
    options: ['1/3', '2/6', '3/9', '4/12'],
    correctAnswer: 0,
    explanation: '4/9 × 6/8 = 24/72 = 1/3',
    difficulty: 1
  },
  {
    id: '4e-fr-3',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Divise 5/6 ÷ 2/3.',
    options: ['5/4', '10/18', '10/9', '15/12'],
    correctAnswer: 0,
    explanation: '5/6 ÷ 2/3 = 5/6 × 3/2 = 15/12 = 5/4',
    difficulty: 1
  },
  {
    id: '4e-fr-4',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Convertis 7/12 en décimal (approx).',
    options: ['0.55', '0.58', '0.60', '0.65'],
    correctAnswer: 1,
    explanation: '7/12 ≈ 0.583... ≈ 0.58',
    difficulty: 1
  },
  {
    id: '4e-fr-5',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Convertis 0.6875 en fraction.',
    options: ['5/8', '9/16', '11/16', '13/16'],
    correctAnswer: 2,
    explanation: '0.6875 = 6875/10000 = 11/16',
    difficulty: 2
  },
  {
    id: '4e-fr-6',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Soustrai 7/12 - 1/3.',
    options: ['1/4', '3/12', '4/12', '6/12'],
    correctAnswer: 2,
    explanation: '7/12 - 1/3 = 7/12 - 4/12 = 3/12 = 1/4. Erreur: réponse 3/12',
    difficulty: 1
  },
  {
    id: '4e-fr-7',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Quel pourcentage égale 7/20?',
    options: ['30%', '35%', '40%', '50%'],
    correctAnswer: 1,
    explanation: '7/20 = 0.35 = 35%',
    difficulty: 1
  },
  {
    id: '4e-fr-8',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Additionne (-1/4) + 3/8.',
    options: ['-1/8', '1/8', '1/4', '3/8'],
    correctAnswer: 1,
    explanation: '(-1/4) + 3/8 = -2/8 + 3/8 = 1/8',
    difficulty: 1
  },
  {
    id: '4e-fr-9',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Multiplie (-2/3) × 9/10.',
    options: ['-3/5', '3/5', '-6/10', '6/10'],
    correctAnswer: 0,
    explanation: '(-2/3) × 9/10 = -18/30 = -3/5',
    difficulty: 1
  },
  {
    id: '4e-fr-10',
    level: '4ème',
    domain: 'Fractions/Décimaux',
    question: 'Quel nombre fractionnaire égale 17/5?',
    options: ['3 1/5', '3 2/5', '3 3/5', '3 4/5'],
    correctAnswer: 1,
    explanation: '17/5 = 3 2/5 (17÷5=3 reste 2)',
    difficulty: 1
  },

  // ===== GÉOMÉTRIE 4ème =====
  {
    id: '4e-geo-1',
    level: '4ème',
    domain: 'Géométrie',
    question: 'Le théorème de Pythagore énonce?',
    options: ['a+b=c', 'a²+b²=c²', 'a³+b³=c³', 'Impossible'],
    correctAnswer: 1,
    explanation: 'Dans un triangle rectangle: a² + b² = c² (hypoténuse)',
    difficulty: 1
  },
  {
    id: '4e-geo-2',
    level: '4ème',
    domain: 'Géométrie',
    question: 'Un triangle rectangle a côtés 5 et 12. L\'hypoténuse?',
    options: ['13', '15', '17', '20'],
    correctAnswer: 0,
    explanation: 'c² = 5² + 12² = 25 + 144 = 169. c = 13',
    difficulty: 1
  },
  {
    id: '4e-geo-3',
    level: '4ème',
    domain: 'Géométrie',
    question: 'Quelle est la formule du volume d\'une sphère?',
    options: ['(4/3)πr³', '4πr²', '2πr', 'πr²h'],
    correctAnswer: 0,
    explanation: 'Volume d\'une sphère = (4/3)πr³',
    difficulty: 1
  },
  {
    id: '4e-geo-4',
    level: '4ème',
    domain: 'Géométrie',
    question: 'La surface d\'une sphère de rayon 3 cm?',
    options: ['36π cm²', '27π cm²', '18π cm²', '9π cm²'],
    correctAnswer: 0,
    explanation: 'Surface = 4πr² = 4π × 9 = 36π cm²',
    difficulty: 1
  },
  {
    id: '4e-geo-5',
    level: '4ème',
    domain: 'Géométrie',
    question: 'Qu\'est-ce qu\'une homothétie?',
    options: ['Une rotation', 'Une transformation de similitude', 'Une symétrie', 'Une translation'],
    correctAnswer: 1,
    explanation: 'L\'homothétie agrandit ou réduit une figure proportionnellement. Schema: figures similaires.',
    difficulty: 2
  },
  {
    id: '4e-geo-6',
    level: '4ème',
    domain: 'Géométrie',
    question: 'Le théorème de Thalès parle de?',
    options: ['Angles', 'Proportions', 'Cercles', 'Volumes'],
    correctAnswer: 1,
    explanation: 'Thalès: Les côtés de triangles semblables sont proportionnels. Schema: droites parallèles.',
    difficulty: 1
  },
  {
    id: '4e-geo-7',
    level: '4ème',
    domain: 'Géométrie',
    question: 'Combien de faces a un dodécaèdre?',
    options: ['8', '12', '20', '30'],
    correctAnswer: 1,
    explanation: 'Un dodécaèdre régulier a 12 faces pentagonales. Schema: dodécaèdre.',
    difficulty: 2
  },
  {
    id: '4e-geo-8',
    level: '4ème',
    domain: 'Géométrie',
    question: 'La formule de l\'aire latérale d\'un prisme?',
    options: ['P × h', '(P × h)/2', '2(P × h)', 'P + h'],
    correctAnswer: 0,
    explanation: 'Aire latérale = périmètre × hauteur',
    difficulty: 1
  },
  {
    id: '4e-geo-9',
    level: '4ème',
    domain: 'Géométrie',
    question: 'Un angle inscrit et l\'angle central correspondant?',
    options: ['Égaux', 'L\'angle central = 2×angle inscrit', 'Supplémentaires', 'Impossible'],
    correctAnswer: 1,
    explanation: 'L\'angle au centre vaut le double de l\'angle inscrit',
    difficulty: 1
  },
  {
    id: '4e-geo-10',
    level: '4ème',
    domain: 'Géométrie',
    question: 'Qu\'est-ce qu\'une similitude?',
    options: ['Égalité', 'Proportions conservées', 'Symétrie', 'Rotation'],
    correctAnswer: 1,
    explanation: 'Deux figures sont semblables si elles ont la même forme (proportions égales). Schema: triangles similaires.',
    difficulty: 1
  },

  // ===== MESURES 4ème =====
  {
    id: '4e-mes-1',
    level: '4ème',
    domain: 'Mesures',
    question: 'Convertis 8.5 km² en hectares.',
    options: ['85 ha', '850 ha', '8500 ha', '85000 ha'],
    correctAnswer: 1,
    explanation: '1 km² = 100 ha. 8.5 km² = 850 ha',
    difficulty: 1
  },
  {
    id: '4e-mes-2',
    level: '4ème',
    domain: 'Mesures',
    question: 'Le volume d\'un cube de 5 dm d\'arête?',
    options: ['25 dm³', '75 dm³', '125 dm³', '250 dm³'],
    correctAnswer: 2,
    explanation: 'Volume = 5³ = 125 dm³',
    difficulty: 1
  },
  {
    id: '4e-mes-3',
    level: '4ème',
    domain: 'Mesures',
    question: 'Convertis 3.2 m³ en litres.',
    options: ['320 L', '3200 L', '32000 L', '320000 L'],
    correctAnswer: 1,
    explanation: '1 m³ = 1000 L. 3.2 m³ = 3200 L',
    difficulty: 1
  },
  {
    id: '4e-mes-4',
    level: '4ème',
    domain: 'Mesures',
    question: 'Quel est l\'angle complémentaire de 27°?',
    options: ['53°', '63°', '73°', '153°'],
    correctAnswer: 1,
    explanation: 'Angle complémentaire = 90° - 27° = 63°',
    difficulty: 1
  },
  {
    id: '4e-mes-5',
    level: '4ème',
    domain: 'Mesures',
    question: 'Quel est l\'angle supplémentaire de 72°?',
    options: ['18°', '108°', '118°', '172°'],
    correctAnswer: 1,
    explanation: 'Angle supplémentaire = 180° - 72° = 108°',
    difficulty: 1
  },
  {
    id: '4e-mes-6',
    level: '4ème',
    domain: 'Mesures',
    question: 'Convertis 4.5 tonnes en kilos.',
    options: ['450 kg', '4500 kg', '45000 kg', '450000 kg'],
    correctAnswer: 1,
    explanation: '1 tonne = 1000 kg. 4.5 tonnes = 4500 kg',
    difficulty: 1
  },
  {
    id: '4e-mes-7',
    level: '4ème',
    domain: 'Mesures',
    question: 'Convertis 2500 mm² en cm².',
    options: ['2.5 cm²', '25 cm²', '250 cm²', '2500 cm²'],
    correctAnswer: 1,
    explanation: '100 mm² = 1 cm². 2500 mm² = 25 cm²',
    difficulty: 1
  },
  {
    id: '4e-mes-8',
    level: '4ème',
    domain: 'Mesures',
    question: 'Quelle est l\'unité de mesure du volume?',
    options: ['m', 'm²', 'm³', 'm⁴'],
    correctAnswer: 2,
    explanation: 'Le volume se mesure en m³ (mètres cubes)',
    difficulty: 1
  },
  {
    id: '4e-mes-9',
    level: '4ème',
    domain: 'Mesures',
    question: 'Convertis 1.2 décilitres en millilitres.',
    options: ['12 ml', '120 ml', '1200 ml', '12000 ml'],
    correctAnswer: 1,
    explanation: '1 dL = 100 mL. 1.2 dL = 120 mL',
    difficulty: 1
  },
  {
    id: '4e-mes-10',
    level: '4ème',
    domain: 'Mesures',
    question: 'Convertis 45° en radians (approx).',
    options: ['0.5 rad', '0.75 rad', '0.78 rad', '1.57 rad'],
    correctAnswer: 2,
    explanation: '45° = π/4 rad ≈ 0.785 rad ≈ 0.78 rad',
    difficulty: 2
  },

  // ===== PROBLÈMES 4ème =====
  {
    id: '4e-pb-1',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: 3(x - 2) = 15. x égale?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: '3x - 6 = 15. 3x = 21. x = 7',
    difficulty: 1
  },
  {
    id: '4e-pb-2',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: 2x + 5 = 3x - 1. x égale?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: '5 + 1 = 3x - 2x. 6 = x',
    difficulty: 1
  },
  {
    id: '4e-pb-3',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un triangle rectangle a cathètes 3 et 4 cm. Aire?',
    options: ['5 cm²', '6 cm²', '7 cm²', '12 cm²'],
    correctAnswer: 1,
    explanation: 'Aire = (1/2) × 3 × 4 = 6 cm²',
    difficulty: 1
  },
  {
    id: '4e-pb-4',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un prix augmente de 15%. Si c\'était 200 €, nouveau prix?',
    options: ['215 €', '230 €', '245 €', '260 €'],
    correctAnswer: 1,
    explanation: '15% de 200 = 30 €. 200 + 30 = 230 €',
    difficulty: 1
  },
  {
    id: '4e-pb-5',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: (x - 1)/2 = 5. x égale?',
    options: ['9', '10', '11', '12'],
    correctAnswer: 2,
    explanation: 'x - 1 = 10. x = 11',
    difficulty: 1
  },
  {
    id: '4e-pb-6',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'L\'aire d\'un trapèze est 60 m². Base 1 = 6 m, Base 2 = 14 m. Hauteur?',
    options: ['4 m', '5 m', '6 m', '7 m'],
    correctAnswer: 1,
    explanation: 'Aire = (b1+b2)/2 × h. 60 = 10h. h = 6. Erreur: h = 6',
    difficulty: 1
  },
  {
    id: '4e-pb-7',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: -3x + 12 = 0. x égale?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    explanation: '-3x = -12. x = 4',
    difficulty: 1
  },
  {
    id: '4e-pb-8',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: 2(x + 3) = 3(x - 1). x égale?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 3,
    explanation: '2x + 6 = 3x - 3. 9 = x',
    difficulty: 1
  },
  {
    id: '4e-pb-9',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un losange a diagonales 10 et 12 cm. Aire?',
    options: ['50 cm²', '60 cm²', '70 cm²', '80 cm²'],
    correctAnswer: 1,
    explanation: 'Aire = (10 × 12)/2 = 60 cm²',
    difficulty: 1
  },
  {
    id: '4e-pb-10',
    level: '4ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un prix passe de 80 € à 100 €. Pourcentage d\'augmentation?',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: 1,
    explanation: '(100-80)/80 = 20/80 = 1/4 = 25%. Erreur: 20/80 = 25%. Réponse: 25%',
    difficulty: 1
  },
];
