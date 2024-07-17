<script>
export default {
  props: {
    answer: String,
    classToAdd: String,
  },
};
</script>

<template>
  <div class="col content-box my-3">
    <!-- <div class="arrow-left"></div> -->
    <div class="text-box text-box-answer" :class="classToAdd">
      {{ answer }}
    </div>
    <!-- <div class="arrow-right"></div> -->
  </div>
</template>

<style lang="scss" scoped></style>
