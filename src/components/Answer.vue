<script>
import { store } from "../assets/data/store";
export default {
  data() {
    return {
      store,
    };
  },
  props: {
    answer: String,
    index: Number,
    classToAdd: String,
  },
  methods: {
    assignPercentageVote(index) {
      if (index === 0) {
        return 25;
      } else if (index === 1) {
        return 35;
      } else if (index === 2) {
        return 30;
      } else if (index === 3) {
        return 10;
      }
    },
  },
};
</script>

<template>
  <div class="col content-box my-3">
    <!-- <div class="arrow-left"></div> -->
    <div class="text-box text-box-answer" :class="classToAdd">
      {{ answer }}
    </div>
    <div
      class="publicVotePerc"
      v-if="store.publicHelpClicked && store.publicHelpAvailable"
    >
      {{ assignPercentageVote(index) }}%
    </div>
    <!-- <div class="arrow-right"></div> -->
  </div>
</template>

<style lang="scss" scoped>
.publicVotePerc {
  font-weight: bold;
  color: #ffa500;
  margin-top: 8px;
}
</style>
