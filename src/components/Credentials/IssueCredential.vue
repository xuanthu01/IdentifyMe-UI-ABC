<template>
  <el-container class="issue-credential-container">
    <h2>Issue Credential</h2>
    <el-steps :active="active" align-center>
      <el-step title="1. Choose connection">
        <template slot="description">
          <SelectConnection
            v-if="showSelectConnection"
            :connections="activeConnections"
          />
        </template>
      </el-step>

      <el-step title="2. Choose Credential Definition">
        <template slot="description">
          <SelectCredentialDefinitation
            :schema_ids="schemaIds"
            v-if="showSelectCredDef"
          />
        </template>
      </el-step>
      <el-step title="3. Set Attributes">
        <template slot="description">
          <FormAttributes v-if="showFromAttr"></FormAttributes>
        </template>
      </el-step>
    </el-steps>
    <div style="margin-top: 12px;align-self:center">
      <el-button v-if="active !== 1" @click="back">Back</el-button>
      <el-button @click="next" v-if="!showSubmit && connectionId"
        >Next</el-button
      >
    </div>
  </el-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import SelectConnection from "../shared/SelectConnection";
import SelectCredentialDefinitation from "./SelectCredentialDefinitation";
import FormAttributes from "./FormAttributes";
export default {
  async mounted() {
    if (this.connections.length === 0) {
      await this.fetchAndSetConnections();
    }
    if (this.schemaIds.length === 0) {
      await this.fetchSchemaIds();
    }
    if (this.error) {
      this.$notify({
        title: "Error/Credential",
        type: "error",
        message: this.errorMessage
      });
      this.reset();
    }
  },
  destroyed() {
    this.setSelectConnection("");
    this.setSelectedCredentialDefinition("");
  },
  data() {
    return {
      active: 1,
      showSubmit: false,
      showSelectConnection: true,
      showSelectCredDef: false,
      showFromAttr: false
    };
  },
  computed: {
    ...mapGetters("connections/", ["activeConnections"]),
    ...mapState("connections/", ["connections"]),
    ...mapState("credentials/", ["connectionId", "credentialDefinitionId"]),
    ...mapState("schemas/", ["schemaIds"]),
    ...mapState(["loading", "error", "errorMessage"])
  },
  methods: {
    ...mapActions("connections/", ["fetchAndSetConnections"]),
    ...mapActions("schemas/", ["fetchSchemaIds"]),
    ...mapActions("credentials/", [
      "setSelectConnection",
      "setSelectedCredentialDefinition"
    ]),
    ...mapActions(["reset"]),
    next() {
      this.active++;
      console.log("next -> this.active", this.active);
      switch (this.active) {
        case 2:
          this.showSelectConnection = false;
          this.showSelectCredDef = true;
          this.showFromAttr = false;
          break;
        case 3:
          this.showSelectConnection = false;
          this.showSelectCredDef = false;
          this.showFromAttr = true;
          this.showSubmit = true;
          break;
        default:
          break;
      }
    },
    back() {
      this.active--;
      console.log("back -> this.active", this.active);
      switch (this.active) {
        case 1:
          this.showSelectCredDef = false;
          this.showSelectConnection = true;
          this.showFromAttr = false;
          this.showSubmit = false;
          break;
        case 2:
          this.showSelectCredDef = true;
          this.showSelectConnection = false;
          this.showFromAttr = false;
          this.showSubmit = false;
          break;
        case 3:
          this.showSelectCredDef = false;
          this.showSelectConnection = false;
          this.showFromAttr = true;
          break;
        default:
          break;
      }
    }
  },
  components: {
    SelectConnection,
    SelectCredentialDefinitation,
    FormAttributes
  }
};
</script>

<style>
.issue-credential-container {
  flex-direction: column;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  justify-content: center;
}
</style>
