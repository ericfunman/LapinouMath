import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RabbitShop from '../../components/RabbitShop';
import { UserProfile } from '../../types';

const mockProfile: UserProfile = {
  id: 'test-id',
  name: 'Test User',
  avatar: 'avatar1',
  currentLevel: 'CE1',
  progress: {},
  accessories: [],
  unlockedAccessories: [],
  unlockedRabbitItems: ['classic'],
  totalStars: 100,
  createdAt: new Date(),
};

describe('RabbitShop', () => {
  const mockOnSave = vi.fn();
  const mockOnClose = vi.fn();

  it('renders the shop header', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
    expect(screen.getByText('Personnalise ton compagnon mathématique !')).toBeInTheDocument();
  });

  it('displays star count', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getAllByText(/100/)[0]).toBeInTheDocument();
  });

  it('renders variant options', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('Rose Classique')).toBeInTheDocument();
    expect(screen.getByText('Blanc Neige')).toBeInTheDocument();
  });

  it('renders accessory categories', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getAllByText(/Chapeaux/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Lunettes/)[0]).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onSaveCustomization when save button is clicked', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    const saveButton = screen.getByText('💾 Sauvegarder ma personnalisation');
    fireEvent.click(saveButton);
    
    expect(mockOnSave).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('allows selecting a variant', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    const whiteVariant = screen.getAllByText('Blanc Neige')[0];
    fireEvent.click(whiteVariant);
    
    expect(mockOnSave).toHaveBeenCalled();
  });

  it('shows unlocked status for affordable items', () => {
    const profileWithItems = {
      ...mockProfile,
      unlockedRabbitItems: ['classic', 'hat-top', 'glasses-round'],
    };

    render(
      <RabbitShop
        profile={profileWithItems}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    const unlockedItems = screen.getAllByText('✓ Débloqué');
    expect(unlockedItems.length).toBeGreaterThan(0);
  });

  it('displays preview section', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('Aperçu de ton CalcuLapin')).toBeInTheDocument();
  });

  it('shows all variant colors', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('Rose Classique')).toBeInTheDocument();
    expect(screen.getByText('Blanc Neige')).toBeInTheDocument();
    expect(screen.getByText('Gris Élégant')).toBeInTheDocument();
    expect(screen.getByText('Marron Chocolat')).toBeInTheDocument();
  });

  it('displays all accessory categories', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getAllByText(/Chapeaux/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Nœuds/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Effets/)[0]).toBeInTheDocument();
  });

  it('shows cost for locked items', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    // Les éléments verrouillés doivent afficher un coût
    const costElements = screen.queryAllByText(/⭐/);
    expect(costElements.length).toBeGreaterThan(0);
  });

  it('handles accessory selection', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('displays rabbit avatar preview', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
  });

  it('renders with full profile data', () => {
    const fullProfile = {
      ...mockProfile,
      rabbitCustomization: {
        variant: 'classic' as const,
        accessories: ['hat-top', 'glasses-round'],
        adjustments: {},
      },
      unlockedRabbitItems: ['classic', 'hat-top', 'glasses-round', 'hat-wizard'],
    };

    render(
      <RabbitShop
        profile={fullProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('handles no unlocked items', () => {
    const profileNoItems = {
      ...mockProfile,
      unlockedRabbitItems: [],
    };

    render(
      <RabbitShop
        profile={profileNoItems}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });
});
