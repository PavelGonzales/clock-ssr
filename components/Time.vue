<template>
  <div class="time">
    {{ formattedTime }}
  </div>
</template>

<script>
import dayjs from 'dayjs';

const UPADTE_INTERVAL_MS = 16;

export default {
  name: 'Time',
  props: {
    utcUnixTime: {
      type: Number,
      required: true,
    },
    withMilliseconds: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      intervalId: -1,
      formattedTime: '',
      localUtcUnixTime: 0,
    }
  },
  computed: {
    time() {
      return dayjs(this.localUtcUnixTime).utc();
    },
  },
  watch: {
    utcUnixTime() {
      this.localUtcUnixTime = this.utcUnixTime;
    }
  },
  created() {
    this.updateFormattedTime();
    this.intervalId = setInterval(this.updateFormattedTime, UPADTE_INTERVAL_MS);
  },
  beforeDestroy() {
    if (this.intervalId !== -1) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    updateFormattedTime() {
      if (!this.time) {
        return;
      }

      if (process.client) {
        document.title = `${this.time.format('HH:mm:ss')} – Web Clock`;
      }

      if (this.withMilliseconds) {
        this.formattedTime = this.time.format('HH:mm:ss:SSS');
      } else {
        this.formattedTime = this.time.format('HH:mm:ss');
      }

      this.localUtcUnixTime = this.localUtcUnixTime + UPADTE_INTERVAL_MS;
    },
  },
};
</script>
