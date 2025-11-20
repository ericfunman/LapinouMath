import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('renders loading state initially', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('renders question after loading', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Combien font/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows exit button', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Quitter')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('calls onExit when exit button is clicked', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Quitter')).toBeInTheDocument();
    }, { timeout: 3000 });

    const exitButton = screen.getByText('Quitter');
    fireEvent.click(exitButton);
    
    expect(mockOnExit).toHaveBeenCalled();
  });
});
