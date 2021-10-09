<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      flat
      color="transparent"
      height="64"
    >
      <v-spacer />
      <v-btn
        icon
        :ripple="false"
        @click.stop="toggleFullscreen"
      >
        <v-icon>
          <template v-if="isFullscreenMode">mdi-fullscreen-exit</template>
          <template v-else>mdi-fullscreen</template>
        </v-icon>
      </v-btn>

      <v-btn
        icon
        :ripple="false"
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
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

      <v-subheader class="font-weight-medium">Settings</v-subheader>
      <v-list class="font-weight-medium">
        <v-list-item>
          <v-list-item-action>
            <v-switch
              :input-value="darkThemeModel"
              :ripple="false"
              @change="chagngeTheme"
            />
          </v-list-item-action>
          <v-list-item-title>Dark theme</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              :input-value="withMillisecondsModel"
              :ripple="false"
              @change="setWithMilliseconds"
            />
          </v-list-item-action>
          <v-list-item-title>Show ms</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              :input-value="digitalThemeModel"
              :ripple="false"
              @change="setIsDigitalTheme"
            />
          </v-list-item-action>
          <v-list-item-title>Digital theme</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-subheader class="font-weight-medium">Themes</v-subheader>

      <v-expansion-panels
        accordion
        flat
        class="font-weight-medium"
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            Text color
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-color-picker
              dot-size="24"
              mode="hexa"
              show-swatches
              swatches-max-height="150"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Background color
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-color-picker
              dot-size="24"
              mode="hexa"
              show-swatches
              swatches-max-height="150"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
    <Footer />
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Footer,
  },

  data () {
    return {
      rightDrawer: false,
      isFullscreenMode: false,
    }
  },

  computed: {
    ...mapState('settings', {
      darkThemeModel: state => state.isDarkTheme,
      withMillisecondsModel: state => state.withMilliseconds,
      digitalThemeModel: state => state.isDigitalTheme,
    }),
  },

  created() {
    this.chagngeTheme(this.$cookies.get('isDarkTheme') || false);
    this.setWithMilliseconds(this.$cookies.get('withMilliseconds') || false);
    this.setIsDigitalTheme(this.$cookies.get('isDigitalTheme') || false);
  },

  methods: {
    ...mapActions('settings', [
      'setIsDarkTheme',
      'setWithMilliseconds',
      'setIsDigitalTheme',
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
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 48px;
}
</style>
