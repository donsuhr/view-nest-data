<style lang="scss">
.month-item {
  padding-bottom: 4px;
}
</style>

<template>
  <div class="month">
    <h3>{{ month }}</h3>
    <ul>
      <li
        v-for="dayCounter in daysInMonth"
        :key="year + '' + month + '' + dayCounter"
        class="month-item"
      >
        <Day
          :year="year"
          :month="month"
          :day="dayCounter"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Day from './day';

export default {
  name: 'Month',
  components: { Day },
  props: {
    month: {
      required: true,
      type: Number,
    },
    year: {
      required: true,
      type: String,
    },
  },
  computed: {
    daysInMonth() {
      return new Date(this.year, this.month, 0).getDate();
    },
  },
};
</script>
