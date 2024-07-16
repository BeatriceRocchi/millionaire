<script>
import { store } from "../../assets/data/store";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <aside class="d-none d-lg-block">
    <div class="text-center">AIUTI</div>
    <ul>
      <li v-for="(item, id) in store.levels" :key="id">
        {{ item.level }} <span class="mx-2">&#9670;</span> {{ item.winning }}
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  width: 350px;
  flex-shrink: 0;
  background-color: #11093a;
  border-left: 3px solid white;
  color: white;
  padding: 50px;
  // background: radial-gradient(#12148c, #11093a);

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 1.2rem;
      margin-bottom: 10px;
      padding: 15px;

      &.active {
        background-color: orange;
      }
    }
  }
}
</style>
