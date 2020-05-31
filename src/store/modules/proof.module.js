import {
  LOADING,
  LOADED,
  ERROR,
  SET_PROOF_LIST,
  SET_FOUND_CREDENTIALS,
  SET_REQUESTED_PREDICATES,
  SET_REQUESTED_ATTRIBUTES,
  SET_CURRENT_CREDENTIAL,
  UPDATE_PROOF_REQUEST,
  ADD_PROOF_REQUEST
} from "../../constants/MutationTypes";
import {
  findCredentialsByQueryString,
  createProofRequest,
  getProofRequests
} from "../../api";

const state = {
  proofList: [],
  foundCredentials: [],
  requestedPredicates: [],
  requestedAttributes: [],
  proofRequest: {},
  currentCredential: null
};
const mutations = {
  [SET_FOUND_CREDENTIALS](state, results) {
    state.foundCredentials = results;
  },
  [SET_PROOF_LIST](state, proofList) {
    state.proofList = proofList;
  },
  [SET_REQUESTED_PREDICATES](state, requestedPredicates) {
    state.requestedPredicates = requestedPredicates;
  },
  [SET_REQUESTED_ATTRIBUTES](state, requestedAttributes) {
    state.requestedAttributes = requestedAttributes;
  },
  [SET_CURRENT_CREDENTIAL](state, selectedCredential) {
    state.currentCredential = selectedCredential;
  },
  [ADD_PROOF_REQUEST](state, proof) {
    state.proofList.push(proof);
  },
  [UPDATE_PROOF_REQUEST](state, newProof) {
    const newId = newProof.presentation_exchange_id;
    const existingProof = state.proofList.find(
      proof => proof.presentation_exchange_id === newId
    );
    if (state.proofList.length === 0 || !existingProof) {
      state.proofList.push(newProof);
    } else {
      const newProofList = state.proofList.map(proof => {
        if (proof.presentation_exchange_id === newId) {
          console.log("Find old proof, replace with new proof");
          return newProof;
        } else return proof;
      });
      console.log("newProofList", newProofList);
      state.proofList = newProofList;
    }
  }
};
const actions = {
  async findAndSetCredentials({ commit }, query) {
    try {
      commit(LOADING, null, { root: true });
      const results = await findCredentialsByQueryString(query);
      commit(SET_FOUND_CREDENTIALS, results);
      commit(LOADED, null, { root: true });
    } catch (error) {
      commit(ERROR, error.message, { root: true });
    }
  },
  setRequestedPredicates({ commit }, request) {
    commit(SET_REQUESTED_PREDICATES, request);
  },
  setRequestedAttributes({ commit }, request) {
    commit(SET_REQUESTED_ATTRIBUTES, request);
  },
  setCurrentCredential({ commit }, credential) {
    commit(SET_CURRENT_CREDENTIAL, credential);
  },
  addProofToList({ commit }, proof) {
    commit(ADD_PROOF_REQUEST, proof);
  },
  async sendProofRequest({ commit }, payload) {
    try {
      commit(LOADING, null, { root: true });
      const result = await createProofRequest(payload);
      console.log("sendProofRequest -> result", result);
      commit(LOADED, null, { root: true });
      commit(ADD_PROOF_REQUEST, result);
      return result;
    } catch (error) {
      commit(ERROR, error.message, { root: true });
    }
  },
  async getProofRequests({ commit }) {
    try {
      commit(LOADING, null, { root: true });
      const results = await getProofRequests();
      console.log("getProofRequests -> result", results);
      commit(LOADED, null, { root: true });
      commit(SET_PROOF_LIST, results);
    } catch (error) {
      commit(ERROR, error.message, { root: true });
    }
  },
  updateProofList({ commit }, newProof) {
    commit(UPDATE_PROOF_REQUEST, newProof);
  }
};
const getters = {};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
