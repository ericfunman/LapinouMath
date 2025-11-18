import { UserProfile } from '../types';
import { ACCESSORIES, getUnlockedAccessories, getNextAccessoryToUnlock } from '../data/accessories';

interface Props {
  profile: UserProfile;
  onSelectAccessory: (accessoryId: string) => void;
  onClose: () => void;
}

export default function AccessoryShop({ profile, onSelectAccessory, onClose }: Props) {
  const unlockedAccessories = getUnlockedAccessories(profile.totalStars);
  const nextAccessory = getNextAccessoryToUnlock(profile.totalStars);

  const isUnlocked = (accessoryId: string) => {
    return unlockedAccessories.some(acc => acc.id === accessoryId);
  };

  const isSelected = (accessoryId: string) => {
    return profile.unlockedAccessories.includes(accessoryId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 text-white rounded-t-3xl flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🏪 Boutique des Accessoires</h1>
            <p className="text-sm opacity-90">Débloque des accessoires pour CalcuLapin en gagnant des ⭐</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* Progress indicator */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-4 rounded">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">
              ⭐ Étoiles gagnées: <span className="text-xl text-yellow-600">{profile.totalStars}</span>
            </span>
            <span className="text-sm text-gray-600">
              {unlockedAccessories.length}/{ACCESSORIES.length} accessoires débloqués
            </span>
          </div>
          {nextAccessory && (
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (profile.totalStars / nextAccessory.requiredStars) * 100
                    )}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                +{Math.max(0, nextAccessory.requiredStars - profile.totalStars)} ⭐
              </span>
            </div>
          )}
        </div>

        {/* Accessories Grid */}
        <div className="p-6">
          {/* Grouped by tier */}
          {[1, 2, 3, 4, 5].map(tier => {
            const tierAccessories = ACCESSORIES.filter(acc => acc.tier === tier);
            return (
              <div key={tier} className="mb-8">
                {/* Tier Header */}
                <div className="mb-4 pb-3 border-b-2 border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {tier === 1 && '🟢 Accessoires Basiques'}
                    {tier === 2 && '🔵 Accessoires Intermédiaires'}
                    {tier === 3 && '🟣 Accessoires Avancés'}
                    {tier === 4 && '🟠 Accessoires Légendaires'}
                    {tier === 5 && '🌟 Accessoires Ultimes'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Déblocables à partir de {tierAccessories[0]?.requiredStars} ⭐
                  </p>
                </div>

                {/* Accessories for this tier */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {tierAccessories.map(accessory => {
                    const unlocked = isUnlocked(accessory.id);
                    const selected = isSelected(accessory.id);

                    return (
                      <div
                        key={accessory.id}
                        className={`relative rounded-2xl p-4 transition-all cursor-pointer ${
                          unlocked
                            ? selected
                              ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 ring-2 ring-yellow-400 scale-105'
                              : 'bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-lg hover:scale-105'
                            : 'bg-gray-100 opacity-50 cursor-not-allowed'
                        }`}
                        onClick={() => unlocked && onSelectAccessory(accessory.id)}
                      >
                        {/* Lock badge for locked items */}
                        {!unlocked && (
                          <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                            🔒
                          </div>
                        )}

                        {/* Selected badge */}
                        {selected && (
                          <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg">
                            ✓
                          </div>
                        )}

                        {/* Large icon */}
                        <div className="text-5xl text-center mb-3">{accessory.icon}</div>

                        {/* Name and description */}
                        <h3 className="font-bold text-gray-800 text-center mb-1">
                          {accessory.name}
                        </h3>
                        <p className="text-xs text-gray-600 text-center mb-3 h-8 overflow-hidden">
                          {accessory.description}
                        </p>

                        {/* Requirements */}
                        {!unlocked ? (
                          <div className="flex items-center justify-center gap-1 pt-2 border-t border-gray-200">
                            <span className="text-lg">⭐</span>
                            <span className="text-sm font-semibold text-gray-700">
                              {accessory.requiredStars} pour débloquer
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center pt-2 border-t border-gray-200">
                            <span className="text-xs font-semibold text-green-600">✓ Débloqué</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="bg-blue-50 border-t p-4 text-center text-sm text-gray-600">
          💡 Clique sur un accessoire débloqué pour le sélectionner et voir CalcuLapin le porter !
        </div>
      </div>
    </div>
  );
}
