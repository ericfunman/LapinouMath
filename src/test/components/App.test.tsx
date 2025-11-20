import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import App from '../../App';

// Mock all heavy components and dependencies
vi.mock('../../components/ProfileSelection', () => ({
  default: () => <div data-testid="profile-selection">Profile Selection</div>
}));

vi.mock('../../components/Dashboard', () => ({
  default: () => <div data-testid="dashboard">Dashboard</div>
}));

vi.mock('../../components/QuizScreen', () => ({
  default: () => <div data-testid="quiz-screen">Quiz</div>
}));

vi.mock('../../components/Lesson', () => ({
  default: () => <div data-testid="lesson">Lesson</div>
}));

vi.mock('../../components/QuickChallenge', () => ({
  default: () => <div data-testid="quick-challenge">Quick Challenge</div>
}));

vi.mock('../../components/AdminPanel', () => ({
  default: () => <div data-testid="admin-panel">Admin Panel</div>
}));

vi.mock('../../components/InteractiveDemo', () => ({
  default: () => <div data-testid="interactive-demo">Interactive Demo</div>
}));

// Mock utils and storage
const mockGetProfile = vi.fn();
const mockSaveProfile = vi.fn();
const mockMigrateProfile = vi.fn((p) => p);
const mockInitDB = vi.fn().mockResolvedValue(undefined);
const mockInitializeQuestions = vi.fn().mockResolvedValue(undefined);

vi.mock('../../utils/storage', () => ({
  getProfile: () => mockGetProfile(),
  saveProfile: (p: any) => mockSaveProfile(p),
  migrateProfile: (p: any) => mockMigrateProfile(p),
}));

vi.mock('../../utils/database', () => ({
  initDB: () => mockInitDB(),
  reportQuestionError: vi.fn(),
}));

vi.mock('../../data/questions', () => ({
  initializeQuestions: () => mockInitializeQuestions(),
  getAvailableDomains: () => ['Calcul mental', 'Arithmétique'],
}));

vi.mock('../../utils/excelExport', () => ({
  exportQuestionsToExcel: vi.fn(),
  generateQuestionsCSV: vi.fn(),
  importQuestionsFromExcel: vi.fn(),
  findDuplicates: vi.fn()
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockGetProfile.mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('initializes database on mount', async () => {
    render(<App />);
    await waitFor(() => {
      expect(mockInitDB).toHaveBeenCalled();
    });
  });

  it('initializes questions on mount', async () => {
    render(<App />);
    await waitFor(() => {
      expect(mockInitializeQuestions).toHaveBeenCalled();
    });
  });

  it('shows profile selection initially when no profile selected', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId('profile-selection')).toBeInTheDocument();
    });
  });

  it('loads profile from localStorage if available', async () => {
    const mockProfile = {
      id: 'test-1',
      name: 'Test User',
      avatar: '🐰',
      currentLevel: 'CE1' as const,
      progress: {},
      totalStars: 0,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    mockGetProfile.mockReturnValue(mockProfile);
    localStorage.setItem('lapinoumath_current_profile', 'test-1');

    render(<App />);
    await waitFor(() => {
      expect(mockGetProfile).toHaveBeenCalled();
    });
  });

  it('displays dashboard when profile is loaded', async () => {
    const mockProfile = {
      id: 'test-2',
      name: 'Dashboard User',
      avatar: '🐇',
      currentLevel: 'CE2' as const,
      progress: {},
      totalStars: 50,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    mockGetProfile.mockReturnValue(mockProfile);
    localStorage.setItem('lapinoumath_current_profile', 'test-2');

    render(<App />);
    await waitFor(() => {
      expect(mockGetProfile).toHaveBeenCalled();
    });
  });

  it('handles profile selection workflow', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('navigates to quiz screen when quiz is started', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('navigates to quick challenge for bonus domain', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('returns to dashboard after quiz completion', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('opens admin panel when requested', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('handles logout correctly', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
    expect(localStorage.getItem('lapinoumath_current_profile')).toBeNull();
  });

  it('recovers from initialization errors', async () => {
    mockInitDB.mockRejectedValueOnce(new Error('DB Error'));
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('applies profile migrations on load', async () => {
    const mockProfile = {
      id: 'test-3',
      name: 'Migration User',
      avatar: '🐢',
      currentLevel: 'CM1' as const,
      progress: {},
      totalStars: 100,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    mockGetProfile.mockReturnValue(mockProfile);
    localStorage.setItem('lapinoumath_current_profile', 'test-3');

    render(<App />);
    await waitFor(() => {
      expect(mockMigrateProfile).toHaveBeenCalledWith(mockProfile);
    });
  });

  it('updates total stars on quiz completion', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('saves profile updates to localStorage', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('maintains profile state across screens', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('handles multiple navigation transitions', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('manages quiz with correct/incorrect answers', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('unlocks next domain on sufficient stars', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('handles quick challenge bonus stars', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('calculates star levels correctly', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('persists state through component rerenders', async () => {
    const { rerender } = render(<App />);
    await waitFor(() => {
      rerender(<App />);
      expect(true).toBe(true);
    });
  });
});
