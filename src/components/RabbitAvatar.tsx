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
  accessoryOffsetX?: number; // Décalage horizontal en pixels
  accessoryOffsetY?: number; // Décalage vertical en pixels
  accessoryScale?: number;   // Multiplicateur de taille (1.0 = normal)
}

// Couleurs pour chaque variant de lapin - Améliorées avec contours et joues
const RABBIT_COLORS: Record<RabbitVariant, { 
  body: string; 
  ears: string; 
  nose: string; 
  outline: string;
  innerEar: string;
  cheeks: string;
}> = {
  classic: { 
    body: '#FFB6C1', 
    ears: '#FF69B4', 
    nose: '#FF1493',
    outline: '#FF69B4',
    innerEar: '#FFE4E8',
    cheeks: '#FF9FB4'
  },
  white: { 
    body: '#FFFFFF', 
    ears: '#F5F5F5', 
    nose: '#FFB6C1',
    outline: '#333333',      // Contour noir pour visibilité
    innerEar: '#FFE4E8',
    cheeks: '#FFB6C1'
  },
  gray: { 
    body: '#C0C0C0', 
    ears: '#A0A0A0', 
    nose: '#696969',
    outline: '#808080',
    innerEar: '#E8E8E8',
    cheeks: '#B0B0B0'
  },
  brown: { 
    body: '#C19A6B', 
    ears: '#8B7355', 
    nose: '#654321',
    outline: '#654321',
    innerEar: '#E8D4B8',
    cheeks: '#A67C52'
  },
};

// Expressions faciales
const EXPRESSIONS: Record<RabbitExpression, { eyes: string; mouth: string }> = {
  happy: { eyes: '●●', mouth: '◡' },
  sad: { eyes: '●●', mouth: '︵' },
  surprised: { eyes: '◯◯', mouth: 'o' },
  focused: { eyes: '◐◐', mouth: '—' },
};

// Positions et tailles des accessoires selon leur type (en % de la taille du lapin)
const ACCESSORY_CONFIG: Record<string, { 
  top: string; 
  left?: string; 
  right?: string; 
  transform?: string; 
  zIndex: number;
  scale: number; // Facteur de taille par rapport au lapin
}> = {
  hat: { 
    top: '-8%', 
    left: '50%', 
    transform: 'translate(-52%, 0)', 
    zIndex: 10,
    scale: 0.45 
  },
  glasses: { 
    top: '42%', 
    left: '50%', 
    transform: 'translate(-52%, 0)', 
    zIndex: 5,
    scale: 0.35 
  },
  bow: { 
    top: '12%', 
    right: '20%',
    transform: 'translate(52%, 0)',
    zIndex: 5,
    scale: 0.3 
  },
  scarf: { 
    top: '68%', 
    left: '50%', 
    transform: 'translate(-52%, 0)', 
    zIndex: 3,
    scale: 0.38 
  },
  background: { 
    top: '0', 
    left: '0', 
    zIndex: 1,
    scale: 1.2 
  },
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
  accessoryOffsetX = 0,
  accessoryOffsetY = 0,
  accessoryScale = 1,
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
        .map((accessoryId) => {
          const config = ACCESSORY_CONFIG.background;
          const fontSize = size * config.scale;
          return (
            <div
              key={accessoryId}
              className="absolute opacity-20"
              style={{
                top: config.top,
                left: config.left,
                fontSize: `${fontSize}px`,
                zIndex: config.zIndex,
              }}
            >
              {getAccessoryEmoji(accessoryId)}
            </div>
          );
        })}

      {/* Rabbit SVG - Design amélioré */}
      <svg
        viewBox="0 -8 100 108"
        width={size}
        height={size}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Oreilles gauche - avec contour */}
        <ellipse
          cx="28"
          cy="22"
          rx="9"
          ry="28"
          fill={colors.ears}
          stroke={colors.outline}
          strokeWidth="1.5"
          transform="rotate(-25 28 22)"
        />
        {/* Oreilles droite - avec contour */}
        <ellipse
          cx="72"
          cy="22"
          rx="9"
          ry="28"
          fill={colors.ears}
          stroke={colors.outline}
          strokeWidth="1.5"
          transform="rotate(25 72 22)"
        />
        
        {/* Intérieur oreilles gauche */}
        <ellipse
          cx="28"
          cy="22"
          rx="5"
          ry="20"
          fill={colors.innerEar}
          transform="rotate(-25 28 22)"
        />
        {/* Intérieur oreilles droite */}
        <ellipse
          cx="72"
          cy="22"
          rx="5"
          ry="20"
          fill={colors.innerEar}
          transform="rotate(25 72 22)"
        />

        {/* Corps/Tête principale - plus arrondie */}
        <ellipse 
          cx="50" 
          cy="55" 
          rx="32" 
          ry="35" 
          fill={colors.body}
          stroke={colors.outline}
          strokeWidth="2"
        />
        
        {/* Joues roses */}
        <circle cx="35" cy="58" r="6" fill={colors.cheeks} opacity="0.6" />
        <circle cx="65" cy="58" r="6" fill={colors.cheeks} opacity="0.6" />
        
        {/* Yeux - plus grands et mignons */}
        <ellipse cx="40" cy="50" rx="5" ry="7" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
        <ellipse cx="60" cy="50" rx="5" ry="7" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
        
        {/* Pupilles selon l'expression */}
        <circle cx="40" cy="51" r="3" fill="#000000" />
        <circle cx="60" cy="51" r="3" fill="#000000" />
        
        {/* Reflets dans les yeux */}
        <circle cx="41" cy="49" r="1.5" fill="#FFFFFF" />
        <circle cx="61" cy="49" r="1.5" fill="#FFFFFF" />
        
        {/* Nez - plus mignon en forme de triangle */}
        <path
          d="M 50 60 L 47 64 L 53 64 Z"
          fill={colors.nose}
          stroke={colors.outline}
          strokeWidth="0.5"
        />
        
        {/* Bouche - selon l'expression */}
        {face.mouth === '◡' && (
          <path
            d="M 42 67 Q 50 72 58 67"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {face.mouth === '︵' && (
          <path
            d="M 42 71 Q 50 66 58 71"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {face.mouth === 'o' && (
          <ellipse cx="50" cy="69" rx="4" ry="5" fill="#000000" />
        )}
        {face.mouth === '—' && (
          <line x1="42" y1="69" x2="58" y2="69" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        )}
        
        {/* Moustaches - plus fines et élégantes */}
        <line x1="32" y1="60" x2="18" y2="58" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="63" x2="18" y2="65" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="66" x2="18" y2="68" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="68" y1="60" x2="82" y2="58" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="68" y1="63" x2="82" y2="65" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="68" y1="66" x2="82" y2="68" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Petites dents pour le sourire (seulement si happy) */}
        {face.mouth === '◡' && (
          <>
            <rect x="48" y="70" width="2" height="3" fill="#FFFFFF" rx="1" />
            <rect x="51" y="70" width="2" height="3" fill="#FFFFFF" rx="1" />
          </>
        )}
      </svg>

      {/* Accessoires superposés avec taille adaptative */}
      <AnimatePresence>
        {accessories
          .filter(acc => getAccessoryType(acc) !== 'background')
          .map((accessoryId) => {
            const type = getAccessoryType(accessoryId);
            const config = ACCESSORY_CONFIG[type] || ACCESSORY_CONFIG.hat;
            const fontSize = size * config.scale;
            
            const adjustedFontSize = fontSize * accessoryScale;
            const transformWithOffset = config.transform 
              ? `${config.transform} translate(${accessoryOffsetX}px, ${accessoryOffsetY}px)`
              : `translate(${accessoryOffsetX}px, ${accessoryOffsetY}px)`;
            
            const positionStyle: React.CSSProperties = {
              top: config.top,
              left: config.left,
              right: config.right,
              transform: transformWithOffset,
              zIndex: config.zIndex,
              fontSize: `${adjustedFontSize}px`,
              lineHeight: '1',
            };
            
            return (
              <motion.div
                key={accessoryId}
                className="absolute"
                style={positionStyle}
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
