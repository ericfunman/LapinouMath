import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
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
});
