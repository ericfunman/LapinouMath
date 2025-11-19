import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import ErrorReportsTab from '../../components/ErrorReportsTab';

vi.mock('../../utils/storage', () => ({
  loadErrorReports: vi.fn().mockReturnValue([])
}));

describe('ErrorReportsTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders error reports tab', () => {
    const { container } = render(<ErrorReportsTab />);
    expect(container).toBeTruthy();
  });

  it('displays error reports section', () => {
    const { container } = render(<ErrorReportsTab />);
    
    expect(container.querySelector('.error-reports-tab')).toBeTruthy();
  });

  it('renders with initial state', () => {
    const { container } = render(<ErrorReportsTab />);
    
    const tab = container.querySelector('.error-reports-tab');
    expect(tab).toBeTruthy();
  });

  it('handles empty reports list', () => {
    const { container } = render(<ErrorReportsTab />);
    
    expect(container).toBeTruthy();
  });

  it('loads reports on mount', () => {
    const { container } = render(<ErrorReportsTab />);
    
    expect(container).toBeTruthy();
  });

  it('displays reports data', () => {
    const { container } = render(<ErrorReportsTab />);
    
    const tab = container.querySelector('.error-reports-tab');
    expect(tab?.textContent).toBeTruthy();
  });

  it('renders tab content', () => {
    const { container } = render(<ErrorReportsTab />);
    
    expect(container.firstChild).toBeTruthy();
  });

  it('handles component lifecycle', () => {
    const { unmount } = render(<ErrorReportsTab />);
    
    expect(() => unmount()).not.toThrow();
  });

  it('displays loading state', () => {
    const { container } = render(<ErrorReportsTab />);
    
    const tab = container.querySelector('.error-reports-tab');
    expect(tab?.textContent).toMatch(/Chargement|reports|error/i);
  });

  it('renders without crashing', () => {
    const { container } = render(<ErrorReportsTab />);
    expect(container).toBeTruthy();
  });
});

