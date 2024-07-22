import { reactive } from "vue";
import { questions } from "./db.json";
import { levels } from "./db.json";

export const store = reactive({
  questions,
  levels,
  // extractedQuestions: [],
  // questionId: 0,
  // stringClassToAdd: "",
  isClicked: false,
  isCorrect: false,
  // idSelectedAnswer: null,
  correctAnswers: 0,
  wrongAnswers: 0,
  endGame: false,
  currentLevel: 0,
  fiftyFiftyClicked: false,
  phoneClicked: false,
  publicHelpClicked: false,
});
