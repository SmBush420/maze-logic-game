let finishCell = null;

function newMaze(x, y) {
  // Generate an empty maze
  let maze = [];
  for (let i = 0; i < y; i++) {
    maze[i] = [];
    for (let j = 0; j < x; j++) {
      maze[i][j] = [1, 1, 1, 1];
    }
  }

  // Create a stack to track the path
  let stack = [[0, 0]]; // Start point without entrance

  // Generate the maze
  while (stack.length > 0) {
    let current = stack[stack.length - 1];
    let [currentX, currentY] = current;

    // Get neighbors
    let neighbors = [];
    if (currentX > 0) neighbors.push([currentX - 1, currentY, 3, 1]); // Left neighbor
    if (currentX < x - 1) neighbors.push([currentX + 1, currentY, 1, 3]); // Right neighbor
    if (currentY > 0) neighbors.push([currentX, currentY - 1, 0, 2]); // Top neighbor
    if (currentY < y - 1) neighbors.push([currentX, currentY + 1, 2, 0]); // Bottom neighbor

    let unvisitedNeighbors = neighbors.filter(
      ([nx, ny]) => maze[ny][nx][4] === undefined
    );

    if (unvisitedNeighbors.length > 0) {
      // Choose a random neighbor
      let [nextX, nextY, wall, oppositeWall] =
        unvisitedNeighbors[
          Math.floor(Math.random() * unvisitedNeighbors.length)
        ];

      // Remove the wall between the current cell and the neighbor
      maze[currentY][currentX][wall] = 0;
      maze[nextY][nextX][oppositeWall] = 0;

      // Mark the neighbor as visited and add it to the stack
      maze[nextY][nextX][4] = true;
      stack.push([nextX, nextY]);
    } else {
      // If all neighbors are visited, pop the current cell from the stack
      stack.pop();
    }
  }

  // Place the finish cell in the bottom-right corner
  let finishX = x - 1;
  let finishY = y - 1;
  maze[finishY][finishX][1] = 0; // Remove the wall for the finish cell

  finishCell = [finishX, finishY];
  return { maze, finishCell };
}

export { newMaze };
