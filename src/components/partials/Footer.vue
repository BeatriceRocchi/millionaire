<script>
import { store } from "../../assets/data/store";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    selectRandomQuestion() {
      this.$emit("selectRandomQuestion");
    },
    resetGame() {
      this.$emit("resetGame");
    },
  },
};
</script>

<template>
  <footer>
    <button
      v-if="!store.endGame"
      @click="selectRandomQuestion()"
      class="btn btn-light mx-2"
    >
      Prossima domanda
    </button>
    <button @click="resetGame()" class="btn btn-light mx-2">Rinizia</button>
    <div v-if="store.endGame && store.currentLevel === 10" class="my-2">
      Complimenti hai vinto!
    </div>
    <div v-else-if="store.endGame" class="my-2">
      Partita terminata <br />
      Hai riposto correttamente a {{ store.correctAnswers }} domande
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  text-align: center;
  background-color: #11093a;
  height: 150px;
  padding: 20px;
  color: white;
}
</style>
