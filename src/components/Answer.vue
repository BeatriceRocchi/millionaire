<script>
export default {
  props: {
    answer: String,
    classToAdd: String,
  },
};
</script>

<template>
  <div class="col my-3">
    <div class="box" :class="classToAdd">{{ answer }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
