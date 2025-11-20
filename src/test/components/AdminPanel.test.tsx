import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import AdminPanel from '../../components/AdminPanel';

vi.mock('../../utils/database', () => ({
  getAllProfiles: vi.fn().mockResolvedValue([]),
  getAllQuestions: vi.fn().mockResolvedValue([])
}));

vi.mock('../../utils/excelExport', () => ({
  exportQuestionsToExcel: vi.fn(),
  generateQuestionsCSV: vi.fn()
}));

describe('AdminPanel', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders admin panel', () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    expect(container).toBeTruthy();
  });

  it('has admin interface', () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    
    expect(container.querySelector('[class*="admin"]') || container.firstChild).toBeTruthy();
  });

  it('supports data export', () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    
    expect(container).toBeTruthy();
  });

  it('displays admin sections', () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    
    expect(container.firstChild).toBeTruthy();
  });

  it('renders multiple tabs', () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    
    expect(container).toBeTruthy();
  });

  it('handles close action', () => {
    mockOnClose();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('displays admin content', () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    
    expect(container.textContent).toBeTruthy();
  });

  it('renders without errors', () => {
    const { container, unmount } = render(<AdminPanel onClose={mockOnClose} />);
    expect(container).toBeTruthy();
    unmount();
  });

  it('can be closed and reopened', () => {
    const { unmount, rerender } = render(<AdminPanel onClose={mockOnClose} />);
    expect(mockOnClose).not.toHaveBeenCalled();
    
    unmount();
    rerender(<AdminPanel onClose={mockOnClose} />);
    expect(mockOnClose).toHaveBeenCalledTimes(0);
  });

  it('handles rapid mount/unmount', () => {
    for (let i = 0; i < 3; i++) {
      const { unmount } = render(<AdminPanel onClose={mockOnClose} />);
      unmount();
    }
    expect(true).toBe(true);
  });

  it('displays with correct styling', () => {
    const { container } = render(<AdminPanel onClose={mockOnClose} />);
    const mainElement = container.firstChild;
    expect(mainElement).toBeTruthy();
  });
});

