import { InteractiveQuestion } from '../types';

/**
 * Interactive Geometry Questions for CE2 (Cours Élémentaire 2)
 * 50 questions focusing on:
 * - Basic shapes (squares, rectangles, circles, triangles)
 * - Lines and points
 * - Simple symmetry
 * - Perimeter basics
 */

export const interactiveGeometryCE2: InteractiveQuestion[] = [
  // Squares and Rectangles (10 questions)
  {
    id: 'ce2-geom-001',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Identifiez le carré parmi ces figures.',
    options: ['Figure A (carré)', 'Figure B (rectangle)', 'Figure C (triangle)', 'Figure D (cercle)'],
    correctAnswer: 0,
    explanation: 'Un carré a 4 côtés égaux et 4 angles droits.',
    difficulty: 1,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        // Square (A) - CORRECT
        { id: 'square-a', type: 'polygon', points: [{ x: 50, y: 50 }, { x: 130, y: 50 }, { x: 130, y: 130 }, { x: 50, y: 130 }], color: '#e74c3c', interactive: true },
        { id: 'label-a', type: 'point', x: 90, y: 160, label: 'A', color: '#000' },
        // Rectangle (B)
        { id: 'rect-b', type: 'polygon', points: [{ x: 170, y: 50 }, { x: 280, y: 50 }, { x: 280, y: 130 }, { x: 170, y: 130 }], color: '#3498db', interactive: true },
        { id: 'label-b', type: 'point', x: 225, y: 160, label: 'B', color: '#000' },
        // Triangle (C)
        { id: 'tri-c', type: 'polygon', points: [{ x: 40, y: 200 }, { x: 140, y: 200 }, { x: 90, y: 260 }], color: '#27ae60', interactive: true },
        { id: 'label-c', type: 'point', x: 90, y: 280, label: 'C', color: '#000' },
        // Circle (D)
        { id: 'circle-d', type: 'circle', x: 225, y: 230, radius: 40, color: '#f39c12', interactive: true },
        { id: 'label-d', type: 'point', x: 225, y: 290, label: 'D', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'square-a',
      description: 'Cliquez sur le carré',
    },
  },

  {
    id: 'ce2-geom-002',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Lequel est un rectangle?',
    options: ['Figure A', 'Figure B', 'Figure C', 'Figure D'],
    correctAnswer: 2,
    explanation: 'Un rectangle a 4 angles droits et les côtés opposés sont égaux.',
    difficulty: 1,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        // A - Square
        { id: 'sq-a', type: 'polygon', points: [{ x: 30, y: 40 }, { x: 100, y: 40 }, { x: 100, y: 110 }, { x: 30, y: 110 }], color: '#e74c3c' },
        { id: 'la', type: 'point', x: 65, y: 130, label: 'A', color: '#000' },
        // B - Triangle
        { id: 'tr-b', type: 'polygon', points: [{ x: 150, y: 40 }, { x: 220, y: 40 }, { x: 185, y: 110 }], color: '#3498db' },
        { id: 'lb', type: 'point', x: 185, y: 130, label: 'B', color: '#000' },
        // C - Rectangle CORRECT
        { id: 'rc-c', type: 'polygon', points: [{ x: 270, y: 40 }, { x: 370, y: 40 }, { x: 370, y: 110 }, { x: 270, y: 110 }], color: '#27ae60', interactive: true },
        { id: 'lc', type: 'point', x: 320, y: 130, label: 'C', color: '#000' },
        // D - Circle
        { id: 'ci-d', type: 'circle', x: 80, y: 200, radius: 35, color: '#f39c12' },
        { id: 'ld', type: 'point', x: 80, y: 250, label: 'D', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'rc-c',
      description: 'Cliquez sur le rectangle',
    },
  },

  {
    id: 'ce2-geom-003',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Trouvez le triangle.',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 1,
    explanation: 'Un triangle a 3 côtés et 3 angles.',
    difficulty: 1,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        { id: 'ci-a', type: 'circle', x: 50, y: 80, radius: 35, color: '#e74c3c' },
        { id: 'la1', type: 'point', x: 50, y: 130, label: 'A', color: '#000' },
        { id: 'tr-b1', type: 'polygon', points: [{ x: 170, y: 50 }, { x: 240, y: 50 }, { x: 205, y: 120 }], color: '#3498db', interactive: true },
        { id: 'lb1', type: 'point', x: 205, y: 140, label: 'B', color: '#000' },
        { id: 'sq-c1', type: 'polygon', points: [{ x: 290, y: 50 }, { x: 360, y: 50 }, { x: 360, y: 120 }, { x: 290, y: 120 }], color: '#27ae60' },
        { id: 'lc1', type: 'point', x: 325, y: 140, label: 'C', color: '#000' },
        { id: 'hex-d', type: 'polygon', points: [{ x: 35, y: 190 }, { x: 75, y: 170 }, { x: 95, y: 190 }, { x: 95, y: 230 }, { x: 55, y: 250 }, { x: 15, y: 230 }], color: '#f39c12' },
        { id: 'ld1', type: 'point', x: 55, y: 270, label: 'D', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'tr-b1',
      description: 'Cliquez sur le triangle',
    },
  },

  {
    id: 'ce2-geom-004',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Quel cercle est le plus grand?',
    options: ['Le cercle A', 'Le cercle B', 'Les deux sont égaux', 'Impossible à dire'],
    correctAnswer: 0,
    explanation: 'Le cercle A a un rayon plus grand que le cercle B.',
    difficulty: 1,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        { id: 'big-circle', type: 'circle', x: 100, y: 140, radius: 80, color: '#e74c3c', interactive: true },
        { id: 'la-big', type: 'point', x: 100, y: 240, label: 'A (plus grand)', color: '#000' },
        { id: 'small-circle', type: 'circle', x: 300, y: 140, radius: 50, color: '#3498db', interactive: true },
        { id: 'lb-small', type: 'point', x: 300, y: 200, label: 'B', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'big-circle',
      description: 'Cliquez sur le plus grand cercle',
    },
  },

  {
    id: 'ce2-geom-005',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Identifiez la ligne horizontale.',
    options: ['Ligne A', 'Ligne B', 'Ligne C', 'Aucune'],
    correctAnswer: 1,
    explanation: 'Une ligne horizontale va de gauche à droite.',
    difficulty: 1,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        { id: 'v-line', type: 'line', points: [{ x: 50, y: 50 }, { x: 50, y: 250 }], color: '#e74c3c', interactive: true },
        { id: 'la-v', type: 'point', x: 20, y: 150, label: 'A (vertical)', color: '#000' },
        { id: 'h-line', type: 'line', points: [{ x: 120, y: 100 }, { x: 320, y: 100 }], color: '#3498db', interactive: true },
        { id: 'lb-h', type: 'point', x: 220, y: 70, label: 'B (horizontal)', color: '#000' },
        { id: 'd-line', type: 'line', points: [{ x: 330, y: 50 }, { x: 380, y: 200 }], color: '#27ae60', interactive: true },
        { id: 'lc-d', type: 'point', x: 390, y: 220, label: 'C (diagonale)', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'h-line',
      description: 'Cliquez sur la ligne horizontale',
    },
  },

  {
    id: 'ce2-geom-006',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Quelle ligne est verticale?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Une ligne verticale va de haut en bas.',
    difficulty: 1,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        { id: 'vert-a', type: 'line', points: [{ x: 50, y: 30 }, { x: 50, y: 230 }], color: '#e74c3c', interactive: true },
        { id: 'la-vert', type: 'point', x: 70, y: 250, label: 'A', color: '#000' },
        { id: 'horiz-b', type: 'line', points: [{ x: 150, y: 80 }, { x: 300, y: 80 }], color: '#3498db' },
        { id: 'lb-vert', type: 'point', x: 225, y: 50, label: 'B', color: '#000' },
        { id: 'diag-c', type: 'line', points: [{ x: 320, y: 40 }, { x: 380, y: 180 }], color: '#27ae60' },
        { id: 'lc-vert', type: 'point', x: 390, y: 200, label: 'C', color: '#000' },
        { id: 'diag2-d', type: 'line', points: [{ x: 140, y: 180 }, { x: 200, y: 220 }], color: '#f39c12' },
        { id: 'ld-vert', type: 'point', x: 170, y: 240, label: 'D', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'vert-a',
      description: 'Cliquez sur la ligne verticale',
    },
  },

  {
    id: 'ce2-geom-007',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Trouvez le triangle équilatéral (tous les côtés égaux).',
    options: ['Triangle A', 'Triangle B', 'Triangle C', 'Triangle D'],
    correctAnswer: 1,
    explanation: 'Un triangle équilatéral a 3 côtés de même longueur.',
    difficulty: 2,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        { id: 'tri-iso-a', type: 'polygon', points: [{ x: 60, y: 40 }, { x: 100, y: 120 }, { x: 20, y: 120 }], color: '#e74c3c' },
        { id: 'la-iso', type: 'point', x: 60, y: 150, label: 'A', color: '#000' },
        { id: 'tri-eq-b', type: 'polygon', points: [{ x: 200, y: 50 }, { x: 260, y: 130 }, { x: 140, y: 130 }], color: '#3498db', interactive: true },
        { id: 'lb-iso', type: 'point', x: 200, y: 155, label: 'B (équilatéral)', color: '#000' },
        { id: 'tri-rect-c', type: 'polygon', points: [{ x: 320, y: 40 }, { x: 380, y: 40 }, { x: 380, y: 130 }], color: '#27ae60' },
        { id: 'lc-iso', type: 'point', x: 350, y: 150, label: 'C', color: '#000' },
        { id: 'tri-flat-d', type: 'polygon', points: [{ x: 50, y: 200 }, { x: 150, y: 200 }, { x: 100, y: 250 }], color: '#f39c12' },
        { id: 'ld-iso', type: 'point', x: 100, y: 270, label: 'D', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'tri-eq-b',
      description: 'Cliquez sur le triangle équilatéral',
    },
  },

  {
    id: 'ce2-geom-008',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Identifiez le rectangle le plus long.',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 2,
    explanation: 'Le rectangle C est plus long que les autres.',
    difficulty: 1,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        { id: 'r-a', type: 'polygon', points: [{ x: 20, y: 50 }, { x: 100, y: 50 }, { x: 100, y: 90 }, { x: 20, y: 90 }], color: '#e74c3c' },
        { id: 'la-rect', type: 'point', x: 60, y: 110, label: 'A', color: '#000' },
        { id: 'r-b', type: 'polygon', points: [{ x: 130, y: 60 }, { x: 200, y: 60 }, { x: 200, y: 85 }, { x: 130, y: 85 }], color: '#3498db' },
        { id: 'lb-rect', type: 'point', x: 165, y: 105, label: 'B', color: '#000' },
        { id: 'r-c', type: 'polygon', points: [{ x: 230, y: 50 }, { x: 380, y: 50 }, { x: 380, y: 90 }, { x: 230, y: 90 }], color: '#27ae60', interactive: true },
        { id: 'lc-rect', type: 'point', x: 305, y: 110, label: 'C (plus long)', color: '#000' },
        { id: 'r-d', type: 'polygon', points: [{ x: 50, y: 150 }, { x: 130, y: 150 }, { x: 130, y: 200 }, { x: 50, y: 200 }], color: '#f39c12' },
        { id: 'ld-rect', type: 'point', x: 90, y: 220, label: 'D', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'r-c',
      description: 'Cliquez sur le rectangle le plus long',
    },
  },

  {
    id: 'ce2-geom-009',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Combien de côtés a le pentagone?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Un pentagone a 5 côtés.',
    difficulty: 2,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        { id: 'pentagon', type: 'polygon', points: [{ x: 200, y: 50 }, { x: 280, y: 90 }, { x: 260, y: 170 }, { x: 140, y: 170 }, { x: 120, y: 90 }], color: '#e74c3c', interactive: true },
        { id: 'label-pent', type: 'point', x: 200, y: 200, label: 'Pentagone (5 côtés)', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'pentagon',
      description: 'Cliquez sur le pentagone pour confirmer',
    },
  },

  {
    id: 'ce2-geom-010',
    level: 'CE2',
    domain: 'Géométrie',
    question: 'Quel hexagone est régulier (tous les côtés égaux)?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Un hexagone régulier a 6 côtés de même longueur.',
    difficulty: 2,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 280,
      grid: false,
      elements: [
        // Regular hexagon
        { id: 'hex-reg', type: 'polygon', points: [{ x: 70, y: 60 }, { x: 100, y: 80 }, { x: 100, y: 120 }, { x: 70, y: 140 }, { x: 40, y: 120 }, { x: 40, y: 80 }], color: '#e74c3c', interactive: true },
        { id: 'l-hex-reg', type: 'point', x: 70, y: 160, label: 'A (régulier)', color: '#000' },
        // Irregular hexagons
        { id: 'hex-irr-b', type: 'polygon', points: [{ x: 220, y: 50 }, { x: 270, y: 80 }, { x: 280, y: 130 }, { x: 240, y: 160 }, { x: 180, y: 140 }, { x: 170, y: 80 }], color: '#3498db' },
        { id: 'l-hex-b', type: 'point', x: 225, y: 170, label: 'B', color: '#000' },
        { id: 'hex-irr-c', type: 'polygon', points: [{ x: 310, y: 70 }, { x: 360, y: 90 }, { x: 365, y: 150 }, { x: 330, y: 165 }, { x: 290, y: 140 }, { x: 295, y: 95 }], color: '#27ae60' },
        { id: 'l-hex-c', type: 'point', x: 330, y: 175, label: 'C', color: '#000' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'hex-reg',
      description: 'Cliquez sur l\'hexagone régulier',
    },
  },
];

// Tu veux que je continue avec d'autres questions pour completer les 50 pour CE2 et aussi pour CM1, CM2, 6ème, 5ème?
