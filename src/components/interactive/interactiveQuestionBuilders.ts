import { InteractiveQuestion } from '../../types';

/**
 * Builder functions for creating interactive geometry questions
 * These functions create pre-configured interactive questions
 * following the InteractiveQuestion interface
 */

/**
 * Creates a question about identifying a median in a triangle
 */
export function createMedianQuestion(): InteractiveQuestion {
  return {
    id: 'interactive-median-001',
    level: '6ème',
    domain: 'Géométrie',
    question: 'Identifiez la médiane du triangle ABC tracée du sommet A vers le côté BC',
    options: [
      'La ligne rouge est la médiane',
      'La ligne bleue est la médiane',
      'Aucune de ces lignes n\'est une médiane',
      'Les deux lignes sont des médianes',
    ],
    correctAnswer: 0,
    explanation:
      'Une médiane d\'un triangle est une droite qui relie un sommet au milieu du côté opposé. La ligne rouge relie le sommet A au point milieu de BC, c\'est donc la médiane.',
    difficulty: 2,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 350,
      grid: false,
      elements: [
        // Triangle vertices
        { id: 'A', type: 'point', x: 200, y: 50, color: '#2c3e50', label: 'A' },
        { id: 'B', type: 'point', x: 100, y: 300, color: '#2c3e50', label: 'B' },
        { id: 'C', type: 'point', x: 300, y: 300, color: '#2c3e50', label: 'C' },

        // Triangle sides
        { id: 'AB', type: 'line', points: [{ x: 200, y: 50 }, { x: 100, y: 300 }], color: '#34495e' },
        { id: 'AC', type: 'line', points: [{ x: 200, y: 50 }, { x: 300, y: 300 }], color: '#34495e' },
        { id: 'BC', type: 'line', points: [{ x: 100, y: 300 }, { x: 300, y: 300 }], color: '#34495e' },

        // Midpoint of BC
        { id: 'M', type: 'point', x: 200, y: 300, color: '#e74c3c', label: 'M' },

        // Median (AM) - the correct answer
        {
          id: 'median-red',
          type: 'line',
          points: [{ x: 200, y: 50 }, { x: 200, y: 300 }],
          color: '#e74c3c',
          interactive: true,
        },

        // Wrong line (altitude or other)
        {
          id: 'altitude-blue',
          type: 'line',
          points: [{ x: 200, y: 50 }, { x: 150, y: 300 }],
          color: '#3498db',
          interactive: true,
        },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'median-red',
      description: 'Cliquez sur la médiane pour vérifier',
    },
  };
}

/**
 * Creates a question about identifying a right angle
 */
export function createRightAngleQuestion(): InteractiveQuestion {
  return {
    id: 'interactive-angle-001',
    level: '5ème',
    domain: 'Géométrie',
    question:
      'Lequel de ces angles est un angle droit (90°)? Cliquez sur l\'angle pour vérifier.',
    options: [
      'L\'angle en haut à gauche',
      'L\'angle en haut à droite',
      'L\'angle en bas à gauche',
      'L\'angle en bas à droite',
    ],
    correctAnswer: 2,
    explanation:
      'Un angle droit mesure exactement 90°. On peut le reconnaître par le petit carré dans le coin de l\'angle. Dans ce cas, l\'angle en bas à gauche est un angle droit.',
    difficulty: 2,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 300,
      grid: false,
      elements: [
        // Top left - 45° angle
        {
          id: 'angle-1',
          type: 'point',
          x: 80,
          y: 60,
          color: '#2c3e50',
          label: 'Angle 1',
        },
        {
          id: 'angle-1-line1',
          type: 'line',
          points: [{ x: 80, y: 60 }, { x: 130, y: 60 }],
          color: '#34495e',
        },
        {
          id: 'angle-1-line2',
          type: 'line',
          points: [{ x: 80, y: 60 }, { x: 105, y: 85 }],
          color: '#34495e',
        },

        // Top right - 60° angle
        {
          id: 'angle-2',
          type: 'point',
          x: 320,
          y: 60,
          color: '#2c3e50',
          label: 'Angle 2',
        },
        {
          id: 'angle-2-line1',
          type: 'line',
          points: [{ x: 320, y: 60 }, { x: 370, y: 60 }],
          color: '#34495e',
        },
        {
          id: 'angle-2-line2',
          type: 'line',
          points: [{ x: 320, y: 60 }, { x: 345, y: 95 }],
          color: '#34495e',
        },

        // Bottom left - 90° angle (CORRECT)
        {
          id: 'angle-3',
          type: 'point',
          x: 80,
          y: 240,
          color: '#2c3e50',
          label: 'Angle 3',
          interactive: true,
        },
        {
          id: 'angle-3-line1',
          type: 'line',
          points: [{ x: 80, y: 240 }, { x: 130, y: 240 }],
          color: '#e74c3c',
          interactive: true,
        },
        {
          id: 'angle-3-line2',
          type: 'line',
          points: [{ x: 80, y: 240 }, { x: 80, y: 190 }],
          color: '#e74c3c',
          interactive: true,
        },
        // Right angle marker
        {
          id: 'angle-3-marker',
          type: 'polygon',
          points: [{ x: 80, y: 240 }, { x: 90, y: 240 }, { x: 90, y: 230 }, { x: 80, y: 230 }],
          color: '#e74c3c',
          interactive: true,
        },

        // Bottom right - 120° angle
        {
          id: 'angle-4',
          type: 'point',
          x: 320,
          y: 240,
          color: '#2c3e50',
          label: 'Angle 4',
        },
        {
          id: 'angle-4-line1',
          type: 'line',
          points: [{ x: 320, y: 240 }, { x: 370, y: 240 }],
          color: '#34495e',
        },
        {
          id: 'angle-4-line2',
          type: 'line',
          points: [{ x: 320, y: 240 }, { x: 280, y: 190 }],
          color: '#34495e',
        },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'angle-3',
      description: 'Cliquez sur l\'angle droit pour le vérifier',
    },
  };
}

/**
 * Creates a question about circle diameter
 */
export function createCircleDiameterQuestion(): InteractiveQuestion {
  return {
    id: 'interactive-circle-001',
    level: '6ème',
    domain: 'Géométrie',
    question:
      'Quel segment est le diamètre du cercle? Cliquez sur le segment pour vérifier votre réponse.',
    options: [
      'Le segment rouge',
      'Le segment bleu',
      'Le segment vert',
      'Aucun de ces segments',
    ],
    correctAnswer: 0,
    explanation:
      'Un diamètre d\'un cercle est un segment qui passe par le centre et relie deux points du cercle. Le segment rouge passe par le centre et relie deux points de la circonférence, c\'est donc le diamètre.',
    difficulty: 1,
    isInteractive: true,
    interactionType: 'click',
    canvas: {
      width: 400,
      height: 350,
      grid: false,
      elements: [
        // Circle
        { id: 'circle', type: 'circle', x: 200, y: 175, radius: 100, color: '#34495e' },

        // Center point
        { id: 'center', type: 'point', x: 200, y: 175, color: '#e74c3c', label: 'Centre' },

        // Diameter (red) - correct
        {
          id: 'diameter-red',
          type: 'segment',
          points: [{ x: 100, y: 175 }, { x: 300, y: 175 }],
          color: '#e74c3c',
          interactive: true,
        },

        // Radius (blue) - wrong
        {
          id: 'radius-blue',
          type: 'segment',
          points: [{ x: 200, y: 175 }, { x: 200, y: 75 }],
          color: '#3498db',
          interactive: true,
        },

        // Chord (green) - wrong
        {
          id: 'chord-green',
          type: 'segment',
          points: [{ x: 260, y: 125 }, { x: 140, y: 225 }],
          color: '#27ae60',
          interactive: true,
        },

        // Points on circle
        { id: 'point-left', type: 'point', x: 100, y: 175, color: '#2c3e50' },
        { id: 'point-right', type: 'point', x: 300, y: 175, color: '#2c3e50' },
        { id: 'point-top', type: 'point', x: 200, y: 75, color: '#2c3e50' },
      ],
    },
    expectedInteraction: {
      type: 'click',
      targetElement: 'diameter-red',
      description: 'Identifiez le diamètre du cercle',
    },
  };
}

/**
 * Creates a question about triangle symmetry
 */
export function createSymmetryQuestion(): InteractiveQuestion {
  return {
    id: 'interactive-symmetry-001',
    level: '5ème',
    domain: 'Géométrie',
    question:
      'Tracez la droite de symétrie de ce triangle. Cliquez et glissez pour dessiner la ligne.',
    options: [
      'La symétrie est correctement identifiée',
      'Ce triangle n\'a pas de symétrie',
      'Il y a deux axes de symétrie',
      'La symétrie est différente',
    ],
    correctAnswer: 0,
    explanation:
      'Un triangle isocèle possède un axe de symétrie qui passe par le sommet principal et le milieu de la base. La droite verticale passant par le sommet supérieur et le milieu de la base est cet axe de symétrie.',
    difficulty: 2,
    isInteractive: true,
    interactionType: 'draw',
    canvas: {
      width: 400,
      height: 350,
      grid: true,
      elements: [
        // Isoceles triangle (symmetric)
        { id: 'A', type: 'point', x: 200, y: 50, color: '#2c3e50', label: 'A' },
        { id: 'B', type: 'point', x: 100, y: 300, color: '#2c3e50', label: 'B' },
        { id: 'C', type: 'point', x: 300, y: 300, color: '#2c3e50', label: 'C' },

        // Triangle sides
        { id: 'AB', type: 'line', points: [{ x: 200, y: 50 }, { x: 100, y: 300 }], color: '#34495e' },
        { id: 'AC', type: 'line', points: [{ x: 200, y: 50 }, { x: 300, y: 300 }], color: '#34495e' },
        { id: 'BC', type: 'line', points: [{ x: 100, y: 300 }, { x: 300, y: 300 }], color: '#34495e' },

        // Midpoint of BC
        { id: 'M', type: 'point', x: 200, y: 300, color: '#27ae60', label: 'M (milieu)' },
      ],
    },
    expectedInteraction: {
      type: 'draw',
      description: 'Dessinez l\'axe de symétrie du triangle (la ligne verticale)',
    },
  };
}

/**
 * Creates a question about measuring angles
 */
export function createAngleMeasurementQuestion(): InteractiveQuestion {
  return {
    id: 'interactive-measure-angle-001',
    level: '5ème',
    domain: 'Géométrie',
    question:
      'Mesurez l\'angle AOB. Cliquez sur l\'angle pour vérifier votre estimation.',
    options: [
      'L\'angle mesure environ 60°',
      'L\'angle mesure environ 90°',
      'L\'angle mesure environ 120°',
      'L\'angle mesure environ 45°',
    ],
    correctAnswer: 1,
    explanation:
      'Pour mesurer un angle, on utilise un rapporteur. L\'angle AOB, formé par les deux rayons OA et OB, mesure exactement 90°, ce qui en fait un angle droit.',
    difficulty: 3,
    isInteractive: true,
    interactionType: 'measure',
    canvas: {
      width: 400,
      height: 350,
      grid: false,
      elements: [
        // Vertex O
        { id: 'O', type: 'point', x: 150, y: 175, color: '#2c3e50', label: 'O', interactive: true },

        // Ray OA
        { id: 'OA', type: 'line', points: [{ x: 150, y: 175 }, { x: 300, y: 175 }], color: '#34495e' },
        { id: 'A', type: 'point', x: 300, y: 175, color: '#2c3e50', label: 'A' },

        // Ray OB (90° from OA)
        { id: 'OB', type: 'line', points: [{ x: 150, y: 175 }, { x: 150, y: 25 }], color: '#34495e' },
        { id: 'B', type: 'point', x: 150, y: 25, color: '#2c3e50', label: 'B' },

        // Arc showing angle
        {
          id: 'angle-arc',
          type: 'circle',
          x: 150,
          y: 175,
          radius: 30,
          color: '#e74c3c',
          interactive: true,
        },
      ],
    },
    expectedInteraction: {
      type: 'measure',
      targetElement: 'angle-arc',
      description: 'Mesurez l\'angle entre les deux rayons',
    },
  };
}

/**
 * Get all sample interactive questions
 */
export function getAllSampleInteractiveQuestions(): InteractiveQuestion[] {
  return [
    createMedianQuestion(),
    createRightAngleQuestion(),
    createCircleDiameterQuestion(),
    createSymmetryQuestion(),
    createAngleMeasurementQuestion(),
  ];
}
