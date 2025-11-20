import { useState } from 'react';
import { UserProfile } from '../types';
import RabbitAvatar, { RabbitVariant, AccessoryAdjustment } from './RabbitAvatar';

interface Props {
  profile: UserProfile;
  onSaveCustomization: (customization: {
    variant: RabbitVariant;
    accessories: string[];
    adjustments: Record<string, AccessoryAdjustment>;
  }) => void;
  onClose: () => void;
}

// Accessoires débloquables avec leurs coûts en étoiles
const SHOP_ACCESSORIES = [
  // Chapeaux
  { id: 'hat-top', name: 'Chapeau Haut-de-forme', cost: 10, category: 'Chapeaux' },
  { id: 'hat-party', name: 'Chapeau de Fête', cost: 10, category: 'Chapeaux' },
  { id: 'hat-crown', name: 'Couronne Royale', cost: 50, category: 'Chapeaux' },
  { id: 'hat-wizard', name: 'Chapeau de Magicien', cost: 100, category: 'Chapeaux' },
  { id: 'hat-santa', name: 'Bonnet de Noël', cost: 30, category: 'Chapeaux' },
  
  // Lunettes
  { id: 'glasses-round', name: 'Lunettes Rondes', cost: 10, category: 'Lunettes' },
  { id: 'glasses-cool', name: 'Lunettes Cool', cost: 20, category: 'Lunettes' },
  { id: 'glasses-star', name: 'Lunettes Étoiles', cost: 40, category: 'Lunettes' },
  
  // Nœuds
  { id: 'bow-pink', name: 'Nœud Rose', cost: 10, category: 'Nœuds' },
  { id: 'bow-blue', name: 'Nœud Bleu', cost: 10, category: 'Nœuds' },
  { id: 'bow-rainbow', name: 'Nœud Arc-en-ciel', cost: 60, category: 'Nœuds' },
  
  // Foulards
  { id: 'scarf-red', name: 'Foulard Rouge', cost: 15, category: 'Foulards' },
  { id: 'scarf-winter', name: 'Foulard d\'Hiver', cost: 25, category: 'Foulards' },
  
  // Backgrounds
  { id: 'bg-stars', name: 'Étoiles', cost: 80, category: 'Backgrounds' },
  { id: 'bg-hearts', name: 'Cœurs', cost: 80, category: 'Backgrounds' },
  { id: 'bg-sparkles', name: 'Étincelles', cost: 100, category: 'Backgrounds' },
];

const VARIANTS = [
  { id: 'classic', name: 'Rose Classique', cost: 0 },
  { id: 'white', name: 'Blanc Neige', cost: 20 },
  { id: 'gray', name: 'Gris Argenté', cost: 30 },
  { id: 'brown', name: 'Marron Chocolat', cost: 40 },
];

export default function RabbitShop({ profile, onSaveCustomization, onClose }: Readonly<Props>) {
  const [selectedVariant, setSelectedVariant] = useState<RabbitVariant>(
    profile.rabbitCustomization?.variant || 'classic'
  );
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(
    profile.rabbitCustomization?.accessories || []
  );
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);
  const [accessoryAdjustments, setAccessoryAdjustments] = useState<Record<string, AccessoryAdjustment>>(
    profile.rabbitCustomization?.adjustments || {}
  );
  const [tempOffsetX, setTempOffsetX] = useState(0);
  const [tempOffsetY, setTempOffsetY] = useState(0);
  const [tempScale, setTempScale] = useState(1);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([
    'classic', // Variant de base toujours débloqué
    ...profile.unlockedAccessories || []
  ]);

  const canAfford = (cost: number) => profile.totalStars >= cost;
  
  const isUnlocked = (id: string) => unlockedItems.includes(id);

  const handleUnlock = (id: string, cost: number) => {
    if (canAfford(cost) && !isUnlocked(id)) {
      setUnlockedItems([...unlockedItems, id]);
      // Note: Dans une vraie app, il faudrait déduire les étoiles du profil
    }
  };

  const toggleAccessory = (id: string) => {
    if (!isUnlocked(id)) return;
    
    setSelectedAccessories(prev => {
      if (prev.includes(id)) {
        return prev.filter(a => a !== id);
      }
      return [...prev, id];
    });
  };

  const handleAccessoryClick = (id: string) => {
    setSelectedAccessory(id);
    const existing = accessoryAdjustments[id];
    setTempOffsetX(existing?.offsetX || 0);
    setTempOffsetY(existing?.offsetY || 0);
    setTempScale(existing?.scale || 1);
  };

  const applyAdjustment = () => {
    if (selectedAccessory) {
      setAccessoryAdjustments({
        ...accessoryAdjustments,
        [selectedAccessory]: {
          offsetX: tempOffsetX,
          offsetY: tempOffsetY,
          scale: tempScale,
        }
      });
    }
  };

  const handleSave = () => {
    onSaveCustomization({
      variant: selectedVariant,
      accessories: selectedAccessories,
      adjustments: accessoryAdjustments,
    });
    onClose();
  };

  const groupedAccessories = SHOP_ACCESSORIES.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof SHOP_ACCESSORIES>);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white rounded-t-3xl flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🐰 Boutique CalcuLapin</h1>
            <p className="text-sm opacity-90">Personnalise ton compagnon mathématique !</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">⭐ {profile.totalStars}</div>
            <button
              onClick={onClose}
              className="text-xl hover:scale-110 transition-transform"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Prévisualisation */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Aperçu de ton CalcuLapin
              </h2>
              <div className="flex justify-center items-center min-h-[300px]">
                <RabbitAvatar
                  variant={selectedVariant}
                  expression="happy"
                  animation="idle"
                  accessories={selectedAccessories}
                  accessoryAdjustments={accessoryAdjustments}
                  onAccessoryClick={handleAccessoryClick}
                  selectedAccessory={selectedAccessory || undefined}
                  size={200}
                />
              </div>
              
              {selectedAccessories.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700 text-center mb-2">
                    👆 Clique sur un accessoire pour l'ajuster
                  </p>
                </div>
              )}
            </div>

            {/* Ajustements individuels */}
            {selectedAccessory && (
              <div className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-300">
                <h3 className="text-sm font-bold text-gray-800 mb-3">
                  ⚙️ Ajustement: {selectedAccessory}
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Position Horizontale: {tempOffsetX}px
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={tempOffsetX}
                      onChange={(e) => {
                        setTempOffsetX(Number(e.target.value));
                        applyAdjustment();
                      }}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Position Verticale: {tempOffsetY}px
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={tempOffsetY}
                      onChange={(e) => {
                        setTempOffsetY(Number(e.target.value));
                        applyAdjustment();
                      }}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Taille: {tempScale.toFixed(2)}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={tempScale}
                      onChange={(e) => {
                        setTempScale(Number(e.target.value));
                        applyAdjustment();
                      }}
                      className="w-full"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setTempOffsetX(0);
                      setTempOffsetY(0);
                      setTempScale(1);
                      applyAdjustment();
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition-colors text-xs"
                  >
                    🔄 Réinitialiser
                  </button>

                  <button
                    onClick={() => setSelectedAccessory(null)}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded-lg transition-colors text-xs"
                  >
                    ✓ Terminé
                  </button>
                </div>
              </div>
            )}

            {/* Bouton de sauvegarde */}
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
            >
              💾 Sauvegarder ma personnalisation
            </button>
          </div>

          {/* Boutique */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {/* Variants */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🎨 Couleur du Lapin</h3>
              <div className="grid grid-cols-2 gap-3">
                {VARIANTS.map(variant => {
                  const unlocked = isUnlocked(variant.id);
                  const affordable = canAfford(variant.cost);
                  const isSelected = selectedVariant === variant.id;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => {
                        if (unlocked) {
                          setSelectedVariant(variant.id as RabbitVariant);
                        } else if (affordable) {
                          handleUnlock(variant.id, variant.cost);
                          setSelectedVariant(variant.id as RabbitVariant);
                        }
                      }}
                      className={`p-3 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-green-400 to-green-500 text-white ring-2 ring-green-600'
                          : unlocked
                          ? 'bg-white hover:bg-green-50 border-2 border-green-300'
                          : affordable
                          ? 'bg-white hover:bg-yellow-50 border-2 border-yellow-400'
                          : 'bg-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                      disabled={!unlocked && !affordable}
                    >
                      <div className="text-sm font-semibold">{variant.name}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {unlocked ? (
                          <span className="text-green-600">✓ Débloqué</span>
                        ) : (
                          <span>⭐ {variant.cost}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accessoires par catégorie */}
            {Object.entries(groupedAccessories).map(([category, items]) => (
              <div key={category} className="bg-gray-50 rounded-2xl p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {category === 'Chapeaux' && '🎩'}
                  {category === 'Lunettes' && '👓'}
                  {category === 'Nœuds' && '🎀'}
                  {category === 'Foulards' && '🧣'}
                  {category === 'Backgrounds' && '✨'}
                  {' '}{category}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {items.map(item => {
                    const unlocked = isUnlocked(item.id);
                    const affordable = canAfford(item.cost);
                    const isSelected = selectedAccessories.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (unlocked) {
                            toggleAccessory(item.id);
                          } else if (affordable) {
                            handleUnlock(item.id, item.cost);
                            toggleAccessory(item.id);
                          }
                        }}
                        className={`p-3 rounded-xl transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white ring-2 ring-blue-600'
                            : unlocked
                            ? 'bg-white hover:bg-blue-50 border-2 border-blue-300'
                            : affordable
                            ? 'bg-white hover:bg-yellow-50 border-2 border-yellow-400'
                            : 'bg-gray-200 opacity-50 cursor-not-allowed'
                        }`}
                        disabled={!unlocked && !affordable}
                      >
                        <div className="text-sm font-semibold">{item.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {unlocked ? (
                            <span className="text-green-600">✓ Débloqué</span>
                          ) : (
                            <span>⭐ {item.cost}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
