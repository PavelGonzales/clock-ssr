<template>
  <div class="root">
    <h1 class="location-info">
      Time in {{ city }} now:
    </h1>
    <Time :class="['time', {'time--large': !withMilliseconds}]" :with-milliseconds="withMilliseconds" />
    <div class="date-info">
      {{ formattedDate }}, week {{ week }}
    </div>
    <div class="offset-info">
      <template v-if="serverData.datetime">
        <!-- <span class="offset-info__gap">Your clock is 0.3 seconds behind.</span> -->
        Accuracy of synchronisation was ±{{ offset }}.
      </template>
      <template v-else>Synchronizing...</template>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { mapState } from 'vuex';
import Time from '@/components/Time.vue';

dayjs.extend(weekOfYear);

export default {
  name: 'Home',
  components: {
    Time,
  },
  props: {
    isDarkTheme: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      serverData: {},
      offset: '',
      intervalId: -1,
    };
  },
  computed: {
    ...mapState({
      withMilliseconds: (state) => state.settings.withMilliseconds,
    }),
    formattedDate() {
      return dayjs().format('dddd, DD MMMM YYYY')
    },
    week() {
      return dayjs().week() - 1;
    },
    city() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1];
    },
  },
  created() {
    this.getServerData();
    this.intervalId = setInterval(this.getServerData, 60 * 1000);
    // const dateNow = dayjs();
    // this.$gtag.event('session info', {
    //   date: dateNow.format('DD MM YYYY'),
    //   time: dateNow.format('HH:mm:ss'),
    //   timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    // });
  },
  beforeDestroy() {
    if (this.intervalId !== -1) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    async getServerData() {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const { data: serverData } = await axios.get(`https://worldtimeapi.org/api/timezone/${timezone}`);

        this.serverData = serverData;
        this.setOffset();
      } catch (err) {
        console.log('Failed get serverData', err);
      }
    },
    setOffset() {
      const offset = Date.now() - +new Date(this.serverData.datetime || '');
      const ms = dayjs(offset).format('SSS');
      const sec = dayjs(offset).format('ss');
      if (offset >= 1000) {
        this.offset = `${sec} sec ${ms} ms`;
      } else {
        this.offset = `${ms} ms`;
      }
    },
  },
};
</script>

<style scoped>
.root {
  padding: 82px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.location-info {
  font-size: 3vw;
  line-height: 1em;
  padding-left: 16px;
  font-weight: 500;
  margin: 0;
}

.time {
  font-size: 15.7vw;
  font-weight: 900;
  line-height: 1em;
  text-align: center;
}

.time--large {
  font-size: 23.5vw;
}

.date-info {
  font-size: 3vw;
  line-height: 1em;
  text-align: right;
  padding-right: 16px;
  font-weight: 500;
}

.offset-info {
  font-size: 3vw;
  font-weight: 600;
  line-height: 1em;
  text-align: center;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
}

.offset-info__gap {
  font-size: 3.65vw;
  font-weight: 600;
}
</style>
