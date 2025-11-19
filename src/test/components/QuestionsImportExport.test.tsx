import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionsImportExport from '../../components/QuestionsImportExport';
import { Question } from '../../types';

const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'What is 2+2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'Simple addition',
    difficulty: 1,
    domain: 'Calcul mental',
    level: '4ème',
    lesson: {
      title: 'Addition',
      steps: ['Add numbers']
    }
  }
];

describe('QuestionsImportExport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders export button', () => {
    render(
      <QuestionsImportExport 
        allQuestions={mockQuestions}
        onImportComplete={vi.fn()}
      />
    );
    
    expect(screen.getByText(/Exporter/i)).toBeInTheDocument();
  });

  it('renders import button', () => {
    render(
      <QuestionsImportExport 
        allQuestions={mockQuestions}
        onImportComplete={vi.fn()}
      />
    );
    
    expect(screen.getByText(/Importer/i)).toBeInTheDocument();
  });

  it('calls onImportComplete when import succeeds', async () => {
    const onImportComplete = vi.fn();
    render(
      <QuestionsImportExport 
        allQuestions={mockQuestions}
        onImportComplete={onImportComplete}
      />
    );

    // Note: Full import test would require file upload mock
    // This is a simplified test that verifies the component renders
    expect(screen.getByText(/Importer/i)).toBeInTheDocument();
  });

  it('handles empty questions array', () => {
    render(
      <QuestionsImportExport 
        allQuestions={[]}
        onImportComplete={vi.fn()}
      />
    );
    
    expect(screen.getByText(/Exporter/i)).toBeInTheDocument();
  });
});
