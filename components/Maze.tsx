
import React from 'react';
import { MazeGrid, Point, PlayerAvatar } from '../types';
import Player from './Player';
import { GOAL_ICON } from '../constants';

interface MazeProps {
  grid: MazeGrid;
  playerPos: Point;
  endPos: Point;
  avatar: PlayerAvatar;
  solutionPath: Point[];
  showSolution: boolean;
}

const Maze: React.FC<MazeProps> = ({ grid, playerPos, endPos, avatar, solutionPath, showSolution }) => {
  if (!grid || grid.length === 0) return null;

  const height = grid.length;
  const width = grid[0].length;
  const cellSize = 100 / Math.max(width, height);

  const isSolutionCell = (x: number, y: number) => {
    return showSolution && solutionPath.some(p => p.x === x && p.y === y);
  };

  return (
    <div className="relative w-full h-full grid" style={{
      gridTemplateColumns: `repeat(${width}, 1fr)`,
      gridTemplateRows: `repeat(${height}, 1fr)`,
    }}>
      {grid.map((row, y) =>
        row.map((cell, x) => {
          const { walls } = cell;
          const isSolution = isSolutionCell(x, y);

          const cellClasses = [
            'relative transition-colors duration-300',
            walls[0] ? 'border-t-2' : 'border-t-2 border-t-transparent',
            walls[1] ? 'border-r-2' : 'border-r-2 border-r-transparent',
            walls[2] ? 'border-b-2' : 'border-b-2 border-b-transparent',
            walls[3] ? 'border-l-2' : 'border-l-2 border-l-transparent',
            'border-cyan-500/50',
          ].join(' ');
          
          return (
            <div key={`${x}-${y}`} className={cellClasses}>
              {isSolution && (
                <div className="absolute inset-0.5 bg-yellow-400/30 rounded-full animate-pulse"></div>
              )}
            </div>
          );
        })
      )}
      <Player position={playerPos} avatar={avatar} cellSize={cellSize} />
      <div
        className="absolute flex items-center justify-center text-3xl md:text-4xl"
        style={{
          top: `${endPos.y * cellSize}%`,
          left: `${endPos.x * cellSize}%`,
          width: `${cellSize}%`,
          height: `${cellSize}%`,
          filter: 'drop-shadow(0 0 5px #fef08a)',
        }}
      >
        {GOAL_ICON}
      </div>
    </div>
  );
};

export default Maze;
