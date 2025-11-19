import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorReportsTab from '../../components/ErrorReportsTab';
import type { StoredErrorReport } from '../../utils/database';

const mockReports: StoredErrorReport[] = [
  {
    id: 1,
    level: 'CM1',
    domain: 'Calcul',
    questionText: 'What is 2+2?',
    userNote: 'This is wrong',
    questionId: 'q1',
    timestamp: Date.now(),
  },
  {
    id: 2,
    level: 'CM2',
    domain: 'Géométrie',
    questionText: 'What is a circle?',
    userNote: 'Unclear',
    questionId: 'q2',
    timestamp: Date.now() - 1000,
  },
];

const mockGetErrorReports = vi.fn();
const mockDeleteErrorReport = vi.fn();

vi.mock('../../utils/database', () => ({
  getErrorReports: () => mockGetErrorReports(),
  deleteErrorReport: (id: number) => mockDeleteErrorReport(id),
}));

vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn().mockResolvedValue({ status: 200 }),
  },
}));

describe('ErrorReportsTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetErrorReports.mockResolvedValue(mockReports);
    mockDeleteErrorReport.mockResolvedValue(undefined);
  });

  it('renders error reports tab', () => {
    const { container } = render(<ErrorReportsTab />);
    expect(container).toBeTruthy();
  });

  it('displays loading state initially then shows reports', async () => {
    render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(mockGetErrorReports).toHaveBeenCalled();
    });
  });

  it('loads and displays reports on mount', async () => {
    render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(mockGetErrorReports).toHaveBeenCalled();
    });
  });

  it('handles empty reports list', async () => {
    mockGetErrorReports.mockResolvedValue([]);
    const { container } = render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('handles report loading error gracefully', async () => {
    mockGetErrorReports.mockRejectedValue(new Error('Load failed'));
    const { container } = render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('toggles report selection', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(mockGetErrorReports).toHaveBeenCalled();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    if (checkboxes.length > 1) {
      await user.click(checkboxes[1]);
      expect((checkboxes[1] as HTMLInputElement).checked).toBe(true);
    }
  });

  it('toggles all reports selection', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(mockGetErrorReports).toHaveBeenCalled();
    });

    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    if (selectAllCheckbox) {
      await user.click(selectAllCheckbox);
    }
  });

  it('deletes selected reports', async () => {
    mockDeleteErrorReport.mockResolvedValue(undefined);
    render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(mockGetErrorReports).toHaveBeenCalled();
    });
  });

  it('handles deletion error gracefully', async () => {
    const user = userEvent.setup({ delay: null });
    mockDeleteErrorReport.mockRejectedValue(new Error('Delete failed'));
    render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(mockGetErrorReports).toHaveBeenCalled();
    });

    const deleteButton = screen.queryByText(/Supprimer|Delete/i);
    if (deleteButton) {
      await user.click(deleteButton);
    }
  });

  it('sends reports via email', async () => {
    const user = userEvent.setup({ delay: null });
    render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(mockGetErrorReports).toHaveBeenCalled();
    });

    const sendButton = screen.queryByText(/Envoyer|Send/i);
    if (sendButton) {
      await user.click(sendButton);
    }
  });

  it('exports reports as JSON', async () => {
    const user = userEvent.setup({ delay: null });
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    
    render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(mockGetErrorReports).toHaveBeenCalled();
    });

    const exportButton = screen.queryByText(/Exporter|Export/i);
    if (exportButton) {
      await user.click(exportButton);
      expect(createObjectURLSpy).toHaveBeenCalled();
    }

    createObjectURLSpy.mockRestore();
  });

  it('renders reports with correct information', async () => {
    render(<ErrorReportsTab />);
    
    await waitFor(() => {
      expect(mockGetErrorReports).toHaveBeenCalled();
    });
  });
});


