import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Difficulty, GameState, MazeGrid, PlayerAvatar, Point } from '../types';
import { generateMaze, solveMaze } from '../utils/mazeGenerator';
import { MAZE_DIMENSIONS, TIMER_SETTINGS } from '../constants';
import Maze from './Maze';
import Sidebar from './Sidebar';
import GameModal from './GameModal';
import useKeyboardControls from '../hooks/useKeyboardControls';
import useTimer from '../hooks/useTimer';

interface GameScreenProps {
  playerAvatar: PlayerAvatar;
  difficulty: Difficulty;
  onEndGame: (won: boolean) => void;
  onGoHome: () => void;
  initialGameState: GameState;
  onNewGame: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ playerAvatar, difficulty, onEndGame, onGoHome, initialGameState, onNewGame }) => {
  const { width, height } = MAZE_DIMENSIONS[difficulty];
  
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { maze, solutionPath, start, end } = useMemo(() => {
    const generatedMaze = generateMaze(width, height);
    const startPoint = { x: 0, y: 0 };
    const endPoint = { x: width - 1, y: height - 1 };
    const path = solveMaze(generatedMaze, startPoint, endPoint);
    return { maze: generatedMaze, solutionPath: path, start: startPoint, end: endPoint };
  }, [width, height]);

  const [playerPos, setPlayerPos] = useState<Point>(start);
  const [showSolution, setShowSolution] = useState(false);
  
  const timeLimit = TIMER_SETTINGS[difficulty];
  const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer(timeLimit);

  useEffect(() => {
    if (gameState === GameState.Playing && !isRunning) {
      startTimer();
    } else if (gameState !== GameState.Playing && isRunning) {
      stopTimer();
    }
  }, [gameState, isRunning, startTimer, stopTimer]);

  useEffect(() => {
    if (time === 0 && gameState === GameState.Playing) {
      setGameState(GameState.Lost);
      onEndGame(false);
    }
  }, [time, gameState, onEndGame]);

  const handleMove = useCallback((dx: number, dy: number) => {
    if (gameState !== GameState.Playing) return;

    const { x, y } = playerPos;
    const newX = x + dx;
    const newY = y + dy;
    
    if (newX < 0 || newX >= width || newY < 0 || newY >= height) return;

    const currentCell = maze[y][x];
    if (dx === 1 && !currentCell.walls[1]) setPlayerPos({ x: newX, y: newY });
    if (dx === -1 && !currentCell.walls[3]) setPlayerPos({ x: newX, y: newY });
    if (dy === 1 && !currentCell.walls[2]) setPlayerPos({ x: newX, y: newY });
    if (dy === -1 && !currentCell.walls[0]) setPlayerPos({ x: newX, y: newY });
  }, [playerPos, maze, width, height, gameState]);

  useKeyboardControls(handleMove);

  useEffect(() => {
    if (playerPos.x === end.x && playerPos.y === end.y && gameState === GameState.Playing) {
      setGameState(GameState.Won);
      onEndGame(true);
    }
  }, [playerPos, end, onEndGame, gameState]);
  
  const handleRestartLevel = useCallback(() => {
    setPlayerPos(start);
    setShowSolution(false);
    setGameState(GameState.Playing);
    resetTimer();
    startTimer();
  }, [start, resetTimer, startTimer]);


  const toggleSolution = () => {
    setShowSolution(prev => !prev);
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      <Sidebar
        onHome={onGoHome}
        onRestart={handleRestartLevel}
        onShowAnswer={toggleSolution}
        isSolutionVisible={showSolution}
        timer={time}
      />
      <div className="relative w-full aspect-square max-w-[80vh] max-h-[80vh] bg-black/30 rounded-lg border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10 p-2">
        <Maze
          grid={maze}
          playerPos={playerPos}
          endPos={end}
          avatar={playerAvatar}
          solutionPath={solutionPath}
          showSolution={showSolution}
        />
        {gameState === GameState.Won && (
          <GameModal
            title="🎉 You Win! 🎉"
            onPlayAgain={onNewGame}
            onGoHome={onGoHome}
          />
        )}
        {gameState === GameState.Lost && (
          <GameModal
            title="😢 You Lose 😢"
            message={time === 0 ? "Time's up!" : "Better luck next time!"}
            onPlayAgain={onNewGame}
            onGoHome={onGoHome}
          />
        )}
      </div>
    </div>
  );
};

export default GameScreen;
