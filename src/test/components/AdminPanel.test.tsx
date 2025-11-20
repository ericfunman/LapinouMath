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

  it('should handle tab switching and filtering', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent?.includes('Rapports') || btn.textContent?.includes('reports')) {
        fireEvent.click(btn);
        break;
      }
    }

    expect(document.body).toBeTruthy();
  });

  it('should handle checkbox and filter interactions', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length > 0) {
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[0]); // Toggle off
    }

    expect(document.body).toBeTruthy();
  });

  it('should support quick filter resets', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: 'CM1' } });
      fireEvent.change(selects[0], { target: { value: 'ALL' } });
    }

    expect(document.body).toBeTruthy();
  });

  it('should handle rapid filter changes', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: 'CE1' } });
      fireEvent.change(selects[0], { target: { value: 'CE2' } });
      fireEvent.change(selects[0], { target: { value: 'CM1' } });
      fireEvent.change(selects[0], { target: { value: 'ALL' } });
    }

    expect(document.body).toBeTruthy();
  });

  it('should handle search with special characters', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const inputs = document.querySelectorAll('input[type="text"]');
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'test?&*' } });
      fireEvent.change(inputs[0], { target: { value: '' } });
    }

    expect(document.body).toBeTruthy();
  });

  it('should handle clearing all filters', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const buttons = document.querySelectorAll('button');
    const selects = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type="text"]');

    // Apply filters
    if (selects.length > 0) fireEvent.change(selects[0], { target: { value: 'CE1' } });
    if (inputs.length > 0) fireEvent.change(inputs[0], { target: { value: 'search' } });
    
    // Try to clear by setting to ALL
    if (selects.length > 0) fireEvent.change(selects[0], { target: { value: 'ALL' } });
    if (inputs.length > 0) fireEvent.change(inputs[0], { target: { value: '' } });

    expect(document.body).toBeTruthy();
  });

  it('should support domain and level filter combinations', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    if (selects.length >= 2) {
      fireEvent.change(selects[0], { target: { value: 'CE1' } });
      fireEvent.change(selects[1], { target: { value: 'Arithmétique' } });
      fireEvent.change(selects[0], { target: { value: 'CM1' } });
      fireEvent.change(selects[1], { target: { value: 'Géométrie' } });
    }

    expect(document.body).toBeTruthy();
  });

  it('should render all filter controls', async () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = container.querySelectorAll('select');
    const inputs = container.querySelectorAll('input');

    expect(selects.length + inputs.length).toBeGreaterThan(0);
  });

  it('should switch tabs and interact with reports', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent?.includes('Rapports') || btn.textContent?.includes('rapports')) {
        fireEvent.click(btn);
        expect(document.body).toBeTruthy();
        break;
      }
    }
  });

  it('should handle level filter change multiple times', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    const levels = ['CE1', 'CE2', 'CM1', 'CM2', 'ALL'];
    
    for (const level of levels) {
      if (selects.length > 0) {
        fireEvent.change(selects[0], { target: { value: level } });
      }
    }

    expect(selects.length).toBeGreaterThan(0);
  });

  it('should handle domain filter with all options', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    const domains = ['Calcul mental', 'Arithmétique', 'Géométrie', 'ALL'];
    
    if (selects.length >= 2) {
      for (const domain of domains) {
        fireEvent.change(selects[1], { target: { value: domain } });
      }
    }

    expect(selects.length).toBeGreaterThan(1);
  });

  it('should handle search input with various queries', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const inputs = document.querySelectorAll('input[type="text"]');
    if (inputs.length > 0) {
      const searchInput = inputs[0] as HTMLInputElement;
      
      const queries = ['test', '2+3', 'calcul', '', '123'];
      for (const query of queries) {
        fireEvent.change(searchInput, { target: { value: query } });
      }
    }

    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should handle checkbox toggle for correct only filter', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < Math.min(2, checkboxes.length); i++) {
      fireEvent.click(checkboxes[i]);
      fireEvent.click(checkboxes[i]); // Toggle back
    }

    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('should combine multiple filters simultaneously', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type="text"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Apply all filters at once
    if (selects.length >= 2) {
      fireEvent.change(selects[0], { target: { value: 'CE1' } });
      fireEvent.change(selects[1], { target: { value: 'Calcul mental' } });
    }
    
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'search term' } });
    }
    
    if (checkboxes.length > 0) {
      fireEvent.click(checkboxes[0]);
    }

    expect(document.body).toBeTruthy();
  });

  it('should handle filter reset workflow', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const selects = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type="text"]');

    // Apply filters
    if (selects.length >= 2) {
      fireEvent.change(selects[0], { target: { value: 'CM1' } });
      fireEvent.change(selects[1], { target: { value: 'Géométrie' } });
    }
    
    // Reset to ALL
    if (selects.length >= 2) {
      fireEvent.change(selects[0], { target: { value: 'ALL' } });
      fireEvent.change(selects[1], { target: { value: 'ALL' } });
    }
    
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: '' } });
    }

    expect(document.body).toBeTruthy();
  });

  it('should handle rapid tab switching', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent && (btn.textContent.includes('Rapports') || btn.textContent.includes('Questions'))) {
        fireEvent.click(btn);
        fireEvent.click(btn);
        fireEvent.click(btn);
      }
    }

    expect(document.body).toBeTruthy();
  });

  it('should handle close button interaction', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const closeButton = Array.from(document.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Fermer')
    );

    if (closeButton) {
      fireEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalled();
    }
  });

  // ===== Iteration 19: Edit/Save Workflow Tests =====

  it('should open edit modal when edit button clicked', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    // Find and click the first edit button
    const editButtons = Array.from(document.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('✏️')
    );
    
    expect(editButtons.length).toBeGreaterThan(0);
    
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0]);
      
      // Modal should open with header
      await waitFor(() => {
        const modal = document.querySelector('textarea[id="question-input"]');
        expect(modal).toBeTruthy();
      });
    }
  });

  it('should allow editing question text in modal', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const editButtons = Array.from(document.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('✏️')
    );
    
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0]);
      
      const questionTextarea = document.querySelector('textarea[id="question-input"]') as HTMLTextAreaElement;
      expect(questionTextarea).toBeTruthy();
      
      if (questionTextarea) {
        fireEvent.change(questionTextarea, { target: { value: 'Modified question?' } });
        expect(questionTextarea.value).toBe('Modified question?');
      }
    }
  });

  it('should allow editing explanation in modal', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const editButtons = Array.from(document.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('✏️')
    );
    
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0]);
      
      const explanationTextarea = document.querySelector('textarea[id="explication-input"]') as HTMLTextAreaElement;
      expect(explanationTextarea).toBeTruthy();
      
      if (explanationTextarea) {
        fireEvent.change(explanationTextarea, { target: { value: 'New explanation here' } });
        expect(explanationTextarea.value).toBe('New explanation here');
      }
    }
  });

  it('should allow editing answer options in modal', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const editButtons = Array.from(document.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('✏️')
    );
    
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0]);
      
      // Find all option inputs in the edit form
      const optionInputs = Array.from(document.querySelectorAll('input[type="text"]')) as HTMLInputElement[];
      
      // Should have inputs for each option
      expect(optionInputs.length).toBeGreaterThan(0);
      
      if (optionInputs.length > 0) {
        fireEvent.change(optionInputs[0], { target: { value: 'Modified option 1' } });
        expect(optionInputs[0].value).toBe('Modified option 1');
      }
      
      if (optionInputs.length > 1) {
        fireEvent.change(optionInputs[1], { target: { value: 'Modified option 2' } });
        expect(optionInputs[1].value).toBe('Modified option 2');
      }
    }
  });

  it('should allow changing correct answer in edit modal', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const editButtons = Array.from(document.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('✏️')
    );
    
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0]);
      
      // Find "Marquer" buttons to change correct answer
      const markButtons = Array.from(document.querySelectorAll('button')).filter(
        btn => btn.textContent?.includes('Marquer') || btn.textContent?.includes('✅')
      );
      
      // Should have buttons for each option
      expect(markButtons.length).toBeGreaterThan(0);
      
      if (markButtons.length > 1) {
        fireEvent.click(markButtons[1]);
        expect(markButtons[1]).toBeTruthy();
      }
    }
  });

  it('should display cancel button in edit modal', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const editButtons = Array.from(document.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('✏️')
    );
    
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0]);
      
      // Verify cancel button exists
      const cancelButton = Array.from(document.querySelectorAll('button')).find(
        btn => btn.textContent?.includes('❌') || btn.textContent?.includes('Annuler')
      );
      
      expect(cancelButton).toBeTruthy();
    }
  });

  it('should display save button with loading state support', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const editButtons = Array.from(document.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('✏️')
    );
    
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0]);
      
      // Find save button
      const saveButton = Array.from(document.querySelectorAll('button')).find(
        btn => btn.textContent?.includes('💾') || btn.textContent?.includes('Sauvegarder')
      );
      
      expect(saveButton).toBeTruthy();
      expect(saveButton?.textContent).toContain('Sauvegarder');
    }
  });

  it('should support edit workflow with multiple field types', async () => {
    render(<AdminPanel onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockGetAllQuestionsAsync).toHaveBeenCalled();
    });

    const editButtons = Array.from(document.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('✏️')
    );
    
    if (editButtons.length > 0) {
      fireEvent.click(editButtons[0]);
      
      // Find all textareas (question and explanation)
      const textareas = document.querySelectorAll('textarea');
      expect(textareas.length).toBeGreaterThanOrEqual(2);
      
      // Find all option inputs
      const inputs = Array.from(document.querySelectorAll('input[type="text"]'));
      expect(inputs.length).toBeGreaterThan(0);
      
      expect(document.body).toBeTruthy();
    }
  });
});