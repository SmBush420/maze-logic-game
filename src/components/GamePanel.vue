<template>
  <div class="maze">
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
            finish: i === finishCell[1] && j === finishCell[0],
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
  <div v-if="isFinished" class="window">
    <div>Mode: {{ mode }}</div>
    <div>Maze: {{ maxSize[0] }}x{{ maxSize[1] }}</div>
    <div>Time spent: {{ timeSpent.toFixed(2) }}s</div>
    <button @click="generateMaze">
      <img src="@/assets/img/arrow-rotate.svg" />
    </button>
  </div>
  <template v-if="timeSpent">
    <div class="keyboard">
      <button @click="step('ArrowUp')">
        <font-awesome-icon :icon="['fas', 'arrow-up']" />
      </button>
      <button @click="step('ArrowLeft')">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button>
      <button @click="step('ArrowDown')">
        <font-awesome-icon :icon="['fas', 'arrow-down']" />
      </button>
      <button @click="step('ArrowRight')">
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </button>
    </div>
  </template>
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
      "finishCell",
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
  position: fixed;
  top: 150px;
  left: calc(50vw - (/* width */ 300px / 2));
  font-size: 18px;
  padding: 20px;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 20px;
  width: 300px;
  background: rgba(72, 51, 51, 0.845);
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
.finish {
  background: url("../assets/img/finish.png") 0 0/100% 100% no-repeat, #42b983;
}
.keyboard {
  position: fixed;
  left: calc(50vw - (/* width */ 270px / 2));
  margin-top: 20px;
  width: 270px;
  display: none;
  grid-template-columns: 1fr 1fr 1fr;
  button {
    background-color: #efdd17;
    padding: 20px;
    width: 90px;
    height: 90px;
    svg {
      width: 100%;
      height: 100%;
    }
    &:active {
      background-color: #42b983;
    }
  }
  :first-child {
    grid-column-start: 2;
  }
  :nth-child(2),
  :nth-child(3),
  :nth-child(4) {
    grid-row-start: 2;
  }
}
@media only screen and (max-width: 760px) {
  .hard {
    .cell {
      width: 40px;
      height: 40px;
    }
    .top {
      border-top: 3px solid white;
    }
    .right {
      border-right: 3px solid white;
    }
    .bottom {
      border-bottom: 3px solid white;
    }
    .left {
      border-left: 3px solid white;
    }
  }
}
@media only screen and (max-width: 600px) {
  h1 {
    font-size: 24px;
  }
  .keyboard {
    display: grid;
  }
  .hard {
    .cell {
      width: 35px;
      height: 35px;
    }
  }
}
@media only screen and (max-width: 530px) {
  .hard {
    .cell {
      width: 30px;
      height: 30px;
    }
  }
}
@media only screen and (max-width: 500px) {
  .standard {
    .cell {
      width: 40px;
      height: 40px;
    }
    .top {
      border-top: 3px solid white;
    }
    .right {
      border-right: 3px solid white;
    }
    .bottom {
      border-bottom: 3px solid white;
    }
    .left {
      border-left: 3px solid white;
    }
  }
}
@media only screen and (max-width: 450px) {
  .hard {
    .cell {
      width: 25px;
      height: 25px;
    }
    .top {
      border-top: 2px solid white;
    }
    .right {
      border-right: 2px solid white;
    }
    .bottom {
      border-bottom: 2px solid white;
    }
    .left {
      border-left: 2px solid white;
    }
  }
}
@media only screen and (max-width: 400px) {
  .standard {
    .cell {
      width: 35px;
      height: 35px;
    }
  }
  .top {
    border-top: 3px solid white;
  }
  .right {
    border-right: 3px solid white;
  }
  .bottom {
    border-bottom: 3px solid white;
  }
  .left {
    border-left: 3px solid white;
  }
}
</style>
