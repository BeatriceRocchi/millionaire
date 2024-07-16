<script>
import Header from "./components/partials/Header.vue";
import Question from "./components/Question.vue";
import Answer from "./components/Answer.vue";
import Footer from "./components/partials/Footer.vue";
import Aside from "./components/partials/Aside.vue";
import { store } from "./assets/data/store";
import { questions } from "./assets/data/db.json";

export default {
  components: {
    Header,
    Question,
    Answer,
    Footer,
    Aside,
  },

  data() {
    return {
      store,
      questions,
      extractedQuestions: [],
      questionId: 0,
      stringClassToAdd: "",
      isClicked: false,
      isCorrect: false,
      idSelectedAnswer: null,
      correctAnswers: 0,
      wrongAnswers: 0,
    };
  },
  methods: {
    selectRandomQuestion() {
      console.log("Livello di gioco", store.currentLevel);
      //Verifica fine partita per estrazione di tutte le domande (solo per versione non classica)
      // if (this.extractedQuestions.length === this.questions.length) {
      //   store.endGame = true;
      //   return;
      // }

      //Verifica fine partita per raggiungimento ultimo livello (10)
      if (store.currentLevel === 10) {
        store.endGame = true;
        return;
      }

      //Reset
      let containerElement = document.querySelector(".container");
      containerElement.classList.remove("blocked");
      this.stringClassToAdd = "";
      this.isClicked = false;
      this.isCorrect = false;
      this.idSelectedAnswer = null;

      //Estrazione random domanda con esclusione delle domande già estratte (solo versione non classica)
      // do {
      //   this.questionId = Math.floor(Math.random() * this.questions.length);
      // } while (
      //   this.extractedQuestions.includes(this.questions[this.questionId]) &&
      //   this.questions[this.questionId].level === this.currentLevel
      // );

      // this.extractedQuestions.push(this.questions[this.questionId]);

      //Estrazione random domanda sulla base del livello
      do {
        this.questionId = Math.floor(Math.random() * this.questions.length);
      } while (this.questions[this.questionId].level !== store.currentLevel);

      console.log("Livello domanda", this.questions[this.questionId].level);
    },

    //Verifica risposta cliccata dall'utente
    checkAnswer(index) {
      this.idSelectedAnswer = index;
      this.isClicked = true;
      if (index === this.questions[this.questionId].correctAnswerId) {
        this.isCorrect = true;
        this.store.correctAnswers++;
        store.currentLevel++;
        this.stringClassToAdd = "correct";
      } else {
        this.isCorrect = false;
        this.store.wrongAnswers++;
        this.stringClassToAdd = "wrong";
        store.endGame = true;
      }

      //Aggiunta blocco sul container delle domande per evitare l'utente possa ricliccare dopo aver dato la risposta
      let containerElement = document.querySelector(".container");
      containerElement.classList.add("blocked");
    },

    resetGame() {
      store.endGame = false;
      this.extractedQuestions = [];
      this.store.correctAnswers = 0;
      this.store.wrongAnswers = 0;
      store.currentLevel = 1;
      this.selectRandomQuestion();
    },
  },
  mounted() {
    this.selectRandomQuestion();
  },
};
</script>

<template>
  <div class="wrapper d-flex">
    <div class="left">
      <Header />

      <main>
        <Question :question="questions[questionId]" />
        <div class="container my-5">
          <div class="row row-cols-1 row-cols-lg-2">
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

      <Footer
        @selectRandomQuestion="selectRandomQuestion"
        @resetGame="resetGame"
      />
    </div>
    <Aside />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";
.left {
  flex-grow: 1;
  main {
    text-align: center;
    background-color: #11093a;
    color: white;
    padding: 20px 40px;
  }

  footer {
    text-align: center;
    background-color: #11093a;
    height: 150px;
    padding: 20px;
    color: white;
  }
}
</style>
