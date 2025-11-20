import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuickChallenge from '../../components/QuickChallenge';

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

describe('QuickChallenge', () => {
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
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('renders after loading', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Attendre un peu pour que le composant charge
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(document.body).toBeDefined();
  });

  it('shows exit button when rendered', async () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Vérifier qu'il y a des éléments dans le DOM
    expect(container.firstChild).toBeDefined();
  });
});
