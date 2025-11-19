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
    { question: "Quel est le périmètre d'un triangle équilatéral de 6 cm de côté ?", options: ["12 cm", "18 cm", "24 cm", "36 cm"], correctAnswer: 1 },
    { question: "Quelle est l'aire d'un parallélogramme de 8 cm de base et 5 cm de hauteur ?", options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"], correctAnswer: 2 },
    { question: "Un cône a combien de sommets ?", options: ["0", "1", "2", "3"], correctAnswer: 1 },
    { question: "Quel est le volume d'une sphère de rayon 3 cm ? (π ≈ 3,14)", options: ["36 cm³", "113 cm³", "118 cm³", "226 cm³"], correctAnswer: 2 },
    { question: "Un trapèze isocèle a-t-il ses côtés non parallèles égaux ?", options: ["Oui", "Non", "Parfois", "Jamais"], correctAnswer: 0 },
  ];

  const questions: Question[] = [];
  const levelPrefix = level.toLowerCase().replace('è', 'e').replace('ème', '');

  geometryQuestions.forEach((geoQ, i) => {
    const num = i + 1;
    questions.push({
      id: `${levelPrefix}-geo-${num}`,
      level,
      domain: 'Géométrie',
      question: geoQ.question,
      options: geoQ.options,
      correctAnswer: geoQ.correctAnswer,
      explanation: `La réponse correcte est : ${geoQ.options[geoQ.correctAnswer]}`,
      difficulty: ((i % 3) + 1) as 1 | 2 | 3
    });
  });

  return questions;
};

// Questions réelles pour Calcul mental
const mentalMathQuestions = [
  { q: "Combien font 12 + 8 ?", opts: ["18", "19", "20", "21"], ans: 2, exp: "12 + 8 = 20" },
  { q: "Combien font 25 - 7 ?", opts: ["16", "17", "18", "19"], ans: 2, exp: "25 - 7 = 18" },
  { q: "Combien font 6 × 7 ?", opts: ["40", "41", "42", "43"], ans: 2, exp: "6 × 7 = 42" },
  { q: "Combien font 48 ÷ 6 ?", opts: ["7", "8", "9", "10"], ans: 1, exp: "48 ÷ 6 = 8" },
  { q: "Quel est le double de 15 ?", opts: ["28", "29", "30", "31"], ans: 2, exp: "Le double de 15 est 30" },
  { q: "Quel est la moitié de 36 ?", opts: ["16", "17", "18", "19"], ans: 2, exp: "La moitié de 36 est 18" },
  { q: "Combien font 23 + 17 ?", opts: ["38", "39", "40", "41"], ans: 2, exp: "23 + 17 = 40" },
  { q: "Combien font 50 - 13 ?", opts: ["35", "36", "37", "38"], ans: 2, exp: "50 - 13 = 37" },
  { q: "Combien font 9 × 8 ?", opts: ["70", "71", "72", "73"], ans: 2, exp: "9 × 8 = 72" },
  { q: "Combien font 63 ÷ 7 ?", opts: ["8", "9", "10", "11"], ans: 1, exp: "63 ÷ 7 = 9" },
  { q: "Quel est le triple de 12 ?", opts: ["34", "35", "36", "37"], ans: 2, exp: "Le triple de 12 est 36" },
  { q: "Combien font 45 + 25 ?", opts: ["68", "69", "70", "71"], ans: 2, exp: "45 + 25 = 70" },
  { q: "Combien font 78 - 29 ?", opts: ["47", "48", "49", "50"], ans: 2, exp: "78 - 29 = 49" },
  { q: "Combien font 11 × 7 ?", opts: ["74", "75", "76", "77"], ans: 3, exp: "11 × 7 = 77" },
  { q: "Combien font 81 ÷ 9 ?", opts: ["8", "9", "10", "11"], ans: 1, exp: "81 ÷ 9 = 9" },
  { q: "Quel est le quart de 48 ?", opts: ["10", "11", "12", "13"], ans: 2, exp: "Le quart de 48 est 12" },
  { q: "Combien font 34 + 26 ?", opts: ["58", "59", "60", "61"], ans: 2, exp: "34 + 26 = 60" },
  { q: "Combien font 92 - 38 ?", opts: ["52", "53", "54", "55"], ans: 2, exp: "92 - 38 = 54" },
  { q: "Combien font 7 × 9 ?", opts: ["61", "62", "63", "64"], ans: 2, exp: "7 × 9 = 63" },
  { q: "Combien font 56 ÷ 8 ?", opts: ["6", "7", "8", "9"], ans: 1, exp: "56 ÷ 8 = 7" },
  { q: "Quel est le double de 24 ?", opts: ["46", "47", "48", "49"], ans: 2, exp: "Le double de 24 est 48" },
  { q: "Combien font 16 + 34 ?", opts: ["48", "49", "50", "51"], ans: 2, exp: "16 + 34 = 50" },
  { q: "Combien font 65 - 17 ?", opts: ["46", "47", "48", "49"], ans: 2, exp: "65 - 17 = 48" },
  { q: "Combien font 8 × 8 ?", opts: ["62", "63", "64", "65"], ans: 2, exp: "8 × 8 = 64" },
  { q: "Combien font 72 ÷ 8 ?", opts: ["8", "9", "10", "11"], ans: 1, exp: "72 ÷ 8 = 9" },
  { q: "Quel est le quart de 60 ?", opts: ["13", "14", "15", "16"], ans: 2, exp: "Le quart de 60 est 15" },
  { q: "Combien font 27 + 23 ?", opts: ["48", "49", "50", "51"], ans: 2, exp: "27 + 23 = 50" },
  { q: "Combien font 84 - 36 ?", opts: ["46", "47", "48", "49"], ans: 2, exp: "84 - 36 = 48" },
  { q: "Combien font 6 × 9 ?", opts: ["52", "53", "54", "55"], ans: 2, exp: "6 × 9 = 54" },
  { q: "Combien font 35 ÷ 7 ?", opts: ["4", "5", "6", "7"], ans: 1, exp: "35 ÷ 7 = 5" },
  { q: "Quel est le triple de 8 ?", opts: ["22", "23", "24", "25"], ans: 2, exp: "Le triple de 8 est 24" },
  { q: "Combien font 18 + 22 ?", opts: ["38", "39", "40", "41"], ans: 2, exp: "18 + 22 = 40" },
  { q: "Combien font 73 - 25 ?", opts: ["46", "47", "48", "49"], ans: 2, exp: "73 - 25 = 48" },
  { q: "Combien font 12 × 6 ?", opts: ["70", "71", "72", "73"], ans: 2, exp: "12 × 6 = 72" },
  { q: "Combien font 54 ÷ 9 ?", opts: ["5", "6", "7", "8"], ans: 1, exp: "54 ÷ 9 = 6" },
  { q: "Quel est le double de 18 ?", opts: ["34", "35", "36", "37"], ans: 2, exp: "Le double de 18 est 36" },
  { q: "Combien font 29 + 21 ?", opts: ["48", "49", "50", "51"], ans: 2, exp: "29 + 21 = 50" },
  { q: "Combien font 68 - 19 ?", opts: ["47", "48", "49", "50"], ans: 2, exp: "68 - 19 = 49" },
  { q: "Combien font 5 × 11 ?", opts: ["53", "54", "55", "56"], ans: 2, exp: "5 × 11 = 55" },
  { q: "Combien font 42 ÷ 7 ?", opts: ["5", "6", "7", "8"], ans: 1, exp: "42 ÷ 7 = 6" },
  { q: "Quel est le quart de 40 ?", opts: ["8", "9", "10", "11"], ans: 2, exp: "Le quart de 40 est 10" },
  { q: "Combien font 37 + 13 ?", opts: ["48", "49", "50", "51"], ans: 2, exp: "37 + 13 = 50" },
  { q: "Combien font 89 - 41 ?", opts: ["46", "47", "48", "49"], ans: 2, exp: "89 - 41 = 48" },
  { q: "Combien font 10 × 9 ?", opts: ["88", "89", "90", "91"], ans: 2, exp: "10 × 9 = 90" },
  { q: "Combien font 64 ÷ 8 ?", opts: ["7", "8", "9", "10"], ans: 1, exp: "64 ÷ 8 = 8" },
  { q: "Quel est le triple de 15 ?", opts: ["43", "44", "45", "46"], ans: 2, exp: "Le triple de 15 est 45" },
  { q: "Combien font 44 + 26 ?", opts: ["68", "69", "70", "71"], ans: 2, exp: "44 + 26 = 70" },
  { q: "Combien font 95 - 47 ?", opts: ["46", "47", "48", "49"], ans: 2, exp: "95 - 47 = 48" },
  { q: "Combien font 13 × 5 ?", opts: ["63", "64", "65", "66"], ans: 2, exp: "13 × 5 = 65" },
  { q: "Combien font 49 ÷ 7 ?", opts: ["6", "7", "8", "9"], ans: 1, exp: "49 ÷ 7 = 7" }
];

// Questions réelles pour Arithmétique
const arithmeticQuestions = [
  { q: "Quel est le résultat de 234 + 567 ?", opts: ["791", "801", "811", "821"], ans: 1, exp: "234 + 567 = 801" },
  { q: "Quel est le résultat de 890 - 456 ?", opts: ["424", "434", "444", "454"], ans: 1, exp: "890 - 456 = 434" },
  { q: "Quel est le résultat de 23 × 15 ?", opts: ["335", "345", "355", "365"], ans: 1, exp: "23 × 15 = 345" },
  { q: "Quel est le résultat de 576 ÷ 24 ?", opts: ["22", "23", "24", "25"], ans: 2, exp: "576 ÷ 24 = 24" },
  { q: "Quel est le résultat de 1200 ÷ 15 ?", opts: ["78", "80", "82", "84"], ans: 1, exp: "1200 ÷ 15 = 80" },
  { q: "Quel est le double de 456 ?", opts: ["902", "912", "922", "932"], ans: 1, exp: "Le double de 456 est 912" },
  { q: "Quel est le résultat de 345 + 678 ?", opts: ["1013", "1023", "1033", "1043"], ans: 1, exp: "345 + 678 = 1023" },
  { q: "Quel est le résultat de 987 - 432 ?", opts: ["545", "555", "565", "575"], ans: 1, exp: "987 - 432 = 555" },
  { q: "Quel est le résultat de 45 × 23 ?", opts: ["1025", "1035", "1045", "1055"], ans: 1, exp: "45 × 23 = 1035" },
  { q: "Quel est le résultat de 1980 ÷ 45 ?", opts: ["42", "43", "44", "45"], ans: 2, exp: "1980 ÷ 45 = 44" },
  { q: "Quel est le triple de 321 ?", opts: ["953", "963", "973", "983"], ans: 2, exp: "Le triple de 321 est 963" },
  { q: "Quel est le résultat de 567 + 234 ?", opts: ["791", "801", "811", "821"], ans: 2, exp: "567 + 234 = 801" },
  { q: "Quel est le résultat de 1000 - 345 ?", opts: ["645", "655", "665", "675"], ans: 2, exp: "1000 - 345 = 655" },
  { q: "Quel est le résultat de 67 × 34 ?", opts: ["2268", "2278", "2288", "2298"], ans: 1, exp: "67 × 34 = 2278" },
  { q: "Quel est le résultat de 2340 ÷ 45 ?", opts: ["50", "51", "52", "53"], ans: 2, exp: "2340 ÷ 45 = 52" },
  { q: "Quel est le double de 567 ?", opts: ["1124", "1134", "1144", "1154"], ans: 1, exp: "Le double de 567 est 1134" },
  { q: "Quel est le résultat de 789 + 456 ?", opts: ["1235", "1245", "1255", "1265"], ans: 1, exp: "789 + 456 = 1245" },
  { q: "Quel est le résultat de 1200 - 567 ?", opts: ["623", "633", "643", "653"], ans: 2, exp: "1200 - 567 = 633" },
  { q: "Quel est le résultat de 89 × 45 ?", opts: ["3995", "4005", "4015", "4025"], ans: 1, exp: "89 × 45 = 4005" },
  { q: "Quel est le résultat de 3528 ÷ 56 ?", opts: ["61", "62", "63", "64"], ans: 2, exp: "3528 ÷ 56 = 63" },
  { q: "Quel est le quintuple de 78 ?", opts: ["385", "390", "395", "400"], ans: 1, exp: "Le quintuple de 78 est 390" },
  { q: "Quel est le résultat de 456 + 789 ?", opts: ["1235", "1245", "1255", "1265"], ans: 1, exp: "456 + 789 = 1245" },
  { q: "Quel est le résultat de 1500 - 678 ?", opts: ["812", "822", "832", "842"], ans: 2, exp: "1500 - 678 = 822" },
  { q: "Quel est le résultat de 123 × 45 ?", opts: ["5515", "5525", "5535", "5545"], ans: 2, exp: "123 × 45 = 5535" },
  { q: "Quel est le résultat de 5040 ÷ 56 ?", opts: ["88", "89", "90", "91"], ans: 2, exp: "5040 ÷ 56 = 90" },
  { q: "Quel est le quart de 2000 ?", opts: ["450", "475", "500", "525"], ans: 2, exp: "Le quart de 2000 est 500" },
  { q: "Quel est le résultat de 678 + 345 ?", opts: ["1013", "1023", "1033", "1043"], ans: 2, exp: "678 + 345 = 1023" },
  { q: "Quel est le résultat de 2000 - 789 ?", opts: ["1211", "1221", "1231", "1241"], ans: 1, exp: "2000 - 789 = 1211" },
  { q: "Quel est le résultat de 234 × 56 ?", opts: ["13094", "13104", "13114", "13124"], ans: 1, exp: "234 × 56 = 13104" },
  { q: "Quel est le résultat de 6840 ÷ 72 ?", opts: ["94", "95", "96", "97"], ans: 2, exp: "6840 ÷ 72 = 95" },
  { q: "Quel est le résultat de 567 × 89 ?", opts: ["50463", "50473", "50483", "50493"], ans: 2, exp: "567 × 89 = 50463" },
  { q: "Quel est le résultat de 8900 ÷ 100 ?", opts: ["88", "89", "90", "91"], ans: 1, exp: "8900 ÷ 100 = 89" },
  { q: "Quel est le double de 1234 ?", opts: ["2468", "2478", "2488", "2498"], ans: 0, exp: "Le double de 1234 est 2468" },
  { q: "Quel est le résultat de 1111 + 2222 ?", opts: ["3333", "3334", "3335", "3336"], ans: 0, exp: "1111 + 2222 = 3333" },
  { q: "Quel est le résultat de 5000 - 1234 ?", opts: ["3756", "3766", "3776", "3786"], ans: 2, exp: "5000 - 1234 = 3766" },
  { q: "Quel est le résultat de 345 × 789 ?", opts: ["272105", "272205", "272305", "272405"], ans: 1, exp: "345 × 789 = 272205" },
  { q: "Quel est le résultat de 10000 ÷ 125 ?", opts: ["78", "79", "80", "81"], ans: 2, exp: "10000 ÷ 125 = 80" },
  { q: "Quel est le triple de 567 ?", opts: ["1691", "1701", "1711", "1721"], ans: 2, exp: "Le triple de 567 est 1701" },
  { q: "Quel est le résultat de 2345 + 6789 ?", opts: ["9124", "9134", "9144", "9154"], ans: 1, exp: "2345 + 6789 = 9134" },
  { q: "Quel est le résultat de 10000 - 3456 ?", opts: ["6544", "6544", "6554", "6564"], ans: 0, exp: "10000 - 3456 = 6544" },
  { q: "Quel est le résultat de 456 × 789 ?", opts: ["359784", "359834", "359884", "359934"], ans: 0, exp: "456 × 789 = 359784" },
  { q: "Quel est le résultat de 15625 ÷ 125 ?", opts: ["123", "124", "125", "126"], ans: 2, exp: "15625 ÷ 125 = 125" },
  { q: "Quel est le quart de 5000 ?", opts: ["1250", "1260", "1270", "1280"], ans: 0, exp: "Le quart de 5000 est 1250" },
  { q: "Quel est le résultat de 3456 + 7890 ?", opts: ["11336", "11346", "11356", "11366"], ans: 1, exp: "3456 + 7890 = 11346" },
  { q: "Quel est le résultat de 15000 - 6789 ?", opts: ["8211", "8221", "8231", "8241"], ans: 1, exp: "15000 - 6789 = 8211" },
  { q: "Quel est le résultat de 567 × 234 ?", opts: ["132678", "132678", "132778", "132878"], ans: 0, exp: "567 × 234 = 132678" },
  { q: "Quel est le résultat de 20000 ÷ 250 ?", opts: ["78", "79", "80", "81"], ans: 2, exp: "20000 ÷ 250 = 80" },
  { q: "Quel est le double de 5678 ?", opts: ["11346", "11356", "11366", "11376"], ans: 2, exp: "Le double de 5678 est 11356" }
];

// Questions réelles pour Fractions/Décimaux
const fractionQuestions = [
  { q: "Combien font 1/2 + 1/4 ?", opts: ["1/6", "3/4", "3/8", "5/8"], ans: 1, exp: "1/2 + 1/4 = 2/4 + 1/4 = 3/4" },
  { q: "Quel est l'équivalent décimal de 1/2 ?", opts: ["0.3", "0.5", "0.7", "1.2"], ans: 1, exp: "1/2 = 0.5" },
  { q: "Combien font 3/4 - 1/4 ?", opts: ["1/2", "1/3", "1/4", "1/5"], ans: 0, exp: "3/4 - 1/4 = 2/4 = 1/2" },
  { q: "Quel est l'équivalent décimal de 3/4 ?", opts: ["0.5", "0.6", "0.75", "0.8"], ans: 2, exp: "3/4 = 0.75" },
  { q: "Combien font 2/3 + 1/3 ?", opts: ["2/3", "3/6", "1", "4/3"], ans: 2, exp: "2/3 + 1/3 = 3/3 = 1" },
  { q: "Quelle fraction est équivalente à 2/4 ?", opts: ["1/2", "2/3", "3/4", "4/5"], ans: 0, exp: "2/4 = 1/2" },
  { q: "Combien font 1/3 + 1/6 ?", opts: ["1/2", "2/3", "1/9", "5/6"], ans: 0, exp: "1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2" },
  { q: "Quel est l'équivalent décimal de 1/4 ?", opts: ["0.2", "0.25", "0.4", "0.5"], ans: 1, exp: "1/4 = 0.25" },
  { q: "Combien font 5/6 - 1/6 ?", opts: ["1/3", "1/2", "2/3", "3/4"], ans: 2, exp: "5/6 - 1/6 = 4/6 = 2/3" },
  { q: "Quelle fraction est équivalente à 3/6 ?", opts: ["1/2", "2/3", "1/3", "3/4"], ans: 0, exp: "3/6 = 1/2" },
  { q: "Combien font 1/2 × 1/2 ?", opts: ["1/4", "1/3", "1/2", "2/4"], ans: 0, exp: "1/2 × 1/2 = 1/4" },
  { q: "Quel est l'équivalent décimal de 1/5 ?", opts: ["0.1", "0.2", "0.4", "0.5"], ans: 1, exp: "1/5 = 0.2" },
  { q: "Combien font 3/5 + 1/5 ?", opts: ["3/5", "4/5", "1", "6/5"], ans: 1, exp: "3/5 + 1/5 = 4/5" },
  { q: "Quelle fraction est équivalente à 6/9 ?", opts: ["1/3", "2/3", "1/2", "3/4"], ans: 1, exp: "6/9 = 2/3" },
  { q: "Combien font 2/5 + 3/5 ?", opts: ["1/5", "4/5", "1", "6/5"], ans: 2, exp: "2/5 + 3/5 = 5/5 = 1" },
  { q: "Quel est l'équivalent décimal de 2/5 ?", opts: ["0.2", "0.3", "0.4", "0.5"], ans: 2, exp: "2/5 = 0.4" },
  { q: "Combien font 7/8 - 3/8 ?", opts: ["1/4", "1/2", "3/4", "4/8"], ans: 1, exp: "7/8 - 3/8 = 4/8 = 1/2" },
  { q: "Quelle fraction est équivalente à 4/8 ?", opts: ["1/4", "1/2", "3/4", "4/5"], ans: 1, exp: "4/8 = 1/2" },
  { q: "Combien font 1/3 × 1/2 ?", opts: ["1/6", "1/5", "1/4", "2/6"], ans: 0, exp: "1/3 × 1/2 = 1/6" },
  { q: "Quel est l'équivalent décimal de 3/5 ?", opts: ["0.4", "0.5", "0.6", "0.7"], ans: 2, exp: "3/5 = 0.6" },
  { q: "Combien font 4/5 - 2/5 ?", opts: ["1/5", "2/5", "3/5", "4/5"], ans: 2, exp: "4/5 - 2/5 = 2/5" },
  { q: "Quelle fraction est équivalente à 5/10 ?", opts: ["1/4", "1/3", "1/2", "3/4"], ans: 2, exp: "5/10 = 1/2" },
  { q: "Combien font 1/4 + 1/4 ?", opts: ["1/8", "1/4", "1/2", "3/4"], ans: 2, exp: "1/4 + 1/4 = 2/4 = 1/2" },
  { q: "Quel est l'équivalent décimal de 4/5 ?", opts: ["0.6", "0.7", "0.8", "0.9"], ans: 2, exp: "4/5 = 0.8" },
  { q: "Combien font 5/6 + 1/6 ?", opts: ["1", "5/6", "7/6", "6/12"], ans: 0, exp: "5/6 + 1/6 = 6/6 = 1" },
  { q: "Quelle fraction est équivalente à 6/12 ?", opts: ["1/4", "1/3", "1/2", "2/3"], ans: 2, exp: "6/12 = 1/2" },
  { q: "Combien font 2/3 × 1/2 ?", opts: ["1/3", "1/6", "1/4", "2/6"], ans: 0, exp: "2/3 × 1/2 = 2/6 = 1/3" },
  { q: "Quel est l'équivalent décimal de 1/8 ?", opts: ["0.125", "0.25", "0.375", "0.5"], ans: 0, exp: "1/8 = 0.125" },
  { q: "Combien font 7/10 - 3/10 ?", opts: ["2/10", "3/10", "4/10", "5/10"], ans: 3, exp: "7/10 - 3/10 = 4/10 = 2/5" },
  { q: "Quelle fraction est équivalente à 8/12 ?", opts: ["1/3", "1/2", "2/3", "3/4"], ans: 2, exp: "8/12 = 2/3" },
  { q: "Combien font 1/5 + 2/5 ?", opts: ["1/5", "2/5", "3/5", "4/5"], ans: 2, exp: "1/5 + 2/5 = 3/5" },
  { q: "Quel est l'équivalent décimal de 3/8 ?", opts: ["0.25", "0.375", "0.5", "0.625"], ans: 1, exp: "3/8 = 0.375" },
  { q: "Combien font 9/10 - 4/10 ?", opts: ["2/10", "3/10", "4/10", "5/10"], ans: 3, exp: "9/10 - 4/10 = 5/10 = 1/2" },
  { q: "Quelle fraction est équivalente à 9/12 ?", opts: ["1/2", "2/3", "3/4", "5/6"], ans: 1, exp: "9/12 = 3/4" },
  { q: "Combien font 3/4 + 1/4 ?", opts: ["1", "3/4", "2/4", "4/4"], ans: 0, exp: "3/4 + 1/4 = 4/4 = 1" },
  { q: "Quel est l'équivalent décimal de 5/8 ?", opts: ["0.5", "0.625", "0.75", "0.875"], ans: 1, exp: "5/8 = 0.625" },
  { q: "Combien font 8/9 - 2/9 ?", opts: ["2/3", "4/9", "5/9", "6/9"], ans: 3, exp: "8/9 - 2/9 = 6/9 = 2/3" },
  { q: "Quelle fraction est équivalente à 10/15 ?", opts: ["1/3", "1/2", "2/3", "3/4"], ans: 2, exp: "10/15 = 2/3" },
  { q: "Combien font 2/4 + 1/4 ?", opts: ["1/4", "2/4", "3/4", "4/4"], ans: 2, exp: "2/4 + 1/4 = 3/4" },
  { q: "Quel est l'équivalent décimal de 7/8 ?", opts: ["0.75", "0.875", "0.9", "1.0"], ans: 1, exp: "7/8 = 0.875" },
  { q: "Combien font 6/7 - 1/7 ?", opts: ["3/7", "4/7", "5/7", "6/7"], ans: 2, exp: "6/7 - 1/7 = 5/7" },
  { q: "Quelle fraction est équivalente à 12/16 ?", opts: ["1/2", "2/3", "3/4", "4/5"], ans: 2, exp: "12/16 = 3/4" },
  { q: "Combien font 4/6 + 1/6 ?", opts: ["3/6", "4/6", "5/6", "6/6"], ans: 2, exp: "4/6 + 1/6 = 5/6" },
  { q: "Quel est l'équivalent décimal de 2/8 ?", opts: ["0.2", "0.25", "0.3", "0.4"], ans: 1, exp: "2/8 = 1/4 = 0.25" },
  { q: "Combien font 5/9 - 2/9 ?", opts: ["1/9", "2/9", "3/9", "4/9"], ans: 2, exp: "5/9 - 2/9 = 3/9 = 1/3" },
  { q: "Quelle fraction est équivalente à 15/20 ?", opts: ["1/2", "2/3", "3/4", "4/5"], ans: 2, exp: "15/20 = 3/4" },
  { q: "Combien font 1/6 + 1/3 ?", opts: ["1/2", "2/3", "3/6", "4/6"], ans: 3, exp: "1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2" }
];

// Questions réelles pour Mesures
const measurementQuestions = [
  { q: "Combien de centimètres dans 1 mètre ?", opts: ["10", "50", "100", "1000"], ans: 2, exp: "1 mètre = 100 centimètres" },
  { q: "Combien de millimètres dans 1 centimètre ?", opts: ["5", "10", "100", "1000"], ans: 1, exp: "1 centimètre = 10 millimètres" },
  { q: "Combien de grammes dans 1 kilogramme ?", opts: ["10", "100", "1000", "10000"], ans: 2, exp: "1 kilogramme = 1000 grammes" },
  { q: "Combien de millilitres dans 1 litre ?", opts: ["10", "100", "500", "1000"], ans: 3, exp: "1 litre = 1000 millilitres" },
  { q: "Combien de minutes dans 1 heure ?", opts: ["30", "45", "60", "120"], ans: 2, exp: "1 heure = 60 minutes" },
  { q: "Combien de secondes dans 1 minute ?", opts: ["30", "60", "120", "180"], ans: 1, exp: "1 minute = 60 secondes" },
  { q: "Combien de jours dans 1 semaine ?", opts: ["5", "6", "7", "8"], ans: 2, exp: "1 semaine = 7 jours" },
  { q: "Combien de centilitres dans 1 litre ?", opts: ["10", "50", "100", "1000"], ans: 2, exp: "1 litre = 100 centilitres" },
  { q: "Combien de mois dans 1 année ?", opts: ["10", "12", "24", "52"], ans: 1, exp: "1 année = 12 mois" },
  { q: "Combien de décimètres dans 1 mètre ?", opts: ["5", "10", "100", "1000"], ans: 1, exp: "1 mètre = 10 décimètres" },
  { q: "Quel est 1/4 de 100 cm ?", opts: ["20 cm", "25 cm", "50 cm", "75 cm"], ans: 1, exp: "1/4 de 100 = 25" },
  { q: "Quel est 1/2 de 1 kg ?", opts: ["250 g", "500 g", "750 g", "1000 g"], ans: 1, exp: "1/2 de 1000 g = 500 g" },
  { q: "Combien d'heures dans 1 jour ?", opts: ["12", "18", "24", "30"], ans: 2, exp: "1 jour = 24 heures" },
  { q: "Combien de minutes dans 2 heures ?", opts: ["60", "90", "120", "180"], ans: 2, exp: "2 × 60 = 120 minutes" },
  { q: "Combien de centimètres dans 5 mètres ?", opts: ["50", "250", "500", "5000"], ans: 2, exp: "5 × 100 = 500 centimètres" },
  { q: "Quel est le double de 500 g ?", opts: ["500 g", "750 g", "1000 g", "1500 g"], ans: 2, exp: "2 × 500 = 1000 g = 1 kg" },
  { q: "Combien de litres dans 3000 millilitres ?", opts: ["0.3", "1", "3", "30"], ans: 2, exp: "3000 ÷ 1000 = 3 litres" },
  { q: "Quel est 1/10 de 100 cm ?", opts: ["1 cm", "5 cm", "10 cm", "50 cm"], ans: 2, exp: "100 ÷ 10 = 10 cm" },
  { q: "Combien de secondes dans 5 minutes ?", opts: ["60", "120", "180", "300"], ans: 3, exp: "5 × 60 = 300 secondes" },
  { q: "Combien de grammes dans 2 kilogrammes ?", opts: ["200", "500", "1000", "2000"], ans: 3, exp: "2 × 1000 = 2000 grammes" },
  { q: "Quel est le triple de 10 cm ?", opts: ["20 cm", "30 cm", "40 cm", "50 cm"], ans: 1, exp: "3 × 10 = 30 cm" },
  { q: "Combien d'heures dans 180 minutes ?", opts: ["1", "2", "3", "4"], ans: 2, exp: "180 ÷ 60 = 3 heures" },
  { q: "Combien de millimètres dans 5 centimètres ?", opts: ["5", "25", "50", "500"], ans: 2, exp: "5 × 10 = 50 millimètres" },
  { q: "Quel est 1/5 de 500 g ?", opts: ["50 g", "100 g", "250 g", "500 g"], ans: 1, exp: "500 ÷ 5 = 100 g" },
  { q: "Combien de centilitres dans 500 millilitres ?", opts: ["5", "25", "50", "500"], ans: 2, exp: "500 ÷ 10 = 50 centilitres" },
  { q: "Combien de secondes dans 2 minutes ?", opts: ["60", "120", "180", "240"], ans: 1, exp: "2 × 60 = 120 secondes" },
  { q: "Combien de mètres dans 3 kilomètres ?", opts: ["30", "300", "3000", "30000"], ans: 2, exp: "3 × 1000 = 3000 mètres" },
  { q: "Quel est le double de 15 cm ?", opts: ["20 cm", "30 cm", "40 cm", "50 cm"], ans: 1, exp: "2 × 15 = 30 cm" },
  { q: "Combien de litres dans 2000 millilitres ?", opts: ["0.2", "2", "20", "200"], ans: 1, exp: "2000 ÷ 1000 = 2 litres" },
  { q: "Quel est 1/2 de 1 litre ?", opts: ["250 ml", "500 ml", "750 ml", "1000 ml"], ans: 1, exp: "1/2 de 1000 = 500 ml" },
  { q: "Combien de minutes dans 3 heures ?", opts: ["60", "120", "180", "240"], ans: 2, exp: "3 × 60 = 180 minutes" },
  { q: "Quel est le triple de 20 g ?", opts: ["40 g", "60 g", "80 g", "100 g"], ans: 1, exp: "3 × 20 = 60 g" },
  { q: "Combien de centimètres dans 2 mètres ?", opts: ["20", "50", "100", "200"], ans: 3, exp: "2 × 100 = 200 centimètres" },
  { q: "Quel est 1/4 de 1 kg ?", opts: ["100 g", "250 g", "500 g", "750 g"], ans: 1, exp: "1000 ÷ 4 = 250 g" },
  { q: "Combien d'heures dans 240 minutes ?", opts: ["2", "3", "4", "5"], ans: 2, exp: "240 ÷ 60 = 4 heures" },
  { q: "Quel est le double de 250 ml ?", opts: ["250 ml", "500 ml", "750 ml", "1000 ml"], ans: 1, exp: "2 × 250 = 500 ml" },
  { q: "Combien de millimètres dans 2 centimètres ?", opts: ["10", "20", "50", "100"], ans: 1, exp: "2 × 10 = 20 millimètres" },
  { q: "Quel est 1/3 de 300 cm ?", opts: ["50 cm", "100 cm", "150 cm", "200 cm"], ans: 1, exp: "300 ÷ 3 = 100 cm" },
  { q: "Combien de secondes dans 3 minutes ?", opts: ["60", "120", "180", "240"], ans: 2, exp: "3 × 60 = 180 secondes" },
  { q: "Quel est le triple de 100 ml ?", opts: ["200 ml", "300 ml", "400 ml", "500 ml"], ans: 1, exp: "3 × 100 = 300 ml" },
  { q: "Combien de grammes dans 1/2 kilogramme ?", opts: ["250 g", "500 g", "750 g", "1000 g"], ans: 1, exp: "1000 ÷ 2 = 500 g" },
  { q: "Quel est 1/5 de 100 cm ?", opts: ["10 cm", "20 cm", "30 cm", "50 cm"], ans: 0, exp: "100 ÷ 5 = 20 cm" },
  { q: "Combien de litres dans 5000 millilitres ?", opts: ["0.5", "2", "5", "50"], ans: 2, exp: "5000 ÷ 1000 = 5 litres" },
  { q: "Quel est le double de 50 g ?", opts: ["50 g", "100 g", "150 g", "200 g"], ans: 1, exp: "2 × 50 = 100 g" },
  { q: "Combien de centimètres dans 10 mètres ?", opts: ["100", "500", "1000", "10000"], ans: 2, exp: "10 × 100 = 1000 centimètres" },
  { q: "Quel est 1/4 de 1 litre ?", opts: ["100 ml", "200 ml", "250 ml", "500 ml"], ans: 2, exp: "1000 ÷ 4 = 250 ml" }
];

// Questions réelles pour Problèmes/Algèbre
const problemsQuestions = [
  { q: "Paul a 12 billes. Il en gagne 5. Combien en a-t-il maintenant ?", opts: ["15", "16", "17", "18"], ans: 2, exp: "12 + 5 = 17 billes" },
  { q: "Marie a 20 € et elle dépense 7 €. Combien lui reste-t-il ?", opts: ["11 €", "12 €", "13 €", "14 €"], ans: 2, exp: "20 - 7 = 13 €" },
  { q: "Un panier contient 8 pommes. On en ajoute 6. Combien y en a-t-il ?", opts: ["12", "13", "14", "15"], ans: 2, exp: "8 + 6 = 14 pommes" },
  { q: "Thomas avait 25 cartes. Il en perd 9. Combien lui en reste-t-il ?", opts: ["14", "15", "16", "17"], ans: 2, exp: "25 - 9 = 16 cartes" },
  { q: "Un magasin vend 30 journaux le matin et 18 l'après-midi. Combien en total ?", opts: ["46", "48", "50", "52"], ans: 1, exp: "30 + 18 = 48 journaux" },
  { q: "Sophie a 45 photos. Elle en supprime 12. Combien lui en reste-t-il ?", opts: ["31", "32", "33", "34"], ans: 2, exp: "45 - 12 = 33 photos" },
  { q: "Un livre coûte 15 €. Quel est le prix de 4 livres ?", opts: ["55 €", "60 €", "65 €", "70 €"], ans: 1, exp: "4 × 15 = 60 €" },
  { q: "Il y a 24 élèves dans une classe. 6 sont absents. Combien sont présents ?", opts: ["16", "17", "18", "19"], ans: 2, exp: "24 - 6 = 18 élèves" },
  { q: "Un fermier a 35 poules. Il en achète 12. Combien en a-t-il ?", opts: ["45", "46", "47", "48"], ans: 2, exp: "35 + 12 = 47 poules" },
  { q: "Léa a 50 bonbons. Elle en mange 18. Combien lui en reste-t-il ?", opts: ["30", "31", "32", "33"], ans: 2, exp: "50 - 18 = 32 bonbons" },
  { q: "Un paquet de biscuits coûte 3 €. Quel est le prix de 8 paquets ?", opts: ["20 €", "22 €", "24 €", "26 €"], ans: 2, exp: "8 × 3 = 24 €" },
  { q: "Antoine avait 40 €. Il en reçoit 15. Combien a-t-il maintenant ?", opts: ["53 €", "54 €", "55 €", "56 €"], ans: 2, exp: "40 + 15 = 55 €" },
  { q: "Un train transporte 100 passagers. 35 descendent. Combien restent-ils ?", opts: ["63", "64", "65", "66"], ans: 2, exp: "100 - 35 = 65 passagers" },
  { q: "Un gâteau coûte 20 €. Quel est le prix de 3 gâteaux ?", opts: ["58 €", "59 €", "60 €", "61 €"], ans: 2, exp: "3 × 20 = 60 €" },
  { q: "Sarah a 32 images. Elle en colle 18 dans son album. Combien lui en reste-t-il ?", opts: ["12", "13", "14", "15"], ans: 2, exp: "32 - 18 = 14 images" },
  { q: "Un aquarium contient 28 poissons. On en ajoute 7. Combien y en a-t-il ?", opts: ["33", "34", "35", "36"], ans: 2, exp: "28 + 7 = 35 poissons" },
  { q: "Un cinéma a 80 places. 52 sont occupées. Combien sont libres ?", opts: ["26", "27", "28", "29"], ans: 2, exp: "80 - 52 = 28 places" },
  { q: "Une boîte contient 12 stylos. Quel est le nombre total dans 5 boîtes ?", opts: ["56", "58", "60", "62"], ans: 2, exp: "5 × 12 = 60 stylos" },
  { q: "Lucas a 42 timbres. Il en échange 15 contre des cartes. Combien lui en reste-t-il ?", opts: ["25", "26", "27", "28"], ans: 2, exp: "42 - 15 = 27 timbres" },
  { q: "Un sac contient 15 billes. Quel est le nombre total dans 6 sacs ?", opts: ["88", "89", "90", "91"], ans: 2, exp: "6 × 15 = 90 billes" },
  { q: "Chloé avait 56 €. Elle en dépense 24. Combien lui reste-t-il ?", opts: ["30 €", "31 €", "32 €", "33 €"], ans: 2, exp: "56 - 24 = 32 €" },
  { q: "Un jardin a 67 fleurs. On en cueille 23. Combien en reste-t-il ?", opts: ["42", "43", "44", "45"], ans: 2, exp: "67 - 23 = 44 fleurs" },
  { q: "Une robe coûte 35 €. Quel est le prix de 3 robes ?", opts: ["102 €", "104 €", "105 €", "106 €"], ans: 2, exp: "3 × 35 = 105 €" },
  { q: "Un restaurant a 75 clients. 28 partent. Combien restent-ils ?", opts: ["45", "46", "47", "48"], ans: 2, exp: "75 - 28 = 47 clients" },
  { q: "Un cahier coûte 4 €. Quel est le prix de 9 cahiers ?", opts: ["34 €", "35 €", "36 €", "37 €"], ans: 2, exp: "9 × 4 = 36 €" },
  { q: "Maxime a 89 points. Il en gagne 23. Combien en a-t-il ?", opts: ["110", "111", "112", "113"], ans: 2, exp: "89 + 23 = 112 points" },
  { q: "Une bibliothèque a 150 livres. 67 sont empruntés. Combien restent-ils ?", opts: ["81", "82", "83", "84"], ans: 2, exp: "150 - 67 = 83 livres" },
  { q: "Un billet de bus coûte 2 €. Quel est le prix de 15 billets ?", opts: ["28 €", "29 €", "30 €", "31 €"], ans: 2, exp: "15 × 2 = 30 €" },
  { q: "Un magasin a 200 articles. Il en vend 76. Combien en reste-t-il ?", opts: ["122", "123", "124", "125"], ans: 2, exp: "200 - 76 = 124 articles" },
  { q: "Un chocolat coûte 2.50 €. Quel est le prix de 4 chocolats ?", opts: ["8 €", "9 €", "10 €", "11 €"], ans: 2, exp: "4 × 2.50 = 10 €" },
  { q: "Alice avait 178 €. Elle en dépense 89. Combien lui reste-t-il ?", opts: ["87 €", "88 €", "89 €", "90 €"], ans: 1, exp: "178 - 89 = 89 €" },
  { q: "Une équipe a 11 joueurs. Combien joueurs dans 5 équipes ?", opts: ["53", "54", "55", "56"], ans: 2, exp: "5 × 11 = 55 joueurs" },
  { q: "Un magasin reçoit 300 produits. Il en vend 145. Combien en reste-t-il ?", opts: ["153", "154", "155", "156"], ans: 2, exp: "300 - 145 = 155 produits" },
  { q: "Un sandwich coûte 5 €. Quel est le prix de 7 sandwichs ?", opts: ["33 €", "34 €", "35 €", "36 €"], ans: 2, exp: "7 × 5 = 35 €" },
  { q: "Victor a 234 points. Il en perd 78. Combien lui en reste-t-il ?", opts: ["154", "155", "156", "157"], ans: 2, exp: "234 - 78 = 156 points" },
  { q: "Un stylo coûte 1.20 €. Quel est le prix de 10 stylos ?", opts: ["10 €", "11 €", "12 €", "13 €"], ans: 2, exp: "10 × 1.20 = 12 €" },
  { q: "Une école a 450 élèves. 189 sont en récréation. Combien sont en classe ?", opts: ["259", "260", "261", "262"], ans: 2, exp: "450 - 189 = 261 élèves" },
  { q: "Un ticket de cinéma coûte 12 €. Quel est le prix pour 3 personnes ?", opts: ["34 €", "35 €", "36 €", "37 €"], ans: 2, exp: "3 × 12 = 36 €" },
  { q: "Romane a 567 followers sur internet. Elle en perd 123. Combien en a-t-elle ?", opts: ["442", "443", "444", "445"], ans: 2, exp: "567 - 123 = 444 followers" },
  { q: "Un menu coûte 18 €. Quel est le prix pour 4 personnes ?", opts: ["70 €", "71 €", "72 €", "73 €"], ans: 2, exp: "4 × 18 = 72 €" },
  { q: "Un magasin a 890 articles. Il en vend 345. Combien en reste-t-il ?", opts: ["543", "544", "545", "546"], ans: 2, exp: "890 - 345 = 545 articles" }
];

// Générateur de questions pour autres domaines
const generateOtherQuestions = (level: GradeLevel): Question[] => {
  const questionSets = [
    mentalMathQuestions,
    arithmeticQuestions,
    fractionQuestions,
    measurementQuestions,
    problemsQuestions
  ];

  const domains: MathDomain[] = [
    'Calcul mental',
    'Arithmétique',
    'Fractions/Décimaux',
    'Mesures',
    'Problèmes/Algèbre'
  ];

  const questions: Question[] = [];

  domains.forEach((domain, domainIndex) => {
    const questionSet = questionSets[domainIndex];
    
    for (let i = 0; i < 50; i++) {
      const qData = questionSet[i % questionSet.length];
      questions.push({
        id: `${level.toLowerCase().replace('è', 'e').replace('ème', '')}-${['cm', 'ar', 'fd', 'mes', 'pa'][domainIndex]}-${i + 1}`,
        level,
        domain,
        question: qData.q,
        options: qData.opts,
        correctAnswer: qData.ans,
        explanation: qData.exp,
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
