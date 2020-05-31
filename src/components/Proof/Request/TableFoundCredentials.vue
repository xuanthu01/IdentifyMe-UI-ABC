<template>
  <el-search-table-pagination
    height="450"
    v-loading="loading"
    type="local"
    :data="data || []"
    :page-sizes="[10, 15, 20, 25]"
    :columns="columns"
    :form-options="formOptions"
    highlight-current-row
    @current-change="setCurrentCredential"
  ></el-search-table-pagination>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    data: Array
  },
  data() {
    return {
      columns: [
        { prop: "noNumber", label: "No.", width: 50 },
        {
          prop: "credential_definition_id",
          label: "Credential Id",
          width: 380
        },
        {
          label: "Attributes",
          minWidth: 200,
          render: row => row.attributes.toString()
        },
        { prop: "tag", label: "Tag", width: 200 },
        { prop: "fromDID", label: "From DID", width: 250 }
      ],
      formOptions: {
        fuzzy: true,
        inline: true,
        submitBtnText: "Search",
        forms: [{ prop: "tag", label: "Tag" }]
      }
    };
  },
  methods: {
    ...mapActions("proof/", ["setCurrentCredential"])
  },
  computed: {
    ...mapState(["loading", "error", "errorMessage"])
  }
};
</script>

<style>
.el-table__row {
  cursor: pointer;
}
</style>
