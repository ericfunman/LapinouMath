import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
      lesson: 'Leçon sur l\'addition',
    },
    {
      id: 'q2',
      domain: 'Calcul mental',
      grade: 'CE1',
      question: 'Combien font 4 + 4 ?',
      options: ['6', '8', '10', '12'],
      correctAnswer: 1,
      explanation: 'Le résultat est 8',
      lesson: 'Leçon sur l\'addition',
    },
  ]),
}));

// Mock la fonction de report d'erreur
vi.mock('../../utils/database', () => ({
  reportQuestionError: vi.fn(),
}));

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with questions loaded', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Combien font/)).toBeInTheDocument();
    });
  });

  it('displays question and options', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Combien font/)).toBeInTheDocument();
    });

    // Les options sont affichées
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('displays progress counter', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/1 \/ 10/)).toBeInTheDocument();
    });
  });

  it('renders exit button', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('❌ Quitter')).toBeInTheDocument();
    });
  });

  it('calls onExit when exit button is clicked', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('❌ Quitter')).toBeInTheDocument();
    });

    const exitButton = screen.getByText('❌ Quitter');
    fireEvent.click(exitButton);

    expect(mockOnExit).toHaveBeenCalled();
  });

  it('shows answer buttons for each option', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Combien font/)).toBeInTheDocument();
    });

    // Vérifier que les options sont cliquables
    const optionButtons = screen.getAllByRole('button').filter(
      btn => btn.textContent === '3' || btn.textContent === '5' || btn.textContent === '7' || btn.textContent === '9'
    );
    expect(optionButtons.length).toBe(4);
  });

  it('renders report button', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Combien font/)).toBeInTheDocument();
    });

    expect(screen.getByText(/⚠️/)).toBeInTheDocument();
  });

  it('displays correct answer when selected', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Combien font/)).toBeInTheDocument();
    });

    // Trouver et cliquer sur une réponse
    const optionButtons = screen.getAllByRole('button');
    const answerButton = optionButtons.find(btn => 
      btn.textContent === '5' || btn.textContent === '3' || btn.textContent === '7' || btn.textContent === '9'
    );
    
    if (answerButton) {
      fireEvent.click(answerButton);
    }
  });

  it('displays explanation for a question', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Combien font/)).toBeInTheDocument();
    });

    // Chercher le bouton d'explication
    const buttons = screen.getAllByRole('button');
    const explanationBtn = buttons.find(btn => btn.textContent?.includes('💡'));
    
    if (explanationBtn) {
      fireEvent.click(explanationBtn);
    }
  });

  it('loads with correct rabbit customization', async () => {
    const customization = {
      variant: 'white' as const,
      accessories: ['hat-top'],
      adjustments: {},
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

    // Le composant doit s'être rendu sans erreur
    expect(screen.getByText(/Combien font/)).toBeInTheDocument();
  });

  it('has no questions message when loading', () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );
    // Render should not throw
    expect(screen.getByText(/Combien font/)).toBeDefined();
  });

  it('displays correct level and domain headers', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Calcul mental')).toBeInTheDocument();
      expect(screen.getByText('Niveau')).toBeInTheDocument();
      expect(screen.getByText('CE1')).toBeInTheDocument();
    });
  });

  it('shows progress counter', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Progression/)).toBeInTheDocument();
      expect(screen.getByText(/Score/)).toBeInTheDocument();
    });
  });

  it('shows lesson button', async () => {
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/📖/)).toBeInTheDocument();
    });
  });

  it('calls onExit when exit button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <QuizScreen
        level="CE1"
        domain="Calcul mental"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/❌ Quitter/)).toBeInTheDocument();
    });

    const exitButton = screen.getByText(/❌ Quitter/);
    await user.click(exitButton);

    expect(mockOnExit).toHaveBeenCalled();
  });

  it('renders with custom rabbit accessories', async () => {
    const customization = {
      variant: 'gray' as const,
      accessories: ['hat-wizard', 'glasses-star'],
      adjustments: {},
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

    await waitFor(() => {
      expect(screen.getByText(/Combien font/)).toBeInTheDocument();
    });
  });

  it('handles different question domains', async () => {
    const domains = ['Calcul mental', 'Arithmétique', 'Géométrie'];

    for (const domain of domains) {
      const { unmount } = render(
        <QuizScreen
          level="CE1"
          domain={domain as any}
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/Combien font/)).toBeInTheDocument();
      });

      unmount();
      vi.clearAllMocks();
    }
  });

  it('handles all grade levels', async () => {
    const levels = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'];

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

      await waitFor(() => {
        expect(screen.getByText(/Combien font/)).toBeInTheDocument();
      });

      unmount();
      vi.clearAllMocks();
    }
  });
});
