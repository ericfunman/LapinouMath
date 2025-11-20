import { InteractiveQuestion } from '../types';

/**
 * CM1 Interactive Geometry Questions (50 total)
 * Focus: Angles, perpendicular/parallel lines, area basics, triangles, quadrilaterals
 */

// Helper functions to reduce cognitive complexity
function getTriangleExplanation(triType: string): string {
  switch (triType) {
    case 'rectangle': return 'Un triangle rectangle a un angle droit.';
    case 'isocèle': return 'Un triangle isocèle a deux côtés de même longueur.';
    case 'équilatéral': return 'Un triangle équilatéral a trois côtés de même longueur.';
    default: return 'Un triangle scalène a trois côtés de longueurs différentes.';
  }
}

function getQuadrilateralExplanation(quadType: string): string {
  switch (quadType) {
    case 'trapèze': return 'Un trapèze a au moins une paire de côtés parallèles.';
    case 'parallélogramme': return 'Un parallélogramme a ses côtés opposés parallèles et de même longueur.';
    case 'losange': return 'Un losange a quatre côtés de même longueur.';
    default: return 'Un rectangle a quatre angles droits.';
  }
}

function generateCM1Questions(): InteractiveQuestion[] {
  const questions: InteractiveQuestion[] = [];
  let id = 1;

  // Angles and Lines (1-15)
  for (let i = 0; i < 15; i++) {
    const angleTypes = [
      { label: 'aigu (< 90°)', correct: 0 },
      { label: 'droit (90°)', correct: 1 },
      { label: 'obtus (> 90°)', correct: 2 },
    ];
    const angleType = angleTypes[i % 3];

    questions.push({
      id: `cm1-geom-${String(id++).padStart(3, '0')}`,
      level: 'CM1',
      domain: 'Géométrie',
      question: `Identifiez l'angle ${angleType.label} (question ${i + 1}).`,
      options: ['Angle 1', 'Angle 2', 'Angle 3', 'Angle 4'],
      correctAnswer: angleType.correct,
      explanation: `L'angle ${angleType.label} a les caractéristiques appropriées.`,
      difficulty: i < 5 ? 1 : 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          // Acute angle
          { id: `acute-${i}`, type: 'line', points: [{ x: 60, y: 100 }, { x: 120, y: 100 }], color: '#e74c3c', interactive: true },
          { id: `acute2-${i}`, type: 'line', points: [{ x: 60, y: 100 }, { x: 100, y: 60 }], color: '#e74c3c', interactive: true },
          { id: `l1-${i}`, type: 'point', x: 60, y: 140, label: '1 (aigu)', color: '#000' },
          // Right angle
          { id: `right-${i}`, type: 'line', points: [{ x: 180, y: 100 }, { x: 240, y: 100 }], color: '#3498db', interactive: true },
          { id: `right2-${i}`, type: 'line', points: [{ x: 180, y: 100 }, { x: 180, y: 160 }], color: '#3498db', interactive: true },
          { id: `marker-${i}`, type: 'polygon', points: [{ x: 180, y: 100 }, { x: 190, y: 100 }, { x: 190, y: 110 }, { x: 180, y: 110 }], color: '#3498db' },
          { id: `l2-${i}`, type: 'point', x: 180, y: 180, label: '2 (droit)', color: '#000' },
          // Obtuse angle
          { id: `obtuse-${i}`, type: 'line', points: [{ x: 300, y: 100 }, { x: 360, y: 100 }], color: '#27ae60', interactive: true },
          { id: `obtuse2-${i}`, type: 'line', points: [{ x: 300, y: 100 }, { x: 330, y: 150 }], color: '#27ae60', interactive: true },
          { id: `l3-${i}`, type: 'point', x: 300, y: 170, label: '3 (obtus)', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: `Cliquez sur l'angle ${angleType.label}`,
      },
    });
  }

  // Parallel and Perpendicular lines (16-25)
  for (let i = 0; i < 10; i++) {
    const isPerpendicular = i % 2 === 0;
    const correctIndex = i % 4; // Distribute correct answers across A, B, C, D

    questions.push({
      id: `cm1-geom-${String(id++).padStart(3, '0')}`,
      level: 'CM1',
      domain: 'Géométrie',
      question: isPerpendicular 
        ? `Identifiez les lignes perpendiculaires (question ${i + 16}).`
        : `Identifiez les lignes parallèles (question ${i + 16}).`,
      options: ['Paire A', 'Paire B', 'Paire C', 'Paire D'],
      correctAnswer: correctIndex,
      explanation: isPerpendicular 
        ? 'Les lignes perpendiculaires forment un angle droit (90°).'
        : 'Les lignes parallèles ne se croisent jamais.',
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          // Pair A - correct based on question type
          { id: `pair-a1-${i}`, type: 'line', points: [{ x: 40, y: 80 }, { x: 80, y: 80 }], color: correctIndex === 0 ? '#e74c3c' : '#95a5a6', interactive: correctIndex === 0 },
          { id: `pair-a2-${i}`, type: 'line', points: [{ x: 60, y: 40 }, { x: 60, y: 120 }], color: correctIndex === 0 ? '#e74c3c' : '#95a5a6', interactive: correctIndex === 0 },
          { id: `label-a-${i}`, type: 'point', x: 60, y: 135, label: 'A', color: '#000' },
          
          // Pair B
          { id: `pair-b1-${i}`, type: 'line', points: [{ x: 120, y: 60 }, { x: 180, y: 60 }], color: correctIndex === 1 ? '#e74c3c' : '#95a5a6', interactive: correctIndex === 1 },
          { id: `pair-b2-${i}`, type: 'line', points: [{ x: 120, y: 100 }, { x: 180, y: 100 }], color: correctIndex === 1 ? '#e74c3c' : '#95a5a6', interactive: correctIndex === 1 },
          { id: `label-b-${i}`, type: 'point', x: 150, y: 115, label: 'B', color: '#000' },
          
          // Pair C
          { id: `pair-c1-${i}`, type: 'line', points: [{ x: 240, y: 80 }, { x: 280, y: 80 }], color: correctIndex === 2 ? '#e74c3c' : '#95a5a6', interactive: correctIndex === 2 },
          { id: `pair-c2-${i}`, type: 'line', points: [{ x: 260, y: 40 }, { x: 260, y: 120 }], color: correctIndex === 2 ? '#e74c3c' : '#95a5a6', interactive: correctIndex === 2 },
          { id: `label-c-${i}`, type: 'point', x: 260, y: 135, label: 'C', color: '#000' },
          
          // Pair D
          { id: `pair-d1-${i}`, type: 'line', points: [{ x: 320, y: 60 }, { x: 380, y: 60 }], color: correctIndex === 3 ? '#e74c3c' : '#95a5a6', interactive: correctIndex === 3 },
          { id: `pair-d2-${i}`, type: 'line', points: [{ x: 320, y: 100 }, { x: 380, y: 100 }], color: correctIndex === 3 ? '#e74c3c' : '#95a5a6', interactive: correctIndex === 3 },
          { id: `label-d-${i}`, type: 'point', x: 350, y: 115, label: 'D', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: isPerpendicular 
          ? 'Cliquez sur les lignes perpendiculaires'
          : 'Cliquez sur les lignes parallèles',
      },
    });
  }

  // Triangle types (26-35)
  for (let i = 0; i < 10; i++) {
    const triangleTypes = ['rectangle', 'isocèle', 'équilatéral', 'scalène'];
    const triType = triangleTypes[i % 4];
    const correctIndex = i % 4; // Each triangle type gets a turn being correct

    questions.push({
      id: `cm1-geom-${String(id++).padStart(3, '0')}`,
      level: 'CM1',
      domain: 'Géométrie',
      question: `Identifiez le triangle ${triType} (question ${i + 26}).`,
      options: ['Triangle A', 'Triangle B', 'Triangle C', 'Triangle D'],
      correctAnswer: correctIndex,
      explanation: getTriangleExplanation(triType),
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          // Triangle A - rectangle
          { id: `tri-a-${i}`, type: 'polygon', points: [{ x: 40, y: 60 }, { x: 100, y: 60 }, { x: 100, y: 120 }], color: correctIndex === 0 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-a-${i}`, type: 'point', x: 70, y: 135, label: 'A', color: '#000' },
          
          // Triangle B - isocèle
          { id: `tri-b-${i}`, type: 'polygon', points: [{ x: 140, y: 60 }, { x: 200, y: 60 }, { x: 170, y: 120 }], color: correctIndex === 1 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-b-${i}`, type: 'point', x: 170, y: 135, label: 'B', color: '#000' },
          
          // Triangle C - équilatéral
          { id: `tri-c-${i}`, type: 'polygon', points: [{ x: 240, y: 70 }, { x: 290, y: 70 }, { x: 265, y: 120 }], color: correctIndex === 2 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-c-${i}`, type: 'point', x: 265, y: 135, label: 'C', color: '#000' },
          
          // Triangle D - scalène
          { id: `tri-d-${i}`, type: 'polygon', points: [{ x: 320, y: 50 }, { x: 380, y: 70 }, { x: 350, y: 120 }], color: correctIndex === 3 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-d-${i}`, type: 'point', x: 350, y: 135, label: 'D', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: `Cliquez sur le triangle ${triType}`,
      },
    });
  }

  // Quadrilaterals (36-45)
  for (let i = 0; i < 10; i++) {
    const quadTypes = ['trapèze', 'parallélogramme', 'losange', 'rectangle'];
    const quadType = quadTypes[i % 4];
    const correctIndex = i % 4; // Each quadrilateral type gets a turn being correct

    questions.push({
      id: `cm1-geom-${String(id++).padStart(3, '0')}`,
      level: 'CM1',
      domain: 'Géométrie',
      question: `Trouvez le ${quadType} (question ${i + 36}).`,
      options: ['Figure A', 'Figure B', 'Figure C', 'Figure D'],
      correctAnswer: correctIndex,
      explanation: getQuadrilateralExplanation(quadType),
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          // Figure A - trapèze
          { id: `quad-a-${i}`, type: 'polygon', points: [{ x: 20, y: 80 }, { x: 100, y: 80 }, { x: 80, y: 140 }, { x: 40, y: 140 }], color: correctIndex === 0 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-a-${i}`, type: 'point', x: 60, y: 160, label: 'A', color: '#000' },
          
          // Figure B - parallélogramme
          { id: `quad-b-${i}`, type: 'polygon', points: [{ x: 130, y: 80 }, { x: 200, y: 80 }, { x: 180, y: 140 }, { x: 110, y: 140 }], color: correctIndex === 1 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-b-${i}`, type: 'point', x: 155, y: 160, label: 'B', color: '#000' },
          
          // Figure C - losange
          { id: `quad-c-${i}`, type: 'polygon', points: [{ x: 240, y: 90 }, { x: 290, y: 70 }, { x: 340, y: 90 }, { x: 290, y: 140 }], color: correctIndex === 2 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-c-${i}`, type: 'point', x: 290, y: 160, label: 'C', color: '#000' },
          
          // Figure D - rectangle
          { id: `quad-d-${i}`, type: 'polygon', points: [{ x: 360, y: 80 }, { x: 400, y: 80 }, { x: 400, y: 140 }, { x: 360, y: 140 }], color: correctIndex === 3 ? '#e74c3c' : '#95a5a6', interactive: true },
          { id: `label-d-${i}`, type: 'point', x: 380, y: 160, label: 'D', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: `Cliquez sur le ${quadType}`,
      },
    });
  }

  // Area and perimeter (46-50)
  for (let i = 0; i < 5; i++) {
    questions.push({
      id: `cm1-geom-${String(id++).padStart(3, '0')}`,
      level: 'CM1',
      domain: 'Géométrie',
      question: `Quel rectangle a la plus grande aire? (question ${i + 46})`,
      options: ['A (2×6)', 'B (3×4)', 'C (1×12)', 'D (5×2)'],
      correctAnswer: 0,
      explanation: 'L\'aire d\'un rectangle = longueur × largeur.',
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          { id: `area-a-${i}`, type: 'polygon', points: [{ x: 20, y: 80 }, { x: 80, y: 80 }, { x: 80, y: 140 }, { x: 20, y: 140 }], color: '#e74c3c', interactive: true },
          { id: `la-area-${i}`, type: 'point', x: 50, y: 160, label: 'A (12)', color: '#000' },
          { id: `area-b-${i}`, type: 'polygon', points: [{ x: 120, y: 85 }, { x: 170, y: 85 }, { x: 170, y: 140 }, { x: 120, y: 140 }], color: '#3498db' },
          { id: `lb-area-${i}`, type: 'point', x: 145, y: 160, label: 'B (12)', color: '#000' },
          { id: `area-c-${i}`, type: 'polygon', points: [{ x: 220, y: 70 }, { x: 340, y: 70 }, { x: 340, y: 90 }, { x: 220, y: 90 }], color: '#27ae60' },
          { id: `lc-area-${i}`, type: 'point', x: 280, y: 110, label: 'C (12)', color: '#000' },
          { id: `area-d-${i}`, type: 'polygon', points: [{ x: 20, y: 180 }, { x: 120, y: 180 }, { x: 120, y: 200 }, { x: 20, y: 200 }], color: '#95a5a6' },
          { id: `ld-area-${i}`, type: 'point', x: 70, y: 220, label: 'D (10)', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: 'Cliquez sur le rectangle le plus grand',
      },
    });
  }

  return questions;
}

export const interactiveGeometryCM1 = generateCM1Questions();
