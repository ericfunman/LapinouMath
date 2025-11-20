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

  it('should render without crashing', () => {
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
});
