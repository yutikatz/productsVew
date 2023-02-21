<template>
  <products />
</template>

<script>
import "./styles/base.scss";
import products from "./components/existProducts.vue";

export default {
  name: "App",
  components: {
    products,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
