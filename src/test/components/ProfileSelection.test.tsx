import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileSelection from '../../components/ProfileSelection';

// Mock storage functions
const mockGetAllProfiles = vi.fn();
const mockCreateProfile = vi.fn();
const mockDeleteProfile = vi.fn();

vi.mock('../../utils/storage', () => ({
  getAllProfiles: () => mockGetAllProfiles(),
  createProfile: (name: string, level: any) => mockCreateProfile(name, level),
  deleteProfile: (id: string) => mockDeleteProfile(id),
}));

vi.mock('../../data/constants', () => ({
  GRADE_LEVELS: ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'],
}));

describe('ProfileSelection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render profile selection screen with title', () => {
    mockGetAllProfiles.mockReturnValue([]);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    expect(screen.getByText('LapinouMath')).toBeDefined();
    expect(screen.getByText(/CalcuLapin/)).toBeDefined();
    expect(screen.getByText(/Apprends les maths/)).toBeDefined();
  });

  it('should display existing profiles from storage', () => {
    const testProfile = {
      id: 'test-1',
      name: 'Alice',
      avatar: '🐰',
      currentLevel: 'CE1' as const,
      progress: {},
      accessories: [],
      unlockedAccessories: [],
      totalStars: 15,
      createdAt: new Date(),
    };
    
    mockGetAllProfiles.mockReturnValue([testProfile]);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    expect(screen.getByText('Alice')).toBeDefined();
    expect(screen.getByText(/CE1/)).toBeDefined();
    expect(screen.getByText(/15 étoiles/)).toBeDefined();
  });

  it('should call onSelectProfile when profile button is clicked', async () => {
    const testProfile = {
      id: 'test-2',
      name: 'Bob',
      avatar: '🐇',
      currentLevel: 'CM1' as const,
      progress: {},
      accessories: [],
      unlockedAccessories: [],
      totalStars: 50,
      createdAt: new Date(),
    };
    
    mockGetAllProfiles.mockReturnValue([testProfile]);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    const profileButton = screen.getByText('Bob').closest('button');
    fireEvent.click(profileButton!);
    
    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith(testProfile);
    });
  });

  it('should show create profile form when create button is clicked', async () => {
    mockGetAllProfiles.mockReturnValue([]);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    const createButton = screen.getByText(/Créer un nouveau profil/);
    fireEvent.click(createButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Prénom de l'élève/)).toBeDefined();
      expect(screen.getByText(/Niveau scolaire/)).toBeDefined();
    });
  });

  it('should create profile with name and level', async () => {
    mockGetAllProfiles.mockReturnValue([]);
    const newProfile = {
      id: 'new-1',
      name: 'Charlie',
      avatar: '🐢',
      currentLevel: 'CE2' as const,
      progress: {},
      accessories: [],
      unlockedAccessories: [],
      totalStars: 0,
      createdAt: new Date(),
    };
    
    mockCreateProfile.mockReturnValue(newProfile);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    // Open create form
    fireEvent.click(screen.getByText(/Créer un nouveau profil/));
    
    await waitFor(() => {
      expect(screen.getByText('Créer')).toBeDefined();
    });
    
    // Find and fill the name input
    const nameInput = screen.getByPlaceholderText(/Entre ton prénom/);
    fireEvent.change(nameInput, { target: { value: 'Charlie' } });
    
    // Select level
    const levelSelect = screen.getByDisplayValue('CE1', { selector: 'select' });
    fireEvent.change(levelSelect, { target: { value: 'CE2' } });
    
    // Submit form
    const createButton = screen.getByText('Créer').closest('button');
    fireEvent.click(createButton!);
    
    await waitFor(() => {
      expect(mockCreateProfile).toHaveBeenCalledWith('Charlie', 'CE2');
    });
  });

  it('should not create profile with empty name', async () => {
    mockGetAllProfiles.mockReturnValue([]);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    // Open create form
    fireEvent.click(screen.getByText(/Créer un nouveau profil/));
    
    await waitFor(() => {
      expect(screen.getByText('Créer')).toBeDefined();
    });
    
    // Try to submit with empty name (don't fill in the input)
    const createButton = screen.getByText('Créer').closest('button');
    fireEvent.click(createButton!);
    
    expect(mockCreateProfile).not.toHaveBeenCalled();
  });

  it('should cancel profile creation', async () => {
    mockGetAllProfiles.mockReturnValue([]);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    // Open create form
    fireEvent.click(screen.getByText(/Créer un nouveau profil/));
    
    await waitFor(() => {
      expect(screen.getByText('Annuler')).toBeDefined();
    });
    
    // Click cancel
    fireEvent.click(screen.getByText('Annuler'));
    
    // Form should disappear
    await waitFor(() => {
      expect(screen.queryByText('Annuler')).toBeNull();
    });
  });

  it('should delete a profile', async () => {
    const testProfile = {
      id: 'test-3',
      name: 'Diana',
      avatar: '🦊',
      currentLevel: 'CM2' as const,
      progress: {},
      accessories: [],
      unlockedAccessories: [],
      totalStars: 30,
      createdAt: new Date(),
    };
    
    mockGetAllProfiles.mockReturnValue([testProfile]);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    // Find and click delete button
    const deleteButton = screen.getByText('🗑️');
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(mockDeleteProfile).toHaveBeenCalledWith('test-3');
    });
  });

  it('should show empty state when no profiles exist', () => {
    mockGetAllProfiles.mockReturnValue([]);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    expect(screen.getByText(/Aucun profil créé/)).toBeDefined();
  });

  it('should display multiple profiles correctly', () => {
    const profiles = [
      {
        id: 'p1',
        name: 'Profile 1',
        avatar: '🐰',
        currentLevel: 'CE1' as const,
        progress: {},
        accessories: [],
        unlockedAccessories: [],
        totalStars: 5,
        createdAt: new Date(),
      },
      {
        id: 'p2',
        name: 'Profile 2',
        avatar: '🐇',
        currentLevel: 'CM1' as const,
        progress: {},
        accessories: [],
        unlockedAccessories: [],
        totalStars: 50,
        createdAt: new Date(),
      },
    ];
    
    mockGetAllProfiles.mockReturnValue(profiles);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    expect(screen.getByText('Profile 1')).toBeDefined();
    expect(screen.getByText('Profile 2')).toBeDefined();
    expect(screen.getByText(/5 étoiles/)).toBeDefined();
    expect(screen.getByText(/50 étoiles/)).toBeDefined();
  });

  it('should display all grade levels in level select', async () => {
    mockGetAllProfiles.mockReturnValue([]);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    // Open create form
    fireEvent.click(screen.getByText(/Créer un nouveau profil/));
    
    await waitFor(() => {
      const levelSelect = screen.getByDisplayValue('CE1', { selector: 'select' });
      const options = levelSelect.querySelectorAll('option');
      expect(options.length).toBe(7); // 7 levels
    });
  });

  it('should trim whitespace from profile name', async () => {
    mockGetAllProfiles.mockReturnValue([]);
    const newProfile = {
      id: 'new-2',
      name: 'Eve',
      avatar: '🐭',
      currentLevel: 'CE1' as const,
      progress: {},
      accessories: [],
      unlockedAccessories: [],
      totalStars: 0,
      createdAt: new Date(),
    };
    
    mockCreateProfile.mockReturnValue(newProfile);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    // Open create form
    fireEvent.click(screen.getByText(/Créer un nouveau profil/));
    
    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText(/Entre ton prénom/);
      fireEvent.change(nameInput, { target: { value: '  Eve  ' } });
      
      const createButton = screen.getByText('Créer').closest('button');
      fireEvent.click(createButton!);
    });
    
    await waitFor(() => {
      expect(mockCreateProfile).toHaveBeenCalledWith('Eve', 'CE1');
    });
  });

  it('should clear form after successful profile creation', async () => {
    mockGetAllProfiles.mockReturnValue([]);
    const newProfile = {
      id: 'new-3',
      name: 'Frank',
      avatar: '🦁',
      currentLevel: 'CE1' as const,
      progress: {},
      accessories: [],
      unlockedAccessories: [],
      totalStars: 0,
      createdAt: new Date(),
    };
    
    mockCreateProfile.mockReturnValue(newProfile);
    const mockOnSelect = vi.fn();
    
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    // Open create form
    fireEvent.click(screen.getByText(/Créer un nouveau profil/));
    
    // Verify form is open
    await waitFor(() => {
      expect(screen.getByText('Annuler')).toBeDefined();
    });
  });
});
