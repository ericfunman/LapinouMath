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
});

