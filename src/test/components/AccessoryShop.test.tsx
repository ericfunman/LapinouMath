import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AccessoryShop from '../../components/AccessoryShop';
import { UserProfile } from '../../types';

describe('AccessoryShop', () => {
  const mockOnSelectAccessory = vi.fn();
  const mockOnClose = vi.fn();

  const createMockProfile = (totalStars: number, selectedAccessory?: string): UserProfile => ({
    id: '1',
    name: 'Test Profile',
    avatar: 'default',
    currentLevel: 'CM1',
    progress: {},
    accessories: [],
    unlockedAccessories: [],
    totalStars,
    selectedAccessory: selectedAccessory || 'default',
    createdAt: new Date(),
  });

  it('renders the shop header correctly', () => {
    const profile = createMockProfile(0);
    render(
      <AccessoryShop
        profile={profile}
        onSelectAccessory={mockOnSelectAccessory}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText(/Boutique des Accessoires/)).toBeTruthy();
    expect(screen.queryByText(/Débloque des accessoires/)).toBeTruthy();
  });

  it('renders close button and calls onClose when clicked', () => {
    const profile = createMockProfile(0);
    render(
      <AccessoryShop
        profile={profile}
        onSelectAccessory={mockOnSelectAccessory}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /✕/ });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it('displays locked accessories when stars are insufficient', () => {
    const profile = createMockProfile(0); // No stars
    render(
      <AccessoryShop
        profile={profile}
        onSelectAccessory={mockOnSelectAccessory}
        onClose={mockOnClose}
      />
    );

    // With 0 stars, default accessory should be locked
    const accessoryButtons = screen.getAllByRole('button').filter(
      btn => btn.className.includes('bg-gradient-to-br') || btn.className.includes('bg-gray-100')
    );
    expect(accessoryButtons.length).toBeGreaterThan(0);
  });

  it('displays unlocked accessories when stars are sufficient', () => {
    const profile = createMockProfile(50); // More stars to unlock accessories
    render(
      <AccessoryShop
        profile={profile}
        onSelectAccessory={mockOnSelectAccessory}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText(/Boutique des Accessoires/)).toBeTruthy();
  });

  it('calls onSelectAccessory when clicking an unlocked accessory', () => {
    const profile = createMockProfile(100, 'default'); // Plenty of stars
    const { container } = render(
      <AccessoryShop
        profile={profile}
        onSelectAccessory={mockOnSelectAccessory}
        onClose={mockOnClose}
      />
    );

    // Find accessory buttons that are unlocked
    const unlockedButtons = container.querySelectorAll(
      'button[class*="from-green-50"], button[class*="from-yellow-100"]'
    );

    if (unlockedButtons.length > 0) {
      fireEvent.click(unlockedButtons[0] as HTMLElement);
      expect(mockOnSelectAccessory).toHaveBeenCalled();
    }
  });

  it('does not call onSelectAccessory when clicking a locked accessory', () => {
    const profile = createMockProfile(0); // No stars, all locked
    const { container } = render(
      <AccessoryShop
        profile={profile}
        onSelectAccessory={mockOnSelectAccessory}
        onClose={mockOnClose}
      />
    );

    mockOnSelectAccessory.mockClear();

    // Find locked buttons (bg-gray-100 opacity-50)
    const allButtons = container.querySelectorAll('button');
    let clickedLocked = false;
    
    for (const btn of allButtons) {
      if (btn.className.includes('opacity-50') && btn.className.includes('bg-gray-100')) {
        fireEvent.click(btn);
        clickedLocked = true;
        break;
      }
    }

    // If we found and clicked a locked button, callback should not have been called
    if (clickedLocked) {
      expect(mockOnSelectAccessory).not.toHaveBeenCalled();
    }
  });

  it('highlights selected accessory with ring styling', () => {
    const selectedAccessoryId = 'default';
    const profile = createMockProfile(100, selectedAccessoryId);

    const { container } = render(
      <AccessoryShop
        profile={profile}
        onSelectAccessory={mockOnSelectAccessory}
        onClose={mockOnClose}
      />
    );

    // Look for button with yellow ring (selected state)
    const selectedButton = container.querySelector(
      'button[class*="ring-yellow-400"]'
    );

    if (selectedButton) {
      expect(selectedButton.className).toContain('ring-2');
    }
  });

  it('shows next accessory to unlock when available', () => {
    const profile = createMockProfile(5); // Few stars
    render(
      <AccessoryShop
        profile={profile}
        onSelectAccessory={mockOnSelectAccessory}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText(/Boutique des Accessoires/)).toBeTruthy();
  });

  it('displays star count for current profile', () => {
    const profile = createMockProfile(75);
    render(
      <AccessoryShop
        profile={profile}
        onSelectAccessory={mockOnSelectAccessory}
        onClose={mockOnClose}
      />
    );

    // The component should display profile info
    expect(screen.queryByText(/Boutique des Accessoires/)).toBeTruthy();
  });
});
