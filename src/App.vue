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
      questionId: 0,
    };
  },
  methods: {
    selectRandomQuestion() {
      this.questionId = Math.floor(Math.random() * questions.length);
      console.log(questions.length);
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
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
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
  height: calc(100vh - 360px);
  color: white;
  padding-top: 20px;
}
</style>
