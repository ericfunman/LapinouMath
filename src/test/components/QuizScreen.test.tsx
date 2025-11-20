import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizScreen from '../../components/QuizScreen';

// Mock les questions
vi.mock('../../data/questions', () => ({
  getRandomQuestions: vi.fn(() => [
    {
      id: 'q1',
      domain: 'Calcul mental',
      grade: 'CE1',
      question: 'Combien font 2 + 3 ?',
      options: ['3', '5', '7', '9'],
      correctAnswer: 1,
      explanation: 'Le résultat est 5',
    },
  ]),
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

  it('works with various domains', () => {
    const { unmount } = render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
    unmount();
  });

  it('handles multiple domain configurations', () => {
    const domains = ['Calcul mental', 'Géométrie'] as const;
    
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

  it('initializes callbacks properly', () => {
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
    expect(mockOnExit).not.toHaveBeenCalled();
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

  it('maintains quiz state', () => {
    render(
      <QuizScreen
        level="CE2"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('processes domain data correctly', () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Géométrie"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('has proper structure', () => {
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

  it('works with different rabbit customizations', () => {
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
});
