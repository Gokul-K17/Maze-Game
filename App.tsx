import React, { useState, useCallback } from 'react';
import { GameState, PlayerAvatar, Difficulty } from './types';
import { AVATARS, DIFFICULTIES } from './constants';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Home);
  const [playerAvatar, setPlayerAvatar] = useState<PlayerAvatar>(AVATARS[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
  const [gameKey, setGameKey] = useState<number>(0);

  const handleStartGame = useCallback(() => {
    setGameKey(prevKey => prevKey + 1);
    setGameState(GameState.Playing);
  }, []);

  const handleEndGame = useCallback((won: boolean) => {
    setGameState(won ? GameState.Won : GameState.Lost);
  }, []);

  const handleGoHome = useCallback(() => {
    setGameState(GameState.Home);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
      case GameState.Won:
      case GameState.Lost:
        return (
          <GameScreen
            key={gameKey}
            playerAvatar={playerAvatar}
            difficulty={difficulty}
            onEndGame={handleEndGame}
            onGoHome={handleGoHome}
            initialGameState={gameState}
            onNewGame={handleStartGame}
          />
        );
      case GameState.Home:
      default:
        return (
          <HomeScreen
            playerAvatar={playerAvatar}
            onPlayerAvatarChange={setPlayerAvatar}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            onStartGame={handleStartGame}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 via-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
