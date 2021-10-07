import { ActionContext } from "vuex/types/index";

enum Themes {
  default = 'default',
  digital = 'digital',
}

type SettingState = {
  isDarkTheme: boolean;
  withMilliseconds: boolean;
  theme: Themes;
}

export const state = (): SettingState => ({
  isDarkTheme: false,
  withMilliseconds: false,
  theme: Themes.default,
});

export const mutations = {
  setIsDarkTheme(state: SettingState, value: boolean) {
    state.isDarkTheme = value;
  },
  setWithMilliseconds(state: SettingState, value: boolean) {
    state.withMilliseconds = value;
  },
  setTheme(state: SettingState, value: Themes) {
    state.theme = value;
  },
};

export const actions = {
  setIsDarkTheme({ commit }: ActionContext<SettingState, any>, value: boolean) {
    commit('setIsDarkTheme', value);
    localStorage.setItem('isDarkTheme', `${value}`);
  },
  setWithMilliseconds({ commit }: ActionContext<SettingState, any>, value: boolean) {
    commit('setWithMilliseconds', value);
    localStorage.setItem('withMilliseconds', `${value}`);
  },
  setTheme({ commit }: ActionContext<SettingState, any>, value: Themes) {
    commit('setTheme', value);
    localStorage.setItem('theme', value);
  },
};
