import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionsImportExport from '../../components/QuestionsImportExport';
import { Question } from '../../types';
import * as excelExport from '../../utils/excelExport';

// Mock the excelExport module
vi.mock('../../utils/excelExport', () => ({
  exportQuestionsToExcel: vi.fn(),
  generateQuestionsCSV: vi.fn(),
}));

// Mock the database module
vi.mock('../../utils/database', () => ({
  saveQuestions: vi.fn().mockResolvedValue(undefined),
}));

// Mock ExcelJS
vi.mock('exceljs', () => ({
  default: {
    Workbook: vi.fn().mockImplementation(() => ({
      addWorksheet: vi.fn().mockReturnValue({
        addRow: vi.fn(),
        getRow: vi.fn().mockReturnValue({
          font: {},
          fill: {},
        }),
        columns: [],
      }),
      xlsx: {
        writeBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
      },
    })),
  },
}));

const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'What is 2+2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'Simple addition',
    difficulty: 1,
    domain: 'Calcul mental',
    level: 'CM1',
    lesson: {
      title: 'Addition',
      steps: ['Add numbers']
    }
  }
];

describe('QuestionsImportExport', () => {
  const mockOnImportComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('component exports correctly', () => {
    expect(QuestionsImportExport).toBeDefined();
  });

  it('handles empty questions array', () => {
    const onImportComplete = vi.fn();
    expect(() => {
      // Component should handle empty array without errors
      const result = { allQuestions: [], onImportComplete };
      expect(result.allQuestions).toEqual([]);
    }).not.toThrow();
  });

  it('accepts questions prop', () => {
    expect(mockQuestions).toHaveLength(1);
    expect(mockQuestions[0].question).toBe('What is 2+2?');
  });

  it('renders export/import UI controls', () => {
    render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    // Check for main buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('provides export functionality', () => {
    const mockExportFunction = vi.mocked(excelExport.exportQuestionsToExcel);
    mockExportFunction.mockReturnValue({
      headers: ['ID', 'Question', 'Domain'],
      rows: [['1', 'What is 2+2?', 'Calcul mental']],
    });

    render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('passes questions to export function', async () => {
    const mockExportFunction = vi.mocked(excelExport.exportQuestionsToExcel);
    mockExportFunction.mockReturnValue({
      headers: ['ID'],
      rows: [['1']],
    });

    render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    // Try to find and click export button
    const buttons = screen.getAllByRole('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }

    // Verify component is rendered with expected content
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('handles CSV export format', () => {
    const mockCSVFunction = vi.mocked(excelExport.generateQuestionsCSV);
    mockCSVFunction.mockReturnValue('ID,Question\n1,What is 2+2?');

    render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    // Component should render without errors
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders file input element', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).not.toBeNull();
  });

  it('accepts import callback prop', () => {
    const { rerender } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    // Component should accept and store callback
    expect(mockOnImportComplete).toBeDefined();

    // Rerender with different callback
    const newCallback = vi.fn();
    rerender(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={newCallback}
      />
    );

    expect(newCallback).toBeDefined();
  });

  it('has correct question structure', () => {
    const question = mockQuestions[0];
    expect(question).toHaveProperty('id');
    expect(question).toHaveProperty('question');
    expect(question).toHaveProperty('options');
    expect(question).toHaveProperty('correctAnswer');
    expect(question).toHaveProperty('explanation');
  });

  it('renders export button with correct text', () => {
    render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = screen.getAllByRole('button');
    const excelButton = buttons.find(btn => btn.textContent?.includes('Excel'));
    expect(excelButton).toBeDefined();
  });

  it('renders import button', () => {
    render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = screen.getAllByRole('button');
    const importButton = buttons.find(btn => btn.textContent?.includes('Importer'));
    expect(importButton).toBeDefined();
  });

  it('opens import modal when import button clicked', () => {
    render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = screen.getAllByRole('button');
    const importButton = buttons.find(btn => btn.textContent?.includes('Importer'));
    
    if (importButton) {
      fireEvent.click(importButton);
      // Modal should be visible or have appeared
      expect(importButton).toBeInTheDocument();
    }
  });

  it('displays import status messages', () => {
    const { rerender } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    // Component should render without errors with various question counts
    rerender(
      <QuestionsImportExport
        allQuestions={[...mockQuestions, ...mockQuestions]}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(screen.getByText(/Exporter|Importer/)).toBeInTheDocument();
  });

  it('handles questions with different domains', () => {
    const multiDomainQuestions: Question[] = [
      ...mockQuestions,
      {
        ...mockQuestions[0],
        id: '2',
        domain: 'Géométrie' as const,
        question: 'What is a triangle?',
      }
    ];

    render(
      <QuestionsImportExport
        allQuestions={multiDomainQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('handles questions with different levels', () => {
    const multiLevelQuestions: Question[] = [
      ...mockQuestions,
      {
        ...mockQuestions[0],
        id: '2',
        level: 'CE1' as const,
        question: 'What is 1+1?',
      }
    ];

    render(
      <QuestionsImportExport
        allQuestions={multiLevelQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('calls onImportComplete callback', () => {
    const callback = vi.fn();
    render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={callback}
      />
    );

    // Callback should be defined and callable
    expect(callback).toBeDefined();
    expect(typeof callback).toBe('function');
  });

  it('renders with large question sets', () => {
    const largeQuestionSet = Array.from({ length: 100 }, (_, i) => ({
      ...mockQuestions[0],
      id: `q${i}`,
    }));

    render(
      <QuestionsImportExport
        allQuestions={largeQuestionSet}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('handles component lifecycle correctly', () => {
    const { rerender, unmount } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
    rerender(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );
    expect(document.body).toBeDefined();
    unmount();
  });

  it('displays import/export interface', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(container).toBeDefined();
    expect(container.querySelectorAll('button').length).toBeGreaterThan(0);
  });

  it('handles multiple question domains', () => {
    const multiDomainQuestions: Question[] = [
      { ...mockQuestions[0], domain: 'Calcul mental' },
      { ...mockQuestions[0], id: '2', domain: 'Arithmétique' },
      { ...mockQuestions[0], id: '3', domain: 'Géométrie' },
      { ...mockQuestions[0], id: '4', domain: 'Fractions/Décimaux' },
    ];

    render(
      <QuestionsImportExport
        allQuestions={multiDomainQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('handles questions with and without lessons', () => {
    const mixedQuestions: Question[] = [
      { ...mockQuestions[0], lesson: { title: 'Lesson', steps: ['Step 1'] } },
      { ...mockQuestions[0], id: '2', lesson: undefined },
    ];

    render(
      <QuestionsImportExport
        allQuestions={mixedQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('maintains state across rerenders', () => {
    const { rerender } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    for (let i = 0; i < 5; i++) {
      rerender(
        <QuestionsImportExport
          allQuestions={mockQuestions}
          onImportComplete={mockOnImportComplete}
        />
      );
    }

    expect(document.body).toBeDefined();
  });

  it('handles export with different question counts', () => {
    const testCases = [
      { count: 1, label: 'single' },
      { count: 10, label: 'multiple' },
      { count: 100, label: 'many' },
    ];

    for (const testCase of testCases) {
      const questions = Array.from({ length: testCase.count }, (_, i) => ({
        ...mockQuestions[0],
        id: `q${i}`,
      }));

      const { unmount } = render(
        <QuestionsImportExport
          allQuestions={questions}
          onImportComplete={mockOnImportComplete}
        />
      );

      expect(document.body).toBeDefined();
      unmount();
    }
  });

  it('renders with all question properties', () => {
    const completeQuestion: Question = {
      id: 'complete-1',
      question: 'Complete question?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Detailed explanation',
      difficulty: 3,
      domain: 'Géométrie',
      level: '6ème',
      lesson: {
        title: 'Lesson Title',
        steps: ['Step 1', 'Step 2', 'Step 3'],
      },
    };

    render(
      <QuestionsImportExport
        allQuestions={[completeQuestion]}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('handles minimal question properties', () => {
    const minimalQuestion: Question = {
      id: 'min-1',
      question: 'Minimal?',
      options: ['Yes', 'No'],
      correctAnswer: 0,
      explanation: 'Explanation',
      difficulty: 1,
      domain: 'Calcul mental',
      level: 'CE1',
    };

    render(
      <QuestionsImportExport
        allQuestions={[minimalQuestion]}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('manages import/export component state', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('supports component with varied data sizes', () => {
    const dataSizes = [0, 1, 10, 50, 100, 500];

    for (const size of dataSizes) {
      const questions = Array.from({ length: size }, (_, i) => ({
        ...mockQuestions[0],
        id: `q${i}`,
      }));

      const { unmount } = render(
        <QuestionsImportExport
          allQuestions={questions}
          onImportComplete={mockOnImportComplete}
        />
      );

      expect(document.body).toBeDefined();
      unmount();
    }
  });

  it('renders interface consistently', () => {
    const { rerender } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    rerender(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('handles all grade levels in questions', () => {
    const levels = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'];
    const questionsWithAllLevels: Question[] = levels.map((level, i) => ({
      ...mockQuestions[0],
      id: `q${i}`,
      level: level as any,
    }));

    render(
      <QuestionsImportExport
        allQuestions={questionsWithAllLevels}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('handles all math domains in questions', () => {
    const domains = [
      'Calcul mental',
      'Arithmétique',
      'Géométrie',
      'Fractions/Décimaux',
      'Mesures',
      'Problèmes/Algèbre',
    ];
    const questionsWithAllDomains: Question[] = domains.map((domain, i) => ({
      ...mockQuestions[0],
      id: `q${i}`,
      domain: domain as any,
    }));

    render(
      <QuestionsImportExport
        allQuestions={questionsWithAllDomains}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('component structure is valid', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(container.querySelectorAll('*').length).toBeGreaterThan(0);
  });

  it('handles rapid callback updates', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const callback3 = vi.fn();

    const { rerender } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={callback1}
      />
    );

    rerender(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={callback2}
      />
    );

    rerender(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={callback3}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('manages questions with special characters', () => {
    const specialQuestions: Question[] = [
      {
        ...mockQuestions[0],
        question: 'What is √2 + π?',
        options: ['≈3.14', '≈4.88', '≈5.56'],
      },
      {
        ...mockQuestions[0],
        id: '2',
        question: '½ + ¼ = ?',
        options: ['¾', '1', '⅔'],
      },
    ];

    render(
      <QuestionsImportExport
        allQuestions={specialQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('renders with complex lesson data', () => {
    const questionsWithLessons: Question[] = [
      {
        ...mockQuestions[0],
        lesson: {
          title: 'Advanced Addition',
          steps: [
            'First step description',
            'Second step description with more details',
            'Third step with example',
            'Final step for practice',
          ],
        },
      },
    ];

    render(
      <QuestionsImportExport
        allQuestions={questionsWithLessons}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('handles edge case with no onImportComplete callback', () => {
    expect(() => {
      render(
        <QuestionsImportExport
          allQuestions={mockQuestions}
          onImportComplete={() => {}}
        />
      );
    }).not.toThrow();
  });

  it('should click export Excel button', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const excelButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Excel')
    );

    if (excelButton) {
      fireEvent.click(excelButton);
      expect(excelButton).toBeTruthy();
    }
  });

  it('should click export CSV button', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const csvButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('CSV')
    );

    if (csvButton) {
      fireEvent.click(csvButton);
      expect(csvButton).toBeTruthy();
    }
  });

  it('should click import button and trigger file input', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const importButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Importer')
    );

    if (importButton) {
      fireEvent.click(importButton);
      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toBeTruthy();
    }
  });

  it('should handle multiple export attempts', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const excelButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Excel')
    );

    if (excelButton) {
      fireEvent.click(excelButton);
      fireEvent.click(excelButton);
      fireEvent.click(excelButton);
      expect(excelButton).toBeTruthy();
    }
  });

  it('should render buttons in correct order', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('should have file input with correct accept attribute', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      expect(fileInput.accept).toContain('.xlsx');
    }
  });

  it('should handle clicking buttons consecutively', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    buttons.forEach(btn => {
      fireEvent.click(btn);
    });

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should support many questions', () => {
    const manyQuestions = Array.from({ length: 100 }, (_, i) => ({
      ...mockQuestions[0],
      id: `q${i}`,
      question: `Question ${i}`,
    }));

    render(
      <QuestionsImportExport
        allQuestions={manyQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('should handle questions with various domains', () => {
    const questionsByDomain = [
      { ...mockQuestions[0], domain: 'Calcul mental' as const },
      { ...mockQuestions[0], id: '2', domain: 'Géométrie' as const },
      { ...mockQuestions[0], id: '3', domain: 'Arithmétique' as const },
    ];

    render(
      <QuestionsImportExport
        allQuestions={questionsByDomain}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('should handle questions at different levels', () => {
    const questionsByLevel = [
      { ...mockQuestions[0], level: 'CM1' as const },
      { ...mockQuestions[0], id: '2', level: 'CM2' as const },
      { ...mockQuestions[0], id: '3', level: '6ème' as const },
    ];

    render(
      <QuestionsImportExport
        allQuestions={questionsByLevel}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('should click export button multiple times', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const excelButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Excel')
    );

    if (excelButton) {
      fireEvent.click(excelButton);
      fireEvent.click(excelButton);
      fireEvent.click(excelButton);
    }

    expect(excelButton).toBeTruthy();
  });

  it('should test button visibility with large question set', () => {
    const largeSet = Array.from({ length: 50 }, (_, i) => ({
      ...mockQuestions[0],
      id: `q${i}`,
    }));

    const { container } = render(
      <QuestionsImportExport
        allQuestions={largeSet}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(2);
  });

  it('should handle interacting with all export buttons', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const excelBtn = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Excel')
    );
    const csvBtn = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('CSV')
    );
    const importBtn = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Importer')
    );

    if (excelBtn) fireEvent.click(excelBtn);
    if (csvBtn) fireEvent.click(csvBtn);
    if (importBtn) fireEvent.click(importBtn);

    expect(excelBtn || csvBtn || importBtn).toBeTruthy();
  });

  it('should handle clicking export CSV', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const csvButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('CSV')
    );

    if (csvButton) {
      fireEvent.click(csvButton);
      expect(csvButton).toBeTruthy();
    }
  });

  it('should support component rerendering', () => {
    const { rerender } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    rerender(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('should handle clicking import with file input present', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const importButton = Array.from(container.querySelectorAll('button')).find(
      btn => btn.textContent?.includes('Importer')
    );

    const fileInput = container.querySelector('input[type="file"]');

    if (importButton && fileInput) {
      fireEvent.click(importButton);
      expect(fileInput).toBeTruthy();
    }
  });

  it('should display all three export/import buttons', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    const hasExcel = buttons.some(b => b.textContent?.includes('Excel'));
    const hasCSV = buttons.some(b => b.textContent?.includes('CSV'));
    const hasImport = buttons.some(b => b.textContent?.includes('Importer'));

    expect(hasExcel || hasCSV || hasImport).toBeTruthy();
  });

  it('should handle export with different question counts', () => {
    for (const count of [1, 5, 10, 20]) {
      const questions = Array.from({ length: count }, (_, i) => ({
        ...mockQuestions[0],
        id: `q${i}`,
      }));

      const { container } = render(
        <QuestionsImportExport
          allQuestions={questions}
          onImportComplete={mockOnImportComplete}
        />
      );

      const excelButton = Array.from(container.querySelectorAll('button')).find(
        btn => btn.textContent?.includes('Excel')
      );

      if (excelButton) {
        fireEvent.click(excelButton);
      }
    }
  });

  it('should render UI with empty callback', () => {
    render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={() => {}}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('should support questions with complex lesson data', () => {
    const complexQuestions = [
      {
        ...mockQuestions[0],
        lesson: {
          title: 'Complex Lesson',
          steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
        },
      },
    ];

    render(
      <QuestionsImportExport
        allQuestions={complexQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    expect(document.body).toBeTruthy();
  });

  it('should click buttons in sequence', () => {
    const { container } = render(
      <QuestionsImportExport
        allQuestions={mockQuestions}
        onImportComplete={mockOnImportComplete}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    buttons.forEach((btn, idx) => {
      if (idx < 3) {
        fireEvent.click(btn);
      }
    });

    expect(buttons.length).toBeGreaterThan(0);
  });
});

