
import React from 'react';

interface SidebarProps {
  onHome: () => void;
  onRestart: () => void;
  onShowAnswer: () => void;
  isSolutionVisible: boolean;
  timer: number;
}

const Sidebar: React.FC<SidebarProps> = ({ onHome, onRestart, onShowAnswer, isSolutionVisible, timer }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const buttonClass = "w-full text-lg font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 font-orbitron";
  const glassmorphismClass = "bg-white/10 backdrop-blur-sm border border-white/20";
  const neonShadowClass = "shadow-[0_0_10px_rgba(77,189,255,0.4)] hover:shadow-[0_0_15px_rgba(77,189,255,0.7)]";

  return (
    <div className={`w-full lg:w-64 flex-shrink-0 p-6 rounded-2xl space-y-4 ${glassmorphismClass}`}>
      <h2 className="text-3xl font-orbitron text-center text-cyan-300">CONTROLS</h2>
      
      <div className="text-center bg-black/30 p-4 rounded-lg">
        <div className="text-lg font-semibold text-gray-400">TIME LEFT</div>
        <div className={`text-5xl font-orbitron ${timer <= 10 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
          {formatTime(timer)}
        </div>
      </div>

      <button onClick={onShowAnswer} className={`${buttonClass} ${glassmorphismClass} ${neonShadowClass} ${isSolutionVisible ? 'bg-yellow-500/50' : 'hover:bg-cyan-500/30'}`}>
        💡 {isSolutionVisible ? 'Hide Answer' : 'Show Answer'}
      </button>

      <button onClick={onRestart} className={`${buttonClass} ${glassmorphismClass} ${neonShadowClass} hover:bg-green-500/30`}>
        🔄 Restart
      </button>

      <button onClick={onHome} className={`${buttonClass} ${glassmorphismClass} ${neonShadowClass} hover:bg-blue-500/30`}>
        🏠 Home
      </button>

      <div className="pt-4 text-center text-gray-400">
        <p className="font-bold">How to Play:</p>
        <p>Use <kbd className="p-1 bg-gray-600 rounded">WASD</kbd> or <kbd className="p-1 bg-gray-600 rounded">Arrow Keys</kbd> to move.</p>
        <p>Reach the <span className="text-yellow-300">Cheese</span> before time runs out!</p>
      </div>
    </div>
  );
};

export default Sidebar;
