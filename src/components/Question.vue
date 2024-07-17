<script>
export default {
  props: {
    question: Object,
  },
};
</script>

<template>
  <div class="content-box">
    <div class="arrow-left"></div>
    <div class="text-box">{{ question.text }}</div>
    <div class="arrow-right"></div>
  </div>
</template>

<style lang="scss" scoped></style>
