<template>
  <div class="time">
    {{ formattedTime }}
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'TimerInput',

  props: {
    startTime: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      intervalId: null,
      formattedTime: '',
      localStartTime: '',
    }
  },
  created() {
    if (this.startTime) {
      this.localStartTime = this.startTime;
      this.updateFormattedTime();
      this.intervalId = setInterval(this.updateFormattedTime, 16);
    }
  },
  beforeDestroy() {
    if (this.intervalId !== -1) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    updateFormattedTime() {
      this.localStartTime = this.localStartTime - 16;

      this.formattedTime = dayjs(this.localStartTime).format('HH:mm:ss:SSS');
    },
    start() {
      if (!this.intervalId) {
        this.intervalId = setInterval(this.updateFormattedTime, 16);
      }
    },
    stop() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
  },
};
</script>
