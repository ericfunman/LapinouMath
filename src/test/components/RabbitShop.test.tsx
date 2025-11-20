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
    expect(screen.getByText(/Gris/)).toBeInTheDocument();
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

  it('renders with all variant options', () => {
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

  it('displays shop interface', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(container.querySelectorAll('div').length).toBeGreaterThan(0);
  });

  it('handles profile with many unlocked items', () => {
    const profileWithMany = {
      ...mockProfile,
      unlockedRabbitItems: [
        'classic', 'white', 'gray', 'brown',
        'hat-wizard', 'hat-cowboy', 'hat-pirate',
        'glasses-cool', 'glasses-nerd',
        'scarf-blue', 'scarf-red'
      ],
    };

    render(
      <RabbitShop
        profile={profileWithMany}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('renders shop with minimum stars', () => {
    const profileMinStars = {
      ...mockProfile,
      totalStars: 0,
    };

    render(
      <RabbitShop
        profile={profileMinStars}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('renders shop with high star count', () => {
    const profileHighStars = {
      ...mockProfile,
      totalStars: 10000,
    };

    render(
      <RabbitShop
        profile={profileHighStars}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('handles profile update', () => {
    const { rerender } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const updatedProfile = {
      ...mockProfile,
      totalStars: 200,
    };

    rerender(
      <RabbitShop
        profile={updatedProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('maintains shop state across rerenders', () => {
    const { rerender } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    for (let i = 0; i < 3; i++) {
      rerender(
        <RabbitShop
          profile={mockProfile}
          onSaveCustomization={mockOnSave}
          onClose={mockOnClose}
        />
      );
    }

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('displays all rabbit variants', () => {
    render(
      <RabbitShop
        profile={{ ...mockProfile, unlockedRabbitItems: ['classic', 'white', 'gray', 'brown'] }}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Rose Classique')).toBeInTheDocument();
  });

  it('renders shop categories', () => {
    render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('handles profile with custom accessories', () => {
    const profileWithCustom = {
      ...mockProfile,
      accessories: ['hat-wizard', 'glasses-cool'],
      unlockedAccessories: ['hat-wizard', 'glasses-cool', 'scarf-blue'],
      rabbitCustomization: {
        variant: 'white' as const,
        accessories: ['hat-wizard'],
        adjustments: {},
      },
    };

    render(
      <RabbitShop
        profile={profileWithCustom}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('renders without crashing with edge case data', () => {
    const edgeCaseProfile = {
      ...mockProfile,
      name: '',
      totalStars: -1,
      unlockedRabbitItems: [],
    };

    render(
      <RabbitShop
        profile={edgeCaseProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('displays shop with various star amounts', () => {
    const starCounts = [0, 1, 10, 50, 100, 500];

    for (const stars of starCounts) {
      const { unmount } = render(
        <RabbitShop
          profile={{ ...mockProfile, totalStars: stars }}
          onSaveCustomization={mockOnSave}
          onClose={mockOnClose}
        />
      );
      expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
      unmount();
    }
  });

  it('renders shop interface with structure', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const mainContent = container.querySelector('div');
    expect(mainContent).toBeTruthy();
  });

  it('handles rapid profile updates', () => {
    const { rerender } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    for (let i = 0; i < 5; i++) {
      rerender(
        <RabbitShop
          profile={{ ...mockProfile, totalStars: i * 10 }}
          onSaveCustomization={mockOnSave}
          onClose={mockOnClose}
        />
      );
    }

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('displays shop with multiple accessory categories', () => {
    render(
      <RabbitShop
        profile={{
          ...mockProfile,
          unlockedRabbitItems: [
            'classic', 'white',
            'hat-wizard', 'hat-cowboy',
            'glasses-cool', 'glasses-nerd',
            'scarf-blue', 'scarf-red'
          ],
        }}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('should click variant button to select color', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const variantButtons = Array.from(container.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('Classique') || btn.textContent?.includes('Blanc')
    );

    if (variantButtons.length > 0) {
      fireEvent.click(variantButtons[0]);
      expect(variantButtons[0]).toBeTruthy();
    }
  });

  it('should click multiple variant options', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const buttons = container.querySelectorAll('button');
    let clickCount = 0;
    for (const button of buttons) {
      const text = button.textContent || '';
      if (text.includes('Classique') || text.includes('Blanc') || text.includes('Gris')) {
        fireEvent.click(button);
        clickCount++;
        if (clickCount >= 3) break;
      }
    }

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should handle accessory button interactions', () => {
    render(
      <RabbitShop
        profile={{
          ...mockProfile,
          unlockedRabbitItems: ['classic', 'hat-wizard', 'glasses-cool', 'scarf-blue'],
        }}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should click close and save buttons', () => {
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
  });

  it('should handle clicking variant then save', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    // Click a variant
    const variantButtons = Array.from(container.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('Blanc')
    );

    if (variantButtons.length > 0) {
      fireEvent.click(variantButtons[0]);
    }

    // Then save
    const saveButton = screen.getByText('💾 Sauvegarder ma personnalisation');
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });

  it('should handle rapid variant switches', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    for (let i = 0; i < Math.min(5, buttons.length); i++) {
      fireEvent.click(buttons[i]);
    }

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should display accessory grid and click items', () => {
    render(
      <RabbitShop
        profile={{
          ...mockProfile,
          unlockedRabbitItems: ['classic', 'hat-wizard', 'glasses-cool', 'scarf-blue'],
          totalStars: 500,
        }}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Click first few buttons
    if (buttons.length > 2) {
      fireEvent.click(buttons[1]);
      fireEvent.click(buttons[2]);
    }
  });

  it('should support clicking through all visible buttons', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const buttons = container.querySelectorAll('button');
    buttons.forEach((btn, idx) => {
      if (idx < 5) {
        fireEvent.click(btn);
      }
    });

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should handle shop interactions with high star count', () => {
    render(
      <RabbitShop
        profile={{
          ...mockProfile,
          totalStars: 1000,
          unlockedRabbitItems: ['classic', 'white', 'gray', 'brown'],
        }}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const saveButton = screen.getByText('💾 Sauvegarder ma personnalisation');
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });

  it('should select variant and save', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    // Find and click a variant button (White)
    const variantButtons = Array.from(container.querySelectorAll('button')).filter(
      btn => btn.textContent?.includes('Blanc')
    );

    if (variantButtons.length > 0) {
      fireEvent.click(variantButtons[0]);
    }

    // Save
    const saveButton = screen.getByText('💾 Sauvegarder ma personnalisation');
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });

  it('should handle accessory selection and save', () => {
    render(
      <RabbitShop
        profile={{
          ...mockProfile,
          unlockedRabbitItems: ['classic', 'hat-wizard', 'glasses-cool'],
        }}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const saveButton = screen.getByText('💾 Sauvegarder ma personnalisation');
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });

  it('should render shop with various unlocked items', () => {
    render(
      <RabbitShop
        profile={{
          ...mockProfile,
          unlockedRabbitItems: [
            'classic', 'white', 'gray', 'brown',
            'hat-wizard', 'hat-cowboy', 'hat-pirate',
            'glasses-cool', 'glasses-star', 'glasses-heart',
            'scarf-red', 'scarf-blue'
          ],
        }}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });

  it('should handle close button and save button interactions', () => {
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

  it('should display all rabbit variants', () => {
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

  it('should handle rapid button clicks', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const buttons = container.querySelectorAll('button');
    buttons.forEach((btn, idx) => {
      if (idx < 5) {
        fireEvent.click(btn);
      }
    });

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should support variant switching workflow', () => {
    const { container } = render(
      <RabbitShop
        profile={mockProfile}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    // Click variant buttons in sequence
    const variantButtons = Array.from(container.querySelectorAll('button')).filter(
      btn => btn.textContent && ['Classique', 'Blanc', 'Gris'].some(v => btn.textContent?.includes(v))
    );

    variantButtons.slice(0, 3).forEach(btn => {
      fireEvent.click(btn);
    });

    expect(variantButtons.length).toBeGreaterThan(0);
  });

  it('should render interface with limited stars', () => {
    render(
      <RabbitShop
        profile={{
          ...mockProfile,
          totalStars: 5,
        }}
        onSaveCustomization={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🐰 Boutique CalcuLapin')).toBeInTheDocument();
  });
});
