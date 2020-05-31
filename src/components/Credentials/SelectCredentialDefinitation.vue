<template>
  <el-container>
    <el-card>
      <el-select
        v-model="value"
        @change="setSelectedCredentialDefinition(value)"
        placeholder="Chọn một 'credential definition'"
        clearable
      >
        <el-option
          v-for="schema in schemas"
          :key="schema.id"
          :label="schema.name"
          :value="schema.credential_definition_id"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="schema.credential_definition_id"
            placement="bottom-start"
          >
            <span style="float: left">Based on {{ schema.name }}</span>
          </el-tooltip>
        </el-option>
      </el-select>
    </el-card>
  </el-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    disabled: Boolean,
    schema_ids: Array
  },
  async mounted() {
    if (this.schemas.length === 0) {
      const promises = this.schema_ids.map(async id => {
        return await this.fetchSchemaById(id);
      });
      const schemas = await Promise.all(promises);
    }
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    ...mapActions("credentials/", ["setSelectedCredentialDefinition"]),
    ...mapActions("schemas/", ["fetchSchemaById", "setSchemas"])
  },
  computed: {
    // ...mapState("credentials/", ["credentialsDefIds"])
    ...mapState("schemas/", ["schemas"])
  }
};
</script>

<style></style>
