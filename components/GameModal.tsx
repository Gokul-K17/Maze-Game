
import React from 'react';

interface GameModalProps {
  title: string;
  message?: string;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ title, message, onPlayAgain, onGoHome }) => {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 text-center max-w-md w-full">
        <h2 className="text-4xl font-orbitron font-bold mb-4 text-cyan-300">{title}</h2>
        {message && <p className="text-lg mb-6 text-gray-300">{message}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-6 py-3 text-lg font-orbitron bg-green-500 hover:bg-green-400 rounded-lg transition-all duration-200 text-gray-900 font-bold shadow-[0_0_15px_rgba(52,211,153,0.6)] transform hover:scale-105"
          >
            Play Again
          </button>
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-6 py-3 text-lg font-orbitron bg-blue-500 hover:bg-blue-400 rounded-lg transition-all duration-200 text-gray-900 font-bold shadow-[0_0_15px_rgba(59,130,246,0.6)] transform hover:scale-105"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
