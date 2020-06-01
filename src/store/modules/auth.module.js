import { login } from "../../api";
import router from "../../router";
const state = {
  user: JSON.parse(localStorage.getItem("user"))
};
const getters = {
  isAdmin: () => state.user && state.user.role
};
const mutations = {
  LOGIN_USER: (state, user) => {
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  LOGOUT_USER: state => {
    state.user = null;
    localStorage.removeItem("user");
    router.push("/");
  }
};

const actions = {
  async loginUser({ commit }, user) {
    const userLogged = await login(user);
    commit("LOGIN_USER", userLogged);
    return userLogged;
  },
  async logoutUser({ commit }) {
    commit("LOGOUT_USER");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
