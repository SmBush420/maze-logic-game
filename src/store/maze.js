import { defineStore } from "pinia";
import { newMaze } from "@/store/helpers";

export const useMazeStore = defineStore("maze", {
  state: () => ({
    mode: "Easy",
    maxSize: [5, 5],
    cells: [],
    currentCell: [0, 0],
    finishCell: [],
    stopWatch: null,
    timeSpent: 0,
  }),
  getters: {
    isFinished() {
      return this.finishCell[0] === this.currentCell[0] &&
        this.finishCell[1] === this.currentCell[1]
        ? true
        : false;
    },
  },
  actions: {
    clearStopWatch() {
      clearInterval(this.stopWatch);
      this.stopWatch = null;
    },
    setMaxSize(x, y) {
      this.maxSize = [x, y];
    },
    generateMaze() {
      this.currentCell = [0, 0];
      this.timeSpent = 0;
      clearInterval(this.stopWatch);
      this.stopWatch = setInterval(() => {
        this.timeSpent += 0.1;
      }, 100);
      const mazeResult = newMaze(this.maxSize[0], this.maxSize[1]);
      this.cells = mazeResult.maze;
      this.finishCell = mazeResult.finishCell;
    },
    setMode(mode) {
      this.mode = mode;
    },
    step(direction) {
      if (this.cells.length !== 0) {
        if (
          direction === "ArrowUp" &&
          this.currentCell[1] !== 0 &&
          this.isApproptiateToStep(direction)
        ) {
          this.currentCell[1] -= 1;
          return;
        }
        if (
          direction === "ArrowDown" &&
          this.currentCell[1] < this.maxSize[1] - 1 &&
          this.isApproptiateToStep(direction)
        ) {
          this.currentCell[1] += 1;
          return;
        }
        if (
          direction === "ArrowLeft" &&
          this.currentCell[0] !== 0 &&
          this.isApproptiateToStep(direction)
        ) {
          this.currentCell[0] -= 1;
          return;
        }
        if (
          direction === "ArrowRight" &&
          this.currentCell[0] < this.maxSize[0] - 1 &&
          this.isApproptiateToStep(direction)
        )
          this.currentCell[0] += 1;
      }
    },
    isApproptiateToStep(direction) {
      const currentCellWalls =
        this.cells[this.currentCell[1]][this.currentCell[0]];
      if (direction === "ArrowUp" && currentCellWalls[0] !== 1) return true;
      if (direction === "ArrowRight" && currentCellWalls[1] !== 1) return true;
      if (direction === "ArrowDown" && currentCellWalls[2] !== 1) return true;
      if (direction === "ArrowLeft" && currentCellWalls[3] !== 1) return true;
      return false;
    },
  },
});
