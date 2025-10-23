
import { useEffect } from 'react';

type MoveCallback = (dx: number, dy: number) => void;

const useKeyboardControls = (onMove: MoveCallback) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          onMove(0, -1);
          break;
        case 'ArrowDown':
        case 's':
          onMove(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
          onMove(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
          onMove(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onMove]);
};

export default useKeyboardControls;
