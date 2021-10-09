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
      const dateNow = dayjs();
      if (process.client) {
        document.title = ` Web Clock ${dateNow.format('HH:mm:ss')}`;
      }

      if (this.withMilliseconds) {
        this.formattedTime = dateNow.format('HH:mm:ss:SSS');
      } else {
        this.formattedTime = dateNow.format('HH:mm:ss');
      }
    },
  },
};
</script>
