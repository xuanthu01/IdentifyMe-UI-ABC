import Vue from "vue";
import Vuex from "vuex";
import connections from "./modules/connections.module";
import schemas from "./modules/schemas.module";
import credentials from "./modules/credentials.module";
import proof from "./modules/proof.module";
import auth from "./modules/auth.module";
import { LOADING, LOADED, ERROR, RESET } from "../constants/MutationTypes";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    loading: false,
    error: false,
    errorMessage: ""
  },
  mutations: {
    [LOADING](state) {
      state.loading = true;
    },
    [LOADED](state) {
      state.loading = false;
    },
    [ERROR](state, msg) {
      state.error = true;
      state.loading = false;
      state.errorMessage = msg;
    },
    [RESET](state) {
      state.loading = false;
      state.error = false;
      state.errorMessage = "";
    }
  },
  actions: {
    onLoading({ commit }) {
      commit(LOADING);
    },
    onLoaded({ commit }) {
      commit(LOADED);
    },
    onError({ commit }, errorMessage) {
      commit(ERROR, errorMessage);
    },
    reset({ commit }) {
      commit(RESET);
    }
  },
  modules: {
    connections,
    schemas,
    credentials,
    proof,
    auth
  }
});
