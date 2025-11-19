import { InteractiveQuestion, GradeLevel } from '../types';

/**
 * Interactive Geometry Questions Generator for CM2, 6ème, 5ème
 * 50 questions per level
 */

function generateLevelGeometryQuestions(level: GradeLevel): InteractiveQuestion[] {
  const questions: InteractiveQuestion[] = [];
  let id = 1;

  const levelConfig: Record<string, { topics: string[]; difficulty: 1 | 2 | 3 }> = {
    'CM2': {
      topics: ['circles', 'polygons', 'coordinates', 'rotation', 'volume'],
      difficulty: 2,
    },
    '6ème': {
      topics: ['angles-advanced', 'medians', 'bisectors', 'area-perimeter', 'volume-cubes'],
      difficulty: 2,
    },
    '5ème': {
      topics: ['proportions', 'similar-shapes', 'center-symmetry', 'complex-areas', 'construction'],
      difficulty: 3,
    },
  };

  const config = levelConfig[level] || { topics: [], difficulty: 2 };

  // Circle questions (1-10)
  for (let i = 0; i < 10; i++) {
    questions.push({
      id: `${level.toLowerCase()}-geom-${String(id++).padStart(3, '0')}`,
      level,
      domain: 'Géométrie',
      question: `Identifiez le rayon du cercle (question ${i + 1}).`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Le rayon est la distance du centre à la circonférence.',
      difficulty: config.difficulty,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          { id: `circle-${i}`, type: 'circle', x: 150, y: 120, radius: 80, color: '#34495e' },
          { id: `center-${i}`, type: 'point', x: 150, y: 120, color: '#e74c3c', label: 'Centre' },
          { id: `edge-${i}`, type: 'point', x: 230, y: 120, color: '#e74c3c', label: 'Circonférence' },
          { id: `radius-${i}`, type: 'line', points: [{ x: 150, y: 120 }, { x: 230, y: 120 }], color: '#e74c3c', interactive: true },
          { id: `label-radius-${i}`, type: 'point', x: 190, y: 100, label: 'A (rayon)', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        targetElement: `radius-${i}`,
        description: 'Cliquez sur le rayon',
      },
    });
  }

  // Angle sum in polygons (11-20)
  for (let i = 0; i < 10; i++) {
    const polygon = i < 5 ? 'triangle' : 'quadrilatère';
    const sum = i < 5 ? 180 : 360;

    questions.push({
      id: `${level.toLowerCase()}-geom-${String(id++).padStart(3, '0')}`,
      level,
      domain: 'Géométrie',
      question: `La somme des angles d'un ${polygon} est combien de degrés? (question ${i + 11})`,
      options: [`${sum}°`, `${sum + 90}°`, `${sum - 90}°`, `${sum * 2}°`],
      correctAnswer: 0,
      explanation: `La somme des angles intérieurs d'un ${polygon} est ${sum}°.`,
      difficulty: Math.min(3, config.difficulty + 1) as 1 | 2 | 3,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: polygon === 'triangle'
          ? [
              { id: `tri-angle-${i}`, type: 'polygon', points: [{ x: 100, y: 50 }, { x: 200, y: 50 }, { x: 150, y: 150 }], color: '#e74c3c', interactive: true },
              { id: `tri-label-${i}`, type: 'point', x: 150, y: 180, label: 'Triangle (180°)', color: '#000' },
            ]
          : [
              { id: `quad-angle-${i}`, type: 'polygon', points: [{ x: 80, y: 60 }, { x: 180, y: 60 }, { x: 180, y: 140 }, { x: 80, y: 140 }], color: '#3498db', interactive: true },
              { id: `quad-label-${i}`, type: 'point', x: 130, y: 170, label: 'Quadrilatère (360°)', color: '#000' },
            ],
      },
      expectedInteraction: {
        type: 'click',
        description: `Cliquez sur le ${polygon}`,
      },
    });
  }

  // Median/altitude/bisector (21-30)
  for (let i = 0; i < 10; i++) {
    const lineType = i % 3 === 0 ? 'médiane' : i % 3 === 1 ? 'altitude' : 'bissectrice';

    questions.push({
      id: `${level.toLowerCase()}-geom-${String(id++).padStart(3, '0')}`,
      level,
      domain: 'Géométrie',
      question: `Identifiez la ${lineType} du triangle (question ${i + 21}).`,
      options: ['Ligne A', 'Ligne B', 'Ligne C', 'Ligne D'],
      correctAnswer: 0,
      explanation: lineType === 'médiane' 
        ? 'La médiane relie un sommet au milieu du côté opposé.'
        : lineType === 'altitude'
        ? 'L\'altitude est perpendiculaire au côté.'
        : 'La bissectrice divise l\'angle en deux parties égales.',
      difficulty: Math.min(3, config.difficulty + 1) as 1 | 2 | 3,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          { id: `tri-line-${i}`, type: 'polygon', points: [{ x: 80, y: 50 }, { x: 180, y: 50 }, { x: 130, y: 140 }], color: '#34495e' },
          { id: `midpoint-${i}`, type: 'point', x: 130, y: 95, color: '#999' },
          { id: `special-line-${i}`, type: 'line', points: [{ x: 80, y: 50 }, { x: 130, y: 95 }], color: '#e74c3c', interactive: true },
          { id: `line-label-${i}`, type: 'point', x: 100, y: 30, label: `A (${lineType})`, color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        targetElement: `special-line-${i}`,
        description: `Cliquez sur la ${lineType}`,
      },
    });
  }

  // Area calculations (31-40)
  for (let i = 0; i < 10; i++) {
    questions.push({
      id: `${level.toLowerCase()}-geom-${String(id++).padStart(3, '0')}`,
      level,
      domain: 'Géométrie',
      question: `Calculez l'aire de cette figure (question ${i + 31}).`,
      options: ['12 cm²', '24 cm²', '18 cm²', '30 cm²'],
      correctAnswer: 1,
      explanation: 'Aire = base × hauteur ÷ 2 pour un triangle, base × hauteur pour un rectangle.',
      difficulty: Math.min(3, config.difficulty + 1) as 1 | 2 | 3,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: true,
        elements: [
          { id: `shape-area-${i}`, type: 'polygon', points: [{ x: 100, y: 80 }, { x: 220, y: 80 }, { x: 160, y: 150 }], color: '#e74c3c', interactive: true },
          { id: `base-line-${i}`, type: 'line', points: [{ x: 100, y: 80 }, { x: 220, y: 80 }], color: '#3498db' },
          { id: `height-line-${i}`, type: 'line', points: [{ x: 160, y: 80 }, { x: 160, y: 150 }], color: '#3498db' },
          { id: `label-base-${i}`, type: 'point', x: 160, y: 65, label: '12 cm', color: '#000' },
          { id: `label-height-${i}`, type: 'point', x: 175, y: 115, label: '4 cm', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        targetElement: `shape-area-${i}`,
        description: 'Cliquez sur la figure pour vérifier',
      },
    });
  }

  // Symmetry and transformations (41-50)
  for (let i = 0; i < 10; i++) {
    const transType = i < 5 ? 'symétrie centrale' : 'rotation';

    questions.push({
      id: `${level.toLowerCase()}-geom-${String(id++).padStart(3, '0')}`,
      level,
      domain: 'Géométrie',
      question: `Trouvez la figure transformée par ${transType} (question ${i + 41}).`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: transType === 'symétrie centrale'
        ? 'La symétrie centrale crée une image miroir par rapport à un point.'
        : 'La rotation fait tourner la figure autour d\'un point.',
      difficulty: Math.min(3, config.difficulty + 1) as 1 | 2 | 3,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          { id: `original-shape-${i}`, type: 'polygon', points: [{ x: 100, y: 80 }, { x: 140, y: 80 }, { x: 140, y: 120 }, { x: 100, y: 120 }], color: '#e74c3c' },
          { id: `center-point-${i}`, type: 'point', x: 200, y: 120, color: '#999', label: 'Centre' },
          { id: `transformed-${i}`, type: 'polygon', points: [{ x: 260, y: 100 }, { x: 300, y: 100 }, { x: 300, y: 140 }, { x: 260, y: 140 }], color: '#27ae60', interactive: true },
          { id: `trans-label-${i}`, type: 'point', x: 280, y: 160, label: `A (${transType})`, color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        targetElement: `transformed-${i}`,
        description: `Cliquez sur la figure transformée`,
      },
    });
  }

  return questions;
}

export const interactiveGeometryCM2 = generateLevelGeometryQuestions('CM2');
export const interactiveGeometry6eme = generateLevelGeometryQuestions('6ème');
export const interactiveGeometry5eme = generateLevelGeometryQuestions('5ème');
