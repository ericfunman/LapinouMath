import { useState, useEffect } from 'react';
import ProfileSelection from './components/ProfileSelection';
import Dashboard from './components/Dashboard';
import QuizScreen from './components/QuizScreen';
import AdminPanel from './components/AdminPanel';
import { UserProfile, GradeLevel, MathDomain } from './types';
import { getProfile, saveProfile } from './utils/storage';
import { initDB } from './utils/database';
import { initializeQuestions } from './data/questions';

type Screen = 'profile' | 'dashboard' | 'quiz' | 'lesson' | 'admin';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile');
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<{level: GradeLevel, domain: MathDomain} | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Initialiser IndexedDB et les questions au démarrage
    async function initialize() {
      try {
        await initDB();
        console.log('✅ Base de données initialisée');
        
        await initializeQuestions();
        console.log('✅ Questions initialisées');
      } catch (err) {
        console.error('❌ Erreur initialisation:', err);
      } finally {
        setIsInitializing(false);
      }

      const savedProfileId = localStorage.getItem('lapinoumath_current_profile');
      if (savedProfileId) {
        const profile = getProfile(savedProfileId);
        if (profile) {
          setCurrentProfile(profile);
          setCurrentScreen('dashboard');
        }
      }
    }
    
    initialize();
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

  const updateProgressWithStars = (
    domainProgress: UserProfile['progress'][GradeLevel][MathDomain],
    correctCount: number,
    totalCount: number
  ): number => {
    domainProgress.questionsAnswered += totalCount;
    domainProgress.correctAnswers += correctCount;
    
    const successRate = domainProgress.correctAnswers / domainProgress.questionsAnswered;
    
    if (successRate >= 0.75 && domainProgress.questionsAnswered >= 15) {
      domainProgress.stars = 3;
    } else if (successRate >= 0.6 && domainProgress.questionsAnswered >= 10) {
      domainProgress.stars = 2;
    } else if (successRate >= 0.5 && domainProgress.questionsAnswered >= 5) {
      domainProgress.stars = 1;
    }
    
    return domainProgress.stars;
  };

  const unlockNextDomain = (
    updatedProfile: UserProfile,
    selectedDomain: { level: GradeLevel; domain: MathDomain },
    stars: number
  ): void => {
    const DOMAINS_ORDER = ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'];
    const currentDomainIndex = DOMAINS_ORDER.indexOf(selectedDomain.domain);
    
    if (stars >= 1 && currentDomainIndex >= 0 && currentDomainIndex < DOMAINS_ORDER.length - 1) {
      const nextDomain = DOMAINS_ORDER[currentDomainIndex + 1] as MathDomain;
      const nextDomainProgress = updatedProfile.progress[selectedDomain.level]?.[nextDomain];
      if (nextDomainProgress) {
        nextDomainProgress.unlocked = true;
      }
    }
  };

  const unlockNextLevel = (
    updatedProfile: UserProfile,
    selectedDomain: { level: GradeLevel; domain: MathDomain }
  ): void => {
    const DOMAINS_ORDER = ['Calcul mental', 'Arithmétique', 'Géométrie', 'Fractions/Décimaux', 'Mesures', 'Problèmes/Algèbre'];
    const LEVELS_ORDER: GradeLevel[] = ['CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème'];
    
    const currentLevelProgress = updatedProfile.progress[selectedDomain.level];
    if (!currentLevelProgress) return;

    const allDomainsCompleted = DOMAINS_ORDER.every(domain => 
      currentLevelProgress[domain as MathDomain]?.stars >= 2
    );

    if (allDomainsCompleted) {
      const currentLevelIndex = LEVELS_ORDER.indexOf(selectedDomain.level);
      
      if (currentLevelIndex >= 0 && currentLevelIndex < LEVELS_ORDER.length - 1) {
        const nextLevel = LEVELS_ORDER[currentLevelIndex + 1];
        const nextLevelProgress = updatedProfile.progress[nextLevel];
        if (nextLevelProgress) {
          const calcMentalProgress = nextLevelProgress['Calcul mental'];
          if (calcMentalProgress) {
            calcMentalProgress.unlocked = true;
            updatedProfile.currentLevel = nextLevel;
          }
        }
      }
    }
  };

  const handleQuizComplete = (correctCount: number, totalCount: number) => {
    if (!currentProfile || !selectedDomain) {
      console.warn('Quiz complete called without profile or domain');
      return;
    }

    const updatedProfile = { ...currentProfile };
    const domainProgress = updatedProfile.progress[selectedDomain.level]?.[selectedDomain.domain];
    
    if (!domainProgress) {
      console.error('Domain progress not found');
      return;
    }
    
    if (totalCount === 0) {
      console.warn('No questions in quiz');
      return;
    }
    
    const stars = updateProgressWithStars(domainProgress, correctCount, totalCount);
    unlockNextDomain(updatedProfile, selectedDomain, stars);
    unlockNextLevel(updatedProfile, selectedDomain);

    updatedProfile.totalStars = Object.values(updatedProfile.progress)
      .flatMap(level => Object.values(level || {}))
      .reduce((sum, domain) => sum + (domain?.stars || 0), 0);

    saveProfile(updatedProfile);
    setCurrentProfile(updatedProfile);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentProfile(null);
    localStorage.removeItem('lapinoumath_current_profile');
    setCurrentScreen('profile');
  };

  const handleSelectAccessory = (accessoryId: string) => {
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, selectedAccessory: accessoryId };
      saveProfile(updatedProfile);
      setCurrentProfile(updatedProfile);
    }
  };

  const handleOpenAdmin = () => {
    setCurrentScreen('admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {isInitializing ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-4">🐰</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Chargement de LapinouMath...</h2>
            <p className="text-gray-600">Initialisation de la base de données</p>
          </div>
        </div>
      ) : (
        <>
          {currentScreen === 'profile' && (
            <ProfileSelection onSelectProfile={handleProfileSelect} />
          )}
          
          {currentScreen === 'dashboard' && currentProfile && (
            <Dashboard
              profile={currentProfile}
              onStartQuiz={handleStartQuiz}
              onLogout={handleLogout}
              onOpenAdmin={handleOpenAdmin}
              onSelectAccessory={handleSelectAccessory}
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

          {currentScreen === 'admin' && (
            <AdminPanel onClose={() => setCurrentScreen('dashboard')} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
