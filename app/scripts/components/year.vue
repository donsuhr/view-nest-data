<template>
  <div class="year">
    <h2>{{ year }}</h2>
    <ul>
      <li
        v-for="month in months"
        :key="year + '' + month"
      >
        <Month
          :month="month"
          :year="year"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Month from './month';

export default {
  name: 'Year',
  components: { Month },
  props: {
    year: {
      required: true,
      type: String,
    },
  },
  computed: {
    months() {
      return this.$store.getters['nestData/months'](this.year);
    },
  },
};
</script>
