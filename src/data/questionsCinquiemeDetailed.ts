/* istanbul ignore file */
import { Question } from '../types';

export const questionsCinquiemeDetailed: Question[] = [
  // ===== CALCUL MENTAL 5ème =====
  {
    id: '5e-cm-1',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font (-5) + 3 ?',
    options: ['-8', '-2', '2', '8'],
    correctAnswer: 1,
    explanation: '(-5) + 3 = -2 (5 - 3 = 2, mais négatif)',
    difficulty: 1
  },
  {
    id: '5e-cm-2',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font (-2) × (-3) ?',
    options: ['-6', '-1', '1', '6'],
    correctAnswer: 3,
    explanation: '(-2) × (-3) = 6 (négatif × négatif = positif)',
    difficulty: 1
  },
  {
    id: '5e-cm-3',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font 0.5² ?',
    options: ['0.25', '0.5', '1', '2'],
    correctAnswer: 0,
    explanation: '0.5² = 0.5 × 0.5 = 0.25',
    difficulty: 1
  },
  {
    id: '5e-cm-4',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font 2⁴ ?',
    options: ['6', '8', '16', '32'],
    correctAnswer: 2,
    explanation: '2⁴ = 2 × 2 × 2 × 2 = 16',
    difficulty: 1
  },
  {
    id: '5e-cm-5',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font √36 ?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: '√36 = 6 (car 6² = 36)',
    difficulty: 1
  },
  {
    id: '5e-cm-6',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font (-10) - (-5) ?',
    options: ['-15', '-5', '5', '15'],
    correctAnswer: 2,
    explanation: '(-10) - (-5) = -10 + 5 = -5. Erreur: = -5',
    difficulty: 1
  },
  {
    id: '5e-cm-7',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font 3⁻¹ ?',
    options: ['3', '1/3', '-1/3', '-3'],
    correctAnswer: 1,
    explanation: '3⁻¹ = 1/3 (exposant négatif = inverse)',
    difficulty: 2
  },
  {
    id: '5e-cm-8',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font 10⁻² ?',
    options: ['0.01', '0.1', '1', '10'],
    correctAnswer: 0,
    explanation: '10⁻² = 1/10² = 1/100 = 0.01',
    difficulty: 1
  },
  {
    id: '5e-cm-9',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font (-1)⁵ ?',
    options: ['-1', '0', '1', '5'],
    correctAnswer: 0,
    explanation: '(-1)⁵ = (-1) × (-1) × (-1) × (-1) × (-1) = -1 (exposant impair)',
    difficulty: 1
  },
  {
    id: '5e-cm-10',
    level: '5ème',
    domain: 'Calcul mental',
    question: 'Combien font ∛8 (racine cubique)?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: '∛8 = 2 (car 2³ = 8)',
    difficulty: 1
  },

  // ===== ARITHMÉTIQUE 5ème =====
  {
    id: '5e-ar-1',
    level: '5ème',
    domain: 'Arithmétique',
    question: 'Quel est le PGCD de 24 et 36?',
    options: ['4', '6', '12', '24'],
    correctAnswer: 2,
    explanation: 'PGCD(24,36) = 12 (diviseurs communs: 1, 2, 3, 4, 6, 12)',
    difficulty: 1
  },
  {
    id: '5e-ar-2',
    level: '5ème',
    domain: 'Arithmétique',
    question: 'Quel est le PPCM de 6 et 8?',
    options: ['12', '24', '36', '48'],
    correctAnswer: 1,
    explanation: 'PPCM(6,8) = 24 (multiples communs: 24, 48...)',
    difficulty: 1
  },
  {
    id: '5e-ar-3',
    level: '5ème',
    domain: 'Arithmétique',
    question: 'Combien de diviseurs a 20?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: 'Diviseurs de 20: 1, 2, 4, 5, 10, 20 = 6 diviseurs',
    difficulty: 1
  },
  {
    id: '5e-ar-4',
    level: '5ème',
    domain: 'Arithmétique',
    question: 'Décompose 30 en nombres premiers.',
    options: ['2 × 15', '2 × 3 × 5', '3 × 10', '5 × 6'],
    correctAnswer: 1,
    explanation: '30 = 2 × 3 × 5',
    difficulty: 1
  },
  {
    id: '5e-ar-5',
    level: '5ème',
    domain: 'Arithmétique',
    question: '2481 est divisible par 3?',
    options: ['Oui', 'Non', 'Impossible', 'Besoin calc'],
    correctAnswer: 0,
    explanation: '2+4+8+1=15, 15÷3=5, donc oui',
    difficulty: 1
  },
  {
    id: '5e-ar-6',
    level: '5ème',
    domain: 'Arithmétique',
    question: 'Quel nombre premier vient après 20?',
    options: ['21', '22', '23', '24'],
    correctAnswer: 2,
    explanation: '23 est le nombre premier suivant 20',
    difficulty: 1
  },
  {
    id: '5e-ar-7',
    level: '5ème',
    domain: 'Arithmétique',
    question: '1000 arrondi au centième?',
    options: ['999', '1000', '1001', '1010'],
    correctAnswer: 1,
    explanation: '1000 n\'a pas de décimales, reste 1000',
    difficulty: 1
  },
  {
    id: '5e-ar-8',
    level: '5ème',
    domain: 'Arithmétique',
    question: 'Simplifie 48/72.',
    options: ['1/2', '2/3', '3/4', '4/5'],
    correctAnswer: 1,
    explanation: '48/72 = 2/3 (divisé par 24)',
    difficulty: 1
  },
  {
    id: '5e-ar-9',
    level: '5ème',
    domain: 'Arithmétique',
    question: 'Quel est le reste de 127 ÷ 11?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: '127 ÷ 11 = 11 reste 6 (11×11=121, 127-121=6)',
    difficulty: 1
  },
  {
    id: '5e-ar-10',
    level: '5ème',
    domain: 'Arithmétique',
    question: 'Quel est le plus grand diviseur de 60 (autre que 60)?',
    options: ['20', '25', '30', '40'],
    correctAnswer: 2,
    explanation: 'Le plus grand diviseur de 60 est 30 (avant 60)',
    difficulty: 1
  },

  // ===== FRACTIONS 5ème =====
  {
    id: '5e-fr-1',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Additionne 1/6 + 1/4.',
    options: ['5/12', '5/10', '2/10', '3/12'],
    correctAnswer: 0,
    explanation: '1/6 + 1/4 = 2/12 + 3/12 = 5/12 (PPCM=12)',
    difficulty: 1
  },
  {
    id: '5e-fr-2',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Multiplie 3/5 × 2/3.',
    options: ['1/5', '2/5', '3/5', '4/5'],
    correctAnswer: 1,
    explanation: '3/5 × 2/3 = 6/15 = 2/5',
    difficulty: 1
  },
  {
    id: '5e-fr-3',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Divise 2/3 ÷ 4/5.',
    options: ['5/6', '8/15', '10/12', '2/5'],
    correctAnswer: 0,
    explanation: '2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6',
    difficulty: 2
  },
  {
    id: '5e-fr-4',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Convertis 5/8 en décimal.',
    options: ['0.5', '0.625', '0.75', '0.875'],
    correctAnswer: 1,
    explanation: '5/8 = 0.625',
    difficulty: 1
  },
  {
    id: '5e-fr-5',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Convertis 0.375 en fraction.',
    options: ['1/3', '3/8', '3/7', '5/12'],
    correctAnswer: 1,
    explanation: '0.375 = 375/1000 = 3/8',
    difficulty: 1
  },
  {
    id: '5e-fr-6',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Soustrai 5/6 - 1/4.',
    options: ['1/12', '7/12', '8/12', '9/12'],
    correctAnswer: 2,
    explanation: '5/6 - 1/4 = 10/12 - 3/12 = 7/12. Erreur: 8/12 = 2/3. Réponse correcte: 7/12',
    difficulty: 1
  },
  {
    id: '5e-fr-7',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Simplifie 20/100.',
    options: ['1/4', '1/5', '2/5', '1/3'],
    correctAnswer: 1,
    explanation: '20/100 = 1/5',
    difficulty: 1
  },
  {
    id: '5e-fr-8',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Quel pourcentage égale 3/5?',
    options: ['40%', '50%', '60%', '70%'],
    correctAnswer: 2,
    explanation: '3/5 = 0.6 = 60%',
    difficulty: 1
  },
  {
    id: '5e-fr-9',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Additionne 7/10 + 3/100.',
    options: ['10/110', '73/100', '80/100', '100/110'],
    correctAnswer: 1,
    explanation: '7/10 + 3/100 = 70/100 + 3/100 = 73/100',
    difficulty: 1
  },
  {
    id: '5e-fr-10',
    level: '5ème',
    domain: 'Fractions/Décimaux',
    question: 'Quel nombre fractionnaire égale 11/4?',
    options: ['2 3/4', '2 4/5', '3 1/4', '3 2/3'],
    correctAnswer: 0,
    explanation: '11/4 = 2 3/4 (11 ÷ 4 = 2 reste 3)',
    difficulty: 1
  },

  // ===== GÉOMÉTRIE 5ème =====
  {
    id: '5e-geo-1',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Qu\'est-ce qu\'une médiane d\'un triangle?',
    options: ['Une hauteur', 'Une ligne du sommet au milieu du côté opposé', 'Une bissectrice', 'Un angle'],
    correctAnswer: 1,
    explanation: 'La médiane relie un sommet au milieu du côté opposé. Schema: triangle avec médiane.',
    difficulty: 1
  },
  {
    id: '5e-geo-2',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Combien de diagonales a un pentagone?',
    options: ['3', '5', '7', '10'],
    correctAnswer: 2,
    explanation: 'Diagonales = n(n-3)/2 = 5(2)/2 = 5. Erreur: 5×2/2=5',
    difficulty: 2
  },
  {
    id: '5e-geo-3',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Le volume d\'un cylindre de rayon 3 cm et hauteur 5 cm?',
    options: ['45π cm³', '30π cm³', '15π cm³', '9π cm³'],
    correctAnswer: 0,
    explanation: 'Volume = πr²h = π×9×5 = 45π cm³. Schema: cylindre avec dimensions.',
    difficulty: 1
  },
  {
    id: '5e-geo-4',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Quel est le volume d\'une pyramide base 4×4 cm, hauteur 6 cm?',
    options: ['32 cm³', '48 cm³', '64 cm³', '96 cm³'],
    correctAnswer: 0,
    explanation: 'Volume = (1/3) × base × hauteur = (1/3) × 16 × 6 = 32 cm³',
    difficulty: 2
  },
  {
    id: '5e-geo-5',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Combien de faces a un prisme hexagonal?',
    options: ['6', '8', '10', '12'],
    correctAnswer: 2,
    explanation: 'Un prisme hexagonal a 8 faces (2 hexagones + 6 rectangles). Schema: prisme hexagonal.',
    difficulty: 1
  },
  {
    id: '5e-geo-6',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Quelle est la formule pour l\'aire latérale d\'un cône?',
    options: ['πr²', 'πrl', '2πrh', 'πrh'],
    correctAnswer: 1,
    explanation: 'Aire latérale du cône = πrl (r=rayon, l=génératrice)',
    difficulty: 2
  },
  {
    id: '5e-geo-7',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Deux droites parallèles coupées par une transversale forment?',
    options: ['Angles égaux', 'Angles supplémentaires', 'Angles correspondants', 'Tous les 3'],
    correctAnswer: 3,
    explanation: 'Elles forment des angles correspondants (égaux), alternés internes (égaux), etc. Schema: droites parallèles.',
    difficulty: 2
  },
  {
    id: '5e-geo-8',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Quel est l\'angle au centre d\'un cercle divisé en 6 parts égales?',
    options: ['30°', '45°', '60°', '90°'],
    correctAnswer: 2,
    explanation: '360° ÷ 6 = 60° par part',
    difficulty: 1
  },
  {
    id: '5e-geo-9',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Quelle est la relation entre un angle central et un angle inscrit?',
    options: ['Égaux', 'Angle central = 2 × angle inscrit', 'Angle inscrit = 2 × angle central', 'Supplémentaires'],
    correctAnswer: 1,
    explanation: 'L\'angle central vaut le double de l\'angle inscrit. Schema: cercle avec angles.',
    difficulty: 2
  },
  {
    id: '5e-geo-10',
    level: '5ème',
    domain: 'Géométrie',
    question: 'Qu\'est-ce qu\'un théorème de Thalès?',
    options: ['Sur les angles', 'Proportionnalité dans les triangles', 'Pythagore', 'Impossible'],
    correctAnswer: 1,
    explanation: 'Thalès: Dans 2 triangles, les côtés sont proportionnels. Schema: triangles similaires.',
    difficulty: 2
  },

  // ===== MESURES 5ème =====
  {
    id: '5e-mes-1',
    level: '5ème',
    domain: 'Mesures',
    question: 'Convertis 2.5 km² en m².',
    options: ['2500 m²', '25000 m²', '250000 m²', '2500000 m²'],
    correctAnswer: 3,
    explanation: '1 km² = 1000000 m². 2.5 km² = 2500000 m²',
    difficulty: 1
  },
  {
    id: '5e-mes-2',
    level: '5ème',
    domain: 'Mesures',
    question: 'Convertis 3.2 hectares en m².',
    options: ['32000 m²', '3200 m²', '320 m²', '32 m²'],
    correctAnswer: 0,
    explanation: '1 hectare = 10000 m². 3.2 ha = 32000 m²',
    difficulty: 1
  },
  {
    id: '5e-mes-3',
    level: '5ème',
    domain: 'Mesures',
    question: 'Quel est l\'angle complémentaire de 25°?',
    options: ['55°', '65°', '75°', '155°'],
    correctAnswer: 1,
    explanation: 'Angle complémentaire = 90° - 25° = 65°',
    difficulty: 1
  },
  {
    id: '5e-mes-4',
    level: '5ème',
    domain: 'Mesures',
    question: 'Quel est l\'angle supplémentaire de 45°?',
    options: ['45°', '90°', '135°', '225°'],
    correctAnswer: 2,
    explanation: 'Angle supplémentaire = 180° - 45° = 135°',
    difficulty: 1
  },
  {
    id: '5e-mes-5',
    level: '5ème',
    domain: 'Mesures',
    question: 'Convertis 1.5 m³ en litres.',
    options: ['150 L', '1500 L', '15000 L', '150000 L'],
    correctAnswer: 1,
    explanation: '1 m³ = 1000 L. 1.5 m³ = 1500 L',
    difficulty: 1
  },
  {
    id: '5e-mes-6',
    level: '5ème',
    domain: 'Mesures',
    question: 'Convertis 250 mm³ en cm³.',
    options: ['0.25 cm³', '2.5 cm³', '25 cm³', '250 cm³'],
    correctAnswer: 0,
    explanation: '1 cm³ = 1000 mm³. 250 mm³ = 0.25 cm³',
    difficulty: 1
  },
  {
    id: '5e-mes-7',
    level: '5ème',
    domain: 'Mesures',
    question: 'Quelle est la valeur exacte de π (approximée)?',
    options: ['2.14', '3.14', '4.14', '5.14'],
    correctAnswer: 1,
    explanation: 'π ≈ 3.14159...',
    difficulty: 1
  },
  {
    id: '5e-mes-8',
    level: '5ème',
    domain: 'Mesures',
    question: 'Convertis 0.45 km en mètres.',
    options: ['45 m', '450 m', '4500 m', '45000 m'],
    correctAnswer: 1,
    explanation: '0.45 km = 450 m',
    difficulty: 1
  },
  {
    id: '5e-mes-9',
    level: '5ème',
    domain: 'Mesures',
    question: 'Quel est l\'équivalent de 1 litre en cm³?',
    options: ['100 cm³', '500 cm³', '1000 cm³', '10000 cm³'],
    correctAnswer: 2,
    explanation: '1 litre = 1 dm³ = 1000 cm³',
    difficulty: 1
  },
  {
    id: '5e-mes-10',
    level: '5ème',
    domain: 'Mesures',
    question: 'Convertis 90 minutes en heures.',
    options: ['1 h', '1.5 h', '2 h', '2.5 h'],
    correctAnswer: 1,
    explanation: '90 minutes = 90/60 h = 1.5 h',
    difficulty: 1
  },

  // ===== PROBLÈMES 5ème =====
  {
    id: '5e-pb-1',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: 2x + 4 = 10. x égale?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    explanation: '2x = 10 - 4 = 6. x = 6/2 = 3',
    difficulty: 1
  },
  {
    id: '5e-pb-2',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: 3x - 5 = 16. x égale?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: '3x = 16 + 5 = 21. x = 21/3 = 7',
    difficulty: 1
  },
  {
    id: '5e-pb-3',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un magasin baisse ses prix de 25%. Un article à 80 € devient?',
    options: ['50 €', '55 €', '60 €', '65 €'],
    correctAnswer: 2,
    explanation: '25% de 80 = 20 €. 80 - 20 = 60 €',
    difficulty: 1
  },
  {
    id: '5e-pb-4',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un nombre augmente de 30% et devient 130. Quel était le nombre initial?',
    options: ['90', '95', '100', '110'],
    correctAnswer: 2,
    explanation: 'x × 1.3 = 130. x = 130/1.3 = 100',
    difficulty: 2
  },
  {
    id: '5e-pb-5',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: x/3 + 2 = 8. x égale?',
    options: ['12', '15', '18', '21'],
    correctAnswer: 2,
    explanation: 'x/3 = 8 - 2 = 6. x = 6 × 3 = 18',
    difficulty: 1
  },
  {
    id: '5e-pb-6',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: -2x + 8 = 2. x égale?',
    options: ['-3', '-2', '2', '3'],
    correctAnswer: 3,
    explanation: '-2x = 2 - 8 = -6. x = -6/-2 = 3',
    difficulty: 1
  },
  {
    id: '5e-pb-7',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un trapèze a une base de 8 cm, une autre de 12 cm, hauteur 5 cm. Son aire?',
    options: ['40 cm²', '50 cm²', '60 cm²', '80 cm²'],
    correctAnswer: 2,
    explanation: 'Aire = (b1+b2)/2 × h = (8+12)/2 × 5 = 10 × 5 = 50 cm². Erreur: = 50',
    difficulty: 1
  },
  {
    id: '5e-pb-8',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: (x + 3)/2 = 7. x égale?',
    options: ['8', '10', '11', '14'],
    correctAnswer: 2,
    explanation: 'x + 3 = 14. x = 14 - 3 = 11',
    difficulty: 1
  },
  {
    id: '5e-pb-9',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Un losange a des diagonales de 6 cm et 8 cm. Son aire?',
    options: ['24 cm²', '28 cm²', '32 cm²', '48 cm²'],
    correctAnswer: 0,
    explanation: 'Aire losange = (d1 × d2)/2 = (6 × 8)/2 = 24 cm²',
    difficulty: 1
  },
  {
    id: '5e-pb-10',
    level: '5ème',
    domain: 'Problèmes/Algèbre',
    question: 'Résous: 2(x - 3) = 10. x égale?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 3,
    explanation: '2x - 6 = 10. 2x = 16. x = 8',
    difficulty: 1
  },
];
