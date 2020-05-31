<template>
  <el-card v-if="schema && show">
    <el-form label-position="left" ref="formAttributes" :model="attributes">
      <el-form-item
        v-for="attr in schema.attrNames"
        :rules="[
          {
            required: true,
            message: `Please input value for attribute ${attr}`
          }
        ]"
        :key="attr"
        :label="attr"
        :prop="attr"
      >
        <el-input type="text" v-model="attributes[attr]"></el-input>
      </el-form-item>
      <el-form-item label="Comment">
        <el-input
          type="textarea"
          v-model="comment"
          value="Issue credential offer "
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox label="Auto Issue" v-model="autoIssue"></el-checkbox>
        <el-checkbox label="Auto Remove" v-model="autoRemove"></el-checkbox>
      </el-form-item>
      <el-button type="primary" :loading="loading" @click="issueCredential()"
        >Issue</el-button
      >
    </el-form>
  </el-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  mounted() {
    const schema = this.schemas.find(
      s => s.credential_definition_id === this.credentialDefinitionId
    );
    if (schema) this.schema = schema;
    this.schema.attrNames.forEach(attrName => {
      this.$set(this.attributes, attrName, "");
    });
    if (this.error) {
      this.$notify({
        title: "Issue Error",
        message: this.errorMessage,
        type: "error"
      });
      this.reset();
    }
  },
  data() {
    return {
      schema: null,
      attributes: {},
      comment: "",
      autoRemove: false,
      autoIssue: false,
      show: true
    };
  },
  methods: {
    ...mapActions("credentials/", ["issueCredentialOffer"]),
    ...mapActions(["reset"]),
    issueCredential() {
      this.$refs["formAttributes"].validate(valid => {
        if (valid) {
          const attrs = Object.entries(this.attributes);
          const values = attrs.map(attr => {
            return {
              name: attr[0],
              value: attr[1]
            };
          });
          const credentialOffer = {
            connectionId: this.connectionId,
            credentialDefinitionId: this.credentialDefinitionId,
            autoIssue: this.autoIssue,
            autoRemove: this.autoRemove,
            attributes: values,
            comment: this.comment
          };
          console.log("issueCredential -> credentialOffer", credentialOffer);
          this.issueCredentialOffer(credentialOffer).then(() => {
            this.$notify({
              title: "Issued credential",
              message:
                "Credential has been issued for connection " +
                this.connectionId,
              type: "success"
            });
            this.show = false;
          });
        } else {
          console.log("Not valid");
        }
      });
    }
  },
  computed: {
    ...mapState("schemas/", ["schemas"]),
    ...mapState("credentials/", ["credentialDefinitionId", "connectionId"]),
    ...mapState(["loading", "error", "errorMessage"])
  }
};
</script>

<style></style>
