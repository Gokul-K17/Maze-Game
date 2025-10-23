
export interface Cell {
  x: number;
  y: number;
  walls: [boolean, boolean, boolean, boolean]; // top, right, bottom, left
  visited: boolean;
}

export type MazeGrid = Cell[][];

export interface Point {
  x: number;
  y: number;
}

export enum GameState {
  Home = 'HOME',
  Playing = 'PLAYING',
  Won = 'WON',
  Lost = 'LOST',
}

export type PlayerAvatar = string;

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
