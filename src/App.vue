<template>
  <div id="app">
    <h1 class="title">
      Managers Project
    </h1>
    <GoodsList />
  </div>
</template>

<script>
import GoodsList from "./components/GoodsList.vue";

export default {
  name: "app",
  components: {
    GoodsList
  }
};
</script>

<style lang="scss" scoped>
#app {
  border: 2px solid lightblue;
  height: 100%;

  .title {
    text-align: center;
  }
}
</style>
