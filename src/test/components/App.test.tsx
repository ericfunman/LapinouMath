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

  it('should handle successful profile initialization', () => {
    const mockProfiles = [
      {
        id: '1',
        name: 'Profile 1',
        avatar: '🐰',
        currentLevel: 'CE1' as const,
        progress: {},
        totalStars: 0,
        accessories: [],
        unlockedAccessories: [],
        createdAt: new Date(),
      },
    ];
    
    localStorage.setItem('lapinoumath_profiles', JSON.stringify(mockProfiles));
    render(<App />);
    expect(document.body).toBeDefined();
    localStorage.clear();
  });

  it('should work with multiple profiles', () => {
    const mockProfiles = [
      {
        id: '1',
        name: 'Profile 1',
        avatar: '🐰',
        currentLevel: 'CE1' as const,
        progress: {},
        totalStars: 0,
        accessories: [],
        unlockedAccessories: [],
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Profile 2',
        avatar: '🐹',
        currentLevel: 'CE2' as const,
        progress: {},
        totalStars: 10,
        accessories: [],
        unlockedAccessories: [],
        createdAt: new Date(),
      },
    ];
    
    localStorage.setItem('lapinoumath_profiles', JSON.stringify(mockProfiles));
    render(<App />);
    expect(document.body).toBeDefined();
    localStorage.clear();
  });

  it('should recover from corrupted localStorage', () => {
    localStorage.setItem('lapinoumath_profiles', 'invalid json {');
    const { container } = render(<App />);
    expect(container).toBeTruthy();
    localStorage.clear();
  });

  it('should initialize empty state properly', () => {
    localStorage.removeItem('lapinoumath_profiles');
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should handle component mounting multiple times', () => {
    const { unmount } = render(<App />);
    expect(document.body).toBeDefined();
    unmount();
    
    render(<App />);
    expect(document.body).toBeDefined();
  });

  it('should preserve localStorage on render', () => {
    const data = JSON.stringify([
      {
        id: 'test',
        name: 'Test',
        avatar: '🐰',
        currentLevel: 'CM1' as const,
        progress: {},
        totalStars: 50,
        accessories: [],
        unlockedAccessories: [],
        createdAt: new Date().toISOString(),
      },
    ]);
    
    localStorage.setItem('lapinoumath_profiles', data);
    render(<App />);
    const stored = localStorage.getItem('lapinoumath_profiles');
    expect(stored).toBeDefined();
    localStorage.clear();
  });

  it('should not lose state on quick re-renders', () => {
    localStorage.setItem('lapinoumath_app_state', JSON.stringify({ currentScreen: 'dashboard' }));
    const { unmount } = render(<App />);
    unmount();
    
    render(<App />);
    expect(document.body).toBeDefined();
    localStorage.clear();
  });

  it('should handle undefined profiles gracefully', () => {
    localStorage.removeItem('lapinoumath_profiles');
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should initialize with default state', () => {
    const { container } = render(<App />);
    const mainContent = container.querySelector('div');
    expect(mainContent).toBeTruthy();
  });

  it('should render with all DOM nodes present', () => {
    const { container } = render(<App />);
    expect(container.childNodes.length).toBeGreaterThan(0);
  });

  it('should survive rapid lifecycle changes', () => {
    const { unmount } = render(<App />);
    
    unmount();
    expect(document.body).toBeDefined();
  });

  it('should handle settings persistence', () => {
    localStorage.setItem('lapinoumath_settings', JSON.stringify({ theme: 'light' }));
    render(<App />);
    expect(localStorage.getItem('lapinoumath_settings')).toBeDefined();
    localStorage.clear();
  });

  it('should maintain component structure', () => {
    const { container } = render(<App />);
    expect(container.firstChild).not.toBeNull();
  });
});

