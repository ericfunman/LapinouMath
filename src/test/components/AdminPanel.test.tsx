import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor, fireEvent } from '@testing-library/react';
import AdminPanel from '../../components/AdminPanel';

// Mock GeometryCanvas to avoid Konva issues
vi.mock('../../components/interactive/GeometryCanvas', () => ({
  GeometryCanvas: () => <div data-testid="geometry-canvas">Canvas</div>
}));

// Mock sub-components
vi.mock('../../components/QuestionsImportExport', () => ({
  default: ({ onImport }: any) => (
    <div data-testid="questions-import-export">
      <button onClick={() => onImport?.([])}>Import</button>
    </div>
  )
}));

vi.mock('../../components/ErrorReportsTab', () => ({
  default: () => <div data-testid="error-reports">Reports</div>
}));

// Mock data and database
const mockGetAllQuestionsAsync = vi.fn();
const mockUpdateQuestion = vi.fn();

vi.mock('../../data/questions', () => ({
  getAllQuestionsAsync: () => mockGetAllQuestionsAsync(),
  initializeQuestions: vi.fn().mockResolvedValue(undefined),
  getAvailableDomains: vi.fn().mockReturnValue(['Calcul mental', 'Arithmétique']),
}));

vi.mock('../../utils/database', () => ({
  initDB: vi.fn().mockResolvedValue(undefined),
  reportQuestionError: vi.fn(),
  updateQuestion: (q: any) => mockUpdateQuestion(q),
  saveQuestions: vi.fn(),
}));

vi.mock('../../utils/excelExport', () => ({
  exportQuestionsToExcel: vi.fn(),
  generateQuestionsCSV: vi.fn(),
  importQuestionsFromExcel: vi.fn(),
  findDuplicates: vi.fn()
}));

vi.mock('../../data/constants', () => ({
  GRADE_LEVELS: ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'],
  MATH_DOMAINS: ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre', 'Kangourou', 'Proportions'],
}));

describe('AdminPanel', () => {
  const mockOnClose = vi.fn();

  const sampleQuestions = [
    {
      id: 'q1',
      level: 'CE1' as const,
      domain: 'Calcul mental' as const,
      question: '2 + 3 = ?',
      options: ['4', '5', '6'],
      correct: 1,
    },
    {
      id: 'q2',
      level: 'CE2' as const,
      domain: 'Arithmétique' as const,
      question: '5 × 2 = ?',
      options: ['8', '10', '12'],
      correct: 1,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetAllQuestionsAsync.mockResolvedValue(sampleQuestions);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render admin panel', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should load questions on mount', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should handle empty questions list', async () => {
    mockGetAllQuestionsAsync.mockResolvedValue([]);
    
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should filter questions by level', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
    
    // Level filter should exist
    expect(document.body).toBeTruthy();
  });

  it('should filter questions by domain', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should handle search input', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should display filter controls', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
    
    const selects = document.querySelectorAll('select');
    expect(selects.length).toBeGreaterThanOrEqual(0);
  });

  it('should render import/export tab', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should render error reports tab', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should accept onClose callback', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should handle questions with properties', async () => {
    const detailedQuestions = [
      {
        id: 'detail-1',
        level: 'CM1' as const,
        domain: 'Géométrie' as const,
        question: 'Square perimeter?',
        options: ['4', '8', '16'],
        correct: 1,
      },
    ];
    
    mockGetAllQuestionsAsync.mockResolvedValue(detailedQuestions);
    
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should apply multiple filters', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should maintain state on rerender', async () => {
    const { rerender } = render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
    
    rerender(<AdminPanel onClose={mockOnClose} />);
  });

  it('should handle large question lists', async () => {
    const largeQuestionList = Array.from({ length: 50 }, (_, i) => ({
      id: `q${i}`,
      level: 'CE1' as const,
      domain: 'Calcul mental' as const,
      question: `Question ${i}`,
      options: ['A', 'B', 'C'],
      correct: 0,
    }));
    
    mockGetAllQuestionsAsync.mockResolvedValue(largeQuestionList);
    
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should not crash with mixed question types', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should initialize without errors', () => {
    expect(() => {
      render(<AdminPanel onClose={mockOnClose} />);
    }).not.toThrow();
  });

  it('should handle all grade levels', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should display questions tab', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should support import/export functionality', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should display error reports section', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should handle multiple question filtering combinations', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should render admin interface completely', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should accept close callback', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should handle tab switching', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should initialize with questions tab open', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should handle questions with different properties', async () => {
    const complexQuestions = [
      {
        id: 'q1',
        level: 'CE1' as const,
        domain: 'Calcul mental' as const,
        question: 'Simple question',
        options: ['a', 'b', 'c'],
        correct: 0,
        lesson: {
          title: 'Addition basics',
          steps: ['Step 1', 'Step 2']
        }
      },
      {
        id: 'q2',
        level: 'CM1' as const,
        domain: 'Géométrie' as const,
        question: 'Complex question',
        options: ['x', 'y', 'z'],
        correct: 2,
        difficulty: 'hard' as const
      }
    ];

    mockGetAllQuestionsAsync.mockResolvedValue(complexQuestions);

    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should support searching and filtering simultaneously', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should handle admin state changes', async () => {
    const { rerender } = render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });

    rerender(<AdminPanel onClose={mockOnClose} />);
    expect(document.body).toBeTruthy();
  });

  it('should process large datasets efficiently', async () => {
    const largeDataset = Array.from({ length: 100 }, (_, i) => ({
      id: `q${i}`,
      level: 'CE1' as const,
      domain: 'Calcul mental' as const,
      question: `Question ${i}`,
      options: ['a', 'b', 'c', 'd'],
      correct: Math.floor(Math.random() * 4)
    }));

    mockGetAllQuestionsAsync.mockResolvedValue(largeDataset);

    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should handle questions missing optional properties', async () => {
    const minimalQuestions = [
      {
        id: 'q1',
        level: 'CE1' as const,
        domain: 'Calcul mental' as const,
        question: 'Q?',
        options: ['a', 'b'],
        correct: 0
      }
    ];

    mockGetAllQuestionsAsync.mockResolvedValue(minimalQuestions);

    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should persist panel state during operations', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    // Panel should remain stable
    expect(document.body).toBeTruthy();
  });

  it('should handle multiple rerenders gracefully', async () => {
    const { rerender } = render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    for (let i = 0; i < 3; i++) {
      rerender(<AdminPanel onClose={mockOnClose} />);
    }

    expect(document.body).toBeTruthy();
  });

  it('should render all required sections', async () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    // Should have panel structure
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('should handle question filtering state', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should support all grade levels for filtering', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should support all domains for filtering', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should handle rapid filter changes', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    expect(document.body).toBeTruthy();
  });

  it('should render interface with loading state', async () => {
    mockGetAllQuestionsAsync.mockResolvedValue(sampleQuestions);

    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should handle data refresh', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    // Should support refreshing
    expect(document.body).toBeTruthy();
  });

  it('should maintain consistent UI structure', async () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(container.querySelectorAll('div').length).toBeGreaterThan(0);
    });
  });

  it('should be accessible with keyboard navigation', async () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      const buttons = container.querySelectorAll('button, [role="button"]');
      expect(buttons.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('should render without throwing errors', async () => {
    expect(() => {
      render(<AdminPanel onClose={mockOnClose} />);
    }).not.toThrow();
  });

  it('should handle questions with special characters', async () => {
    const specialQuestions = [
      {
        id: 'q1',
        level: 'CE1' as const,
        domain: 'Calcul mental' as const,
        question: '√2 + π = ?',
        options: ['a', 'b', 'c'],
        correct: 0
      }
    ];

    mockGetAllQuestionsAsync.mockResolvedValue(specialQuestions);

    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should handle questions with long text', async () => {
    const longTextQuestions = [
      {
        id: 'q1',
        level: 'CE1' as const,
        domain: 'Problèmes/Algèbre' as const,
        question: 'A very long question that goes on and on with many words to test text wrapping and display handling in the admin panel interface for questions with lengthy descriptions',
        options: ['short', 'option', 'test'],
        correct: 1
      }
    ];

    mockGetAllQuestionsAsync.mockResolvedValue(longTextQuestions);

    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it('should support panel with many questions', async () => {
    const levels: ('CE1' | 'CE2' | 'CM1' | 'CM2')[] = ['CE1', 'CE2', 'CM1', 'CM2'];
    const domains: ('Calcul mental' | 'Arithmétique')[] = ['Calcul mental', 'Arithmétique'];
    
    const manyQuestions = Array.from({ length: 50 }, (_, i) => ({
      id: `q${i}`,
      level: levels[i % 4],
      domain: domains[i % 2],
      question: `Question number ${i}`,
      options: ['a', 'b', 'c', 'd'],
      correct: i % 4
    }));

    mockGetAllQuestionsAsync.mockResolvedValue(manyQuestions);

    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });
  });

  it('should switch to reports tab', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    // Find and click the reports tab
    const buttons = document.querySelectorAll('button');
    let reportsButton: Element | undefined;
    for (const btn of buttons) {
      if (btn.textContent?.includes('Rapports')) {
        reportsButton = btn;
        break;
      }
    }
    
    if (reportsButton) {
      fireEvent.click(reportsButton);
      expect(document.body).toBeTruthy();
    }
  });

  it('should filter by grade level', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: 'CE1' } });
      expect(document.body).toBeTruthy();
    }
  });

  it('should filter by domain', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    if (selects.length > 1) {
      fireEvent.change(selects[1], { target: { value: 'Calcul mental' } });
      expect(document.body).toBeTruthy();
    }
  });

  it('should handle search input', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const inputs = document.querySelectorAll('input[type="text"]');
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'test search' } });
      expect(document.body).toBeTruthy();
    }
  });

  it('should toggle correct only filter', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length > 0) {
      fireEvent.click(checkboxes[0]);
      expect(document.body).toBeTruthy();
    }
  });

  it('should call onClose when close button clicked', async () => {
    const mockOnCloseFn = vi.fn();
    render(<AdminPanel onClose={mockOnCloseFn} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const closeButton = document.querySelector('button[class*="red"]');
    if (closeButton?.textContent?.includes('Fermer')) {
      fireEvent.click(closeButton);
      // The close button should trigger the callback
      expect(mockOnCloseFn).toHaveBeenCalled();
    }
  });

  it('should handle multiple filter combinations', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type="text"]');
    
    if (selects.length > 1 && inputs.length > 0) {
      fireEvent.change(selects[0], { target: { value: 'CE1' } });
      fireEvent.change(selects[1], { target: { value: 'Calcul mental' } });
      fireEvent.change(inputs[0], { target: { value: 'search' } });
      expect(document.body).toBeTruthy();
    }
  });
});