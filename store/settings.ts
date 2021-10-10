import { ActionContext } from "vuex/types/index";

type SettingState = {
  isDarkTheme: boolean;
  withMilliseconds: boolean;
  isDigitalTheme: boolean;
  textColor: string;
  backgroundColor: string;
}

export const state = (): SettingState => ({
  isDarkTheme: false,
  withMilliseconds: false,
  isDigitalTheme: false,
  textColor: '',
  backgroundColor: '',
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
  setTextColor(state: SettingState, value: string) {
    state.textColor = value;
  },
  setBackgroundColor(state: SettingState, value: string) {
    state.backgroundColor = value;
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
  setTextColor({ commit }: ActionContext<SettingState, any>, value: string) {
    commit('setTextColor', value);
  },
  setBackgroundColor({ commit }: ActionContext<SettingState, any>, value: string) {
    commit('setBackgroundColor', value);
  },
  setCookieTextColor(_: ActionContext<SettingState, any>, value: string) {
    // TODO Fix it!!!
    (this as any).$cookies.set('textColor', value);
  },
  setCookieBackgroundColor(_: ActionContext<SettingState, any>, value: string) {
    // TODO Fix it!!!
    (this as any).$cookies.set('backgroundColor', value);
  },
};
