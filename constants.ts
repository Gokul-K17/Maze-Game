
import { Difficulty, PlayerAvatar } from './types';

export const AVATARS: PlayerAvatar[] = ['🐀', '🦁', '🐯', '🐱', '🐼', '🐶', '🐧', '🦄', '🦋', '🐳'];

export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export const MAZE_DIMENSIONS: Record<Difficulty, { width: number; height: number }> = {
  'Easy': { width: 10, height: 10 },
  'Medium': { width: 15, height: 15 },
  'Hard': { width: 20, height: 20 },
};

export const TIMER_SETTINGS: Record<Difficulty, number> = {
  'Easy': 60,
  'Medium': 120,
  'Hard': 180,
};

export const GOAL_ICON = '🧀';
