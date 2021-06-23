import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskIndex: 0,
    allLsit: [],
    end: false
  },
  mutations: {
    getIndex(state, index) {
      state.taskIndex = index;
    },
    getLsit(state, arr) {
      state.allLsit = arr;
    },
    doneTask(state, payload) {
      state.end = payload;
    }
  },
  actions: {
    indexGet({ commit }, payload) {
      commit("getIndex", payload);
    },
    listGet({ commit }, payload) {
      commit("getLsit", payload);
    },
    taskDone({ commit }, payload) {
      commit("doneTask", payload);
    }
  },
  modules: {}
});
