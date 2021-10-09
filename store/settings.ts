import { ActionContext } from "vuex/types/index";

type SettingState = {
  isDarkTheme: boolean;
  withMilliseconds: boolean;
  isDigitalTheme: boolean;
}

export const state = (): SettingState => ({
  isDarkTheme: false,
  withMilliseconds: false,
  isDigitalTheme: false,
});

export const mutations = {
  setIsDarkTheme(state: SettingState, value: boolean) {
    state.isDarkTheme = value;
  },
  setWithMilliseconds(state: SettingState, value: boolean) {
    state.withMilliseconds = value;
  },
  setIsDigitalThemeTheme(state: SettingState, value: boolean) {
    state.isDigitalTheme = value;
  },
};

export const actions = {
  setIsDarkTheme({ commit }: ActionContext<SettingState, any>, value: boolean) {
    commit('setIsDarkTheme', value);
    // TODO Fix it!!!
    (this as any).$cookies.set('isDarkTheme', value);
  },
  setWithMilliseconds({ commit }: ActionContext<SettingState, any>, value: boolean) {
    commit('setWithMilliseconds', value);
    // TODO Fix it!!!
    (this as any).$cookies.set('withMilliseconds', value);
  },
  setIsDigitalTheme({ commit }: ActionContext<SettingState, any>, value: boolean) {
    commit('setIsDigitalThemeTheme', value);
    // TODO Fix it!!!
    (this as any).$cookies.set('isDigitalTheme', value);
  },
};
