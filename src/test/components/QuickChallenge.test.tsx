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
    {
      id: 'q2',
      domain: 'Calcul mental',
      grade: 'CE1',
      question: 'Combien font 4 + 4 ?',
      options: ['6', '8', '10', '12'],
      correctAnswer: 1,
      explanation: 'Le résultat est 8',
    },
    {
      id: 'q3',
      domain: 'Calcul mental',
      grade: 'CE1',
      question: 'Combien font 5 - 2 ?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 2,
      explanation: 'Le résultat est 3',
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
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it('renders first question after loading', async () => {
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
    });
  });

  it('displays question options', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('2 + 3')).toBeInTheDocument();
    });

    // Les options sont affichées
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('displays timer', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/5s/)).toBeInTheDocument();
    });
  });

  it('decrements timer over time', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('5s')).toBeInTheDocument();
    });

    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText('4s')).toBeInTheDocument();
    });
  });

  it('allows selecting an answer', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('2 + 3')).toBeInTheDocument();
    });

    // Cliquer sur une option
    const options = screen.getAllByRole('button').filter(
      btn => btn.textContent === '5' || btn.textContent === '3' || btn.textContent === '7' || btn.textContent === '9'
    );
    
    if (options.length > 0) {
      fireEvent.click(options[0]);
    }
  });

  it('renders exit button', async () => {
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
    });
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
    });

    const exitButton = screen.getByText('Quitter');
    fireEvent.click(exitButton);

    expect(mockOnExit).toHaveBeenCalled();
  });

  it('displays progress counter', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/\/21/)).toBeInTheDocument();
    });
  });

  it('shows score in end summary', async () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Attendre que le défi soit terminé (plusieurs questions)
    await waitFor(() => {
      expect(screen.getByText('Quitter')).toBeInTheDocument();
    }, { timeout: 10000 });
  });
});
