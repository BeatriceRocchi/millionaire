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
      this.$emit("fiftyFity");
    },
    phoneClicked() {
      this.$emit("phoneClicked");
    },
    publicHelp() {
      this.$emit("publicHelp");
    },
  },
};
</script>

<template>
  <aside class="d-none d-lg-block">
    <ul class="d-flex justify-content-center align-items-center">
      <li>
        <button
          class="btn btn-custom-help"
          :class="store.phoneClicked ? 'blocked-blur' : ''"
          @click="phoneClicked()"
        >
          <i class="fa-solid fa-phone-volume"></i>
        </button>
      </li>
      <li>
        <button
          class="btn btn-custom-help"
          :class="store.publicHelpClicked ? 'blocked-blur' : ''"
          @click="publicHelp()"
        >
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
  background-color: rgba(white, 0.08);
  color: white;
  padding: 10px 20px;

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      padding: 8px;
      width: fit-content;

      &.active {
        background-color: orange;
      }
    }
  }
}
</style>
