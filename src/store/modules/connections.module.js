import {
  SET_CONNECTIONS,
  LOADING,
  LOADED,
  SET_INVITATION,
  SET_CONNECTION,
  ACCEPT_INVITATION,
  ERROR
} from "../../constants/MutationTypes";
import {
  fetchConnections,
  createInvitation,
  acceptInvitation
} from "../../api";
const state = {
  connections: [],
  invitation: null
};
const getters = {
  activeConnections: () =>
    state.connections.filter(
      connection =>
        connection.state === "active" || connection.state === "response"
    ),
  invitationUrl: () =>
    (state.invitation && state.invitation.invitation_url) || ""
};
const mutations = {
  [SET_CONNECTIONS](state, connections) {
    state.connections = connections;
  },
  [SET_INVITATION](state, invitation) {
    state.invitation = invitation;
  },
  [SET_CONNECTION](state, connection) {
    const isExisting = state.connections.find(
      c => c.connection_id === connection.connection_id
    );
    if (state.connections.length === 0 || !isExisting)
      state.connections.push(connection);
    else {
      const newConnections = state.connections.map(conn => {
        if (conn.connection_id === connection.connection_id) {
          return connection;
        } else return conn;
      });
      state.connections = newConnections;
    }
  },
  [ACCEPT_INVITATION](state) {}
};

const actions = {
  async fetchAndSetConnections({ commit }) {
    try {
      commit(LOADING, null, { root: true });
      const connections = await fetchConnections();
      commit(SET_CONNECTIONS, connections);
      commit(LOADED, null, { root: true });
    } catch (error) {
      commit(ERROR, error.message, { root: true });
    }
  },
  async createInvitation({ commit }) {
    try {
      commit(LOADING, null, { root: true });
      const invitation = await createInvitation();
      commit(SET_INVITATION, invitation);
      commit(LOADED, null, { root: true });
    } catch (error) {
      commit(ERROR, error.message, { root: true });
    }
  },
  async setConnection({ commit }, connection) {
    commit(SET_CONNECTION, connection);
  },
  async setInvitation({ commit }, invitation) {
    commit(SET_INVITATION, invitation);
  },
  async acceptInvitation({ commit }, invitation_payload) {
    let payload = {};
    let payloadString = "";
    //check invitation_payload is url/base 64 or invitation object
    try {
      if (typeof invitation_payload === "string") {
        if (invitation_payload.includes("c_i=")) {
          //url contain base64
          const base64Encoded = invitation_payload.split("c_i=")[1];
          payloadString = window.atob(base64Encoded);
        } else if (invitation_payload.includes("@id")) {
          //object encoded
          payloadString = invitation_payload;
        } else {
          payloadString = window.atob(invitation_payload);
        }
        payload = {
          invitation: JSON.parse(payloadString),
          alias: "University of Information Technology - VNUHCM",
          accept: "auto"
        };
        console.log("acceptInvitation -> payload", payload);
      }

      commit(LOADING, null, { root: true });
      const connectionRecord = await acceptInvitation(payload);
      commit(SET_CONNECTION, connectionRecord);
      commit(LOADED, null, { root: true });
      return connectionRecord;
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
