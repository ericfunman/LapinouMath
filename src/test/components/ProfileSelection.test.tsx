import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileSelection from '../../components/ProfileSelection';

describe('ProfileSelection Component', () => {
  it('should render profile selection screen', () => {
    const mockOnSelect = vi.fn();
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    expect(screen.getByText(/LapinouMath/i)).toBeDefined();
    expect(screen.getByText(/CalcuLapin/i)).toBeDefined();
  });

  it('should show create profile form when clicking create button', () => {
    const mockOnSelect = vi.fn();
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    const createButton = screen.getByText(/Créer un nouveau profil/i);
    fireEvent.click(createButton);
    
    expect(screen.getByText(/Prénom de l'élève/i)).toBeDefined();
  });

  it('should display existing profiles', () => {
    // Créer un profil de test dans localStorage
    const testProfile = {
      id: 'test-123',
      name: 'Test User',
      avatar: '🐰',
      currentLevel: 'CE1' as const,
      progress: {},
      accessories: [],
      unlockedAccessories: [],
      totalStars: 5,
      createdAt: new Date(),
    };
    
    localStorage.setItem('lapinoumath_profiles', JSON.stringify([testProfile]));
    
    const mockOnSelect = vi.fn();
    render(<ProfileSelection onSelectProfile={mockOnSelect} />);
    
    expect(screen.getByText('Test User')).toBeDefined();
    expect(screen.getByText(/étoiles/i)).toBeDefined();
  });
});
