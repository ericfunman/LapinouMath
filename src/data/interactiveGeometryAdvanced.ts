import { InteractiveQuestion, GradeLevel } from '../types';

/**
 * Interactive Geometry Questions Generator for CM2, 6ème, 5ème
 * 50 questions per level
 */

// Helper function to map index to line type
function getLineTypeFromIndex(index: number): string {
  const remainder = index % 3;
  if (remainder === 0) return 'médiane';
  if (remainder === 1) return 'altitude';
  return 'bissectrice';
}

// Helper function to reduce cognitive complexity
function getLineExplanation(lineType: string): string {
  switch (lineType) {
    case 'médiane': return 'La médiane relie un sommet au milieu du côté opposé.';
    case 'altitude': return 'L\'altitude est perpendiculaire au côté opposé.';
    default: return 'La bissectrice divise l\'angle en deux parties égales.';
  }
}

function generateLevelGeometryQuestions(level: GradeLevel): InteractiveQuestion[] {
  const questions: InteractiveQuestion[] = [];
  let id = 1;

  type LevelConfig = { topics: string[]; difficulty: 1 | 2 | 3 };
  const levelConfig: Record<string, LevelConfig> = {
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
    const lineType = getLineTypeFromIndex(i);
    const correctIndex = i % 4; // Distribute correct answers across A, B, C, D

    questions.push({
      id: `${level.toLowerCase()}-geom-${String(id++).padStart(3, '0')}`,
      level,
      domain: 'Géométrie',
      question: `Identifiez la ${lineType} du triangle (question ${i + 21}).`,
      options: ['Ligne A', 'Ligne B', 'Ligne C', 'Ligne D'],
      correctAnswer: correctIndex,
      explanation: getLineExplanation(lineType),
      difficulty: Math.min(3, config.difficulty + 1) as 1 | 2 | 3,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          // Triangle base
          { id: `tri-line-${i}`, type: 'polygon', points: [{ x: 80, y: 50 }, { x: 180, y: 50 }, { x: 130, y: 140 }], color: '#34495e' },
          
          // Line A (top vertex to base midpoint) - médiane
          { id: `line-a-${i}`, type: 'line', points: [{ x: 80, y: 50 }, { x: 130, y: 95 }], color: correctIndex === 0 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-a-${i}`, type: 'point', x: 95, y: 35, label: 'A', color: '#000' },
          
          // Line B (right vertex perpendicular to base) - altitude  
          { id: `line-b-${i}`, type: 'line', points: [{ x: 180, y: 50 }, { x: 180, y: 140 }], color: correctIndex === 1 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-b-${i}`, type: 'point', x: 195, y: 95, label: 'B', color: '#000' },
          
          // Line C (left vertex to opposite side midpoint) - médiane alternative
          { id: `line-c-${i}`, type: 'line', points: [{ x: 180, y: 50 }, { x: 105, y: 95 }], color: correctIndex === 2 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-c-${i}`, type: 'point', x: 165, y: 35, label: 'C', color: '#000' },
          
          // Line D (bottom vertex angle bisector) - bissectrice
          { id: `line-d-${i}`, type: 'line', points: [{ x: 130, y: 140 }, { x: 130, y: 95 }], color: correctIndex === 3 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-d-${i}`, type: 'point', x: 145, y: 155, label: 'D', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: `Cliquez sur la ${lineType} correcte`,
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
    const correctIndex = i % 4; // Distribute correct answers across A, B, C, D

    questions.push({
      id: `${level.toLowerCase()}-geom-${String(id++).padStart(3, '0')}`,
      level,
      domain: 'Géométrie',
      question: `Trouvez la figure transformée par ${transType} (question ${i + 41}).`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: correctIndex,
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
          // Original shape
          { id: `original-shape-${i}`, type: 'polygon', points: [{ x: 100, y: 80 }, { x: 140, y: 80 }, { x: 140, y: 120 }, { x: 100, y: 120 }], color: '#34495e' },
          { id: `original-label-${i}`, type: 'point', x: 120, y: 65, label: 'Original', color: '#000' },
          
          // Center point
          { id: `center-point-${i}`, type: 'point', x: 200, y: 120, color: '#999', label: 'Centre' },
          
          // Option A - correct transformation
          { id: `transformed-a-${i}`, type: 'polygon', points: [{ x: 260, y: 100 }, { x: 300, y: 100 }, { x: 300, y: 140 }, { x: 260, y: 140 }], color: correctIndex === 0 ? '#27ae60' : '#95a5a6', interactive: true },
          { id: `label-a-${i}`, type: 'point', x: 280, y: 155, label: 'A', color: '#000' },
          
          // Option B - incorrect transformation
          { id: `transformed-b-${i}`, type: 'polygon', points: [{ x: 320, y: 80 }, { x: 360, y: 80 }, { x: 360, y: 120 }, { x: 320, y: 120 }], color: correctIndex === 1 ? '#27ae60' : '#95a5a6', interactive: true },
          { id: `label-b-${i}`, type: 'point', x: 340, y: 135, label: 'B', color: '#000' },
          
          // Option C - incorrect transformation  
          { id: `transformed-c-${i}`, type: 'polygon', points: [{ x: 260, y: 160 }, { x: 300, y: 160 }, { x: 300, y: 200 }, { x: 260, y: 200 }], color: correctIndex === 2 ? '#27ae60' : '#95a5a6', interactive: true },
          { id: `label-c-${i}`, type: 'point', x: 280, y: 215, label: 'C', color: '#000' },
          
          // Option D - incorrect transformation
          { id: `transformed-d-${i}`, type: 'polygon', points: [{ x: 320, y: 160 }, { x: 360, y: 160 }, { x: 360, y: 200 }, { x: 320, y: 200 }], color: correctIndex === 3 ? '#27ae60' : '#95a5a6', interactive: true },
          { id: `label-d-${i}`, type: 'point', x: 340, y: 215, label: 'D', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: `Cliquez sur la figure transformée par ${transType}`,
      },
    });
  }

  return questions;
}

export const interactiveGeometryCM2 = generateLevelGeometryQuestions('CM2');
export const interactiveGeometry6eme = generateLevelGeometryQuestions('6ème');
export const interactiveGeometry5eme = generateLevelGeometryQuestions('5ème');
