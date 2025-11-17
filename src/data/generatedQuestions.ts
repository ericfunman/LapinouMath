import { Question, GradeLevel, MathDomain } from '../types';

// Questions de géométrie détaillées pour 4ème
const generateGeometryQuestions = (level: GradeLevel): Question[] => {
  const geometryQuestions = [
    { question: "Combien de diagonales a un pentagone régulier ?", options: ["5", "6", "7", "8"], correctAnswer: 1 },
    { question: "Quel est le périmètre d'un carré de 5 cm de côté ?", options: ["15 cm", "20 cm", "25 cm", "10 cm"], correctAnswer: 1 },
    { question: "Quelle est l'aire d'un rectangle de 4 m x 6 m ?", options: ["10 m²", "20 m²", "24 m²", "12 m²"], correctAnswer: 2 },
    { question: "Un triangle isocèle a combien de côtés égaux ?", options: ["0", "1", "2", "3"], correctAnswer: 2 },
    { question: "Quelle est la somme des angles d'un quadrilatère ?", options: ["180°", "270°", "360°", "450°"], correctAnswer: 2 },
    { question: "Combien de faces a un cube ?", options: ["4", "6", "8", "12"], correctAnswer: 1 },
    { question: "Quel est le nombre d'arêtes d'un pyramide à base carrée ?", options: ["4", "6", "8", "12"], correctAnswer: 2 },
    { question: "Un hexagone régulier a combien de côtés ?", options: ["5", "6", "7", "8"], correctAnswer: 1 },
    { question: "Quelle est l'aire d'un cercle de rayon 2 cm ? (π ≈ 3,14)", options: ["6.28 cm²", "12.56 cm²", "25.12 cm²", "50.24 cm²"], correctAnswer: 1 },
    { question: "Un angle droit mesure combien de degrés ?", options: ["45°", "60°", "90°", "180°"], correctAnswer: 2 },
    { question: "Combien de sommets a un prisme triangulaire ?", options: ["3", "6", "9", "12"], correctAnswer: 1 },
    { question: "Quel est le périmètre d'un cercle de diamètre 10 cm ? (π ≈ 3,14)", options: ["31.4 cm", "62.8 cm", "78.5 cm", "314 cm"], correctAnswer: 0 },
    { question: "Un losange a-t-il tous ses angles égaux ?", options: ["Oui", "Non", "Parfois", "Rarement"], correctAnswer: 1 },
    { question: "Quelle est la hauteur d'un triangle équilatéral de 6 cm de côté ? (≈)", options: ["5.2 cm", "5.8 cm", "5.196 cm", "6 cm"], correctAnswer: 2 },
    { question: "Combien de diagonales a un hexagone régulier ?", options: ["6", "9", "12", "15"], correctAnswer: 1 },
    { question: "Un angle obtus mesure entre combien et combien de degrés ?", options: ["0° et 90°", "90° et 180°", "180° et 270°", "270° et 360°"], correctAnswer: 1 },
    { question: "Quel est le volume d'un cube de 3 cm d'arête ?", options: ["9 cm³", "27 cm³", "36 cm³", "81 cm³"], correctAnswer: 1 },
    { question: "Un trapèze a combien de côtés parallèles ?", options: ["1", "2", "3", "4"], correctAnswer: 0 },
    { question: "Quelle est l'aire d'un triangle de 8 m de base et 5 m de hauteur ?", options: ["13 m²", "20 m²", "40 m²", "80 m²"], correctAnswer: 1 },
    { question: "Combien de faces a une pyramide à base pentagonale ?", options: ["5", "6", "10", "15"], correctAnswer: 1 },
    { question: "Un cercle a combien d'axes de symétrie ?", options: ["1", "2", "Infini", "0"], correctAnswer: 2 },
    { question: "Quel est le rayon d'un cercle de diamètre 14 cm ?", options: ["7 cm", "14 cm", "28 cm", "3.5 cm"], correctAnswer: 0 },
    { question: "Un parallélogramme a-t-il ses diagonales égales ?", options: ["Toujours", "Jamais", "Parfois", "Rarement"], correctAnswer: 2 },
    { question: "Combien d'arêtes a un parallélépipède rectangle ?", options: ["8", "12", "16", "24"], correctAnswer: 1 },
    { question: "Un triangle rectangle a combien d'angles aigus ?", options: ["0", "1", "2", "3"], correctAnswer: 2 },
    { question: "Quelle est l'aire d'un carré de 7 m de côté ?", options: ["14 m²", "28 m²", "49 m²", "98 m²"], correctAnswer: 2 },
    { question: "Un octogone régulier a combien de côtés ?", options: ["6", "8", "10", "12"], correctAnswer: 1 },
    { question: "Quel est le volume d'un cylindre de rayon 2 cm et hauteur 5 cm ? (π ≈ 3,14)", options: ["20 cm³", "31.4 cm³", "62.8 cm³", "125.6 cm³"], correctAnswer: 2 },
    { question: "Un rhombus est-il aussi un parallélogramme ?", options: ["Non", "Oui", "Parfois", "Seulement en 3D"], correctAnswer: 1 },
    { question: "Quelle est la diagonale d'un carré de 5 cm de côté ? (≈)", options: ["5 cm", "7.07 cm", "10 cm", "3.54 cm"], correctAnswer: 1 },
    { question: "Combien de faces a un tétraèdre régulier ?", options: ["3", "4", "6", "8"], correctAnswer: 1 },
    { question: "Un angle plat mesure combien de degrés ?", options: ["90°", "180°", "270°", "360°"], correctAnswer: 1 },
    { question: "Quelle est l'aire d'un trapèze de bases 4 cm et 6 cm, et hauteur 3 cm ?", options: ["10 cm²", "15 cm²", "18 cm²", "30 cm²"], correctAnswer: 1 },
    { question: "Quel est le volume d'une pyramide à base carrée de 4 cm x 4 cm et 6 cm de hauteur ?", options: ["16 cm³", "32 cm³", "48 cm³", "96 cm³"], correctAnswer: 2 },
    { question: "Une sphère a combien d'axes de symétrie ?", options: ["0", "1", "2", "Infini"], correctAnswer: 3 },
    { question: "Quelle est l'aire d'un triangle de 10 cm de base et 7 cm de hauteur ?", options: ["17 cm²", "35 cm²", "70 cm²", "140 cm²"], correctAnswer: 1 },
    { question: "Un polygone régulier à 12 côtés s'appelle comment ?", options: ["Décagone", "Hendécagone", "Dodécagone", "Tridécagone"], correctAnswer: 2 },
    { question: "Quel est le volume d'un prisme rectangulaire de 3 cm x 4 cm x 5 cm ?", options: ["12 cm³", "30 cm³", "60 cm³", "120 cm³"], correctAnswer: 2 },
    { question: "Un angle aigu mesure entre combien et combien de degrés ?", options: ["0° et 90°", "90° et 180°", "0° et 180°", "180° et 360°"], correctAnswer: 0 },
    { question: "Quelle est la circonférence d'un cercle de rayon 3 cm ? (π ≈ 3,14)", options: ["6.28 cm", "9.42 cm", "18.84 cm", "28.26 cm"], correctAnswer: 2 },
    { question: "Un triangle équilatéral a combien d'axes de symétrie ?", options: ["1", "2", "3", "Infini"], correctAnswer: 2 },
    { question: "Quelle est l'aire d'un rectangle de 9 cm de longueur et 4 cm de largeur ?", options: ["13 cm²", "26 cm²", "36 cm²", "72 cm²"], correctAnswer: 2 },
    { question: "Un cube a combien de sommets ?", options: ["6", "8", "10", "12"], correctAnswer: 1 },
    { question: "Quel est le nombre de faces d'un dodécaèdre régulier ?", options: ["10", "12", "20", "30"], correctAnswer: 1 },
    { question: "Un triangle scalène a combien de côtés égaux ?", options: ["0", "1", "2", "3"], correctAnswer: 0 },
    { question: "Quelle est l'aire d'un losange de diagonales 6 cm et 8 cm ?", options: ["14 cm²", "24 cm²", "48 cm²", "96 cm²"], correctAnswer: 2 },
    { question: "Combien d'arêtes a un octaèdre régulier ?", options: ["8", "12", "15", "24"], correctAnswer: 1 },
    { question: "Un angle rentrant mesure entre combien et combien de degrés ?", options: ["0° et 180°", "180° et 360°", "90° et 270°", "0° et 360°"], correctAnswer: 1 },
    { question: "Quelle est l'aire d'un pentagone régulier de 5 cm de côté ? (≈)", options: ["40 cm²", "43 cm²", "50 cm²", "60 cm²"], correctAnswer: 1 },
    { question: "Un prisme pentagonal a combien d'arêtes ?", options: ["10", "12", "15", "20"], correctAnswer: 2 },
  ];

  const questions: Question[] = [];
  const levelPrefix = level.toLowerCase().replace('è', 'e').replace('ème', '');
  const domainCode = 'geo';

  geometryQuestions.forEach((geoQ, i) => {
    const num = i + 1;
    const questionNumber = `[#${levelPrefix}-${domainCode}-${num}]`;
    questions.push({
      id: `${levelPrefix}-${domainCode}-${num}`,
      level,
      domain: 'Géométrie',
      question: `${questionNumber} ${geoQ.question}`,
      options: geoQ.options.map(opt => `${questionNumber} ${opt}`),
      correctAnswer: geoQ.correctAnswer,
      explanation: `${questionNumber} La réponse correcte est : ${geoQ.options[geoQ.correctAnswer]}`,
      difficulty: ((i % 3) + 1) as 1 | 2 | 3
    });
  });

  return questions;
};

// Générateur de questions pour autres domaines
const generateOtherQuestions = (level: GradeLevel): Question[] => {
  const domains: MathDomain[] = [
    'Calcul mental',
    'Arithmétique',
    'Fractions/Décimaux',
    'Mesures',
    'Problèmes/Algèbre'
  ];

  const questions: Question[] = [];
  const levelPrefix = level.toLowerCase().replace('è', 'e').replace('ème', '');

  domains.forEach((domain, domainIndex) => {
    const domainCode = ['cm', 'ar', 'fd', 'mes', 'pa'][domainIndex];
    
    for (let i = 1; i <= 50; i++) {
      const questionNumber = `[#${levelPrefix}-${domainCode}-${i}]`;
      questions.push({
        id: `${levelPrefix}-${domainCode}-${i}`,
        level,
        domain,
        question: `${questionNumber} Question ${i} - ${domain} niveau ${level}`,
        options: [
          `${questionNumber} Réponse A`,
          `${questionNumber} Réponse B`,
          `${questionNumber} Réponse C`,
          `${questionNumber} Réponse D`
        ],
        correctAnswer: Math.floor(Math.random() * 4),
        explanation: `${questionNumber} Explication de la question ${i} pour ${domain} niveau ${level}`,
        difficulty: ((i % 3) + 1) as 1 | 2 | 3
      });
    }
  });

  return questions;
};

// Générateur complet pour tous les domaines
const generateQuestions = (level: GradeLevel): Question[] => {
  const geometryQuestions = generateGeometryQuestions(level);
  const otherQuestions = generateOtherQuestions(level);
  return [...geometryQuestions, ...otherQuestions];
};

// Générer les questions pour chaque niveau
export const questionsCE2 = generateQuestions('CE2');
export const questionsCM1 = generateQuestions('CM1');
export const questionsCM2 = generateQuestions('CM2');
export const questions6eme = generateQuestions('6ème');
export const questions5eme = generateQuestions('5ème');
export const questions4eme = generateQuestions('4ème');

// Exporter toutes les questions
export const allGeneratedQuestions = [
  ...questionsCE2,
  ...questionsCM1,
  ...questionsCM2,
  ...questions6eme,
  ...questions5eme,
  ...questions4eme
];
