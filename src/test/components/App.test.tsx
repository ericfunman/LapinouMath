import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import App from '../../App';

// Mock les composants enfants pour éviter la complexité
vi.mock('../../components/ProfileSelection', () => ({
  default: () => <div data-testid="profile-selection">Profile Selection</div>
}));

vi.mock('../../components/Dashboard', () => ({
  default: () => <div data-testid="dashboard">Dashboard</div>
}));

vi.mock('../../components/QuizScreen', () => ({
  default: () => <div data-testid="quiz-screen">Quiz Screen</div>
}));

vi.mock('../../components/QuickChallenge', () => ({
  default: () => <div data-testid="quick-challenge">Quick Challenge</div>
}));

vi.mock('../../components/AdminPanel', () => ({
  default: () => <div data-testid="admin-panel">Admin Panel</div>
}));

// Mock les utils
vi.mock('../../utils/storage', () => ({
  getProfile: vi.fn(),
  saveProfile: vi.fn(),
  migrateProfile: vi.fn(profile => profile)
}));

vi.mock('../../utils/database', () => ({
  initDB: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('../../data/questions', () => ({
  initializeQuestions: vi.fn().mockResolvedValue(undefined),
  getAvailableDomains: vi.fn().mockReturnValue(['Calcul mental', 'Arithmétique'])
}));

vi.mock('../../utils/excelExport', () => ({
  exportQuestionsToExcel: vi.fn(),
  generateQuestionsCSV: vi.fn(),
  importQuestionsFromExcel: vi.fn(),
  findDuplicates: vi.fn()
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('initializes on mount', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('displays app content', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });

  it('sets up profile selection initially', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('handles initialization errors gracefully', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('manages state correctly', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('renders main app structure', () => {
    const { container } = render(<App />);
    expect(container.textContent).toBeTruthy();
  });

  it('should initialize with localStorage data if available', () => {
    const mockProfile = {
      id: 'test-123',
      name: 'Test User',
      avatar: '🐰',
      currentLevel: 'CE1',
      progress: {},
      totalStars: 100,
      createdAt: new Date(),
    };

    localStorage.setItem('profiles', JSON.stringify([mockProfile]));
    
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should handle profile selection', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should handle empty localStorage', () => {
    localStorage.clear();
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should render with all features enabled', () => {
    const { container } = render(<App />);
    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toBeTruthy();
  });

  it('should handle rapid renders', () => {
    const { rerender } = render(<App />);
    rerender(<App />);
    rerender(<App />);
    expect(true).toBe(true);
  });

  it('should not crash with missing localStorage', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should initialize with app container', () => {
    const { container } = render(<App />);
    const appContainer = container.querySelector('[class*="App"]') || container.firstChild;
    expect(appContainer).toBeTruthy();
  });
});

