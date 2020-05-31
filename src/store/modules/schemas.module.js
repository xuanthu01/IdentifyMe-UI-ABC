import {
  LOADING,
  LOADED,
  SET_SCHEMAS,
  SET_SCHEMA_IDS,
  ADD_NEW_SCHEMA,
  ERROR,
  ADD_NEW_SCHEMA_ID
} from "../../constants/MutationTypes";
import {
  fetchAllSchemaIds,
  createSchema,
  getSchemaById
} from "../../api/schemas.api";
const state = {
  schemaIds: [],
  schemas: [],
  fetching: false,
  creating: false,
  error: false,
  errorMessage: ""
};
const getters = {};
const mutations = {
  [SET_SCHEMA_IDS](state, schemaIds) {
    state.schemaIds = schemaIds;
  },
  [ADD_NEW_SCHEMA_ID](state, schemaId) {
    if (!state.schemaIds.includes(schemaId)) {
      state.schemaIds.push(schemaId);
    }
  },
  [SET_SCHEMAS](state, schemas) {
    state.schemas = schemas;
  },
  [ADD_NEW_SCHEMA](state, schema) {
    const isExisting = state.schemas.find(s => s.id === schema.id);
    if (!isExisting) state.schemas.push(schema);
  }
};
const actions = {
  async fetchSchemaIds({ commit }) {
    try {
      commit(LOADING, null, { root: true });
      const schema_ids = await fetchAllSchemaIds();
      commit(SET_SCHEMA_IDS, schema_ids);
      commit(LOADED, null, { root: true });
    } catch (error) {
      commit(ERROR, error.message, { root: true });
    }
  },
  async fetchSchemaById({ commit }, schemaId) {
    try {
      commit(LOADING, null, { root: true });
      const schema = await getSchemaById(schemaId);
      commit(ADD_NEW_SCHEMA, schema);
      commit(LOADED, null, { root: true });
    } catch (error) {
      commit(ERROR, error.message, { root: true });
    }
  },
  async createNewSchema({ dispatch, commit }, schemaBody) {
    try {
      commit(LOADING, null, { root: true });
      const newSchema = await createSchema(schemaBody);
      if (newSchema.schema_id) {
        commit(ADD_NEW_SCHEMA_ID, newSchema.schema_id);
        await dispatch("fetchSchemaById", newSchema.schema_id);
        commit(LOADED, null, { root: true });
      }
    } catch (error) {
      commit(ERROR, error.message, { root: true });
    }
  },
  async setSchemas({ commit }, schemas) {
    try {
      commit(SET_SCHEMAS, schemas);
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
