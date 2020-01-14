<template>
  <div class="day">
    <h4>{{ title }}</h4>
    <ul>
      <li
        v-for="(cycles, setName) in setsWithCycles"
        :key="year + month + day + setName"
      >
        <DayCycleList
          :title="setName"
          :cycles="cycles"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import DayCycleList from './day-cycle-list';

export default {
  name: 'Day',
  components: { DayCycleList },
  props: {
    year: {
      required: true,
      type: String,
    },
    month: {
      required: true,
      type: Number,
    },
    day: {
      required: true,
      type: Number,
    },
  },
  computed: {
    title() {
      return `${this.year}-${this.month}-${this.day}`;
    },
    setsWithCycles() {
      const setData = this.$store.getters['nestData/data'];
      const hasCycles = (set) => !!set[this.year]?.[this.month]?.[this.day]?.cycles.length > 0;
      const ret = Object.keys(setData).reduce((acc, x) => {
        if (hasCycles(setData[x])) {
          acc[x] = setData[x][this.year][this.month][this.day].cycles;
        }
        return acc;
      }, {});
      return ret;
    },
  },
};
</script>
