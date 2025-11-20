import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

export type RabbitVariant = 'classic' | 'white' | 'gray' | 'brown';
export type RabbitExpression = 'happy' | 'sad' | 'surprised' | 'focused';
export type AnimationType = 'idle' | 'correct' | 'wrong' | 'celebrate';

interface RabbitAvatarProps {
  variant?: RabbitVariant;
  expression?: RabbitExpression;
  accessories?: string[]; // IDs from accessories.ts
  size?: number;
  animation?: AnimationType;
  onAnimationComplete?: () => void;
}

// Couleurs pour chaque variant de lapin
const RABBIT_COLORS: Record<RabbitVariant, { body: string; ears: string; nose: string }> = {
  classic: { body: '#FFB6C1', ears: '#FF69B4', nose: '#FF1493' }, // Rose
  white: { body: '#FFFFFF', ears: '#F0F0F0', nose: '#FFB6C1' },   // Blanc
  gray: { body: '#D3D3D3', ears: '#A9A9A9', nose: '#696969' },    // Gris
  brown: { body: '#D2691E', ears: '#8B4513', nose: '#654321' },   // Brun
};

// Expressions faciales
const EXPRESSIONS: Record<RabbitExpression, { eyes: string; mouth: string }> = {
  happy: { eyes: '●●', mouth: '◡' },
  sad: { eyes: '●●', mouth: '︵' },
  surprised: { eyes: '◯◯', mouth: 'o' },
  focused: { eyes: '◐◐', mouth: '—' },
};

// Positions des accessoires selon leur type
const ACCESSORY_POSITIONS: Record<string, React.CSSProperties> = {
  hat: { top: '-15%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 },
  glasses: { top: '38%', left: '50%', transform: 'translateX(-50%)', zIndex: 5 },
  bow: { top: '10%', right: '15%', zIndex: 5 },
  scarf: { top: '65%', left: '50%', transform: 'translateX(-50%)', zIndex: 3 },
  background: { top: '0', left: '0', width: '100%', height: '100%', zIndex: 1 },
};

// Animations variants - using type-safe approach
const ANIMATION_VARIANTS = {
  idle: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'loop' as const,
    },
  },
  correct: {
    scale: [1, 1.2, 1],
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.6,
    },
  },
  wrong: {
    x: [0, -10, 10, -10, 10, 0],
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
    },
  },
  celebrate: {
    scale: [1, 1.3, 1.2, 1.3, 1],
    rotate: [0, -15, 15, -15, 15, 0],
    y: [0, -30, 0],
    transition: {
      duration: 1,
    },
  },
};

export default function RabbitAvatar({
  variant = 'classic',
  expression = 'happy',
  accessories = [],
  size = 120,
  animation = 'idle',
  onAnimationComplete,
}: Readonly<RabbitAvatarProps>) {
  const colors = RABBIT_COLORS[variant];
  const face = EXPRESSIONS[expression];
  
  const animationConfig = useMemo(() => {
    const config = ANIMATION_VARIANTS[animation];
    return {
      animate: config,
    };
  }, [animation]);

  // Mapping des IDs d'accessoires vers les emojis SVG
  const getAccessoryEmoji = (accessoryId: string): string => {
    const emojiMap: Record<string, string> = {
      // Chapeaux
      'hat-top': '🎩',
      'hat-party': '🎉',
      'hat-crown': '👑',
      'hat-wizard': '🧙',
      'hat-santa': '🎅',
      
      // Lunettes
      'glasses-round': '👓',
      'glasses-cool': '😎',
      'glasses-star': '⭐',
      
      // Nœuds
      'bow-pink': '🎀',
      'bow-blue': '💙',
      'bow-rainbow': '🌈',
      
      // Foulards
      'scarf-red': '🧣',
      'scarf-winter': '❄️',
      
      // Backgrounds
      'bg-stars': '✨',
      'bg-hearts': '💕',
      'bg-sparkles': '🌟',
    };
    return emojiMap[accessoryId] || '🎁';
  };

  const getAccessoryType = (accessoryId: string): string => {
    if (accessoryId.startsWith('hat-')) return 'hat';
    if (accessoryId.startsWith('glasses-')) return 'glasses';
    if (accessoryId.startsWith('bow-')) return 'bow';
    if (accessoryId.startsWith('scarf-')) return 'scarf';
    if (accessoryId.startsWith('bg-')) return 'background';
    return 'hat';
  };

  return (
    <motion.div
      className="relative inline-block"
      style={{ width: size, height: size }}
      {...animationConfig}
      onAnimationComplete={onAnimationComplete}
    >
      {/* Background accessories */}
      {accessories
        .filter(acc => getAccessoryType(acc) === 'background')
        .map((accessoryId) => (
          <div
            key={accessoryId}
            className="absolute opacity-20 text-4xl"
            style={ACCESSORY_POSITIONS.background}
          >
            {getAccessoryEmoji(accessoryId)}
          </div>
        ))}

      {/* Rabbit SVG */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Oreilles */}
        <ellipse
          cx="30"
          cy="25"
          rx="8"
          ry="25"
          fill={colors.ears}
          transform="rotate(-20 30 25)"
        />
        <ellipse
          cx="70"
          cy="25"
          rx="8"
          ry="25"
          fill={colors.ears}
          transform="rotate(20 70 25)"
        />
        
        {/* Oreilles internes */}
        <ellipse
          cx="30"
          cy="25"
          rx="4"
          ry="18"
          fill={colors.body}
          opacity="0.6"
          transform="rotate(-20 30 25)"
        />
        <ellipse
          cx="70"
          cy="25"
          rx="4"
          ry="18"
          fill={colors.body}
          opacity="0.6"
          transform="rotate(20 70 25)"
        />

        {/* Tête */}
        <circle cx="50" cy="50" r="30" fill={colors.body} />
        
        {/* Yeux */}
        <text
          x="50"
          y="48"
          fontSize="12"
          textAnchor="middle"
          fill="#000000"
          fontWeight="bold"
        >
          {face.eyes}
        </text>
        
        {/* Nez */}
        <circle cx="50" cy="55" r="3" fill={colors.nose} />
        
        {/* Bouche */}
        <text
          x="50"
          y="68"
          fontSize="16"
          textAnchor="middle"
          fill="#000000"
        >
          {face.mouth}
        </text>
        
        {/* Moustaches */}
        <line x1="30" y1="55" x2="15" y2="53" stroke="#000000" strokeWidth="1" />
        <line x1="30" y1="58" x2="15" y2="60" stroke="#000000" strokeWidth="1" />
        <line x1="70" y1="55" x2="85" y2="53" stroke="#000000" strokeWidth="1" />
        <line x1="70" y1="58" x2="85" y2="60" stroke="#000000" strokeWidth="1" />
      </svg>

      {/* Accessoires superposés */}
      <AnimatePresence>
        {accessories
          .filter(acc => getAccessoryType(acc) !== 'background')
          .map((accessoryId) => {
            const type = getAccessoryType(accessoryId);
            const position = ACCESSORY_POSITIONS[type] || ACCESSORY_POSITIONS.hat;
            
            return (
              <motion.div
                key={accessoryId}
                className="absolute text-2xl"
                style={position}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {getAccessoryEmoji(accessoryId)}
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* Particules de célébration */}
      {animation === 'celebrate' && (
        <>
          {Array.from({ length: 8 }, (_, index) => {
            const angle = (index * Math.PI) / 4;
            return (
              <motion.div
                key={`celebration-star-${angle}-${index}`}
                className="absolute text-2xl"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(angle) * 60,
                  y: Math.sin(angle) * 60,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 1 }}
              >
                ⭐
              </motion.div>
            );
          })}
        </>
      )}
    </motion.div>
  );
}
