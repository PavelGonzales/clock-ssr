<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      flat
      color="transparent"
    >
      <v-spacer />
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
    >
      <v-list>
        <div class="d-flex align-center px-4 text-uppercase headline">
          <v-img class="mr-2 flex-grow-0" width="30" src="/img/icons/android-chrome-192x192.png" alt="" />
          Web clock
        </div>

        <v-subheader>Settings</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              inset
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
              inset
              :input-value="withMillisecondsModel"
              :ripple="false"
              @change="setWithMilliseconds"
            />
          </v-list-item-action>
          <v-list-item-title>Show ms</v-list-item-title>
        </v-list-item>
      </v-list>
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
      clipped: false,
      rightDrawer: false,
    }
  },

  computed: {
    ...mapState('settings', {
      darkThemeModel: state => state.isDarkTheme,
      withMillisecondsModel: state => state.withMilliseconds,
    }),
  },

  mounted() {
    this.chagngeTheme(JSON.parse(localStorage.getItem('isDarkTheme') || 'false'));
    this.setWithMilliseconds(JSON.parse(localStorage.getItem('withMilliseconds') || 'false'));
  },

  methods: {
    ...mapActions('settings', [
      'setIsDarkTheme',
      'setWithMilliseconds',
    ]),
    chagngeTheme(value) {
      this.$vuetify.theme.isDark = value;
      this.setIsDarkTheme(value);
    },
  },
}
</script>
