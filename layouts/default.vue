<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      flat
      :color="backgroundColor || 'transparent'"
      height="64"
    >
      <div :style="{ width: '96px' }" />
      <v-spacer />
      <v-btn text to="/" :ripple="false">Clock</v-btn>
      <v-btn text to="/timer" :ripple="false">Timer</v-btn>
      <v-spacer />
      <v-btn
        icon
        aria-label="toggle fullscreen"
        :ripple="false"
        :color="textColor"
        @click.stop="toggleFullscreen"
      >
        <v-icon>
          <template v-if="isFullscreenMode">mdi-fullscreen-exit</template>
          <template v-else>mdi-fullscreen</template>
        </v-icon>
      </v-btn>

      <v-btn
        icon
        aria-label="menu"
        :ripple="false"
        :color="textColor"
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt class="transition-background" :style="{ color: textColor, backgroundColor: backgroundColor }" />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
      width="300"
    >
      <div class="d-flex align-center px-4 pt-3 text-uppercase headline">
        <v-img class="mr-2 flex-grow-0" width="30" src="/img/icons/android-chrome-192x192.png" alt="" />
        Web clock
      </div>

      <div class="px-4 mt-3">
        <v-btn
          href="https://capu.st/webclock.online"
          target="_blank"
          block
          large
          dark
          :ripple="false"
          color="#FF2800"
        >
          <v-icon
            left
          >
            mdi-heart
          </v-icon>
          Donate
        </v-btn>
      </div>
      <Settings />
    </v-navigation-drawer>
    <Footer :style="{ color: textColor }"/>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Footer from '@/components/Footer.vue';
import Settings from '@/components/Settings.vue';

export default {
  components: {
    Footer,
    Settings,
  },
  data () {
    return {
      rightDrawer: false,
      isFullscreenMode: false,
    }
  },
  computed: {
    ...mapState('settings', {
      textColor: state => state.textColor,
      backgroundColor: state => state.backgroundColor,
    }),
  },
  created() {
    this.chagngeTheme(this.$cookies.get('isDarkTheme') || false);
    this.setWithMilliseconds(this.$cookies.get('withMilliseconds') || false);
    this.setIsDigitalTheme(this.$cookies.get('isDigitalTheme') || false);
    this.setTextColor(this.$cookies.get('textColor') || '');
    this.setBackgroundColor(this.$cookies.get('backgroundColor') || '');
  },
  methods: {
    ...mapActions('settings', [
      'setIsDarkTheme',
      'setWithMilliseconds',
      'setIsDigitalTheme',
      'setTextColor',
      'setBackgroundColor',
    ]),
    chagngeTheme(value) {
      this.$vuetify.theme.isDark = value;
      this.setIsDarkTheme(value);
    },
    toggleFullscreen() {
      if (this.isFullscreenMode) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
      this.isFullscreenMode = !this.isFullscreenMode;
    },
  },
}
</script>

<style>
.transition-background {
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) transform,
    0.2s cubic-bezier(0.4, 0, 0.2, 1) background-color,
    0.2s cubic-bezier(0.4, 0, 0.2, 1) left,
    0.2s cubic-bezier(0.4, 0, 0.2, 1) right,
    280ms cubic-bezier(0.4, 0, 0.2, 1) box-shadow,
    0.25s cubic-bezier(0.4, 0, 0.2, 1) max-width,
    0.25s cubic-bezier(0.4, 0, 0.2, 1) width;
}

.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 48px;
}
</style>
