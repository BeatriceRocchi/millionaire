<script>
import { store } from "../../assets/data/store";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    checkAnswer() {
      this.$emit("checkAnswer");
    },
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
    <!-- Button per confermare la risposta -->
    <button
      v-if="!store.endGame && store.isClicked && !store.isCorrect"
      @click="checkAnswer()"
      class="btn btn-custom mx-2"
    >
      L'accendiamo?
    </button>

    <!-- Button per accedere a domanda successiva (visibile finchè si è in gioco) -->
    <button
      v-if="!store.endGame && store.isCorrect"
      @click="selectRandomQuestion()"
      class="btn btn-custom mx-2"
    >
      Prossima domanda
    </button>

    <!-- Button per riniziare il gioco (visibile solo se si sbaglia) -->
    <button
      v-if="store.endGame"
      @click="resetGame()"
      class="btn btn-custom mx-2"
    >
      Rinizia
    </button>

    <div
      v-if="store.currentLevel === 10 && store.endGame && store.isCorrect"
      class="my-2"
    >
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
  // height: 150px;
  padding: 20px;
  color: white;
}
</style>
