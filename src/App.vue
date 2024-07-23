<script>
import Header from "./components/partials/Header.vue";
import Question from "./components/Question.vue";
import Answer from "./components/Answer.vue";
import Footer from "./components/partials/Footer.vue";
import Aside from "./components/partials/Aside.vue";
import { store } from "./assets/data/store";
import { questions } from "./assets/data/db.json";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    Header,
    Question,
    Answer,
    Footer,
    Aside,
    Bar,
  },

  data() {
    return {
      store,
      questions,
      extractedQuestions: [],
      questionId: 0,
      stringClassToAdd: "",
      idSelectedAnswer: null,
      correctAnswers: 0,
      wrongAnswers: 0,
      randomAnswers: [],
      randomAnswerId: 0,
      correctId: null,
      chartData: {
        labels: ["A", "B", "C", "D"],
        datasets: [
          {
            label: "Opzioni risposta",
            backgroundColor: "#ffa500",
            data: [30, 15, 35, 25],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  methods: {
    // Selezione domanda random: all'aprirsi dell'applicazione e ogni volta che la risposta è corretta, viene estratta una risposta random sulla base del livello.
    selectRandomQuestion() {
      store.currentLevel++;

      //Verifica fine partita per estrazione di tutte le domande (solo per versione non classica)
      // if (this.extractedQuestions.length === this.questions.length) {
      //   store.endGame = true;
      //   return;
      // }

      //Verifica fine partita per raggiungimento ultimo livello (10)
      // if (store.currentLevel === 11) {
      //   store.endGame = true;
      //   return;
      // }

      //Reset
      let containerElement = document.querySelector(".container");
      containerElement.classList.remove("blocked");
      this.stringClassToAdd = "";
      store.isClicked = false;
      store.isCorrect = false;
      this.idSelectedAnswer = null;
      this.randomAnswers = [];
      this.correctId = null;
      store.publicHelpAvailable = false;

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
    },

    //Verifica risposta cliccata dall'utente
    checkAnswer() {
      if (
        this.idSelectedAnswer ===
        this.questions[this.questionId].correctAnswerId
      ) {
        store.isCorrect = true;
        this.store.correctAnswers++;
        this.stringClassToAdd = "correct";

        if (store.currentLevel === 10) {
          store.endGame = true;
          return;
        }
      } else {
        store.isCorrect = false;
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
      store.currentLevel = 0;
      this.selectRandomQuestion();
      this.randomAnswers = [];
      this.correctId = null;
      store.fiftyFiftyClicked = false;
      store.phoneClicked = false;
      store.publicHelpClicked = false;
      store.publicHelpAvailable = true;
    },

    turnOnQuestion(index) {
      this.idSelectedAnswer = index;
      store.isClicked = true;
      this.stringClassToAdd = "temporary";
    },

    fiftyFity() {
      store.fiftyFiftyClicked = true;
      this.randomAnswers = [];

      do {
        this.randomAnswerId = Math.floor(
          Math.random() * this.questions[this.questionId].answers.length
        );
        if (
          !this.randomAnswers.includes(this.randomAnswerId) &&
          this.randomAnswerId !==
            this.questions[this.questionId].correctAnswerId
        ) {
          this.randomAnswers.push(this.randomAnswerId);
        }
      } while (this.randomAnswers.length < 2);
    },
    phoneClicked() {
      store.phoneClicked = true;
      this.correctId = this.questions[this.questionId].correctAnswerId;
    },
    publicHelp() {
      store.publicHelpClicked = true;
      store.publicHelpAvailable = true;
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
        <div class="container my-2">
          <div class="row row-cols-1 row-cols-lg-2">
            <Answer
              v-show="!randomAnswers.includes(index)"
              v-for="(answer, index) in questions[questionId].answers"
              :key="index"
              :answer="answer"
              :index="index"
              :classToAdd="
                store.isClicked && idSelectedAnswer === index
                  ? stringClassToAdd
                  : ''
              "
              @click="turnOnQuestion(index)"
            />
          </div>
        </div>
      </main>

      <div
        class="text-white text-center"
        v-if="store.phoneClicked && correctId"
      >
        "Mh...credo che la risposta più probabile sia
        {{ questions[questionId].answers[correctId] }}"
      </div>

      <Footer
        @selectRandomQuestion="selectRandomQuestion"
        @resetGame="resetGame"
        @checkAnswer="checkAnswer"
      />

      <!-- Opzione visualizzazione aiuto del pubblico con Chartjs -->
      <!-- <div
        class="text-white text-center"
        id="custom-chart-box"
        v-if="store.publicHelpClicked && correctId"
      >
        <Bar
          id="my-chart-id"
          class="chart-box"
          :options="chartOptions"
          :data="chartData"
        />
      </div> -->
    </div>
    <Aside
      @fiftyFity="fiftyFity"
      @phoneClicked="phoneClicked"
      @publicHelp="publicHelp"
    />
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
    padding: 0px 40px;
  }

  .chart-box {
    margin: 80px;
    color: white;
  }
}
</style>
