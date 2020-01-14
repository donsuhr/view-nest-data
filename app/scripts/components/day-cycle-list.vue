<style scoped lang="scss">
.day-cycle-list {
  position: relative;
  display: block;
  flex-grow: 1;
  height: 1em;
  margin: 0;
  list-style-type: none;
  border: 1px solid #bebebe;
}

.cycle {
  position: absolute;
  top: -1px;
  height: 1em;
}

.day-cycle-list-wrapper {
  display: flex;
  margin-bottom: 2px;
  padding-left: 20px;
}

.title {
  width: 75px;
  margin: 0;
  padding: 0;
  font-weight: 300;
}
</style>

<template>
  <div class="day-cycle-list-wrapper">
    <h4 class="title">
      {{ title }}
    </h4>
    <ul class="day-cycle-list">
      <li
        v-for="(cycle, i) in cycles"
        :key="'cycle' + i"
      >
        <Cycle
          class="cycle"
          v-bind="cycle"
          :set-name="title"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Cycle from './Cycle';

export default {
  name: 'DayCycleList',
  components: { Cycle },
  props: {
    title: {
      required: true,
      type: String,
    },
    cycles: {
      required: true,
      type: Array,
    },
  },
};
</script>
