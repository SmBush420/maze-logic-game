<template>
  <div class="home">
    <div class="container">
      <h1>Maze logic game</h1>
      <div class="buttons">
        <button
          @click="onPlay('Easy')"
          class="buttons__easy"
          :disabled="stopWatch"
        >
          Easy
        </button>
        <button
          @click="onPlay('Standard')"
          class="buttons__standard"
          :disabled="stopWatch"
        >
          Standard
        </button>
        <button
          @click="onPlay('Hard')"
          class="buttons__hard"
          :disabled="stopWatch"
        >
          Hard
        </button>
        <button @click="generateMaze" class="buttons__play">Play game</button>
      </div>
      <game-panel />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useMazeStore } from "@/store/maze";
import GamePanel from "@/components/GamePanel";

export default {
  name: "HomeView",
  components: {
    GamePanel,
  },
  computed: {
    ...mapState(useMazeStore, ["isFinished", "timeSpent", "stopWatch"]),
  },
  methods: {
    ...mapActions(useMazeStore, [
      "generateMaze",
      "setMaxSize",
      "clearStopWatch",
      "setMode",
    ]),
    onPlay(mode) {
      this.setMode(mode);
      switch (mode) {
        case "Easy":
          this.setMaxSize(5, 5);
          break;
        case "Standard":
          this.setMaxSize(10, 10);
          break;
        case "Hard":
          this.setMaxSize(15, 15);
          break;
        default:
          break;
      }
    },
  },
  watch: {
    isFinished() {
      if (this.isFinished === true) this.clearStopWatch();
    },
  },
};
</script>

<style lang="scss">
h1 {
  text-align: center;
}
.buttons {
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 300px;
  button {
    border-radius: 20px;
    padding: 10px;
  }
  &__easy {
    background-color: green;
  }

  &__standard {
    background-color: orange;
  }

  &__hard {
    background-color: red;
  }
}
</style>
