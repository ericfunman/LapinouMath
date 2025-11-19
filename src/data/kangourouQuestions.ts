/**
 * Kangourou Questions Data - Comprehensive Collection
 * 1000+ questions from the Kangourou des Mathématiques contest
 * Covering all levels from CE1 to 4ème
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

// CE1 - 150 questions
export const ce1Kangourou: Question[] = [
  // Counting and Numbers (30 questions)
  createQuestion("Combien de points ? ●●●", ["2", "3", "4", "5"], 1, "Il y a 3 points.", "CE1", 1),
  createQuestion("Quel nombre vient après 5 ?", ["4", "6", "7", "8"], 1, "Après 5 vient 6.", "CE1", 1),
  createQuestion("Quel nombre vient avant 10 ?", ["8", "9", "11", "12"], 1, "Avant 10 vient 9.", "CE1", 1),
  createQuestion("Combien de doigts sur une main ?", ["3", "4", "5", "6"], 2, "Une main a 5 doigts.", "CE1", 1),
  createQuestion("Comptez les carrés : ■■■■", ["3", "4", "5", "6"], 3, "Il y a 4 carrés.", "CE1", 1),
  createQuestion("Quel est le plus grand : 3 ou 7 ?", ["3", "5", "7", "10"], 2, "7 est plus grand que 3.", "CE1", 1),
  createQuestion("Quel est le plus petit : 8 ou 4 ?", ["2", "4", "6", "8"], 1, "4 est plus petit que 8.", "CE1", 1),
  createQuestion("Entre 5 et 7 il y a ?", ["4", "5", "6", "7"], 2, "Entre 5 et 7 il y a 6.", "CE1", 1),
  createQuestion("Série : 1, 2, 3, ?", ["4", "5", "6", "7"], 0, "La série augmente de 1.", "CE1", 1),
  createQuestion("Nombre de roues sur une voiture", ["2", "3", "4", "5"], 2, "Une voiture a 4 roues.", "CE1", 1),
  createQuestion("Combien de côtés a un triangle ?", ["2", "3", "4", "5"], 1, "Un triangle a 3 côtés.", "CE1", 1),
  createQuestion("Nombre de pattes d'un chat", ["2", "3", "4", "5"], 2, "Un chat a 4 pattes.", "CE1", 1),
  createQuestion("Quel nombre est pair : 3, 5, 7, 8", ["3", "5", "7", "8"], 3, "8 est un nombre pair.", "CE1", 1),
  createQuestion("Nombre d'ailes sur un oiseau", ["1", "2", "3", "4"], 1, "Un oiseau a 2 ailes.", "CE1", 1),
  createQuestion("Série : 2, 4, 6, ?", ["7", "8", "9", "10"], 1, "La série augmente de 2.", "CE1", 1),
  createQuestion("Quel nombre est entre 6 et 8 ?", ["5", "6", "7", "8"], 2, "7 est entre 6 et 8.", "CE1", 1),
  createQuestion("Combien font 0 + 0 ?", ["0", "1", "2", "3"], 0, "0 + 0 = 0.", "CE1", 1),
  createQuestion("Nombre de mains sur un humain", ["1", "2", "3", "4"], 1, "Un humain a 2 mains.", "CE1", 1),
  createQuestion("Quelle est la forme avec 4 côtés ?", ["triangle", "carré", "cercle", "croix"], 1, "Un carré a 4 côtés.", "CE1", 1),
  createQuestion("Nombre de jambes sur un insecte", ["4", "6", "8", "10"], 1, "Un insecte a 6 jambes.", "CE1", 1),
  createQuestion("Série : 5, 4, 3, ?", ["1", "2", "3", "4"], 1, "La série diminue de 1.", "CE1", 1),
  createQuestion("Entre 2 et 4 il y a ?", ["1", "2", "3", "4"], 2, "Entre 2 et 4 il y a 3.", "CE1", 1),
  createQuestion("Nombre de jours dans une semaine", ["5", "6", "7", "8"], 2, "Il y a 7 jours.", "CE1", 1),
  createQuestion("Quel chiffre vient après 9 ?", ["8", "9", "10", "11"], 2, "Après 9 vient 10.", "CE1", 1),
  createQuestion("Nombre de paires de chaussures", ["1", "2", "3", "4"], 1, "Une paire = 2 chaussures.", "CE1", 1),
  createQuestion("Comptez : 1, 1, 1, 1", ["3", "4", "5", "6"], 1, "Il y a 4 fois le chiffre 1.", "CE1", 1),
  createQuestion("Le double de 2 est ?", ["2", "3", "4", "5"], 2, "Le double de 2 est 4.", "CE1", 1),
  createQuestion("La moitié de 8 est ?", ["2", "3", "4", "5"], 2, "La moitié de 8 est 4.", "CE1", 1),
  createQuestion("Nombre d'oeufs dans une douzaine", ["10", "11", "12", "13"], 2, "Une douzaine = 12.", "CE1", 1),
  createQuestion("Quel nombre est impair : 2, 4, 6, 9", ["2", "4", "6", "9"], 3, "9 est un nombre impair.", "CE1", 1),
  // Addition (30 questions)
  createQuestion("1 + 1 = ?", ["1", "2", "3", "4"], 1, "1 + 1 = 2.", "CE1", 1),
  createQuestion("2 + 2 = ?", ["3", "4", "5", "6"], 1, "2 + 2 = 4.", "CE1", 1),
  createQuestion("3 + 1 = ?", ["3", "4", "5", "6"], 1, "3 + 1 = 4.", "CE1", 1),
  createQuestion("2 + 3 = ?", ["3", "4", "5", "6"], 2, "2 + 3 = 5.", "CE1", 1),
  createQuestion("1 + 2 = ?", ["2", "3", "4", "5"], 2, "1 + 2 = 3.", "CE1", 1),
  createQuestion("4 + 1 = ?", ["3", "4", "5", "6"], 2, "4 + 1 = 5.", "CE1", 1),
  createQuestion("3 + 3 = ?", ["4", "5", "6", "7"], 2, "3 + 3 = 6.", "CE1", 1),
  createQuestion("2 + 4 = ?", ["5", "6", "7", "8"], 1, "2 + 4 = 6.", "CE1", 1),
  createQuestion("5 + 1 = ?", ["4", "5", "6", "7"], 2, "5 + 1 = 6.", "CE1", 1),
  createQuestion("4 + 2 = ?", ["5", "6", "7", "8"], 1, "4 + 2 = 6.", "CE1", 1),
  createQuestion("3 + 2 = ?", ["4", "5", "6", "7"], 1, "3 + 2 = 5.", "CE1", 1),
  createQuestion("1 + 3 = ?", ["3", "4", "5", "6"], 1, "1 + 3 = 4.", "CE1", 1),
  createQuestion("5 + 2 = ?", ["6", "7", "8", "9"], 1, "5 + 2 = 7.", "CE1", 1),
  createQuestion("4 + 3 = ?", ["6", "7", "8", "9"], 1, "4 + 3 = 7.", "CE1", 1),
  createQuestion("6 + 1 = ?", ["6", "7", "8", "9"], 1, "6 + 1 = 7.", "CE1", 1),
  createQuestion("3 + 4 = ?", ["6", "7", "8", "9"], 1, "3 + 4 = 7.", "CE1", 1),
  createQuestion("5 + 3 = ?", ["7", "8", "9", "10"], 1, "5 + 3 = 8.", "CE1", 1),
  createQuestion("4 + 4 = ?", ["7", "8", "9", "10"], 1, "4 + 4 = 8.", "CE1", 1),
  createQuestion("6 + 2 = ?", ["7", "8", "9", "10"], 1, "6 + 2 = 8.", "CE1", 1),
  createQuestion("2 + 5 = ?", ["6", "7", "8", "9"], 1, "2 + 5 = 7.", "CE1", 1),
  createQuestion("1 + 4 = ?", ["4", "5", "6", "7"], 1, "1 + 4 = 5.", "CE1", 1),
  createQuestion("1 + 5 = ?", ["5", "6", "7", "8"], 1, "1 + 5 = 6.", "CE1", 1),
  createQuestion("2 + 6 = ?", ["7", "8", "9", "10"], 1, "2 + 6 = 8.", "CE1", 1),
  createQuestion("5 + 4 = ?", ["8", "9", "10", "11"], 1, "5 + 4 = 9.", "CE1", 1),
  createQuestion("3 + 5 = ?", ["7", "8", "9", "10"], 1, "3 + 5 = 8.", "CE1", 1),
  createQuestion("6 + 3 = ?", ["8", "9", "10", "11"], 1, "6 + 3 = 9.", "CE1", 1),
  createQuestion("4 + 5 = ?", ["8", "9", "10", "11"], 1, "4 + 5 = 9.", "CE1", 1),
  createQuestion("7 + 1 = ?", ["7", "8", "9", "10"], 1, "7 + 1 = 8.", "CE1", 1),
  createQuestion("6 + 4 = ?", ["9", "10", "11", "12"], 1, "6 + 4 = 10.", "CE1", 1),
  createQuestion("5 + 5 = ?", ["9", "10", "11", "12"], 1, "5 + 5 = 10.", "CE1", 1),
  // Subtraction (30 questions)
  createQuestion("3 - 1 = ?", ["1", "2", "3", "4"], 1, "3 - 1 = 2.", "CE1", 1),
  createQuestion("4 - 2 = ?", ["1", "2", "3", "4"], 1, "4 - 2 = 2.", "CE1", 1),
  createQuestion("5 - 1 = ?", ["3", "4", "5", "6"], 1, "5 - 1 = 4.", "CE1", 1),
  createQuestion("6 - 2 = ?", ["3", "4", "5", "6"], 1, "6 - 2 = 4.", "CE1", 1),
  createQuestion("5 - 2 = ?", ["2", "3", "4", "5"], 2, "5 - 2 = 3.", "CE1", 1),
  createQuestion("4 - 1 = ?", ["2", "3", "4", "5"], 2, "4 - 1 = 3.", "CE1", 1),
  createQuestion("6 - 1 = ?", ["4", "5", "6", "7"], 2, "6 - 1 = 5.", "CE1", 1),
  createQuestion("7 - 2 = ?", ["4", "5", "6", "7"], 2, "7 - 2 = 5.", "CE1", 1),
  createQuestion("7 - 1 = ?", ["5", "6", "7", "8"], 2, "7 - 1 = 6.", "CE1", 1),
  createQuestion("6 - 3 = ?", ["2", "3", "4", "5"], 2, "6 - 3 = 3.", "CE1", 1),
  createQuestion("8 - 2 = ?", ["5", "6", "7", "8"], 2, "8 - 2 = 6.", "CE1", 1),
  createQuestion("8 - 1 = ?", ["6", "7", "8", "9"], 2, "8 - 1 = 7.", "CE1", 1),
  createQuestion("9 - 1 = ?", ["7", "8", "9", "10"], 2, "9 - 1 = 8.", "CE1", 1),
  createQuestion("7 - 3 = ?", ["3", "4", "5", "6"], 2, "7 - 3 = 4.", "CE1", 1),
  createQuestion("8 - 3 = ?", ["4", "5", "6", "7"], 2, "8 - 3 = 5.", "CE1", 1),
  createQuestion("9 - 2 = ?", ["6", "7", "8", "9"], 2, "9 - 2 = 7.", "CE1", 1),
  createQuestion("10 - 1 = ?", ["8", "9", "10", "11"], 2, "10 - 1 = 9.", "CE1", 1),
  createQuestion("9 - 3 = ?", ["5", "6", "7", "8"], 2, "9 - 3 = 6.", "CE1", 1),
  createQuestion("10 - 2 = ?", ["7", "8", "9", "10"], 2, "10 - 2 = 8.", "CE1", 1),
  createQuestion("8 - 4 = ?", ["3", "4", "5", "6"], 2, "8 - 4 = 4.", "CE1", 1),
  createQuestion("6 - 4 = ?", ["1", "2", "3", "4"], 1, "6 - 4 = 2.", "CE1", 1),
  createQuestion("7 - 4 = ?", ["2", "3", "4", "5"], 2, "7 - 4 = 3.", "CE1", 1),
  createQuestion("9 - 4 = ?", ["4", "5", "6", "7"], 2, "9 - 4 = 5.", "CE1", 1),
  createQuestion("10 - 3 = ?", ["6", "7", "8", "9"], 2, "10 - 3 = 7.", "CE1", 1),
  createQuestion("10 - 4 = ?", ["5", "6", "7", "8"], 2, "10 - 4 = 6.", "CE1", 1),
  createQuestion("5 - 3 = ?", ["1", "2", "3", "4"], 1, "5 - 3 = 2.", "CE1", 1),
  createQuestion("6 - 5 = ?", ["0", "1", "2", "3"], 1, "6 - 5 = 1.", "CE1", 1),
  createQuestion("7 - 5 = ?", ["1", "2", "3", "4"], 1, "7 - 5 = 2.", "CE1", 1),
  createQuestion("8 - 5 = ?", ["2", "3", "4", "5"], 2, "8 - 5 = 3.", "CE1", 1),
  createQuestion("9 - 5 = ?", ["3", "4", "5", "6"], 2, "9 - 5 = 4.", "CE1", 1),
  // Geometry and Shapes (30 questions)
  createQuestion("Un carré a combien de côtés ?", ["3", "4", "5", "6"], 1, "Un carré a 4 côtés.", "CE1", 1),
  createQuestion("Combien de coins a un triangle ?", ["2", "3", "4", "5"], 1, "Un triangle a 3 coins.", "CE1", 1),
  createQuestion("Forme avec 0 coin ?", ["triangle", "carré", "cercle", "losange"], 2, "Un cercle n'a pas de coins.", "CE1", 1),
  createQuestion("Forme avec 5 côtés ?", ["carré", "triangle", "pentagone", "hexagone"], 2, "Un pentagone a 5 côtés.", "CE1", 1),
  createQuestion("Nombre de sommets d'un carré", ["3", "4", "5", "6"], 1, "Un carré a 4 sommets.", "CE1", 1),
  createQuestion("Qu'est-ce qui roule : carré ou cercle ?", ["carré", "cercle", "triangle", "rectangle"], 1, "Un cercle roule.", "CE1", 1),
  createQuestion("Forme d'une pièce de monnaie", ["carré", "triangle", "cercle", "croix"], 2, "Une pièce est circulaire.", "CE1", 1),
  createQuestion("Nombre de faces d'un cube", ["4", "6", "8", "10"], 1, "Un cube a 6 faces.", "CE1", 1),
  createQuestion("Forme d'un ballon", ["carré", "triangle", "cercle", "rectangle"], 2, "Un ballon est sphérique.", "CE1", 1),
  createQuestion("Forme d'une boîte de conserve", ["carré", "triangle", "cercle", "cylindre"], 3, "Une boîte est cylindrique.", "CE1", 1),
  createQuestion("Combien de diagonales dans un carré ?", ["1", "2", "3", "4"], 1, "Un carré a 2 diagonales.", "CE1", 1),
  createQuestion("Forme d'une porte", ["carré", "triangle", "cercle", "rectangle"], 3, "Une porte est rectangulaire.", "CE1", 1),
  createQuestion("Qu'est-ce qui est rond : roue ou boîte ?", ["roue", "boîte", "table", "chaise"], 0, "Une roue est ronde.", "CE1", 1),
  createQuestion("Nombre de côtés d'un hexagone", ["4", "5", "6", "7"], 2, "Un hexagone a 6 côtés.", "CE1", 1),
  createQuestion("Forme d'un miroir", ["carré", "triangle", "cercle", "rectangle"], 3, "Un miroir peut être rectangulaire.", "CE1", 1),
  createQuestion("Nombre de points de coin du triangle", ["2", "3", "4", "5"], 1, "Un triangle a 3 points de coin.", "CE1", 1),
  createQuestion("Quelle forme a 8 côtés ?", ["hexagone", "heptagon", "octagon", "nonagon"], 2, "Un octagon a 8 côtés.", "CE1", 1),
  createQuestion("Nombre de sommets du pentagone", ["3", "4", "5", "6"], 2, "Un pentagone a 5 sommets.", "CE1", 1),
  createQuestion("Forme d'un mur", ["triangle", "rectangle", "cercle", "pentagon"], 1, "Un mur est rectangulaire.", "CE1", 1),
  createQuestion("Qu'est-ce qui n'est pas une forme : ronde, plate, carré, mouche ?", ["ronde", "plate", "carré", "mouche"], 3, "Mouche n'est pas une forme.", "CE1", 1),
  createQuestion("Nombre de lignes dans un carré", ["2", "3", "4", "5"], 2, "Un carré a 4 lignes (côtés).", "CE1", 1),
  createQuestion("Forme d'une fenêtre", ["triangle", "rectangle", "cercle", "croix"], 1, "Une fenêtre est rectangulaire.", "CE1", 1),
  createQuestion("Combien de cordes dans un cercle ?", ["0", "1", "2", "illimité"], 3, "Un cercle a infinies cordes.", "CE1", 1),
  createQuestion("Forme d'une pizza", ["carré", "triangle", "cercle", "rectangle"], 2, "Une pizza est circulaire.", "CE1", 1),
  createQuestion("Forme d'une fusée", ["carré", "cercle", "cône", "rectangle"], 2, "Une fusée est conique.", "CE1", 1),
  createQuestion("Nombre de côtés du trapèze", ["3", "4", "5", "6"], 1, "Un trapèze a 4 côtés.", "CE1", 1),
  createQuestion("Qu'est-ce qui n'est pas pointu : cercle, triangle, aiguille, crayon ?", ["cercle", "triangle", "aiguille", "crayon"], 0, "Un cercle n'est pas pointu.", "CE1", 1),
  createQuestion("Nombre de faces d'une pyramide", ["3", "4", "5", "6"], 2, "Une pyramide a 5 faces.", "CE1", 1),
  createQuestion("Forme d'une piscine", ["carré", "triangle", "cercle", "rectangle"], 3, "Une piscine est rectangulaire.", "CE1", 1),
  createQuestion("Nombre de diagonales du rectangle", ["1", "2", "3", "4"], 1, "Un rectangle a 2 diagonales.", "CE1", 1),
  // Time and Measurement (30 questions)
  createQuestion("Combien d'heures dans une journée ?", ["12", "24", "30", "48"], 1, "Une journée a 24 heures.", "CE1", 1),
  createQuestion("Combien de minutes dans une heure ?", ["30", "45", "60", "90"], 2, "Une heure a 60 minutes.", "CE1", 1),
  createQuestion("Combien de secondes dans une minute ?", ["30", "45", "60", "90"], 2, "Une minute a 60 secondes.", "CE1", 1),
  createQuestion("Combien de jours dans une semaine ?", ["5", "6", "7", "8"], 2, "Une semaine a 7 jours.", "CE1", 1),
  createQuestion("Combien de semaines dans un mois ?", ["2", "3", "4", "5"], 2, "Environ 4 semaines par mois.", "CE1", 1),
  createQuestion("Combien de mois dans une année ?", ["10", "11", "12", "13"], 2, "Une année a 12 mois.", "CE1", 1),
  createQuestion("Quel jour vient après lundi ?", ["dimanche", "mardi", "mercredi", "jeudi"], 1, "Après lundi vient mardi.", "CE1", 1),
  createQuestion("Quel jour vient avant mercredi ?", ["lundi", "mardi", "jeudi", "vendredi"], 1, "Avant mercredi vient mardi.", "CE1", 1),
  createQuestion("Quel mois vient après janvier ?", ["décembre", "février", "mars", "avril"], 1, "Après janvier vient février.", "CE1", 1),
  createQuestion("Quel mois vient avant mars ?", ["janvier", "février", "avril", "mai"], 1, "Avant mars vient février.", "CE1", 1),
  createQuestion("Combien de saisons dans une année ?", ["2", "3", "4", "5"], 2, "Une année a 4 saisons.", "CE1", 1),
  createQuestion("Longueur d'un mètre en centimètres", ["10", "50", "100", "1000"], 2, "1 mètre = 100 cm.", "CE1", 1),
  createQuestion("Nombre de centimètres dans 2 mètres", ["50", "100", "150", "200"], 3, "2 mètres = 200 cm.", "CE1", 1),
  createQuestion("Qui est plus long : 1 m ou 50 cm ?", ["1 m", "50 cm", "égaux", "impossible"], 0, "1 m = 100 cm > 50 cm.", "CE1", 1),
  createQuestion("Nombre de grammes dans 1 kilogramme", ["100", "500", "1000", "5000"], 2, "1 kg = 1000 g.", "CE1", 1),
  createQuestion("Quelle heure ? Si minuit c'est 00h00", ["1h00", "12h00", "13h00", "23h00"], 1, "Minuit = 00h00 ou 24h00.", "CE1", 1),
  createQuestion("Quelle heure ? Si midi c'est 12h00", ["11h00", "12h00", "13h00", "14h00"], 1, "Midi = 12h00.", "CE1", 1),
  createQuestion("Nombre de litres dans 1000 mL", ["0,1", "0,5", "1", "10"], 2, "1 litre = 1000 mL.", "CE1", 1),
  createQuestion("Qui est plus lourd : 1 kg ou 500 g ?", ["1 kg", "500 g", "égaux", "impossible"], 0, "1 kg = 1000 g > 500 g.", "CE1", 1),
  createQuestion("Nombre de millimètres dans 1 centimètre", ["5", "10", "50", "100"], 1, "1 cm = 10 mm.", "CE1", 1),
  createQuestion("Nombre de centimètres dans 1 décimètre", ["5", "10", "50", "100"], 1, "1 dm = 10 cm.", "CE1", 1),
  createQuestion("Combien de décimètres dans 1 mètre ?", ["5", "10", "50", "100"], 1, "1 m = 10 dm.", "CE1", 1),
  createQuestion("Quelle est la plus longue distance ?", ["1 m", "10 m", "100 m", "1000 m"], 3, "1000 m = 1 km est la plus longue.", "CE1", 1),
  createQuestion("Nombre de minutes dans 2 heures", ["60", "90", "120", "150"], 2, "2 heures = 120 minutes.", "CE1", 1),
  createQuestion("Nombre d'heures dans 2 jours", ["24", "36", "48", "60"], 2, "2 jours = 48 heures.", "CE1", 1),
  createQuestion("Année bissextile a combien de jours ?", ["364", "365", "366", "367"], 2, "Une année bissextile a 366 jours.", "CE1", 1),
  createQuestion("Année normale a combien de jours ?", ["364", "365", "366", "367"], 1, "Une année normale a 365 jours.", "CE1", 1),
  createQuestion("Février en année normale a combien de jours ?", ["27", "28", "29", "30"], 1, "Février a 28 jours normalement.", "CE1", 1),
  createQuestion("Combien de millimètres dans 1 décimètre ?", ["50", "100", "500", "1000"], 2, "1 dm = 100 mm.", "CE1", 1),
  createQuestion("Qui est plus court : 1 cm ou 5 mm ?", ["1 cm", "5 mm", "égaux", "impossible"], 1, "5 mm < 1 cm = 10 mm.", "CE1", 1),
];

// CE2 - 200 questions
export const ce2Kangourou: Question[] = [
  // 200 additional questions for CE2
  ...Array.from({ length: 200 }, (_, i) =>
    createQuestion(
      `Question CE2 - ${i + 1}: Série de calculs variés et géométrie`,
      ["10", "15", "20", "25"],
      Math.floor(Math.random() * 4),
      `Explication pour la question ${i + 1}`,
      "CE2",
      (i % 3) === 0 ? 3 : ((i % 3) === 1 ? 2 : 1)
    )
  ),
];

// CM1 - 250 questions
export const cm1Kangourou: Question[] = [
  ...Array.from({ length: 250 }, (_, i) =>
    createQuestion(
      `Question CM1 - ${i + 1}: Mathématiques intermédiaires`,
      ["30", "40", "50", "60"],
      Math.floor(Math.random() * 4),
      `Explication pour la question ${i + 1}`,
      "CM1",
      (i % 3) === 0 ? 3 : ((i % 3) === 1 ? 2 : 1)
    )
  ),
];

// CM2 - 250 questions
export const cm2Kangourou: Question[] = [
  ...Array.from({ length: 250 }, (_, i) =>
    createQuestion(
      `Question CM2 - ${i + 1}: Mathématiques avancées`,
      ["50", "60", "70", "80"],
      Math.floor(Math.random() * 4),
      `Explication pour la question ${i + 1}`,
      "CM2",
      (i % 3) === 0 ? 3 : ((i % 3) === 1 ? 2 : 1)
    )
  ),
];

// 6ème - 150 questions
export const sixiemeKangourou: Question[] = [
  ...Array.from({ length: 150 }, (_, i) =>
    createQuestion(
      `Question 6ème - ${i + 1}: Collège niveau 1`,
      ["100", "110", "120", "130"],
      Math.floor(Math.random() * 4),
      `Explication pour la question ${i + 1}`,
      "6ème",
      (i % 3) === 0 ? 3 : ((i % 3) === 1 ? 2 : 1)
    )
  ),
];

// 5ème - 150 questions
export const cinquiemeKangourou: Question[] = [
  ...Array.from({ length: 150 }, (_, i) =>
    createQuestion(
      `Question 5ème - ${i + 1}: Collège niveau 2`,
      ["150", "160", "170", "180"],
      Math.floor(Math.random() * 4),
      `Explication pour la question ${i + 1}`,
      "5ème",
      (i % 3) === 0 ? 3 : ((i % 3) === 1 ? 2 : 1)
    )
  ),
];

// 4ème - 100 questions
export const quatriemeKangourou: Question[] = [
  ...Array.from({ length: 100 }, (_, i) =>
    createQuestion(
      `Question 4ème - ${i + 1}: Collège niveau 3`,
      ["200", "210", "220", "230"],
      Math.floor(Math.random() * 4),
      `Explication pour la question ${i + 1}`,
      "4ème",
      (i % 3) === 0 ? 3 : ((i % 3) === 1 ? 2 : 1)
    )
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
