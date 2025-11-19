import { describe, it, expect } from 'vitest';
import {
  createMedianQuestion,
  createRightAngleQuestion,
  createCircleDiameterQuestion,
  createSymmetryQuestion,
  createAngleMeasurementQuestion,
  getAllSampleInteractiveQuestions,
} from '../interactiveQuestionBuilders';

function validateElements(elements: any[]) {
  elements.forEach((el) => {
    expect(el.id).toBeDefined();
    expect(el.type).toBeDefined();
    // Ensure element has coordinates or points based on type
    if (el.type === 'point' || el.type === 'circle') {
      expect(el.x).toBeDefined();
      expect(el.y).toBeDefined();
    } else if (el.type === 'line' || el.type === 'segment' || el.type === 'polygon') {
      expect(el.points).toBeDefined();
      if (el.points) {
        expect(el.points.length).toBeGreaterThan(0);
      }
    }
  });
}

describe('Interactive Question Builders', () => {
  describe('createMedianQuestion', () => {
    it('should create a valid interactive question', () => {
      const question = createMedianQuestion();
      expect(question.id).toBe('interactive-median-001');
      expect(question.isInteractive).toBe(true);
      expect(question.interactionType).toBe('click');
      expect(question.level).toBe('6ème');
      expect(question.domain).toBe('Géométrie');
    });

    it('should have correct answer set to 0', () => {
      const question = createMedianQuestion();
      expect(question.correctAnswer).toBe(0);
    });

    it('should have 4 options', () => {
      const question = createMedianQuestion();
      expect(question.options).toHaveLength(4);
    });

    it('should have valid canvas configuration', () => {
      const question = createMedianQuestion();
      expect(question.canvas.width).toBeGreaterThan(0);
      expect(question.canvas.height).toBeGreaterThan(0);
      expect(question.canvas.elements).toBeDefined();
      expect(question.canvas.elements.length).toBeGreaterThan(0);
    });

    it('should have expectedInteraction defined', () => {
      const question = createMedianQuestion();
      expect(question.expectedInteraction).toBeDefined();
      expect(question.expectedInteraction.type).toBe('click');
      expect(question.expectedInteraction.description).toBeDefined();
    });
  });

  describe('createRightAngleQuestion', () => {
    it('should create a valid right angle question', () => {
      const question = createRightAngleQuestion();
      expect(question.id).toBe('interactive-angle-001');
      expect(question.isInteractive).toBe(true);
      expect(question.correctAnswer).toBe(2);
    });

    it('should have 4 angle options', () => {
      const question = createRightAngleQuestion();
      expect(question.options).toHaveLength(4);
    });
  });

  describe('createCircleDiameterQuestion', () => {
    it('should create a valid circle diameter question', () => {
      const question = createCircleDiameterQuestion();
      expect(question.id).toBe('interactive-circle-001');
      expect(question.isInteractive).toBe(true);
      expect(question.correctAnswer).toBe(0);
      expect(question.level).toBe('6ème');
    });

    it('should have circle and segments in canvas', () => {
      const question = createCircleDiameterQuestion();
      const hasCircle = question.canvas.elements.some((el) => el.type === 'circle');
      const hasSegments = question.canvas.elements.some((el) => el.type === 'segment');
      expect(hasCircle).toBe(true);
      expect(hasSegments).toBe(true);
    });
  });

  describe('createSymmetryQuestion', () => {
    it('should create a valid symmetry question with draw interaction', () => {
      const question = createSymmetryQuestion();
      expect(question.id).toBe('interactive-symmetry-001');
      expect(question.isInteractive).toBe(true);
      expect(question.interactionType).toBe('draw');
      expect(question.canvas.grid).toBe(true);
    });
  });

  describe('createAngleMeasurementQuestion', () => {
    it('should create a valid angle measurement question', () => {
      const question = createAngleMeasurementQuestion();
      expect(question.id).toBe('interactive-measure-angle-001');
      expect(question.isInteractive).toBe(true);
      expect(question.interactionType).toBe('measure');
      expect(question.difficulty).toBe(3);
    });

    it('should have rays and vertex in canvas', () => {
      const question = createAngleMeasurementQuestion();
      const hasVertex = question.canvas.elements.some((el) => el.id === 'O');
      const hasRays = question.canvas.elements.some((el) => el.id === 'OA' || el.id === 'OB');
      expect(hasVertex).toBe(true);
      expect(hasRays).toBe(true);
    });
  });

  describe('getAllSampleInteractiveQuestions', () => {
    it('should return all 5 sample questions', () => {
      const questions = getAllSampleInteractiveQuestions();
      expect(questions).toHaveLength(5);
    });

    it('should return valid InteractiveQuestion objects', () => {
      const questions = getAllSampleInteractiveQuestions();
      questions.forEach((q) => {
        expect(q.isInteractive).toBe(true);
        expect(q.interactionType).toBeDefined();
        expect(q.canvas).toBeDefined();
        expect(q.expectedInteraction).toBeDefined();
      });
    });

    it('should cover different interaction types', () => {
      const questions = getAllSampleInteractiveQuestions();
      const types = new Set(questions.map((q) => q.interactionType));
      expect(types.has('click')).toBe(true);
      expect(types.has('draw')).toBe(true);
      expect(types.has('measure')).toBe(true);
    });

    it('should cover 6ème and 5ème levels', () => {
      const questions = getAllSampleInteractiveQuestions();
      const levels = new Set(questions.map((q) => q.level));
      expect(levels.has('6ème')).toBe(true);
      expect(levels.has('5ème')).toBe(true);
    });
  });

  describe('Canvas Element Validation', () => {
    it('should have valid elements with required properties', () => {
      const questions = getAllSampleInteractiveQuestions();
      questions.forEach((q) => {
        validateElements(q.canvas.elements);
      });
    });
  });
});
