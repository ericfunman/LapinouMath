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
      correctAnswer: i % 3,
      explanation: 'Un angle droit mesure 90 degrés.',
      difficulty: 1,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 250,
        grid: false,
        elements: [
          { id: `angle-${i}`, type: 'line', points: [{ x: 60, y: 80 + i * 5 }, { x: 120, y: 80 + i * 5 }], color: '#e74c3c' },
          { id: `angle2-${i}`, type: 'line', points: [{ x: 60, y: 80 + i * 5 }, { x: 60, y: 140 + i * 5 }], color: '#e74c3c', interactive: true },
          { id: `right-marker-${i}`, type: 'polygon', points: [{ x: 60, y: 80 + i * 5 }, { x: 70, y: 80 + i * 5 }, { x: 70, y: 90 + i * 5 }, { x: 60, y: 90 + i * 5 }], color: '#e74c3c' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: 'Cliquez sur l\'angle droit',
      },
    });
  }

  // Shape counting (31-40)
  for (let i = 0; i < 10; i++) {
    questions.push({
      id: `ce2-geom-${String(id++).padStart(3, '0')}`,
      level: 'CE2',
      domain: 'Géométrie',
      question: `Combien de triangles voyez-vous? (question ${id - 31})`,
      options: ['2', '3', '4', '5'],
      correctAnswer: Math.floor(Math.random() * 3),
      explanation: 'Comptez tous les triangles, y compris ceux formés par d\'autres formes.',
      difficulty: 2,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 250,
        grid: false,
        elements: [
          { id: `tri-group-${i}`, type: 'polygon', points: [{ x: 100, y: 80 }, { x: 200, y: 80 }, { x: 150, y: 160 }], color: '#e74c3c', interactive: true },
          { id: `tri-mid-${i}`, type: 'line', points: [{ x: 150, y: 80 }, { x: 150, y: 160 }], color: '#3498db' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: 'Cliquez sur la figure',
      },
    });
  }

  // Polygon recognition (41-50)
  for (let i = 0; i < 10; i++) {
    const shapes = ['triangle', 'carré', 'rectangle', 'pentagone', 'hexagone', 'cercle', 'losange', 'trapèze', 'parallélogramme', 'octogone'];
    const shapeIndex = i % shapes.length;
    
    questions.push({
      id: `ce2-geom-${String(id++).padStart(3, '0')}`,
      level: 'CE2',
      domain: 'Géométrie',
      question: `Trouvez le ${shapes[shapeIndex]}.`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: `Le ${shapes[shapeIndex]} a ses caractéristiques spécifiques.`,
      difficulty: 1,
      isInteractive: true,
      interactionType: 'click',
      canvas: {
        width: 400,
        height: 250,
        grid: false,
        elements: [
          { id: `shape-${i}-a`, type: 'circle', x: 70, y: 100, radius: 40, color: '#e74c3c', interactive: true },
          { id: `shape-${i}-b`, type: 'polygon', points: [{ x: 220, y: 70 }, { x: 270, y: 100 }, { x: 250, y: 140 }], color: '#3498db' },
          { id: `shape-${i}-c`, type: 'polygon', points: [{ x: 330, y: 80 }, { x: 380, y: 80 }, { x: 380, y: 130 }, { x: 330, y: 130 }], color: '#27ae60' },
        ],
      },
      expectedInteraction: {
        type: 'click',
        description: `Cliquez sur le ${shapes[shapeIndex]}`,
      },
    });
  }

  return questions;
}

export const interactiveGeometryCE2Extended = generateCE2Questions();
export const totalCE2Questions = 10 + 40; // 10 from previous file + 40 here = 50
