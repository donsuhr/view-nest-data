<style scoped lang="scss">
.cycle {
  border: 1px solid #949494;
}
</style>

<template>
  <div
    class="cycle"
    :style="cycleStyles"
    :title="title"
  />
</template>

<script>
export default {
  name: 'Cycle',
  props: {
    startTs: {
      required: true,
      type: String,
    },
    duration: {
      required: true,
      type: String,
    },
    setName: {
      required: true,
      type: String,
    },
  },
  computed: {
    cycleStyles() {
      const secInDay = 24 * 60 * 60;
      const startTime = new Date(this.startTs);
      const startSeconds = startTime.getHours() * 60 * 60 + startTime.getMinutes() * 60;
      const percentStart = (startSeconds / secInDay) * 100;
      const width = (parseInt(this.duration, 10) / secInDay) * 100;
      const ret = {
        left: `${percentStart}%`,
        width: `${width}%`,
        background: `${this.cycleColor()}`,
      };
      return ret;
    },
    title() {
      const localTime = new Date(this.startTs);
      const duration = parseInt(this.duration, 10);
      const h = Math.floor(duration / 3600);
      const m = Math.floor((duration % 3600) / 60);
      const s = Math.floor((duration % 3600) % 60);
      return `${localTime.getHours()}:${localTime.getMinutes()} for ${h}h ${m}m ${s}s`;
    },
  },
  methods: {
    cycleColor() {
      const colors = {
        'takeout-1': 'rgba(251, 195, 110, 0.55)',
        'takeout-2': 'rgba(151, 195, 110, 0.55)',
        'takeout-3': 'rgba(251, 295, 110, 0.55)',
      };
      return colors[this.setName] ?? 'rgba(51, 195, 110, 0.55)';
    },
  },
};
</script>
