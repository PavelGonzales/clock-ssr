<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
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
              v-model="darkThemeModel"
              inset
              :ripple="false"
            />
          </v-list-item-action>
          <v-list-item-title>Dark theme</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="withMillisecondsModel"
              inset
              :ripple="false"
            />
          </v-list-item-action>
          <v-list-item-title>Show ms</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      darkThemeModel: false,
      withMillisecondsModel: false,
      clipped: false,
      rightDrawer: false,
    }
  }
}
</script>
