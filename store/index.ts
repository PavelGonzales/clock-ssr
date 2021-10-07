import { Store } from 'vuex';

const createStore = () => new Store({
  state: {
    settings: {
      isDarkTheme: false,
      withMilliseconds: false,
    }
  },
  mutations: {
    setIsDarkTheme(state, value) {
      state.settings.isDarkTheme = value;
    },
    setWithMilliseconds(state, value) {
      state.settings.withMilliseconds = value;
    }
  },
  actions: {
    setIsDarkTheme({ commit }, value) {
      commit('setIsDarkTheme', value);
      localStorage.setItem('isDarkTheme', `${value}`);
    },
    setWithMilliseconds({ commit }, value) {
      commit('setWithMilliseconds', value);
      localStorage.setItem('withMilliseconds', `${value}`);
    }
  },
});

export default createStore;
