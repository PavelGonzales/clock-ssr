<template>
  <div class="time">
    {{ formattedTime }}
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'Time',
  props: {
    withMilliseconds: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      intervalId: -1,
      formattedTime: '',
    }
  },
  created() {
    this.updateFormattedTime();
    this.intervalId = setInterval(this.updateFormattedTime, 16);
  },
  beforeDestroy() {
    if (this.intervalId !== -1) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    updateFormattedTime() {
      if (this.withMilliseconds) {
        this.formattedTime = dayjs().format('HH:mm:ss:SSS');
      } else {
        this.formattedTime = dayjs().format('HH:mm:ss');
      }
    },
  },
};
</script>
