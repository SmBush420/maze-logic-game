<template>
  <div class="home">
    <div class="container">
      <h1>Maze logic game</h1>
      <div class="buttons">
        <button
          @click="onPlay('Easy')"
          :class="[
            'buttons__easy',
            {
              selected: mode === 'Easy',
            },
          ]"
        >
          Easy
        </button>
        <button
          @click="onPlay('Standard')"
          :class="[
            'buttons__standard',
            {
              selected: mode === 'Standard',
            },
          ]"
        >
          Standard
        </button>
        <button
          @click="onPlay('Hard')"
          :class="[
            'buttons__hard',
            {
              selected: mode === 'Hard',
            },
          ]"
        >
          Hard
        </button>
        <!-- <button @click="generateMaze" class="buttons__play">Play game</button> -->
      </div>
      <game-panel />
      <footer class="copyright">© Oleg Satsiuk</footer>
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
    ...mapState(useMazeStore, ["isFinished", "timeSpent", "stopWatch", "mode"]),
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
      this.generateMaze();
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
.container {
  position: relative;
}
h1 {
  text-align: center;
}
.buttons {
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  max-width: 330px;
  button {
    color: white;
    width: 100px;
    font-size: 16px;
    font-weight: bold;
    border: 3px solid transparent;
    border-radius: 25px;
    padding: 10px;
  }
  &__easy {
    background-color: #60c738;
  }

  &__standard {
    background-color: #f4821f;
  }

  &__hard {
    background-color: #d60909;
  }
}
.selected {
  border: 3px solid rgb(255, 255, 255) !important;
}
.copyright {
  line-height: 140%;
  text-align: center;
}
@media only screen and (max-width: 600px) {
  h1 {
    font-size: 48px;
  }
}
@media only screen and (max-width: 440px) {
  h1 {
    font-size: 32px;
  }
}
</style>
