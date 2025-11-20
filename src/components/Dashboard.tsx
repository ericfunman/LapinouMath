import { useState } from 'react';
import { UserProfile, GradeLevel, MathDomain } from '../types';
import { getQuestionStats } from '../utils/questionStats';
import { getNextAccessoryToUnlock } from '../data/accessories';
import { getAvailableDomains } from '../data/questions';
import AccessoryShop from './AccessoryShop';
import RabbitShop from './RabbitShop';
import RabbitAvatar from './RabbitAvatar';

interface Props {
  profile: UserProfile;
  onStartQuiz: (level: GradeLevel, domain: MathDomain) => void;
  onLogout: () => void;
  onOpenAdmin: () => void;
  onOpenInteractiveDemo?: () => void;
  onSelectAccessory?: (accessoryId: string) => void;
  onUpdateProfile?: (profile: UserProfile) => void;
}

const getDomainEmoji = (domain: string): string => {
  const emojiMap: Record<string, string> = {
    'Calcul mental': '🧮',
    'Arithmétique': '➕',
    'Géométrie': '📐',
    'Fractions/Décimaux': '🥧',
    'Mesures': '📏',
    'Problèmes/Algèbre': '🤔',
    'Bonus - Défi Rapide': '⚡',
    'Proportions': '⚖️',
    'Kangourou': '🦘',
  };
  return emojiMap[domain] || '📚';
};

export default function Dashboard(props: Readonly<Props>) {
  const { profile, onStartQuiz, onLogout, onOpenAdmin, onOpenInteractiveDemo, onUpdateProfile } = props;
  const [showAccessoryShop, setShowAccessoryShop] = useState(false);
  const [showRabbitShop, setShowRabbitShop] = useState(false);
  const currentLevelProgress = profile.progress?.[profile.currentLevel];
  const questionStats = getQuestionStats();
  const nextAccessory = getNextAccessoryToUnlock(profile.totalStars);

  const handleSaveRabbitCustomization = (customization: {
    variant: 'classic' | 'white' | 'gray' | 'brown';
    accessories: string[];
    adjustments: Record<string, { offsetX: number; offsetY: number; scale: number }>;
    unlockedItems: string[];
  }) => {
    if (onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        rabbitCustomization: {
          variant: customization.variant,
          accessories: customization.accessories,
          adjustments: customization.adjustments,
        },
        unlockedRabbitItems: customization.unlockedItems,
      });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="cursor-pointer hover:scale-110 transition-transform bg-transparent border-none p-0" 
                onClick={() => setShowRabbitShop(true)}
                aria-label="Personnaliser CalcuLapin"
              >
                <RabbitAvatar
                  variant={profile.rabbitCustomization?.variant || 'classic'}
                  expression="happy"
                  animation="idle"
                  accessories={profile.rabbitCustomization?.accessories || []}
                  accessoryAdjustments={profile.rabbitCustomization?.adjustments}
                  size={80}
                />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Bonjour {profile.name} ! 👋
                </h1>
                <p className="text-gray-600">Niveau: {profile.currentLevel}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-accent">
                ⭐ {profile.totalStars}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowRabbitShop(true)}
                  className="text-sm bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-pink-600 font-semibold"
                >
                  🐰 Personnaliser CalcuLapin
                </button>
                <button
                  onClick={() => setShowAccessoryShop(!showAccessoryShop)}
                  className="text-sm bg-yellow-400 text-gray-800 px-3 py-1 rounded-lg hover:bg-yellow-500 font-semibold"
                >
                  🏪 Anciens Accessoires ({profile.unlockedAccessories.length})
                </button>
                {onOpenInteractiveDemo && (
                  <button
                    onClick={onOpenInteractiveDemo}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 font-semibold"
                  >
                    🎨 Démo Interactive
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Changer de profil
                </button>
                <button
                  onClick={onOpenAdmin}
                  className="text-sm bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
                >
                  ⚙️ Admin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CalcuLapin mascotte */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-7xl">🐰</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary mb-2">
                CalcuLapin dit :
              </h2>
              <p className="text-lg text-gray-700">
                "Bravo pour ton travail ! Choisis un domaine pour continuer à apprendre 🌟"
              </p>
              <p className="text-sm text-gray-600 mt-2">
                💡 Astuce : Obtiens au moins <strong>1 étoile</strong> (50% de réussite sur 5 questions) 
                pour débloquer le domaine suivant !
              </p>
              <p className="text-sm text-primary font-semibold mt-1">
                🎓 Obtiens <strong>2 étoiles dans tous les domaines</strong> pour passer au niveau supérieur !
              </p>
              <p className="text-xs text-gray-500 mt-2">
                📚 {questionStats.total} questions disponibles au total • {questionStats.byLevel[profile.currentLevel] || 0} pour ton niveau
              </p>
            </div>
          </div>
        </div>

        {/* Domaines de mathématiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentLevelProgress && getAvailableDomains(profile.currentLevel).map(domain => {
            const domainProgress = currentLevelProgress[domain];
            // Initialiser si le domaine n'existe pas (nouveau domaine)
            if (!domainProgress) {
              return null;
            }
            const isUnlocked = domainProgress.unlocked;
            const stars = domainProgress.stars;
            const successRate = domainProgress.questionsAnswered > 0
              ? Math.round((domainProgress.correctAnswers / domainProgress.questionsAnswered) * 100)
              : 0;

            return (
              <button
                key={domain}
                className={`bg-white rounded-2xl shadow-lg p-6 transition-all text-left ${
                  isUnlocked 
                    ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => isUnlocked && onStartQuiz(profile.currentLevel, domain as MathDomain)}
                disabled={!isUnlocked}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getDomainEmoji(domain)}</span>
                    <h3 className="text-xl font-bold text-gray-800">{domain}</h3>
                  </div>
                  {!isUnlocked && <span className="text-2xl">🔒</span>}
                </div>

                {isUnlocked ? (
                  <>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3].map(i => (
                        <span key={i} className="text-2xl">
                          {i <= stars ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Questions répondues: {domainProgress.questionsAnswered}</p>
                      <p>Taux de réussite: {successRate}%</p>
                      {stars === 0 && domainProgress.questionsAnswered > 0 && (
                        <p className="text-primary font-semibold mt-2">
                          🎯 Continue pour obtenir 1 étoile !
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(successRate, 100)}%` }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500 text-center py-4">
                    <p>🔒 Débloque-moi en obtenant</p>
                    <p className="font-semibold">au moins 1 étoile</p>
                    <p>dans le domaine précédent !</p>
                  </div>
                )}
              </button>
            );
          })}

          {/* Bouton Défi Rapide */}
          {currentLevelProgress && (() => {
            const totalQuestionsAnswered = Object.values(currentLevelProgress).reduce(
              (sum, domain) => sum + domain.questionsAnswered,
              0
            );
            const canPlayChallenge = totalQuestionsAnswered >= 30;

            return (
              <button
                className={`w-full bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl shadow-lg p-6 transition-all text-left ${
                  canPlayChallenge 
                    ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                } border-4 border-yellow-500 disabled:cursor-not-allowed`}
                onClick={() => canPlayChallenge && onStartQuiz(profile.currentLevel, 'Bonus - Défi Rapide' as MathDomain)}
                disabled={!canPlayChallenge}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white">⚡ Défi Rapide</h3>
                  {!canPlayChallenge && <span className="text-2xl">🔒</span>}
                </div>

                {canPlayChallenge ? (
                  <>
                    <div className="text-sm text-white space-y-2 font-semibold">
                      <p>🎮 20 questions • 5 secondes chacune</p>
                      <p>📚 Questions mélangées de tous les domaines</p>
                      <p>🏆 Bonus: +10 étoiles maximum</p>
                    </div>
                    <div className="mt-4 bg-white rounded-lg p-2 text-center">
                      <p className="text-sm font-bold text-orange-600">
                        ✨ Teste ta rapidité !
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-white text-center py-4 font-semibold">
                    <p>🔒 Réponds à au moins 30 questions</p>
                    <p>pour débloquer ce défi !</p>
                    <p className="mt-2 text-xs">
                      ({totalQuestionsAnswered}/30 questions)
                    </p>
                  </div>
                )}
              </button>
            );
          })()}
        </div>

        {/* Statistiques globales */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Tes statistiques 📊
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-100 rounded-xl">
              <div className="text-3xl font-bold text-primary">{profile.totalStars}</div>
              <div className="text-sm text-gray-600">Étoiles totales</div>
            </div>
            <div className="text-center p-4 bg-pink-100 rounded-xl">
              <div className="text-3xl font-bold text-secondary">
                {currentLevelProgress ? Object.values(currentLevelProgress).filter(d => d.unlocked).length : 0}
              </div>
              <div className="text-sm text-gray-600">Domaines débloqués</div>
            </div>
            <div className="text-center p-4 bg-yellow-100 rounded-xl">
              <div className="text-3xl font-bold text-accent">
                {currentLevelProgress ? Object.values(currentLevelProgress).reduce((sum, d) => sum + d.questionsAnswered, 0) : 0}
              </div>
              <div className="text-sm text-gray-600">Questions répondues</div>
            </div>
            <div className="text-center p-4 bg-green-100 rounded-xl">
              <div className="text-3xl font-bold text-success">
                {profile.unlockedAccessories.length}
              </div>
              <div className="text-sm text-gray-600">Accessoires débloqués</div>
            </div>
          </div>
        </div>

        {/* Next Accessory Teaser */}
        {nextAccessory && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{nextAccessory.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-1">
                  🎯 Prochain accessoire: {nextAccessory.name}
                </h3>
                <p className="text-sm text-blue-700 mb-2">
                  {nextAccessory.description}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-blue-900">
                    +{Math.max(0, nextAccessory.requiredStars - profile.totalStars)} ⭐ pour débloquer
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        (profile.totalStars / nextAccessory.requiredStars) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => setShowAccessoryShop(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                Voir la boutique →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rabbit Shop Modal */}
      {showRabbitShop && (
        <RabbitShop
          profile={profile}
          onSaveCustomization={handleSaveRabbitCustomization}
          onClose={() => setShowRabbitShop(false)}
        />
      )}

      {/* Accessory Shop Modal */}
      {showAccessoryShop && (
        <AccessoryShop
          profile={profile}
          onSelectAccessory={(accessoryId) => {
            props.onSelectAccessory?.(accessoryId);
            setShowAccessoryShop(false);
          }}
          onClose={() => setShowAccessoryShop(false)}
        />
      )}
    </div>
  );
}
