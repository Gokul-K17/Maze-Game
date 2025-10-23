import { MazeGrid, Cell, Point } from '../types';

export const generateMaze = (width: number, height: number): MazeGrid => {
  const grid: MazeGrid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => ({
      x,
      y,
      walls: [true, true, true, true], // top, right, bottom, left
      visited: false,
    }))
  );

  const stack: Cell[] = [];
  let current = grid[0][0];
  current.visited = true;

  const getNeighbors = (cell: Cell): Cell[] => {
    const { x, y } = cell;
    const neighbors: Cell[] = [];
    if (y > 0 && !grid[y - 1][x].visited) neighbors.push(grid[y - 1][x]);
    if (x < width - 1 && !grid[y][x + 1].visited) neighbors.push(grid[y][x + 1]);
    if (y < height - 1 && !grid[y + 1][x].visited) neighbors.push(grid[y + 1][x]);
    if (x > 0 && !grid[y][x - 1].visited) neighbors.push(grid[y][x - 1]);
    return neighbors;
  };

  const removeWall = (a: Cell, b: Cell) => {
    const dx = a.x - b.x;
    if (dx === 1) { // A is right of B
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (dx === -1) { // A is left of B
      a.walls[1] = false;
      b.walls[3] = false;
    }
    const dy = a.y - b.y;
    if (dy === 1) { // A is below B
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (dy === -1) { // A is above B
      a.walls[2] = false;
      b.walls[0] = false;
    }
  };

  do {
    const neighbors = getNeighbors(current);
    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      stack.push(current);
      removeWall(current, next);
      current = next;
      current.visited = true;
    } else if (stack.length > 0) {
      current = stack.pop()!;
    }
  } while (stack.length > 0);

  // Add loops to make the maze more complex and have multiple paths
  // The number of walls to remove is scaled with the size of the maze
  const wallsToRemoveCount = Math.floor(Math.sqrt(width * height) * 1.5);

  for (let i = 0; i < wallsToRemoveCount; i++) {
    // Pick a random cell, but not on the far right or bottom edge to simplify logic
    const x = Math.floor(Math.random() * (width - 1));
    const y = Math.floor(Math.random() * (height - 1));

    // Randomly choose to remove a wall to the right or down
    const removeRight = Math.random() < 0.5;

    if (removeRight && grid[y][x].walls[1]) {
      // If the wall to the right exists, remove it and the corresponding wall of the neighbor
      grid[y][x].walls[1] = false;
      grid[y][x + 1].walls[3] = false;
    } else if (grid[y][x].walls[2]) {
      // Otherwise, try to remove the wall below if it exists
      grid[y][x].walls[2] = false;
      grid[y + 1][x].walls[0] = false;
    }
  }

  return grid;
};

export const solveMaze = (grid: MazeGrid, start: Point, end: Point): Point[] => {
    if (!grid.length) return [];
    const height = grid.length;
    const width = grid[0].length;
    const queue: { point: Point; path: Point[] }[] = [{ point: start, path: [start] }];
    const visited = new Set<string>([`${start.x},${start.y}`]);
  
    while (queue.length > 0) {
      const { point, path } = queue.shift()!;
      const { x, y } = point;
  
      if (x === end.x && y === end.y) {
        return path;
      }
  
      const cell = grid[y][x];
  
      // Move up
      if (y > 0 && !cell.walls[0] && !visited.has(`${x},${y - 1}`)) {
        visited.add(`${x},${y - 1}`);
        queue.push({ point: { x, y: y - 1 }, path: [...path, { x, y: y - 1 }] });
      }
      // Move right
      if (x < width - 1 && !cell.walls[1] && !visited.has(`${x + 1},${y}`)) {
        visited.add(`${x + 1},${y}`);
        queue.push({ point: { x: x + 1, y }, path: [...path, { x: x + 1, y }] });
      }
      // Move down
      if (y < height - 1 && !cell.walls[2] && !visited.has(`${x},${y + 1}`)) {
        visited.add(`${x},${y + 1}`);
        queue.push({ point: { x, y: y + 1 }, path: [...path, { x, y: y + 1 }] });
      }
      // Move left
      if (x > 0 && !cell.walls[3] && !visited.has(`${x - 1},${y}`)) {
        visited.add(`${x - 1},${y}`);
        queue.push({ point: { x: x - 1, y }, path: [...path, { x: x - 1, y }] });
      }
    }
  
    return []; // No path found
  };