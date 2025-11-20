import { useState } from 'react';
import RabbitAvatar, { RabbitVariant, RabbitExpression, AnimationType } from './RabbitAvatar';

export default function RabbitDemo() {
  const [variant, setVariant] = useState<RabbitVariant>('classic');
  const [expression, setExpression] = useState<RabbitExpression>('happy');
  const [animation, setAnimation] = useState<AnimationType>('idle');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [size, setSize] = useState(150);
  
  // Contrôles d'ajustement des accessoires (valeur par défaut -7px pour corriger décalage)
  const [accessoryOffsetX, setAccessoryOffsetX] = useState(-7);
  const [accessoryOffsetY, setAccessoryOffsetY] = useState(0);
  const [accessoryScale, setAccessoryScale] = useState(1);

  // Liste complète des accessoires disponibles
  const allAccessories = {
    chapeaux: ['hat-top', 'hat-party', 'hat-crown', 'hat-wizard', 'hat-santa'],
    lunettes: ['glasses-round', 'glasses-cool', 'glasses-star'],
    noeuds: ['bow-pink', 'bow-blue', 'bow-rainbow'],
    foulards: ['scarf-red', 'scarf-winter'],
    backgrounds: ['bg-stars', 'bg-hearts', 'bg-sparkles'],
  };

  const toggleAccessory = (accessoryId: string) => {
    setSelectedAccessories((prev) => {
      if (prev.includes(accessoryId)) {
        return prev.filter((id) => id !== accessoryId);
      }
      return [...prev, accessoryId];
    });
  };

  const handleAnimationComplete = () => {
    console.log('Animation terminée !');
    // Retour à idle après une animation
    if (animation !== 'idle') {
      setTimeout(() => setAnimation('idle'), 500);
    }
  };

  const variants: { id: RabbitVariant; name: string; emoji: string }[] = [
    { id: 'classic', name: 'Rose Classique', emoji: '💗' },
    { id: 'white', name: 'Blanc Pur', emoji: '🤍' },
    { id: 'gray', name: 'Gris Argenté', emoji: '🩶' },
    { id: 'brown', name: 'Brun Chocolat', emoji: '🤎' },
  ];

  const expressions: { id: RabbitExpression; name: string; emoji: string }[] = [
    { id: 'happy', name: 'Content', emoji: '😊' },
    { id: 'sad', name: 'Triste', emoji: '😢' },
    { id: 'surprised', name: 'Surpris', emoji: '😮' },
    { id: 'focused', name: 'Concentré', emoji: '🤔' },
  ];

  const animations: { id: AnimationType; name: string; emoji: string }[] = [
    { id: 'idle', name: 'Au repos', emoji: '😌' },
    { id: 'correct', name: 'Bonne réponse', emoji: '✅' },
    { id: 'wrong', name: 'Mauvaise réponse', emoji: '❌' },
    { id: 'celebrate', name: 'Célébration', emoji: '🎉' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🐰 Démo Système de Lapins Animés
          </h1>
          <p className="text-gray-600 text-lg">
            Teste les différents lapins, expressions, accessoires et animations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panneau de gauche : Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              👀 Aperçu
            </h2>

            {/* Rabbit Display */}
            <div className="flex justify-center items-center min-h-[300px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
              <RabbitAvatar
                variant={variant}
                expression={expression}
                accessories={selectedAccessories}
                size={size}
                animation={animation}
                onAnimationComplete={handleAnimationComplete}
                accessoryOffsetX={accessoryOffsetX}
                accessoryOffsetY={accessoryOffsetY}
                accessoryScale={accessoryScale}
              />
            </div>

            {/* Size Slider */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Taille: {size}px
              </label>
              <input
                type="range"
                min="80"
                max="300"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Accessory Adjustment Controls */}
            {selectedAccessories.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                <h3 className="text-sm font-bold text-gray-800 mb-3">
                  ⚙️ Ajustement des Accessoires
                </h3>
                
                <div className="space-y-3">
                  {/* Horizontal Offset */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Position Horizontale: {accessoryOffsetX}px
                    </label>
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={accessoryOffsetX}
                      onChange={(e) => setAccessoryOffsetX(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Vertical Offset */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Position Verticale: {accessoryOffsetY}px
                    </label>
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={accessoryOffsetY}
                      onChange={(e) => setAccessoryOffsetY(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Scale */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Taille Accessoires: {accessoryScale.toFixed(2)}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={accessoryScale}
                      onChange={(e) => setAccessoryScale(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={() => {
                      setAccessoryOffsetX(0);
                      setAccessoryOffsetY(0);
                      setAccessoryScale(1);
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition-colors text-xs"
                  >
                    🔄 Réinitialiser Position
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setAnimation('correct')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                ✅ Bonne Réponse
              </button>
              <button
                onClick={() => setAnimation('wrong')}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                ❌ Mauvaise Réponse
              </button>
              <button
                onClick={() => setAnimation('celebrate')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition-colors col-span-2"
              >
                🎉 Célébration !
              </button>
            </div>
          </div>

          {/* Panneau de droite : Controls */}
          <div className="space-y-6">
            {/* Variants */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                🎨 Type de Lapin
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariant(v.id)}
                    className={`p-4 rounded-lg font-semibold transition-all ${
                      variant === v.id
                        ? 'bg-purple-500 text-white ring-2 ring-purple-600 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{v.emoji}</div>
                    <div className="text-sm">{v.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Expressions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                😊 Expression
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {expressions.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setExpression(e.id)}
                    className={`p-4 rounded-lg font-semibold transition-all ${
                      expression === e.id
                        ? 'bg-blue-500 text-white ring-2 ring-blue-600 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{e.emoji}</div>
                    <div className="text-sm">{e.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Animations */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                ✨ Animation
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {animations.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAnimation(a.id)}
                    className={`p-4 rounded-lg font-semibold transition-all ${
                      animation === a.id
                        ? 'bg-pink-500 text-white ring-2 ring-pink-600 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{a.emoji}</div>
                    <div className="text-sm">{a.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accessories */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                🎩 Accessoires ({selectedAccessories.length} sélectionnés)
              </h3>
              
              {Object.entries(allAccessories).map(([category, items]) => (
                <div key={category} className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((accessoryId) => {
                      const isSelected = selectedAccessories.includes(accessoryId);
                      return (
                        <button
                          key={accessoryId}
                          onClick={() => toggleAccessory(accessoryId)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-green-500 text-white ring-2 ring-green-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {accessoryId.split('-')[1]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <button
                onClick={() => setSelectedAccessories([])}
                className="w-full mt-4 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-colors"
              >
                🗑️ Tout retirer
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            📊 Configuration Actuelle
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mb-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{variant}</div>
              <div className="text-xs text-gray-600 mt-1">Type</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{expression}</div>
              <div className="text-xs text-gray-600 mt-1">Expression</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-pink-600">{animation}</div>
              <div className="text-xs text-gray-600 mt-1">Animation</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{selectedAccessories.length}</div>
              <div className="text-xs text-gray-600 mt-1">Accessoires</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">{size}px</div>
              <div className="text-xs text-gray-600 mt-1">Taille</div>
            </div>
          </div>

          {/* Afficher les valeurs d'ajustement si modifiées */}
          {(accessoryOffsetX !== 0 || accessoryOffsetY !== 0 || accessoryScale !== 1) && (
            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-bold text-orange-800 mb-2">
                🔧 Valeurs d'ajustement (pour copier dans le code)
              </h4>
              <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
                {`accessoryOffsetX={${accessoryOffsetX}}
accessoryOffsetY={${accessoryOffsetY}}
accessoryScale={${accessoryScale}}`}
              </pre>
              <p className="text-xs text-orange-700 mt-2">
                💡 Ces valeurs peuvent être appliquées directement dans RabbitAvatar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
