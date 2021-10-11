<template>
  <div class="time">
    <div class="input-wrap" :data-mask="dataMask">
      <input
        v-show="isInputActive"
        ref="input"
        v-model="formattedTime"
        v-mask="'##:##:##'"
        class="input"
        type="text"
        @blur="onInputBlur"
      >
    </div>
    <div v-show="!isInputActive" @click="onTimeClick">
      {{ formattedTime }}
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mask } from 'vue-the-mask'

export default {
  name: 'TimerInput',
  directives: {
    mask
  },
  data() {
    return {
      intervalId: null,
      formattedTime: '',
      localStartTime: dayjs('1970-01-01T00:00:06').valueOf(),
      isInputActive: false,
    }
  },
  computed: {
    dataMask() {
      return 'HH:mm:ss'.slice(this.formattedTime.length);
    },
    canDecrementTime() {
      return (this.localStartTime + 10800000) > 0;
    },
  },
  created() {
    this.updateFormattedTime();
    this.intervalId = setInterval(this.updateFormattedTime, 1000);
  },
  beforeDestroy() {
    if (this.intervalId !== -1) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    updateFormattedTime() {
      this.localStartTime = this.localStartTime - 1000;

      if (!this.canDecrementTime) {
        this.stop();
      }
      this.formattedTime = dayjs(this.localStartTime).format('HH:mm:ss');
    },
    start() {
      if (!this.intervalId && this.canDecrementTime) {
        this.intervalId = setInterval(this.updateFormattedTime, 1000);
      }
    },
    stop() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    async onTimeClick() {
      this.isInputActive = true;
      this.stop();
      await this.$nextTick();
      this.$refs.input.focus();
    },
    onInputBlur() {
      this.isInputActive = false;
      this.localStartTime = dayjs(`2037-12-30T${this.formattedTime}`).valueOf()
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  color: inherit;
  border: none;
  outline: none;
  box-sizing: border-box;
  padding-left: 1.5px;
}

.input-wrap {
  position: relative;
}

.input-wrap::after {
  content: attr(data-mask);
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: right;
  opacity: 0.4;
}
</style>
