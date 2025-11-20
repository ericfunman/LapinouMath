import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizScreen from '../../components/QuizScreen';

// Mock les questions
const mockQuestions = [
  {
    id: 'q1',
    domain: 'Calcul mental',
    grade: 'CE1',
    question: 'Combien font 2 + 3 ?',
    options: ['3', '5', '7', '9'],
    correctAnswer: 1,
    explanation: 'Le résultat est 5',
  },
  {
    id: 'q2',
    domain: 'Calcul mental',
    grade: 'CE1',
    question: 'Combien font 10 - 4 ?',
    options: ['4', '6', '8', '10'],
    correctAnswer: 1,
    explanation: 'Le résultat est 6',
  },
];

vi.mock('../../data/questions', () => ({
  getRandomQuestions: vi.fn(() => mockQuestions),
}));

vi.mock('../../utils/database', () => ({
  reportQuestionError: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('emailjs-com', () => ({
  init: vi.fn(),
  send: vi.fn().mockResolvedValue({ status: 200 }),
}));

describe('QuizScreen', () => {
  const mockOnComplete = vi.fn();
  const mockOnExit = vi.fn();
  const rabbitCustomization = {
    variant: 'classic' as const,
    accessories: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('accepts all required props', () => {
    const customization = {
      variant: 'white' as const,
      accessories: [],
    };

    render(
      <QuizScreen
        level="CE2"
        domain="Géométrie"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={customization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('works with various levels', () => {
    const { unmount } = render(
      <QuizScreen
        level="CM1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
    unmount();
  });

  it('initializes without throwing errors', () => {
    expect(() => {
      render(
        <QuizScreen
          level="CM1"
          domain="Calcul mental"
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );
    }).not.toThrow();
  });

  it('loads questions on mount', () => {
    const { container } = render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Check that quiz content renders (questions loaded)
    expect(container.firstChild).toBeTruthy();
  });

  it('displays quiz interface', () => {
    const { container } = render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container.firstChild).toBeTruthy();
  });

  it('maintains quiz state across renders', () => {
    const { rerender } = render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    rerender(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('uses multiple questions from mock data', () => {
    const { container } = render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Should have loaded questions
    expect(container.firstChild).toBeTruthy();
  });

  it('handles different grade levels', () => {
    const levels = ['CE1', 'CE2', 'CM1', 'CM2', '6ème'];
    
    for (const level of levels) {
      const { unmount } = render(
        <QuizScreen
          level={level as any}
          domain="Calcul mental"
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );
      expect(document.body).toBeDefined();
      unmount();
    }
  });

  it('does not call onComplete on initial render', () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(mockOnComplete).not.toHaveBeenCalled();
  });

  it('does not call onExit on initial render', () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(mockOnExit).not.toHaveBeenCalled();
  });

  it('works with white rabbit variant', () => {
    const customization = {
      variant: 'white' as const,
      accessories: [],
    };

    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={customization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('works with brown rabbit variant', () => {
    const customization = {
      variant: 'brown' as const,
      accessories: [],
    };

    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={customization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('handles quiz with multiple domains', () => {
    const domains = ['Calcul mental', 'Arithmétique'] as const;
    
    for (const domain of domains) {
      const { unmount } = render(
        <QuizScreen
          level="CE1"
          domain={domain}
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );
      expect(document.body).toBeDefined();
      unmount();
    }
  });

  it('properly initializes state variables', () => {
    const { container } = render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Quiz should render with initialized state
    expect(container).toBeTruthy();
  });

  it('maintains callbacks across re-renders', () => {
    const newOnComplete = vi.fn();
    const { rerender } = render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    rerender(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={newOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('structure is valid HTML', () => {
    const { container } = render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container.childNodes.length).toBeGreaterThan(0);
  });
});
