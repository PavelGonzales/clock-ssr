<template>
  <div :class="['root', { 'theme--digital': isDigitalTheme }]">
    <h1 class="location-info">
      UTC time now:
    </h1>
    <Time :utc-unix-time="utcUnixTime" :class="['time', {'time--large': !withMilliseconds}]" :with-milliseconds="withMilliseconds" />
    <div class="date-info">
      {{ formattedDate }}, week {{ week }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import { mapState } from 'vuex';
import Time from '@/components/Time.vue';
dayjs.extend(utc);
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
      intervalId: -1,
      utcUnixTime: +new Date(),
    };
  },
  computed: {
    ...mapState('settings', {
      withMilliseconds: state => state.withMilliseconds,
      isDigitalTheme: state => state.isDigitalTheme,
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
    if (process.client) {
      this.getServerData();
      this.intervalId = setInterval(this.getServerData, 60 * 1000);
      const dateNow = dayjs();
      this.$gtag.event('session info', {
        date: dateNow.format('DD MM YYYY'),
        time: dateNow.format('HH:mm:ss'),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    }
  },
  beforeDestroy() {
    if (this.intervalId !== -1) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    async getServerData() {
      try {
        const timezone = 'Europe/London';
        const { data: serverData } = await axios.get(`https://worldtimeapi.org/api/timezone/${timezone}`);

        this.serverData = serverData;
        this.utcUnixTime = +new Date(this.serverData.utc_datetime);
      } catch (err) {
        console.log('Failed get serverData', err);
      }
    },
  },
};
</script>

<style scoped>
.root {
  padding-bottom: 56px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.root.theme--digital {
  font-family: 'digital_dream', 'Roboto', sans-serif;
}

.location-info {
  font-size: 3vw;
  line-height: 1em;
  padding-left: 16px;
  font-weight: 600;
  margin: 0;
}

.time {
  font-size: 13.7vw;
  font-weight: 800;
  line-height: 1em;
  text-align: center;
}

.theme--digital .time {
  font-size: 10.3vw;
  line-height: 1.2em;
}

.time--large {
  font-size: 20.5vw;
}

.theme--digital .time--large {
  font-size: 15.6vw;
}

.date-info {
  font-size: 3vw;
  line-height: 1em;
  text-align: right;
  padding-right: 16px;
  font-weight: 600;
}
</style>
