import { InteractiveQuestion } from '../types';

/**
 * Geometry Question Generator
 * Creates interactive geometry questions for different levels
 */

// CE2 continuation (11-50)
function generateCE2Questions(): InteractiveQuestion[] {
  const questions: InteractiveQuestion[] = [];
  let id = 11;

  // Symmetry questions (11-20)
  for (let i = 0; i < 5; i++) {
    questions.push({
      id: `ce2-geom-${String(id++).padStart(3, '0')}`,
      level: 'CE2',
      domain: 'Géométrie',
      question: `Trouvez la figure symétrique à l'axe de symétrie (question ${id - 11}).`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: Math.floor(Math.random() * 3),
      explanation: 'Une figure symétrique est une image miroir.',
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 250,
        grid: true,
        elements: [
          { id: 'sym-axis', type: 'line', points: [{ x: 200, y: 20 }, { x: 200, y: 230 }], color: '#999', label: 'Axe' },
          { id: `orig-${i}`, type: 'polygon', points: [{ x: 120, y: 60 }, { x: 160, y: 60 }, { x: 160, y: 100 }, { x: 120, y: 100 }], color: '#e74c3c' },
          { id: `sym-${i}`, type: 'polygon', points: [{ x: 240, y: 60 }, { x: 280, y: 60 }, { x: 280, y: 100 }, { x: 240, y: 100 }], color: '#e74c3c', interactive: true },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: 'Cliquez sur la figure symétrique',
      },
    });
  }

  // Perimeter questions (21-25)
  for (let i = 0; i < 5; i++) {
    questions.push({
      id: `ce2-geom-${String(id++).padStart(3, '0')}`,
      level: 'CE2',
      domain: 'Géométrie',
      question: `Quel carré a le plus grand périmètre (question ${id - 21})?`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Le périmètre est la longueur totale autour d\'une figure.',
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 250,
        grid: false,
        elements: [
          { id: 'big-sq', type: 'polygon', points: [{ x: 30, y: 50 }, { x: 120, y: 50 }, { x: 120, y: 140 }, { x: 30, y: 140 }], color: '#e74c3c', interactive: true },
          { id: 'label-big', type: 'point', x: 75, y: 160, label: 'A (plus grand)', color: '#000' },
          { id: 'small-sq', type: 'polygon', points: [{ x: 200, y: 80 }, { x: 260, y: 80 }, { x: 260, y: 140 }, { x: 200, y: 140 }], color: '#3498db' },
          { id: 'label-small', type: 'point', x: 230, y: 160, label: 'B', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: 'Cliquez sur le carré le plus grand',
      },
    });
  }

  // Angle recognition (26-30)
  for (let i = 0; i < 5; i++) {
    questions.push({
      id: `ce2-geom-${String(id++).padStart(3, '0')}`,
      level: 'CE2',
      domain: 'Géométrie',
      question: `Identifiez l'angle droit (question ${id - 26}).`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 1, // Angle B is the right angle
      explanation: 'Un angle droit mesure 90 degrés et forme un L parfait.',
      difficulty: 1,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 250,
        grid: false,
        elements: [
          // Angle A - acute
          { id: 'angle-a1', type: 'line', points: [{ x: 60, y: 80 }, { x: 120, y: 80 }], color: '#e74c3c' },
          { id: 'angle-a2', type: 'line', points: [{ x: 60, y: 80 }, { x: 90, y: 50 }], color: '#e74c3c', interactive: true },
          { id: 'label-a', type: 'point', x: 75, y: 40, label: 'A', color: '#000' },
          
          // Angle B - right (90 degrees)
          { id: 'angle-b1', type: 'line', points: [{ x: 180, y: 80 }, { x: 240, y: 80 }], color: '#3498db' },
          { id: 'angle-b2', type: 'line', points: [{ x: 180, y: 80 }, { x: 180, y: 140 }], color: '#3498db', interactive: true },
          { id: 'right-marker-b', type: 'polygon', points: [{ x: 180, y: 80 }, { x: 190, y: 80 }, { x: 190, y: 90 }, { x: 180, y: 90 }], color: '#3498db' },
          { id: 'label-b', type: 'point', x: 210, y: 50, label: 'B', color: '#000' },
          
          // Angle C - obtuse
          { id: 'angle-c1', type: 'line', points: [{ x: 300, y: 80 }, { x: 360, y: 80 }], color: '#27ae60' },
          { id: 'angle-c2', type: 'line', points: [{ x: 300, y: 80 }, { x: 330, y: 130 }], color: '#27ae60', interactive: true },
          { id: 'label-c', type: 'point', x: 340, y: 140, label: 'C', color: '#000' },
          
          // Angle D - another acute
          { id: 'angle-d1', type: 'line', points: [{ x: 60, y: 180 }, { x: 120, y: 180 }], color: '#f39c12' },
          { id: 'angle-d2', type: 'line', points: [{ x: 60, y: 180 }, { x: 100, y: 150 }], color: '#f39c12', interactive: true },
          { id: 'label-d', type: 'point', x: 110, y: 140, label: 'D', color: '#000' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        targetElement: 'angle-b2',
        description: 'Cliquez sur l\'angle droit (B)',
      },
    });
  }

  // Shape counting (31-40)
  for (let i = 0; i < 10; i++) {
    const triangleCounts = [4, 5, 6, 7]; // Possible triangle counts
    const correctCount = triangleCounts[i % triangleCounts.length];
    
    // Create different figures based on triangle count
    let elements: any[] = [];
    
    if (correctCount === 4) {
      // 4 triangles: main triangle divided by 2 lines
      elements = [
        { id: `main-tri-${i}`, type: 'polygon', points: [{ x: 50, y: 50 }, { x: 200, y: 50 }, { x: 125, y: 150 }], color: '#e74c3c', interactive: true },
        { id: `line1-${i}`, type: 'line', points: [{ x: 125, y: 50 }, { x: 125, y: 150 }], color: '#3498db' },
        { id: `line2-${i}`, type: 'line', points: [{ x: 87.5, y: 100 }, { x: 162.5, y: 100 }], color: '#3498db' },
        { id: `label-main-${i}`, type: 'point', x: 125, y: 30, label: '4 triangles', color: '#000' },
      ];
    } else if (correctCount === 5) {
      // 5 triangles: main triangle + 4 smaller ones
      elements = [
        { id: `main-tri-${i}`, type: 'polygon', points: [{ x: 50, y: 50 }, { x: 200, y: 50 }, { x: 125, y: 150 }], color: '#e74c3c', interactive: true },
        { id: `line1-${i}`, type: 'line', points: [{ x: 125, y: 50 }, { x: 125, y: 150 }], color: '#3498db' },
        { id: `line2-${i}`, type: 'line', points: [{ x: 87.5, y: 100 }, { x: 162.5, y: 100 }], color: '#3498db' },
        { id: `line3-${i}`, type: 'line', points: [{ x: 106.25, y: 75 }, { x: 143.75, y: 125 }], color: '#3498db' },
        { id: `label-main-${i}`, type: 'point', x: 125, y: 30, label: '5 triangles', color: '#000' },
      ];
    } else if (correctCount === 6) {
      // 6 triangles: more complex division
      elements = [
        { id: `main-tri-${i}`, type: 'polygon', points: [{ x: 50, y: 50 }, { x: 200, y: 50 }, { x: 125, y: 150 }], color: '#e74c3c', interactive: true },
        { id: `line1-${i}`, type: 'line', points: [{ x: 125, y: 50 }, { x: 125, y: 150 }], color: '#3498db' },
        { id: `line2-${i}`, type: 'line', points: [{ x: 87.5, y: 100 }, { x: 162.5, y: 100 }], color: '#3498db' },
        { id: `line3-${i}`, type: 'line', points: [{ x: 106.25, y: 75 }, { x: 143.75, y: 125 }], color: '#3498db' },
        { id: `line4-${i}`, type: 'line', points: [{ x: 75, y: 125 }, { x: 175, y: 125 }], color: '#3498db' },
        { id: `label-main-${i}`, type: 'point', x: 125, y: 30, label: '6 triangles', color: '#000' },
      ];
    } else if (correctCount === 7) {
      // 7 triangles: most complex
      elements = [
        { id: `main-tri-${i}`, type: 'polygon', points: [{ x: 50, y: 50 }, { x: 200, y: 50 }, { x: 125, y: 150 }], color: '#e74c3c', interactive: true },
        { id: `line1-${i}`, type: 'line', points: [{ x: 125, y: 50 }, { x: 125, y: 150 }], color: '#3498db' },
        { id: `line2-${i}`, type: 'line', points: [{ x: 87.5, y: 100 }, { x: 162.5, y: 100 }], color: '#3498db' },
        { id: `line3-${i}`, type: 'line', points: [{ x: 106.25, y: 75 }, { x: 143.75, y: 125 }], color: '#3498db' },
        { id: `line4-${i}`, type: 'line', points: [{ x: 75, y: 125 }, { x: 175, y: 125 }], color: '#3498db' },
        { id: `line5-${i}`, type: 'line', points: [{ x: 100, y: 137.5 }, { x: 150, y: 137.5 }], color: '#3498db' },
        { id: `label-main-${i}`, type: 'point', x: 125, y: 30, label: '7 triangles', color: '#000' },
      ];
    }
    
    questions.push({
      id: `ce2-geom-${String(id++).padStart(3, '0')}`,
      level: 'CE2',
      domain: 'Géométrie',
      question: `Combien de triangles voyez-vous dans cette figure? (question ${id - 31})`,
      options: ['4', '5', '6', '7'],
      correctAnswer: triangleCounts.indexOf(correctCount),
      explanation: `Il y a ${correctCount} triangles dans cette figure composée.`,
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 250,
        grid: false,
        elements: elements,
      },
      expectedInteraction: {
        type: 'click',
        description: 'Cliquez sur la figure pour compter les triangles',
      },
    });
  }

  // Polygon recognition (41-50)
  const shapeQuestions = [
    {
      question: 'Lequel est un triangle ?',
      correctAnswer: 0,
      elements: [
        { id: 'shape-a', type: 'polygon' as const, points: [{ x: 50, y: 80 }, { x: 90, y: 80 }, { x: 70, y: 120 }], color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 70, y: 135, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'circle' as const, x: 170, y: 100, radius: 30, color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 170, y: 135, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'polygon' as const, points: [{ x: 250, y: 80 }, { x: 290, y: 80 }, { x: 290, y: 120 }, { x: 250, y: 120 }], color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 270, y: 135, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'polygon' as const, points: [{ x: 330, y: 70 }, { x: 370, y: 100 }, { x: 350, y: 140 }], color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 155, label: 'D', color: '#000' },
      ]
    },
    {
      question: 'Lequel est un carré ?',
      correctAnswer: 2,
      elements: [
        { id: 'shape-a', type: 'circle' as const, x: 70, y: 100, radius: 30, color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 70, y: 135, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'polygon' as const, points: [{ x: 140, y: 80 }, { x: 200, y: 80 }, { x: 200, y: 120 }, { x: 140, y: 120 }], color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 170, y: 135, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'polygon' as const, points: [{ x: 250, y: 80 }, { x: 290, y: 80 }, { x: 290, y: 120 }, { x: 250, y: 120 }], color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 270, y: 135, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'polygon' as const, points: [{ x: 330, y: 70 }, { x: 370, y: 100 }, { x: 350, y: 140 }], color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 155, label: 'D', color: '#000' },
      ]
    },
    {
      question: 'Lequel est un cercle ?',
      correctAnswer: 3,
      elements: [
        { id: 'shape-a', type: 'polygon' as const, points: [{ x: 50, y: 80 }, { x: 90, y: 80 }, { x: 70, y: 120 }], color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 70, y: 135, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'polygon' as const, points: [{ x: 140, y: 80 }, { x: 200, y: 80 }, { x: 200, y: 120 }, { x: 140, y: 120 }], color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 170, y: 135, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'polygon' as const, points: [{ x: 250, y: 80 }, { x: 290, y: 80 }, { x: 290, y: 120 }, { x: 250, y: 120 }], color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 270, y: 135, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'circle' as const, x: 350, y: 100, radius: 30, color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 135, label: 'D', color: '#000' },
      ]
    },
    {
      question: 'Lequel est un rectangle ?',
      correctAnswer: 1,
      elements: [
        { id: 'shape-a', type: 'circle' as const, x: 70, y: 100, radius: 30, color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 70, y: 135, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'polygon' as const, points: [{ x: 120, y: 70 }, { x: 200, y: 70 }, { x: 200, y: 130 }, { x: 120, y: 130 }], color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 160, y: 145, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'polygon' as const, points: [{ x: 250, y: 80 }, { x: 290, y: 80 }, { x: 290, y: 120 }, { x: 250, y: 120 }], color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 270, y: 135, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'polygon' as const, points: [{ x: 330, y: 70 }, { x: 370, y: 100 }, { x: 350, y: 140 }], color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 155, label: 'D', color: '#000' },
      ]
    },
    {
      question: 'Lequel est un triangle équilatéral ?',
      correctAnswer: 0,
      elements: [
        { id: 'shape-a', type: 'polygon' as const, points: [{ x: 50, y: 80 }, { x: 100, y: 80 }, { x: 75, y: 130 }], color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 75, y: 145, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'polygon' as const, points: [{ x: 140, y: 70 }, { x: 200, y: 70 }, { x: 170, y: 130 }], color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 170, y: 145, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'polygon' as const, points: [{ x: 250, y: 80 }, { x: 290, y: 80 }, { x: 290, y: 120 }, { x: 250, y: 120 }], color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 270, y: 135, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'circle' as const, x: 350, y: 100, radius: 30, color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 135, label: 'D', color: '#000' },
      ]
    },
    {
      question: 'Lequel est un losange ?',
      correctAnswer: 3,
      elements: [
        { id: 'shape-a', type: 'polygon' as const, points: [{ x: 50, y: 80 }, { x: 90, y: 80 }, { x: 70, y: 120 }], color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 70, y: 135, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'polygon' as const, points: [{ x: 140, y: 80 }, { x: 180, y: 80 }, { x: 180, y: 120 }, { x: 140, y: 120 }], color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 160, y: 135, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'circle' as const, x: 270, y: 100, radius: 30, color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 270, y: 135, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'polygon' as const, points: [{ x: 320, y: 90 }, { x: 350, y: 70 }, { x: 380, y: 90 }, { x: 350, y: 130 }], color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 145, label: 'D', color: '#000' },
      ]
    },
    {
      question: 'Lequel est un trapèze ?',
      correctAnswer: 1,
      elements: [
        { id: 'shape-a', type: 'polygon' as const, points: [{ x: 50, y: 80 }, { x: 90, y: 80 }, { x: 70, y: 120 }], color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 70, y: 135, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'polygon' as const, points: [{ x: 120, y: 80 }, { x: 200, y: 80 }, { x: 180, y: 130 }, { x: 140, y: 130 }], color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 160, y: 145, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'polygon' as const, points: [{ x: 250, y: 80 }, { x: 290, y: 80 }, { x: 290, y: 120 }, { x: 250, y: 120 }], color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 270, y: 135, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'circle' as const, x: 350, y: 100, radius: 30, color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 135, label: 'D', color: '#000' },
      ]
    },
    {
      question: 'Lequel est un triangle rectangle ?',
      correctAnswer: 2,
      elements: [
        { id: 'shape-a', type: 'polygon' as const, points: [{ x: 50, y: 80 }, { x: 100, y: 80 }, { x: 75, y: 130 }], color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 75, y: 145, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'circle' as const, x: 170, y: 100, radius: 30, color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 170, y: 135, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'polygon' as const, points: [{ x: 230, y: 80 }, { x: 290, y: 80 }, { x: 290, y: 140 }], color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 260, y: 155, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'polygon' as const, points: [{ x: 330, y: 70 }, { x: 370, y: 100 }, { x: 350, y: 140 }], color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 155, label: 'D', color: '#000' },
      ]
    },
    {
      question: 'Lequel est un triangle isocèle ?',
      correctAnswer: 0,
      elements: [
        { id: 'shape-a', type: 'polygon' as const, points: [{ x: 50, y: 80 }, { x: 100, y: 80 }, { x: 75, y: 130 }], color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 75, y: 145, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'polygon' as const, points: [{ x: 140, y: 70 }, { x: 200, y: 70 }, { x: 170, y: 130 }], color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 170, y: 145, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'polygon' as const, points: [{ x: 250, y: 80 }, { x: 290, y: 80 }, { x: 290, y: 120 }, { x: 250, y: 120 }], color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 270, y: 135, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'circle' as const, x: 350, y: 100, radius: 30, color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 135, label: 'D', color: '#000' },
      ]
    },
    {
      question: 'Lequel est un parallélogramme ?',
      correctAnswer: 1,
      elements: [
        { id: 'shape-a', type: 'polygon' as const, points: [{ x: 50, y: 80 }, { x: 90, y: 80 }, { x: 70, y: 120 }], color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point' as const, x: 70, y: 135, label: 'A', color: '#000' },
        { id: 'shape-b', type: 'polygon' as const, points: [{ x: 120, y: 80 }, { x: 200, y: 80 }, { x: 180, y: 130 }, { x: 100, y: 130 }], color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point' as const, x: 150, y: 145, label: 'B', color: '#000' },
        { id: 'shape-c', type: 'circle' as const, x: 270, y: 100, radius: 30, color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point' as const, x: 270, y: 135, label: 'C', color: '#000' },
        { id: 'shape-d', type: 'polygon' as const, points: [{ x: 330, y: 70 }, { x: 370, y: 100 }, { x: 350, y: 140 }], color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point' as const, x: 350, y: 155, label: 'D', color: '#000' },
      ]
    }
  ];

  for (let i = 0; i < 10; i++) {
    const questionData = shapeQuestions[i % shapeQuestions.length];
    
    questions.push({
      id: `ce2-geom-${String(id++).padStart(3, '0')}`,
      level: 'CE2',
      domain: 'Géométrie',
      question: questionData.question,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: questionData.correctAnswer,
      explanation: 'Observez les formes et identifiez celle demandée.',
      difficulty: 1,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 250,
        grid: false,
        elements: questionData.elements,
      },
      expectedInteraction: {
        type: 'click',
        description: 'Cliquez sur la bonne forme',
      },
    });
  }

  return questions;
}

export const interactiveGeometryCE2Extended = generateCE2Questions();
export const totalCE2Questions = 10 + 40; // 10 from previous file + 40 here = 50
