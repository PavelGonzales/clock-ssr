<template>
  <div :class="['root', { 'theme--digital': isDigitalTheme }]">
    <TimerInput
      ref="timerInput"
      class="timer-input"
    />
    <div class="mt-4">
      <v-btn
        x-large
        fab
        color="green darken-3 mx-1"
        @click="start"
      >
        START
      </v-btn>
      <v-btn
        x-large
        fab
        color="red darken-3 mx-1"
        @click="stop"
      >
        STOP
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

    };
  },
  computed: {
    ...mapState('settings', {
      isDigitalTheme: state => state.isDigitalTheme,
    }),
  },
  
  methods: {
    dayjs,
    start() {
      this.$refs.timerInput.start();
    },
    stop() {
      this.$refs.timerInput.stop();
    },
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
  font-size: 23.5vw;
  font-weight: 900;
  line-height: 1em;
  text-align: center;
}

.theme--digital .timer-input {
  font-size: 15.6vw;
  line-height: 1.2em;
}
</style>
