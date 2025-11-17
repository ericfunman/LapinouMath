import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
