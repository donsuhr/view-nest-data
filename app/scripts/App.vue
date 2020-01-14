<style lang="scss">
ul {
  margin: 0;
  padding: 0;
}
</style>

<template>
  <main>
    <header class="container">
      <h1 class="main-title">
        Nest Data
      </h1>
    </header>
    <ul>
      <li
        v-for="year in years"
        :key="year"
      >
        <Year :year="year" />
      </li>
    </ul>
  </main>
</template>

<script>
import Year from './components/year';

export default {
  name: 'App',
  components: { Year },
  computed: {
    years() {
      return this.$store.getters['nestData/years'];
    },
  },
  created() {
    this.$store.dispatch('nestData/loadDecember');
  },
};
</script>
