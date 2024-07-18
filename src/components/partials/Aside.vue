<script>
import { store } from "../../assets/data/store";
export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    fiftyFity() {
      store.fiftyFiftyClicked = true;
      console.log(store.fiftyFiftyClicked);
      this.$emit("fiftyFity");
    },
  },
};
</script>

<template>
  <aside class="d-none d-lg-block">
    <ul class="d-flex justify-content-center align-items-center">
      <li>
        <button class="btn btn-custom-help">
          <i class="fa-solid fa-phone-volume"></i>
        </button>
      </li>
      <li>
        <button class="btn btn-custom-help">
          <i class="fa-solid fa-users"></i>
        </button>
      </li>
      <li>
        <button
          class="btn btn-custom-help"
          :class="store.fiftyFiftyClicked ? 'blocked-blur' : ''"
          @click="fiftyFity()"
        >
          50:50
        </button>
      </li>
    </ul>

    <ul class="d-flex flex-column">
      <li
        v-for="(item, id) in store.levels"
        :key="id"
        :class="store.currentLevel === item.level ? 'active' : ''"
        class="text-box"
      >
        {{ item.level }} <span class="mx-2">&#9670;</span> {{ item.winning }}
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  width: 300px;
  flex-shrink: 0;
  background-color: #11093a;
  box-shadow: #11093a;
  border-left: 3px solid #227fb3;
  color: white;
  padding: 30px 20px;
  background: radial-gradient(#12148c, #11093a);

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 1.2rem;
      margin-bottom: 15px;
      padding: 10px;
      width: fit-content;

      &.active {
        background-color: orange;
      }
    }
  }
}
</style>
