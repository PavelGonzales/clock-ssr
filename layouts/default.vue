<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      flat
      color="transparent"
    >
      <v-toolbar-title>Web clock</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
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
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data () {
    return {
      clipped: false,
      rightDrawer: false,
    }
  },

  computed: {
    ...mapState({
      darkThemeModel: state => state.settings.isDarkTheme,
      withMillisecondsModel: state => state.settings.withMilliseconds,
    }),
  },

  mounted() {
    this.chagngeTheme(JSON.parse(localStorage.getItem('isDarkTheme') || 'false'));
    this.setWithMilliseconds(JSON.parse(localStorage.getItem('withMilliseconds') || 'false'));
  },

  methods: {
    ...mapActions([
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
