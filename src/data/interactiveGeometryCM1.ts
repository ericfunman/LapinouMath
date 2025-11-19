import { InteractiveQuestion } from '../types';

/**
 * CM1 Interactive Geometry Questions (50 total)
 * Focus: Angles, perpendicular/parallel lines, area basics, triangles, quadrilaterals
 */

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

    questions.push({
      id: `cm1-geom-${String(id++).padStart(3, '0')}`,
      level: 'CM1',
      domain: 'Géométrie',
      question: isPerpendicular 
        ? `Identifiez les lignes perpendiculaires (question ${i + 16}).`
        : `Identifiez les lignes parallèles (question ${i + 16}).`,
      options: ['Paire A', 'Paire B', 'Paire C', 'Paire D'],
      correctAnswer: 0,
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
        elements: isPerpendicular
          ? [
              // Perpendicular pair A
              { id: `perp-a-${i}`, type: 'line', points: [{ x: 50, y: 100 }, { x: 90, y: 100 }], color: '#e74c3c', interactive: true },
              { id: `perp-a2-${i}`, type: 'line', points: [{ x: 70, y: 60 }, { x: 70, y: 140 }], color: '#e74c3c', interactive: true },
              { id: `la-perp-${i}`, type: 'point', x: 70, y: 160, label: 'A (perpendiculaires)', color: '#000' },
              // Parallel pair B
              { id: `par-b-${i}`, type: 'line', points: [{ x: 160, y: 80 }, { x: 220, y: 80 }], color: '#3498db' },
              { id: `par-b2-${i}`, type: 'line', points: [{ x: 160, y: 120 }, { x: 220, y: 120 }], color: '#3498db' },
              { id: `lb-perp-${i}`, type: 'point', x: 190, y: 140, label: 'B (parallèles)', color: '#000' },
            ]
          : [
              // Parallel pair A
              { id: `par-a-${i}`, type: 'line', points: [{ x: 50, y: 80 }, { x: 110, y: 80 }], color: '#e74c3c', interactive: true },
              { id: `par-a2-${i}`, type: 'line', points: [{ x: 50, y: 120 }, { x: 110, y: 120 }], color: '#e74c3c', interactive: true },
              { id: `la-par-${i}`, type: 'point', x: 80, y: 140, label: 'A (parallèles)', color: '#000' },
              // Perpendicular pair B
              { id: `perp-b-${i}`, type: 'line', points: [{ x: 180, y: 100 }, { x: 240, y: 100 }], color: '#3498db' },
              { id: `perp-b2-${i}`, type: 'line', points: [{ x: 210, y: 60 }, { x: 210, y: 140 }], color: '#3498db' },
              { id: `lb-par-${i}`, type: 'point', x: 210, y: 150, label: 'B (perpendiculaires)', color: '#000' },
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

    questions.push({
      id: `cm1-geom-${String(id++).padStart(3, '0')}`,
      level: 'CM1',
      domain: 'Géométrie',
      question: `Identifiez le triangle ${triType} (question ${i + 26}).`,
      options: ['Triangle A', 'Triangle B', 'Triangle C', 'Triangle D'],
      correctAnswer: 0,
      explanation: `Le triangle ${triType} a ses caractéristiques spécifiques.`,
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          // Right triangle
          { id: `tri-rect-${i}`, type: 'polygon', points: [{ x: 60, y: 80 }, { x: 120, y: 80 }, { x: 120, y: 140 }], color: '#e74c3c', interactive: true },
          { id: `ltr-${i}`, type: 'point', x: 90, y: 160, label: 'A (rectangle)', color: '#000' },
          // Isosceles
          { id: `tri-iso-${i}`, type: 'polygon', points: [{ x: 200, y: 80 }, { x: 260, y: 80 }, { x: 230, y: 140 }], color: '#3498db' },
          { id: `lti-${i}`, type: 'point', x: 230, y: 160, label: 'B (isocèle)', color: '#000' },
          // Equilateral
          { id: `tri-eq-${i}`, type: 'polygon', points: [{ x: 310, y: 90 }, { x: 360, y: 90 }, { x: 335, y: 140 }], color: '#27ae60' },
          { id: `lte-${i}`, type: 'point', x: 335, y: 160, label: 'C (équilatéral)', color: '#000' },
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

    questions.push({
      id: `cm1-geom-${String(id++).padStart(3, '0')}`,
      level: 'CM1',
      domain: 'Géométrie',
      question: `Trouvez le ${quadType} (question ${i + 36}).`,
      options: ['Figure A', 'Figure B', 'Figure C', 'Figure D'],
      correctAnswer: 0,
      explanation: `Le ${quadType} a ses propriétés géométriques.`,
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 280,
        grid: false,
        elements: [
          { id: `quad-a-${i}`, type: 'polygon', points: [{ x: 40, y: 80 }, { x: 120, y: 80 }, { x: 100, y: 140 }, { x: 20, y: 140 }], color: '#e74c3c', interactive: true },
          { id: `lq1-${i}`, type: 'point', x: 70, y: 160, label: 'A', color: '#000' },
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
          { id: `area-a-${i}`, type: 'polygon', points: [{ x: 30, y: 80 }, { x: 90, y: 80 }, { x: 90, y: 140 }, { x: 30, y: 140 }], color: '#e74c3c', interactive: true },
          { id: `la-area-${i}`, type: 'point', x: 60, y: 160, label: 'A (12)', color: '#000' },
          { id: `area-b-${i}`, type: 'polygon', points: [{ x: 150, y: 85 }, { x: 200, y: 85 }, { x: 200, y: 140 }, { x: 150, y: 140 }], color: '#3498db' },
          { id: `lb-area-${i}`, type: 'point', x: 175, y: 160, label: 'B (12)', color: '#000' },
          { id: `area-c-${i}`, type: 'polygon', points: [{ x: 270, y: 70 }, { x: 380, y: 70 }, { x: 380, y: 90 }, { x: 270, y: 90 }], color: '#27ae60' },
          { id: `lc-area-${i}`, type: 'point', x: 325, y: 110, label: 'C (12)', color: '#000' },
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
