<script>
export default {
  props: {
    question: Object,
  },
};
</script>

<template>
  <div class="box">{{ question.text }}</div>
</template>

<style lang="scss" scoped></style>
