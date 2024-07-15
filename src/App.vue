<script>
import LogoContainer from "./components/LogoContainer.vue";
import Question from "./components/Question.vue";
import Answer from "./components/Answer.vue";

import { questions } from "./assets/data/db.json";
export default {
  components: {
    LogoContainer,
    Question,
    Answer,
  },

  data() {
    return {
      questions,
      extractedQuestions: [],
      questionId: 0,
      stringClassToAdd: "",
      isClicked: false,
      isCorrect: false,
      idSelectedAnswer: null,
      correctAnswers: 0,
      wrongAnswers: 0,
      endGame: false,
    };
  },
  methods: {
    selectRandomQuestion() {
      //Verifica fine partita per estrazione di tutte le domande
      if (this.extractedQuestions.length === this.questions.length) {
        this.endGame = true;
        return;
      }

      //Reset
      let containerElement = document.querySelector(".container");
      containerElement.classList.remove("blocked");
      this.stringClassToAdd = "";
      this.isClicked = false;
      this.isCorrect = false;
      this.idSelectedAnswer = null;

      //Estrazione random domanda con esclusione delle domande già estratte
      do {
        this.questionId = Math.floor(Math.random() * this.questions.length);
      } while (
        this.extractedQuestions.includes(this.questions[this.questionId])
      );

      this.extractedQuestions.push(this.questions[this.questionId]);
    },

    //Verifica risposta cliccata dall'utente
    checkAnswer(index) {
      this.idSelectedAnswer = index;
      this.isClicked = true;
      if (index === this.questions[this.questionId].correctAnswerId) {
        this.isCorrect = true;
        this.correctAnswers++;
        this.stringClassToAdd = "correct";
      } else {
        this.isCorrect = false;
        this.wrongAnswers++;
        this.stringClassToAdd = "wrong";
      }

      //Aggiunta blocco sul container delle domande per evitare l'utente possa ricliccare dopo aver dato la risposta
      let containerElement = document.querySelector(".container");
      containerElement.classList.add("blocked");
    },

    resetGame() {
      this.endGame = false;
      this.extractedQuestions = [];
      this.correctAnswers = 0;
      this.wrongAnswers = 0;
      this.selectRandomQuestion();
    },
  },
  mounted() {
    this.selectRandomQuestion();
  },
};
</script>

<template>
  <header>
    <LogoContainer />
  </header>

  <main>
    <Question :question="questions[questionId]" />
    <div class="container my-5">
      <div class="row row-cols-2">
        <Answer
          v-for="(answer, index) in questions[questionId].answers"
          :key="index"
          :answer="answer"
          :classToAdd="
            isClicked && idSelectedAnswer === index ? stringClassToAdd : ''
          "
          @click="checkAnswer(index)"
        />
      </div>
    </div>
  </main>

  <footer>
    <button @click="selectRandomQuestion()" class="btn btn-light mx-2">
      Prossima domanda
    </button>
    <button @click="resetGame()" class="btn btn-light mx-2">Rinizia</button>
    <div v-if="endGame" class="my-2">
      Partita terminata <br />
      Hai riposto correttamente a {{ correctAnswers }} domande su
      {{ questions.length }}
    </div>
  </footer>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

header {
  background-color: #12148c;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
}

main {
  text-align: center;
  background-color: #11093a;
  height: calc(100vh - 360px - 150px);
  color: white;
  padding-top: 20px;
}

footer {
  text-align: center;
  background-color: #11093a;
  height: 150px;
  padding: 20px;
  color: white;
}
</style>
