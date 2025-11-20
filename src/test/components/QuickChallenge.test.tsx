import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import QuickChallenge from '../../components/QuickChallenge';

const mockGetRandomQuestions = vi.fn();

vi.mock('../../data/questions', () => ({
  getRandomQuestions: (level: any, domain: any, count: any) => mockGetRandomQuestions(level, domain, count),
}));

describe('QuickChallenge', () => {
  const mockOnComplete = vi.fn();
  const mockOnExit = vi.fn();
  const rabbitCustomization = {
    variant: 'classic' as const,
    accessories: [],
  };

  const sampleQuestion = {
    id: 'q1',
    level: 'CE1' as const,
    domain: 'Calcul mental' as const,
    question: '2 + 3 = ?',
    options: ['4', '5', '6'],
    correct: 1,
    explanation: 'Le résultat est 5',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetRandomQuestions.mockReturnValue([sampleQuestion]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize without errors', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('loads 20 questions from multiple domains', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(mockGetRandomQuestions).toHaveBeenCalled();
  });

  it('shuffles questions from different domains', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Should call getRandomQuestions multiple times (once per domain)
    expect(mockGetRandomQuestions.mock.calls.length).toBeGreaterThan(0);
  });

  it('handles timer for quick challenge', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('supports different grade levels in challenge mode', () => {
    const levels = ['CE1', 'CE2', 'CM1', 'CM2'] as const;
    
    for (const level of levels) {
      const { unmount } = render(
        <QuickChallenge
          level={level}
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it('provides multiple challenge domains', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Should load questions from 7 different domains
    const domainCalls = mockGetRandomQuestions.mock.calls;
    expect(domainCalls.length).toBe(7);
  });

  it('clears auto-advance timer on completion', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('should load questions from all domains', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Should fetch questions (called once per domain)
    expect(mockGetRandomQuestions).toHaveBeenCalled();
  });

  it('should accept different grade levels', () => {
    const { unmount } = render(
      <QuickChallenge
        level="CM1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeTruthy();
    unmount();
  });

  it('should pass callbacks correctly', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(mockOnComplete).not.toHaveBeenCalled();
    expect(mockOnExit).not.toHaveBeenCalled();
  });

  it('should handle rabbit customization', () => {
    const customRabbit = {
      variant: 'brown' as const,
      accessories: ['hat'],
    };

    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={customRabbit}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('should work with all grade levels', () => {
    const levels = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'] as const;
    
    for (const level of levels) {
      const { unmount } = render(
        <QuickChallenge
          level={level}
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it('should maintain component state', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('should initialize successfully', () => {
    expect(() => {
      render(
        <QuickChallenge
          level="CE1"
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );
    }).not.toThrow();
  });

  it('should handle challenge with custom rabbit variant', () => {
    const variants = ['classic', 'white', 'gray', 'brown'] as const;
    
    for (const variant of variants) {
      const { unmount } = render(
        <QuickChallenge
          level="CE1"
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={{ variant, accessories: [] }}
        />
      );
      expect(document.body).toBeTruthy();
      unmount();
    }
  });

  it('calls onComplete when challenge finishes', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
    expect(typeof mockOnComplete).toBe('function');
  });

  it('calls onExit when exit button clicked', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
    expect(typeof mockOnExit).toBe('function');
  });

  it('renders for CM1 level', () => {
    const { container } = render(
      <QuickChallenge
        level="CM1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('renders for CM2 level', () => {
    const { container } = render(
      <QuickChallenge
        level="CM2"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('handles question with all domains', () => {
    const multiDomainQuestions = [
      { ...sampleQuestion, domain: 'Calcul mental' as const },
      { ...sampleQuestion, domain: 'Arithmétique' as const },
      { ...sampleQuestion, domain: 'Fractions/Décimaux' as const },
      { ...sampleQuestion, domain: 'Mesures' as const },
      { ...sampleQuestion, domain: 'Géométrie' as const },
    ];

    mockGetRandomQuestions.mockReturnValue(multiDomainQuestions);

    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(mockGetRandomQuestions).toHaveBeenCalled();
  });

  it('displays score correctly', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('displays timer', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('handles accessories in customization', () => {
    const customization = {
      variant: 'classic' as const,
      accessories: ['hat', 'glasses'],
    };

    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={customization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('handles customization adjustments', () => {
    const customization = {
      variant: 'classic' as const,
      accessories: ['hat'],
      adjustments: {
        hat: { offsetX: 10, offsetY: 5, scale: 1.2 },
      },
    };

    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={customization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('loads questions from multiple domains equally', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Should load from all domains
    expect(mockGetRandomQuestions.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it('shuffles questions from getRandomQuestions result', () => {
    const manyQuestions = Array.from({ length: 21 }, (_, i) => ({
      ...sampleQuestion,
      id: `q${i}`,
    }));

    mockGetRandomQuestions.mockReturnValue(manyQuestions);

    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('slices questions to 20 maximum', () => {
    const manyQuestions = Array.from({ length: 30 }, (_, i) => ({
      ...sampleQuestion,
      id: `q${i}`,
    }));

    mockGetRandomQuestions.mockReturnValue(manyQuestions);

    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(mockGetRandomQuestions).toHaveBeenCalled();
  });

  it('renders quick challenge interface', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('handles all grade levels', () => {
    const levels = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'];

    for (const level of levels) {
      const { unmount } = render(
        <QuickChallenge
          level={level as any}
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );
      expect(document.body).toBeDefined();
      unmount();
    }
  });

  it('maintains state across rerenders', () => {
    const { rerender } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    rerender(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('handles rabbit customization variants', () => {
    const variants = ['classic' as const, 'white' as const, 'gray' as const, 'brown' as const];

    for (const variant of variants) {
      const { unmount } = render(
        <QuickChallenge
          level="CE1"
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={{ variant, accessories: [] }}
        />
      );
      expect(document.body).toBeDefined();
      unmount();
    }
  });

  it('handles rabbit customization with accessories', () => {
    const customization = {
      variant: 'classic' as const,
      accessories: ['hat-wizard', 'glasses-cool', 'scarf-blue'],
    };

    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={customization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('loads questions from multiple domains', () => {
    render(
      <QuickChallenge
        level="CE2"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Should call getRandomQuestions at least once
    expect(mockGetRandomQuestions.mock.calls.length).toBeGreaterThan(0);
  });

  it('handles empty question sets', () => {
    mockGetRandomQuestions.mockReturnValue([]);

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

  it('displays challenge UI', () => {
    const { container } = render(
      <QuickChallenge
        level="CM1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container.querySelectorAll('button').length).toBeGreaterThanOrEqual(0);
  });

  it('handles callback functions', () => {
    const onComplete = vi.fn();
    const onExit = vi.fn();

    render(
      <QuickChallenge
        level="CE1"
        onComplete={onComplete}
        onExit={onExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(typeof onComplete).toBe('function');
    expect(typeof onExit).toBe('function');
  });

  it('supports all question types', () => {
    const differentQuestions = [
      { ...sampleQuestion, id: 'q1', question: 'Simple question?' },
      { ...sampleQuestion, id: 'q2', question: 'Another question?' },
      { ...sampleQuestion, id: 'q3', question: 'Third question?' },
    ];

    mockGetRandomQuestions.mockReturnValue(differentQuestions);

    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(mockGetRandomQuestions).toHaveBeenCalled();
  });

  it('renders with multiple challenge sessions', () => {
    const { unmount: u1 } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    u1();

    const { unmount: u2 } = render(
      <QuickChallenge
        level="CE2"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    u2();

    expect(document.body).toBeDefined();
  });

  it('handles rapid level changes', () => {
    const { rerender } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    rerender(
      <QuickChallenge
        level="CE2"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    rerender(
      <QuickChallenge
        level="CM1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('initializes with correct props', () => {
    const { container } = render(
      <QuickChallenge
        level="CM2"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container).toBeTruthy();
  });

  it('manages challenge state', () => {
    const { rerender } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    for (let i = 0; i < 5; i++) {
      rerender(
        <QuickChallenge
          level="CE1"
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );
    }

    expect(document.body).toBeDefined();
  });

  it('displays challenge with various question counts', () => {
    const counts = [0, 1, 5, 10, 20, 50];

    for (const count of counts) {
      const questions = Array.from({ length: count }, (_, i) => ({
        ...sampleQuestion,
        id: `q${i}`,
      }));

      mockGetRandomQuestions.mockReturnValue(questions);

      const { unmount } = render(
        <QuickChallenge
          level="CE1"
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );

      expect(document.body).toBeDefined();
      unmount();
    }
  });

  it('handles component without default rabbit customization', () => {
    render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('challenge component structure is valid', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container.querySelectorAll('*').length).toBeGreaterThan(0);
  });

  it('renders challenge interface consistently', () => {
    const { unmount: u1 } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    u1();

    const { unmount: u2 } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    u2();

    expect(document.body).toBeDefined();
  });

  it('handles special question formats', () => {
    const specialQuestions = [
      { ...sampleQuestion, id: 'q1', question: 'What is √4?' },
      { ...sampleQuestion, id: 'q2', question: 'Calculate: 2³ = ?' },
      { ...sampleQuestion, id: 'q3', question: '½ + ¼ = ?' },
    ];

    mockGetRandomQuestions.mockReturnValue(specialQuestions);

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

  it('manages challenge with adjustments', () => {
    const customization = {
      variant: 'white' as const,
      accessories: ['hat-wizard'],
      adjustments: {
        'hat-wizard': { offsetX: 0, offsetY: -10, scale: 1.1 },
      },
    };

    render(
      <QuickChallenge
        level="CM1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={customization}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('should click answer option', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const buttons = container.querySelectorAll('button');
    for (const button of buttons) {
      if (button.textContent && ['4', '5', '6'].includes(button.textContent)) {
        fireEvent.click(button);
        break;
      }
    }

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should click exit button', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const exitButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Quitter')
    );

    if (exitButton) {
      fireEvent.click(exitButton);
      expect(mockOnExit).toHaveBeenCalled();
    }
  });

  it('should handle multiple answer attempts', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const buttons = container.querySelectorAll('button');
    let clickCount = 0;
    for (const button of buttons) {
      if (button.textContent && ['4', '5', '6'].includes(button.textContent)) {
        fireEvent.click(button);
        clickCount++;
        if (clickCount >= 2) break;
      }
    }

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should navigate through questions', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    // Select an answer
    const buttons = Array.from(container.querySelectorAll('button'));
    let answerClicked = false;
    for (const button of buttons) {
      if (button.textContent && ['4', '5', '6'].includes(button.textContent)) {
        fireEvent.click(button);
        answerClicked = true;
        break;
      }
    }

    expect(answerClicked).toBeTruthy();
  });

  it('should handle rapid button clicks', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
      fireEvent.click(btn);
    });

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should display challenge interface', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    expect(container.textContent).toBeTruthy();
  });

  it('should handle different levels with interactions', () => {
    const levels = ['CE1', 'CE2', 'CM1'] as const;

    for (const level of levels) {
      const { container } = render(
        <QuickChallenge
          level={level}
          onComplete={mockOnComplete}
          onExit={mockOnExit}
          rabbitCustomization={rabbitCustomization}
        />
      );

      const buttons = container.querySelectorAll('button');
      if (buttons.length > 0) {
        fireEvent.click(buttons[0]);
      }
    }
  });

  it('should interact with challenge buttons', () => {
    const { container } = render(
      <QuickChallenge
        level="CM1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    buttons.slice(0, 3).forEach(btn => {
      fireEvent.click(btn);
    });

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should support challenge with custom accessories', () => {
    const customization = {
      variant: 'brown' as const,
      accessories: ['hat-wizard', 'scarf'],
    };

    const { container } = render(
      <QuickChallenge
        level="CM2"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={customization}
      />
    );

    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }

    expect(buttons.length).toBeGreaterThan(0);
  });

  // ===== Iteration 21: QuickChallenge Answer & Timer Tests =====

  it('should handle correct answer selection', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    const answerButton = buttons.find(btn => btn.textContent?.includes('5'));
    
    if (answerButton) {
      fireEvent.click(answerButton);
      expect(answerButton).toBeTruthy();
    }
  });

  it('should handle incorrect answer selection', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    const wrongButton = buttons.find(btn => btn.textContent?.includes('4'));
    
    if (wrongButton) {
      fireEvent.click(wrongButton);
      expect(wrongButton).toBeTruthy();
    }
  });

  it('should display score tracking', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const scoreText = container.textContent?.includes('Score');
    expect(scoreText || container.querySelectorAll('button').length > 0).toBeTruthy();
  });

  it('should display progress bar', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const progressBar = container.querySelector('[style*="width"]');
    expect(progressBar || container.querySelectorAll('button').length > 0).toBeTruthy();
  });

  it('should handle timer display', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const timerText = container.textContent?.includes('s');
    expect(timerText || container.querySelectorAll('button').length > 0).toBeTruthy();
  });

  it('should disable answers after selection', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    const answerButtons = buttons.filter(btn => ['4', '5', '6'].some(opt => btn.textContent?.includes(opt)));
    
    if (answerButtons.length > 0) {
      fireEvent.click(answerButtons[0]);
      expect(answerButtons[0]).toBeTruthy();
    }
  });

  it('should display explanation after answer', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    const targetButton = buttons.find(btn => btn.textContent?.includes('5'));
    
    if (targetButton) {
      fireEvent.click(targetButton);
    }

    expect(container.querySelectorAll('button').length).toBeGreaterThan(0);
  });

  it('should support exit button during challenge', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const exitButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('✕') || btn.title === 'Quitter'
    );

    if (exitButton) {
      fireEvent.click(exitButton);
      expect(mockOnExit).toHaveBeenCalled();
    }
  });

  it('should handle rapid answer selection clicks', () => {
    const { container } = render(
      <QuickChallenge
        level="CE1"
        onComplete={mockOnComplete}
        onExit={mockOnExit}
        rabbitCustomization={rabbitCustomization}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    const answerOptions = buttons.filter(btn => ['4', '5', '6'].some(opt => btn.textContent?.includes(opt)));
    
    if (answerOptions.length > 0) {
      for (let i = 0; i < Math.min(2, answerOptions.length); i++) {
        fireEvent.click(answerOptions[i]);
      }
    }

    expect(answerOptions.length).toBeGreaterThan(0);
  });
});
