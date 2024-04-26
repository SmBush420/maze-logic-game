<template>
  <div v-if="!isFinished" class="maze">
    <div
      v-for="(row, i) in cells"
      :key="i"
      :class="[
        'row',
        {
          easy: mode === 'Easy',
          standard: mode === 'Standard',
          hard: mode === 'Hard',
        },
      ]"
    >
      <div
        v-for="(cell, j) in row"
        :key="j"
        :class="[
          'cell',
          {
            player: i === currentCell[1] && j === currentCell[0],
            top: cell[0] === 1,
            right: cell[1] === 1,
            bottom: cell[2] === 1,
            left: cell[3] === 1,
          },
        ]"
      ></div>
    </div>
  </div>
  <div v-else class="window">
    <div>Mode: {{ mode }}</div>
    <div>Maze: {{ maxSize[0] }}x{{ maxSize[1] }}</div>
    <div>Time spent: {{ timeSpent.toFixed(2) }}s</div>
    <button @click="generateMaze">
      <img src="@/assets/img/arrow-rotate.svg" />
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMazeStore } from "@/store/maze";
export default {
  name: "GamePanel",
  computed: {
    ...mapState(useMazeStore, [
      "cells",
      "currentCell",
      "isFinished",
      "timeSpent",
      "mode",
      "maxSize",
    ]),
  },
  methods: {
    ...mapActions(useMazeStore, ["step", "generateMaze"]),
  },
  mounted() {
    const step = this.step;
    document.addEventListener("keydown", function (e) {
      step(e.key);
    });
  },
};
</script>

<style lang="scss" scoped>
.window {
  font-size: 18px;
  padding: 20px;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 20px;
  max-width: 300px;
  background: #42b983;
  button {
    background-color: #efdd17;
    width: 100px;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    padding: 10px;
    border-radius: 20px;
  }
}
.maze {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
  max-width: 1440px;
}
.row {
  display: grid;
}
.easy {
  grid-template-columns: repeat(5, 1fr);
  .cell {
    width: 70px;
    height: 70px;
  }
}
.standard {
  grid-template-columns: repeat(10, 1fr);
  .cell {
    width: 50px;
    height: 50px;
  }
}
.hard {
  grid-template-columns: repeat(15, 1fr);
  .cell {
    width: 50px;
    height: 50px;
  }
}
.cell {
  border: 5px solid transparent;
  background-color: #42b983;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top {
  border-top: 5px solid white;
}
.right {
  border-right: 5px solid white;
}
.bottom {
  border-bottom: 5px solid white;
}
.left {
  border-left: 5px solid white;
}
.player {
  background: red;
}
</style>
