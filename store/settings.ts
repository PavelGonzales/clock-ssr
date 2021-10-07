import { ActionContext } from "vuex/types/index";

type SettingState = {
  isDarkTheme: boolean;
  withMilliseconds: boolean;
}

export const state = (): SettingState => ({
  isDarkTheme: false,
  withMilliseconds: false,
});

export const mutations = {
  setIsDarkTheme(state: SettingState, value: boolean) {
    state.isDarkTheme = value;
  },
  setWithMilliseconds(state: SettingState, value: boolean) {
    state.withMilliseconds = value;
  }
};

export const actions = {
  setIsDarkTheme({ commit }: ActionContext<SettingState, any>, value: boolean) {
    commit('setIsDarkTheme', value);
    localStorage.setItem('isDarkTheme', `${value}`);
  },
  setWithMilliseconds({ commit }: ActionContext<SettingState, any>, value: boolean) {
    commit('setWithMilliseconds', value);
    localStorage.setItem('withMilliseconds', `${value}`);
  }
};
