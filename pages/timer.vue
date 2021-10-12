<template>
  <div :class="['root', { 'theme--digital': isDigitalTheme }]">
    <TimerInput
      ref="timerInput"
      class="timer-input"
      :is-digital-theme="isDigitalTheme"
    />
    <div class="mt-4">
      <v-btn
        large
        dark
        :color="`${isTimerStarted ? 'red' : 'green'} ${isDarkTheme ? 'darken-3' : 'darken-1'}`"
        :ripple="false"
        width="105"
        @click="toggleTimer"
      >
        <template v-if="!isTimerStarted">
          <v-icon left>mdi-motion-play-outline</v-icon>
          play
        </template>
        <template v-else>
          <v-icon left>mdi-motion-pause-outline</v-icon>
          pause
        </template>

      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import TimerInput from '@/components/TimerInput.vue';

dayjs.extend(weekOfYear);

export default {
  name: 'Timer',
  components: {
    TimerInput,
  },
  data() {
    return {
      isTimerStarted: false,
    };
  },
  computed: {
    ...mapState('settings', {
      isDigitalTheme: state => state.isDigitalTheme,
      isDarkTheme: state => state.isDarkTheme
    }),
  },
  mounted() {
    document.title = `Web Clock`;
    this.$watch(() => {
      this.isTimerStarted = this.$refs.timerInput.intervalId;
      return this.$refs.timerInput.intervalId;
    }, (value) => {
      this.isTimerStarted = value;
    });
  },
  methods: {
    dayjs,
    toggleTimer() {
      if (this.isTimerStarted) {
        this.$refs.timerInput.stop();
      } else if (this.$refs.timerInput.canDecrementTime) {
        this.$refs.timerInput.start();
      } else {
        this.$refs.timerInput.onTimeClick();
      }
    }
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 53px);
}

.root.theme--digital {
  font-family: 'digital_dream', 'Roboto', sans-serif;
}

.timer-input {
  font-size: 20.5vw;
  font-weight: 900;
  line-height: 1.1em;
  text-align: center;
}

.theme--digital .timer-input {
  font-size: 15.6vw;
  line-height: 1.2em;
}
</style>
