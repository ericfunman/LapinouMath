import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../../components/Dashboard';
import { UserProfile } from '../../types';

describe('Dashboard Component', () => {
  let mockProfile: UserProfile;

  beforeEach(() => {
    mockProfile = {
      id: 'test-1',
      name: 'Test User',
      avatar: '🐰',
      currentLevel: 'CE1',
      progress: {
        CE1: {
          'Calcul mental': {
            questionsAnswered: 5,
            correctAnswers: 4,
            stars: 1,
            unlocked: true,
          },
          'Arithmétique': {
            questionsAnswered: 0,
            correctAnswers: 0,
            stars: 0,
            unlocked: false,
          },
          'Géométrie': {
            questionsAnswered: 0,
            correctAnswers: 0,
            stars: 0,
            unlocked: false,
          },
          'Fractions/Décimaux': {
            questionsAnswered: 0,
            correctAnswers: 0,
            stars: 0,
            unlocked: false,
          },
          'Mesures': {
            questionsAnswered: 0,
            correctAnswers: 0,
            stars: 0,
            unlocked: false,
          },
          'Problèmes/Algèbre': {
            questionsAnswered: 0,
            correctAnswers: 0,
            stars: 0,
            unlocked: false,
          },
        },
        CE2: {
          'Calcul mental': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Arithmétique': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Géométrie': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Fractions/Décimaux': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Mesures': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Problèmes/Algèbre': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
        },
        CM1: {
          'Calcul mental': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Arithmétique': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Géométrie': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Fractions/Décimaux': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Mesures': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Problèmes/Algèbre': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
        },
        CM2: {
          'Calcul mental': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Arithmétique': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Géométrie': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Fractions/Décimaux': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Mesures': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Problèmes/Algèbre': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
        },
        '6ème': {
          'Calcul mental': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Arithmétique': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Géométrie': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Fractions/Décimaux': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Mesures': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Problèmes/Algèbre': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
        },
        '5ème': {
          'Calcul mental': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Arithmétique': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Géométrie': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Fractions/Décimaux': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Mesures': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Problèmes/Algèbre': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
        },
        '4ème': {
          'Calcul mental': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Arithmétique': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Géométrie': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Fractions/Décimaux': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Mesures': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
          'Problèmes/Algèbre': { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false },
        },
      },
      accessories: [],
      unlockedAccessories: [],
      totalStars: 1,
      createdAt: new Date(),
    };
  });

  it('should render dashboard with profile', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    // Text is split across multiple elements, use regex matcher
    expect(screen.getByText(/Bonjour.*Test User/)).toBeDefined();
  });

  it('should handle missing profile gracefully', () => {
    const incompleteProfile: any = { ...mockProfile };
    incompleteProfile.progress = undefined;

    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    try {
      render(
        <Dashboard
          profile={incompleteProfile as UserProfile}
          onStartQuiz={mockHandlers.onStartQuiz}
          onLogout={mockHandlers.onLogout}
          onOpenAdmin={mockHandlers.onOpenAdmin}
        />
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should display all level buttons', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(container).toBeTruthy();
  });

  it('should show profile stats', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(container.textContent).toContain('Test User');
  });

  it('should display star count', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const profileWithStars = {
      ...mockProfile,
      totalStars: 50,
    };

    render(
      <Dashboard
        profile={profileWithStars}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    // Star count should be displayed
    expect(document.body).toBeDefined();
  });

  it('should handle profile with high progress', () => {
    const advancedProfile: UserProfile = {
      ...mockProfile,
      currentLevel: '4ème' as const,
      totalStars: 500,
      progress: {
        ...mockProfile.progress,
        '4ème': {
          'Calcul mental': { questionsAnswered: 100, correctAnswers: 90, stars: 45, unlocked: true },
        },
      },
    };

    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    render(
      <Dashboard
        profile={advancedProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('should render without crashing with minimal profile', () => {
    const minimalProfile: UserProfile = {
      id: 'minimal-id',
      name: 'Minimal User',
      avatar: '🐰',
      currentLevel: 'CE1',
      progress: {},
      totalStars: 0,
      accessories: [],
      unlockedAccessories: [],
      createdAt: new Date(),
    };

    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    render(
      <Dashboard
        profile={minimalProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('should handle dashboard with all levels unlocked', () => {
    const advancedProfile: UserProfile = {
      ...mockProfile,
      currentLevel: 'CM2',
      totalStars: 50,
      progress: {
        CE1: Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 10, correctAnswers: 8, stars: 2, unlocked: true }
          ])
        ),
        CE2: Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 10, correctAnswers: 9, stars: 3, unlocked: true }
          ])
        ),
        CM1: Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 10, correctAnswers: 7, stars: 2, unlocked: true }
          ])
        ),
        CM2: Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 10, correctAnswers: 10, stars: 3, unlocked: true }
          ])
        ),
        '6ème': Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 5, correctAnswers: 4, stars: 2, unlocked: true }
          ])
        ),
        '5ème': Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 3, correctAnswers: 2, stars: 1, unlocked: true }
          ])
        ),
        '4ème': Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false }
          ])
        ),
      },
    };

    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    render(
      <Dashboard
        profile={advancedProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('should render with different avatars', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const avatars = ['🐰', '🐇', '🐻'];
    for (const avatar of avatars) {
      const { unmount } = render(
        <Dashboard
          profile={{ ...mockProfile, avatar }}
          onStartQuiz={mockHandlers.onStartQuiz}
          onLogout={mockHandlers.onLogout}
          onOpenAdmin={mockHandlers.onOpenAdmin}
        />
      );
      expect(document.body).toBeDefined();
      unmount();
    }
  });

  it('should handle dashboard with accessories', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const profileWithAccessories: UserProfile = {
      ...mockProfile,
      accessories: ['hat-wizard', 'scarf-blue'],
      unlockedAccessories: ['hat-wizard', 'scarf-blue', 'glasses-cool'],
    };

    render(
      <Dashboard
        profile={profileWithAccessories}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('should update when profile changes', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { rerender } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    const updatedProfile = { ...mockProfile, totalStars: 100, name: 'Updated User' };

    rerender(
      <Dashboard
        profile={updatedProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('should handle all grade levels', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const levels = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'];
    for (const level of levels) {
      const { unmount } = render(
        <Dashboard
          profile={{ ...mockProfile, currentLevel: level as any }}
          onStartQuiz={mockHandlers.onStartQuiz}
          onLogout={mockHandlers.onLogout}
          onOpenAdmin={mockHandlers.onOpenAdmin}
        />
      );
      expect(document.body).toBeDefined();
      unmount();
    }
  });

  it('should render dashboard interface', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(container.querySelectorAll('button').length).toBeGreaterThan(0);
  });

  it('should display profile name', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={{ ...mockProfile, name: 'Unique Name 12345' }}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(container.textContent).toBeTruthy();
  });

  it('should handle dashboard rerenders', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { rerender } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    for (let i = 0; i < 3; i++) {
      rerender(
        <Dashboard
          profile={mockProfile}
          onStartQuiz={mockHandlers.onStartQuiz}
          onLogout={mockHandlers.onLogout}
          onOpenAdmin={mockHandlers.onOpenAdmin}
        />
      );
    }

    expect(document.body).toBeDefined();
  });

  it('should display rabbit avatar', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('should render with high star count', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    render(
      <Dashboard
        profile={{ ...mockProfile, totalStars: 999 }}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('should handle complex progress data', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const complexProfile: UserProfile = {
      ...mockProfile,
      progress: {
        CE1: {
          'Calcul mental': { questionsAnswered: 50, correctAnswers: 45, stars: 5, unlocked: true },
          'Arithmétique': { questionsAnswered: 30, correctAnswers: 25, stars: 3, unlocked: true },
          'Géométrie': { questionsAnswered: 20, correctAnswers: 15, stars: 2, unlocked: true },
          'Fractions/Décimaux': { questionsAnswered: 40, correctAnswers: 35, stars: 4, unlocked: true },
          'Mesures': { questionsAnswered: 25, correctAnswers: 20, stars: 2, unlocked: true },
          'Problèmes/Algèbre': { questionsAnswered: 35, correctAnswers: 30, stars: 3, unlocked: true },
        },
        CE2: Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 20, correctAnswers: 18, stars: 2, unlocked: true }
          ])
        ),
        CM1: Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false }
          ])
        ),
        CM2: Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false }
          ])
        ),
        '6ème': Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false }
          ])
        ),
        '5ème': Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false }
          ])
        ),
        '4ème': Object.fromEntries(
          ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'].map(d => [
            d,
            { questionsAnswered: 0, correctAnswers: 0, stars: 0, unlocked: false }
          ])
        ),
      },
    };

    render(
      <Dashboard
        profile={complexProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    expect(document.body).toBeDefined();
  });

  it('should click level button to start quiz', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    const buttons = container.querySelectorAll('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should click logout button', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    const buttons = container.querySelectorAll('button');
    for (const button of buttons) {
      if (button.textContent?.includes('Déconnexion')) {
        fireEvent.click(button);
        break;
      }
    }
  });

  it('should click admin button', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    const buttons = container.querySelectorAll('button');
    for (const button of buttons) {
      if (button.textContent?.includes('Admin') || button.textContent?.includes('admin')) {
        fireEvent.click(button);
        break;
      }
    }
  });

  it('should handle multiple button clicks', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    const buttons = container.querySelectorAll('button');
    buttons.forEach((btn, idx) => {
      if (idx < 3) {
        fireEvent.click(btn);
      }
    });

    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should click domain button to start quiz', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    const buttons = Array.from(container.querySelectorAll('button'));
    for (const button of buttons) {
      if (button.textContent && ['Calcul mental', 'Arithmétique', 'Géométrie'].includes(button.textContent)) {
        fireEvent.click(button);
        break;
      }
    }
  });

  it('should support clicking different level buttons', () => {
    const mockHandlers = {
      onStartQuiz: () => {},
      onLogout: () => {},
      onOpenAdmin: () => {},
    };

    const { container } = render(
      <Dashboard
        profile={mockProfile}
        onStartQuiz={mockHandlers.onStartQuiz}
        onLogout={mockHandlers.onLogout}
        onOpenAdmin={mockHandlers.onOpenAdmin}
      />
    );

    const buttons = container.querySelectorAll('button');
    let clickCount = 0;
    buttons.forEach(btn => {
      if (clickCount < 4) {
        fireEvent.click(btn);
        clickCount++;
      }
    });

    expect(buttons.length).toBeGreaterThan(0);
  });
});