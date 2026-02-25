export interface PowerCard {
  key: string;
  name: string;
  emoji: string;
  description: string;
  power: string;
  color: string;
  bgColor: string;
}

export interface QuizAnswer {
  text: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  question: string;
  answers: QuizAnswer[];
}

export interface Entry {
  id: string;
  name: string;
  email: string;
  card_key: string;
  card_name: string;
  scores: Record<string, number>;
  created_at: string;
}

export interface Stats {
  total: number;
  byCard: { card_key: string; card_name: string; count: number }[];
}

export type QuizStep = 'welcome' | 'quiz' | 'result';

export interface QuizState {
  step: QuizStep;
  currentQuestion: number;
  scores: Record<string, number>;
  selectedCard: PowerCard | null;
  playerName: string;
  playerEmail: string;
  isSubmitting: boolean;
  hasSubmitted: boolean;
  error: string | null;
  toast: { message: string; type: 'success' | 'error' } | null;
}
