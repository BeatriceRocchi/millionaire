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
    };
  },
  methods: {
    selectRandomQuestion() {
      //Verifica fine partita per estrazione di tutte le domande
      if (this.extractedQuestions.length === this.questions.length) {
        return console.log("fine partita");
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
        this.stringClassToAdd = "correct";
      } else {
        this.isCorrect = false;
        this.stringClassToAdd = "wrong";
      }

      //Aggiunta blocco sul container delle domande per evitare l'utente possa ricliccare dopo aver dato la risposta
      let containerElement = document.querySelector(".container");
      containerElement.classList.add("blocked");
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
    <button @click="selectRandomQuestion()" class="btn btn-light">
      Prossima domanda
    </button>
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
  height: calc(100vh - 360px - 100px);
  color: white;
  padding-top: 20px;
}

footer {
  text-align: center;
  background-color: #11093a;
  height: 100px;
  padding: 20px;
}
</style>
