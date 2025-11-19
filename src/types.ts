export type GradeLevel = 'CE1' | 'CE2' | 'CM1' | 'CM2' | '6ème' | '5ème' | '4ème';

export type MathDomain = 
  | 'Calcul mental'
  | 'Arithmétique'
  | 'Géométrie'
  | 'Fractions/Décimaux'
  | 'Mesures'
  | 'Problèmes/Algèbre'
  | 'Bonus - Défi Rapide'
  | 'Kangourou';

export type InteractionType = 'click' | 'draw' | 'select' | 'drag' | 'measure';

export interface InteractiveElement {
  id: string;
  type: 'point' | 'line' | 'circle' | 'polygon' | 'angle' | 'segment';
  x?: number;
  y?: number;
  radius?: number;
  points?: { x: number; y: number }[];
  label?: string;
  color?: string;
  interactive?: boolean;
}

export interface Question {
  id: string;
  level: GradeLevel;
  domain: MathDomain;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  lesson?: {
    title: string;
    steps: string[];
    images?: string[];
  };
  difficulty: 1 | 2 | 3;
  isInteractive?: false;
}

export type InteractiveQuestion = Omit<Question, 'isInteractive'> & {
  isInteractive: true;
  interactionType: InteractionType;
  canvas: {
    width: number;
    height: number;
    elements: InteractiveElement[];
    grid?: boolean;
  };
  expectedInteraction: {
    type: InteractionType;
    targetElement?: string;
    description: string;
  };
};

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  currentLevel: GradeLevel;
  progress: {
    [level: string]: {
      [domain: string]: {
        questionsAnswered: number;
        correctAnswers: number;
        stars: number;
        unlocked: boolean;
      };
    };
  };
  accessories: string[];
  unlockedAccessories: string[];
  selectedAccessory?: string; // ID of the currently selected accessory
  totalStars: number;
  createdAt: Date;
}

export interface Accessory {
  id: string;
  name: string;
  type: 'hat' | 'glasses' | 'bow' | 'scarf' | 'background';
  icon: string;
  requiredStars: number;
}
