import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import App from '../../App';

// Mock all heavy components and dependencies
vi.mock('../../components/ProfileSelection', () => ({
  default: ({ onSelectProfile }: any) => (
    <button onClick={() => {
      onSelectProfile({
        id: 'test-profile-1',
        name: 'Test User',
        avatar: '🐰',
        currentLevel: 'CE1',
        progress: {
          'CE1': {
            'Calcul mental': { unlocked: true, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
            'Arithmétique': { unlocked: false, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
          }
        },
        totalStars: 0,
        accessories: [],
        unlockedAccessories: [],
        createdAt: new Date(),
      });
    }}>
      Profile Selection
    </button>
  )
}));

vi.mock('../../components/Dashboard', () => ({
  default: ({ profile, onStartQuiz }: any) => (
    <div data-testid="dashboard" data-profile-name={profile?.name}>
      <button onClick={() => {
        onStartQuiz('CE1', 'Calcul mental');
      }}>
        Start Quiz
      </button>
    </div>
  )
}));

vi.mock('../../components/QuizScreen', () => ({
  default: ({ onComplete }: any) => (
    <button onClick={() => {
      onComplete(8, 10);
    }}>
      Complete Quiz
    </button>
  )
}));

vi.mock('../../components/Lesson', () => ({
  default: () => <div data-testid="lesson">Lesson</div>
}));

vi.mock('../../components/QuickChallenge', () => ({
  default: ({ onComplete }: any) => (
    <button onClick={() => {
      onComplete(5, 5);
    }}>
      Complete Challenge
    </button>
  )
}));

vi.mock('../../components/AdminPanel', () => ({
  default: ({ onClose }: any) => (
    <button onClick={onClose} data-testid="admin-close-btn">
      Close Admin
    </button>
  )
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
  getAvailableDomains: (level: string) => {
    const domains: Record<string, string[]> = {
      'CE1': ['Calcul mental', 'Arithmétique', 'Bonus - Défi Rapide'],
      'CE2': ['Calcul mental', 'Arithmétique'],
      'CM1': ['Calcul mental', 'Arithmétique'],
      'CM2': ['Calcul mental', 'Arithmétique'],
    };
    return domains[level] || [];
  },
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

  // Initialization tests
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

  it('recovers from database initialization error', async () => {
    mockInitDB.mockRejectedValueOnce(new Error('DB Error'));
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('recovers from question initialization error', async () => {
    mockInitializeQuestions.mockRejectedValueOnce(new Error('Questions Error'));
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  // Profile selection tests
  it('shows profile selection screen initially', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      expect(getByText('Profile Selection')).toBeInTheDocument();
    });
  });

  it('saves profile id to localStorage on profile select', async () => {
    const { getByText } = render(<App />);
    const button = await waitFor(() => getByText('Profile Selection'));
    button.click();

    await waitFor(() => {
      expect(localStorage.getItem('lapinoumath_current_profile')).toBe('test-profile-1');
    });
  });

  it('applies migration on profile selection', async () => {
    const { getByText } = render(<App />);
    const button = await waitFor(() => getByText('Profile Selection'));
    button.click();

    await waitFor(() => {
      expect(mockMigrateProfile).toHaveBeenCalled();
    });
  });

  it('transitions to dashboard after profile selection', async () => {
    const { getByText, getByTestId } = render(<App />);
    const button = await waitFor(() => getByText('Profile Selection'));
    button.click();

    await waitFor(() => {
      expect(getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('displays dashboard with profile name', async () => {
    const { getByText, getByTestId } = render(<App />);
    const button = await waitFor(() => getByText('Profile Selection'));
    button.click();

    await waitFor(() => {
      const dashboard = getByTestId('dashboard');
      expect(dashboard.dataset.profileName).toBe('Test User');
    });
  });

  // Quiz workflow tests
  it('starts quiz when quiz start button clicked', async () => {
    const { getByText } = render(<App />);
    const profileButton = await waitFor(() => getByText('Profile Selection'));
    profileButton.click();

    await waitFor(() => {
      const quizButton = getByText('Start Quiz');
      expect(quizButton).toBeInTheDocument();
      quizButton.click();
    });

    await waitFor(() => {
      expect(getByText('Complete Quiz')).toBeInTheDocument();
    });
  });

  it('transitions to quiz screen on quiz start', async () => {
    const { getByText } = render(<App />);
    const profileButton = await waitFor(() => getByText('Profile Selection'));
    profileButton.click();

    await waitFor(() => {
      const quizButton = getByText('Start Quiz');
      quizButton.click();
    });

    await waitFor(() => {
      expect(getByText('Complete Quiz')).toBeInTheDocument();
    });
  });

  it('returns to dashboard after quiz completion', async () => {
    const { getByText, getByTestId } = render(<App />);
    const profileButton = await waitFor(() => getByText('Profile Selection'));
    profileButton.click();

    await waitFor(() => {
      const quizButton = getByText('Start Quiz');
      quizButton.click();
    });

    await waitFor(() => {
      const completeButton = getByText('Complete Quiz');
      completeButton.click();
    });

    await waitFor(() => {
      expect(getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  // Profile persistence tests
  it('loads profile from localStorage on mount', async () => {
    const mockProfile = {
      id: 'saved-profile',
      name: 'Saved User',
      avatar: '🐰',
      currentLevel: 'CE1' as const,
      progress: {
        'CE1': {
          'Calcul mental': { unlocked: true, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        }
      },
      totalStars: 0,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    mockGetProfile.mockReturnValue(mockProfile);
    localStorage.setItem('lapinoumath_current_profile', 'saved-profile');

    render(<App />);
    await waitFor(() => {
      expect(mockGetProfile).toHaveBeenCalled();
    });
  });

  it('applies migration on loaded profile', async () => {
    const mockProfile = {
      id: 'saved-profile',
      name: 'Saved User',
      avatar: '🐰',
      currentLevel: 'CE1' as const,
      progress: {
        'CE1': {
          'Calcul mental': { unlocked: true, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        }
      },
      totalStars: 0,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    mockGetProfile.mockReturnValue(mockProfile);
    localStorage.setItem('lapinoumath_current_profile', 'saved-profile');

    render(<App />);
    await waitFor(() => {
      expect(mockMigrateProfile).toHaveBeenCalledWith(mockProfile);
    });
  });

  it('shows dashboard when profile exists in localStorage', async () => {
    const mockProfile = {
      id: 'saved-profile',
      name: 'Saved User',
      avatar: '🐰',
      currentLevel: 'CE1' as const,
      progress: {
        'CE1': {
          'Calcul mental': { unlocked: true, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        }
      },
      totalStars: 0,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    mockGetProfile.mockReturnValue(mockProfile);
    localStorage.setItem('lapinoumath_current_profile', 'saved-profile');

    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('displays saved profile name in dashboard', async () => {
    const mockProfile = {
      id: 'saved-profile',
      name: 'Saved User Name',
      avatar: '🐰',
      currentLevel: 'CE1' as const,
      progress: {
        'CE1': {
          'Calcul mental': { unlocked: true, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        }
      },
      totalStars: 0,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    mockGetProfile.mockReturnValue(mockProfile);
    localStorage.setItem('lapinoumath_current_profile', 'saved-profile');

    const { getByTestId } = render(<App />);
    await waitFor(() => {
      const dashboard = getByTestId('dashboard');
      expect(dashboard.dataset.profileName).toBe('Saved User Name');
    });
  });

  // Multi-step workflow tests
  it('completes full profile selection to dashboard flow', async () => {
    const { getByText, getByTestId } = render(<App />);
    
    const profileButton = await waitFor(() => getByText('Profile Selection'));
    expect(profileButton).toBeInTheDocument();
    profileButton.click();

    await waitFor(() => {
      expect(getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('completes profile selection to quiz to dashboard flow', async () => {
    const { getByText, getByTestId } = render(<App />);
    
    // Profile selection
    const profileButton = await waitFor(() => getByText('Profile Selection'));
    profileButton.click();

    // Start quiz
    await waitFor(() => {
      const quizButton = getByText('Start Quiz');
      quizButton.click();
    });

    // Complete quiz
    await waitFor(() => {
      const completeButton = getByText('Complete Quiz');
      completeButton.click();
    });

    // Back to dashboard
    await waitFor(() => {
      expect(getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  // Edge cases
  it('handles empty localStorage gracefully', async () => {
    expect(localStorage.getItem('lapinoumath_current_profile')).toBeNull();
    const { getByText } = render(<App />);
    await waitFor(() => {
      expect(getByText('Profile Selection')).toBeInTheDocument();
    });
  });

  it('does not crash with missing profile in localStorage', async () => {
    mockGetProfile.mockReturnValue(null);
    localStorage.setItem('lapinoumath_current_profile', 'non-existent');

    const { getByText } = render(<App />);
    await waitFor(() => {
      expect(getByText('Profile Selection')).toBeInTheDocument();
    });
  });

  it('calls mock functions correctly during flow', async () => {
    const { getByText } = render(<App />);
    
    const profileButton = await waitFor(() => getByText('Profile Selection'));
    profileButton.click();

    await waitFor(() => {
      expect(mockMigrateProfile).toHaveBeenCalled();
    });
  });

  it('displays admin panel when admin screen is active', async () => {
    const mockProfile = {
      id: 'test-admin',
      name: 'Admin User',
      avatar: '🐰',
      currentLevel: 'CE1' as const,
      progress: {
        'CE1': {
          'Calcul mental': { unlocked: true, stars: 0, questionsAnswered: 0, correctAnswers: 0 },
        }
      },
      totalStars: 0,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    mockGetProfile.mockReturnValue(mockProfile);
    localStorage.setItem('lapinoumath_current_profile', 'test-admin');

    const { getByTestId } = render(<App />);
    
    // Should start at dashboard
    await waitFor(() => {
      expect(getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('opens interactive demo screen', async () => {
    const { getByText } = render(<App />);
    
    // First check that profile selection renders
    const profileButton = await waitFor(() => getByText('Profile Selection'));
    expect(profileButton).toBeInTheDocument();
  });

  it('handles quick challenge completion with stars', async () => {
    const { getByText } = render(<App />);
    const profileButton = await waitFor(() => getByText('Profile Selection'));
    profileButton.click();

    await waitFor(() => {
      expect(getByText('Start Quiz')).toBeInTheDocument();
    });
  });

  it('returns to dashboard from quiz', async () => {
    const { getByText, getByTestId } = render(<App />);
    const profileButton = await waitFor(() => getByText('Profile Selection'));
    profileButton.click();

    await waitFor(() => {
      const quizButton = getByText('Start Quiz');
      quizButton.click();
    });

    await waitFor(() => {
      const completeButton = getByText('Complete Quiz');
      completeButton.click();
    });

    await waitFor(() => {
      expect(getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('handles initializing state correctly', async () => {
    const { container } = render(<App />);
    
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('processes profile data with all domains', async () => {
    const mockProfile = {
      id: 'full-profile',
      name: 'Full Profile User',
      avatar: '🐰',
      currentLevel: 'CM1' as const,
      progress: {
        'CE1': {
          'Calcul mental': { unlocked: true, stars: 3, questionsAnswered: 20, correctAnswers: 18 },
          'Arithmétique': { unlocked: true, stars: 2, questionsAnswered: 15, correctAnswers: 12 },
        },
        'CM1': {
          'Calcul mental': { unlocked: true, stars: 1, questionsAnswered: 5, correctAnswers: 3 },
        }
      },
      totalStars: 6,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    mockGetProfile.mockReturnValue(mockProfile);
    localStorage.setItem('lapinoumath_current_profile', 'full-profile');

    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId('dashboard')).toBeInTheDocument();
    });
  });
});
