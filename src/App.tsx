import { useState, useEffect } from 'react';
import ProfileSelection from './components/ProfileSelection';
import Dashboard from './components/Dashboard';
import QuizScreen from './components/QuizScreen';
import { UserProfile, GradeLevel, MathDomain } from './types';
import { getProfile, saveProfile } from './utils/storage';

type Screen = 'profile' | 'dashboard' | 'quiz' | 'lesson';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile');
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<{level: GradeLevel, domain: MathDomain} | null>(null);

  useEffect(() => {
    const savedProfileId = localStorage.getItem('lapinoumath_current_profile');
    if (savedProfileId) {
      const profile = getProfile(savedProfileId);
      if (profile) {
        setCurrentProfile(profile);
        setCurrentScreen('dashboard');
      }
    }
  }, []);

  const handleProfileSelect = (profile: UserProfile) => {
    setCurrentProfile(profile);
    localStorage.setItem('lapinoumath_current_profile', profile.id);
    setCurrentScreen('dashboard');
  };

  const handleStartQuiz = (level: GradeLevel, domain: MathDomain) => {
    setSelectedDomain({ level, domain });
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (correctCount: number, totalCount: number) => {
    if (!currentProfile || !selectedDomain) return;

    const updatedProfile = { ...currentProfile };
    const domainProgress = updatedProfile.progress[selectedDomain.level][selectedDomain.domain];
    
    domainProgress.questionsAnswered += totalCount;
    domainProgress.correctAnswers += correctCount;
    
    const successRate = domainProgress.correctAnswers / domainProgress.questionsAnswered;
    
    // Attribution des étoiles
    if (successRate >= 0.75 && domainProgress.questionsAnswered >= 15) {
      domainProgress.stars = 3;
    } else if (successRate >= 0.6 && domainProgress.questionsAnswered >= 10) {
      domainProgress.stars = 2;
    } else if (successRate >= 0.5 && domainProgress.questionsAnswered >= 5) {
      domainProgress.stars = 1;
    }

    // Déblocage du domaine suivant si conditions remplies
    const DOMAINS_ORDER = ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'];
    const currentDomainIndex = DOMAINS_ORDER.indexOf(selectedDomain.domain);
    
    // Si au moins 1 étoile, débloquer le domaine suivant
    if (domainProgress.stars >= 1 && currentDomainIndex < DOMAINS_ORDER.length - 1) {
      const nextDomain = DOMAINS_ORDER[currentDomainIndex + 1];
      updatedProfile.progress[selectedDomain.level][nextDomain].unlocked = true;
    }

    // Vérifier si tous les domaines du niveau actuel ont au moins 2 étoiles
    const currentLevelProgress = updatedProfile.progress[selectedDomain.level];
    const allDomainsCompleted = DOMAINS_ORDER.every(domain => 
      currentLevelProgress[domain].stars >= 2
    );

    // Si tous les domaines sont complétés, débloquer le niveau suivant
    if (allDomainsCompleted) {
      const LEVELS_ORDER = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'];
      const currentLevelIndex = LEVELS_ORDER.indexOf(selectedDomain.level);
      
      if (currentLevelIndex < LEVELS_ORDER.length - 1) {
        const nextLevel = LEVELS_ORDER[currentLevelIndex + 1];
        // Débloquer le premier domaine du niveau suivant
        updatedProfile.progress[nextLevel]['Calcul mental'].unlocked = true;
        updatedProfile.currentLevel = nextLevel as GradeLevel;
      }
    }

    updatedProfile.totalStars = Object.values(updatedProfile.progress)
      .flatMap(level => Object.values(level))
      .reduce((sum, domain) => sum + domain.stars, 0);

    saveProfile(updatedProfile);
    setCurrentProfile(updatedProfile);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentProfile(null);
    localStorage.removeItem('lapinoumath_current_profile');
    setCurrentScreen('profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {currentScreen === 'profile' && (
        <ProfileSelection onSelectProfile={handleProfileSelect} />
      )}
      
      {currentScreen === 'dashboard' && currentProfile && (
        <Dashboard
          profile={currentProfile}
          onStartQuiz={handleStartQuiz}
          onLogout={handleLogout}
        />
      )}
      
      {currentScreen === 'quiz' && currentProfile && selectedDomain && (
        <QuizScreen
          level={selectedDomain.level}
          domain={selectedDomain.domain}
          onComplete={handleQuizComplete}
          onExit={() => setCurrentScreen('dashboard')}
        />
      )}
    </div>
  );
}

export default App;
