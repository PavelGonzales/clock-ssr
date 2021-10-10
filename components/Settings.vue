<template>
  <div>
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

    <v-subheader class="font-weight-medium d-flex justify-space-between">
      Custom theme
      <v-btn x-small @click="resetCustomTheme">reset</v-btn>
    </v-subheader>

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
            @update:color="onChangeTextColor"
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
            @update:color="onChangeBackgroundColor"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import _debounce from 'lodash/debounce';

export default {
  name: 'Settings',
  computed: {
    ...mapState('settings', {
      darkThemeModel: state => state.isDarkTheme,
      withMillisecondsModel: state => state.withMilliseconds,
      digitalThemeModel: state => state.isDigitalTheme,
      textColor: state => state.textColor,
      backgroundColor: state => state.backgroundColor,
    }),
    debouncedSetCookieTextColor() {
      return _debounce(this.setCookieTextColor, 250);
    },
    debouncedSetCookieBackgroundColor() {
      return _debounce(this.setCookieBackgroundColor, 250);
    }
  },
  methods: {
    ...mapActions('settings', [
      'setIsDarkTheme',
      'setWithMilliseconds',
      'setIsDigitalTheme',
      'setTextColor',
      'setBackgroundColor',
      'setCookieTextColor',
      'setCookieBackgroundColor',
    ]),
    chagngeTheme(value) {
      this.$vuetify.theme.isDark = value;
      this.setIsDarkTheme(value);
    },
    onChangeTextColor(value) {
      const { rgba } = value;
      const color = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;

      this.setTextColor(color);
      this.debouncedSetCookieTextColor(color);
    },
    onChangeBackgroundColor(value) {
      const { rgba } = value;
      const color = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;

      this.setBackgroundColor(color);
      this.debouncedSetCookieBackgroundColor(color);
    },
    resetCustomTheme() {
      this.setTextColor('');
      this.debouncedSetCookieTextColor('');
      this.setBackgroundColor('');
      this.debouncedSetCookieBackgroundColor('');
    },
  },
};
</script>
