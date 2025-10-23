
import React from 'react';
import { PlayerAvatar, Difficulty } from '../types';
import { AVATARS, DIFFICULTIES } from '../constants';

interface HomeScreenProps {
  playerAvatar: PlayerAvatar;
  onPlayerAvatarChange: (avatar: PlayerAvatar) => void;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStartGame: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  playerAvatar,
  onPlayerAvatarChange,
  difficulty,
  onDifficultyChange,
  onStartGame,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-black/20 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 border border-cyan-500/20">
      <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-4 text-cyan-300 tracking-widest text-shadow-glow">
        MAZE ESCAPE
      </h1>
      <h2 className="text-2xl md:text-3xl font-orbitron mb-12 text-gray-300">ADVENTURE</h2>

      <div className="w-full max-w-lg space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-center text-cyan-400">Choose Your Avatar</h3>
          <div className="grid grid-cols-5 gap-4 bg-white/5 p-4 rounded-lg">
            {AVATARS.map((avatar) => (
              <button
                key={avatar}
                onClick={() => onPlayerAvatarChange(avatar)}
                className={`text-4xl p-2 rounded-lg transition-all duration-200 transform hover:scale-125 ${
                  playerAvatar === avatar ? 'bg-cyan-500/30 scale-110 ring-2 ring-cyan-400' : 'bg-transparent'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-center text-cyan-400">Select Difficulty</h3>
          <div className="flex justify-center space-x-4">
            {DIFFICULTIES.map((level) => (
              <button
                key={level}
                onClick={() => onDifficultyChange(level)}
                className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
                  difficulty === level
                    ? 'bg-cyan-500 text-gray-900 shadow-[0_0_10px_rgba(77,189,255,0.7)]'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onStartGame}
          className="w-full py-4 text-2xl font-orbitron bg-green-500 hover:bg-green-400 rounded-lg transition-all duration-200 text-gray-900 font-bold shadow-[0_0_15px_rgba(52,211,153,0.6)] hover:shadow-[0_0_25px_rgba(52,211,153,0.8)] transform hover:scale-105"
        >
          START GAME
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
