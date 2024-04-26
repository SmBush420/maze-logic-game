let finishCell = null;
function newMaze(x, y) {
  // Генеруємо пустий лабіринт
  let maze = [];
  for (let i = 0; i < y; i++) {
    maze[i] = [];
    for (let j = 0; j < x; j++) {
      maze[i][j] = [1, 1, 1, 1];
    }
  }

  // Створюємо стек для відстеження шляху
  let stack = [[0, 0]]; // Початкова точка без входу

  // Генеруємо лабіринт
  while (stack.length > 0) {
    let current = stack[stack.length - 1];
    let [currentX, currentY] = current;

    // Отримуємо сусідів
    let neighbors = [];
    if (currentX > 0) neighbors.push([currentX - 1, currentY, 3, 1]); // Лівий сусід
    if (currentX < x - 1) neighbors.push([currentX + 1, currentY, 1, 3]); // Правий сусід
    if (currentY > 0) neighbors.push([currentX, currentY - 1, 0, 2]); // Верхній сусід
    if (currentY < y - 1) neighbors.push([currentX, currentY + 1, 2, 0]); // Нижній сусід

    let unvisitedNeighbors = neighbors.filter(
      ([nx, ny]) => maze[ny][nx][4] === undefined
    );

    if (unvisitedNeighbors.length > 0) {
      // Вибираємо випадкового сусіда
      let [nextX, nextY, wall, oppositeWall] =
        unvisitedNeighbors[
          Math.floor(Math.random() * unvisitedNeighbors.length)
        ];

      // Видаляємо стіну між поточною клітинкою та сусідом
      maze[currentY][currentX][wall] = 0;
      maze[nextY][nextX][oppositeWall] = 0;

      // Позначаємо сусіда як відвіданого і додаємо його до стеку
      maze[nextY][nextX][4] = true;
      stack.push([nextX, nextY]);
    } else {
      // Якщо всі сусіди відвідані, видаляємо поточну клітинку зі стеку
      stack.pop();
    }
  }

  // Розташовуємо фініш на бічній стороні
  let side = Math.floor(Math.random() * 4); // 0 - верх, 1 - право, 2 - низ, 3 - ліво
  let finishX, finishY;
  switch (side) {
    case 0: // Верх
      finishX = Math.floor(Math.random() * x);
      finishY = 0;
      break;
    case 1: // Право
      finishX = x - 1;
      finishY = Math.floor(Math.random() * y);
      break;
    case 2: // Низ
      finishX = Math.floor(Math.random() * x);
      finishY = y - 1;
      break;
    case 3: // Ліво
      finishX = 0;
      finishY = Math.floor(Math.random() * y);
      break;
  }
  maze[finishY][finishX][side] = 0; // Видаляємо стіну для фінішу

  finishCell = [finishX, finishY];
  return { maze, finishCell };
}

export { newMaze };
