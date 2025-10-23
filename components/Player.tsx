
import React from 'react';
import { Point, PlayerAvatar } from '../types';

interface PlayerProps {
  position: Point;
  avatar: PlayerAvatar;
  cellSize: number;
}

const Player: React.FC<PlayerProps> = ({ position, avatar, cellSize }) => {
  return (
    <div
      className="absolute flex items-center justify-center transition-all duration-200 ease-in-out"
      style={{
        top: `${position.y * cellSize}%`,
        left: `${position.x * cellSize}%`,
        width: `${cellSize}%`,
        height: `${cellSize}%`,
      }}
    >
      <span className="text-2xl md:text-3xl animate-bounce">{avatar}</span>
    </div>
  );
};

export default Player;
