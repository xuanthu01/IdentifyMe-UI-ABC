import {
  SET_SELECTED_CONNECTION,
  SET_SELECTED_CREDENTIAL_DEFINITION,
  SELECTED_CONNECTION,
  SELECTED_CREDENTIAL_DEFINITION,
  LOADING,
  LOADED,
  ERROR,
  SET_CREDENTIALS_IDS
} from "../../constants/MutationTypes";
import { sendCredentialOffer } from "../../api";
const state = {
  connectionId: "",
  credentialDefinitionId: "",
  selectedConn: false,
  selectedCredentialDefinition: false
};

const getters = {};

const mutations = {
  [SET_SELECTED_CONNECTION](state, connectionId) {
    state.connectionId = connectionId;
  },
  [SET_SELECTED_CREDENTIAL_DEFINITION](state, credentialDefinitionId) {
    state.credentialDefinitionId = credentialDefinitionId;
  },
  [SELECTED_CONNECTION](state) {
    state.selectedConn = true;
  },
  [SELECTED_CREDENTIAL_DEFINITION](state) {
    state.selectedCredentialDefinition = true;
  },
  [SET_CREDENTIALS_IDS](state, arrayIds) {
    state.credentialsDefIds = arrayIds;
  }
};

const actions = {
  setSelectConnection({ commit }, connectionId) {
    commit(SET_SELECTED_CONNECTION, connectionId);
    commit(SELECTED_CONNECTION);
  },
  setSelectedCredentialDefinition({ commit }, credentialId) {
    commit(SET_SELECTED_CREDENTIAL_DEFINITION, credentialId);
    commit(SELECTED_CREDENTIAL_DEFINITION);
  },
  async issueCredentialOffer({ commit }, payload) {
    try {
      commit(LOADING, null, { root: true });
      const offerSent = await sendCredentialOffer(payload);
      if (offerSent) commit(LOADED, null, { root: true });
    } catch (error) {
      commit(ERROR, error.message, { root: true });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
