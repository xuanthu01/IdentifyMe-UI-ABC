<template>
  <el-row>
    <el-container id="open-connection__container">
      <el-search-table-pagination
        v-loading="loading"
        type="local"
        :data="connections || []"
        :page-sizes="[5, 10]"
        :columns="columns"
        :form-options="formOptions"
      >
        <template slot-scope="scope" slot="detail">
          <el-button
            @click.native.prevent="handleClickDetail(scope.$index, connections)"
            type="text"
            size="small"
            >Detail</el-button
          >
        </template>
      </el-search-table-pagination>
      <DetailConnection
        v-if="show"
        :connectionDetail="connection"
        :show="show"
        :setVisible="setVisible"
      />
    </el-container>
  </el-row>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import DetailConnection from "./DetailConnection";
import { ConnectionState } from "../../constants/connection.state";
export default {
  async mounted() {
    await this.fetchAndSetConnections();
    if (this.error) {
      this.$notify({
        title: "Error/Connection",
        type: "error",
        message: this.errorMessage
      });
      this.reset();
    }
  },
  methods: {
    ...mapActions("connections/", ["fetchAndSetConnections"]),
    ...mapActions(["reset"]),
    handleClickDetail(index, connections) {
      this.connection = connections[index];
      this.show = !this.show;
    },
    setVisible(status) {
      this.show = status;
    }
  },
  data() {
    return {
      show: false,
      connection: null,
      formOptions: {
        inline: true,
        submitBtnText: "Search",
        forms: [
          { prop: "initiator", label: "Initiator" },
          { prop: "alias", label: "Alisas" },
          {
            prop: "state",
            label: "State",
            itemType: "select",
            options: [
              { value: "", label: "All" },
              { value: "request", label: "request" },
              { value: "response", label: "response" },
              { value: "active", label: "active" },
              { value: "invitation", label: "invitation" }
            ]
          }
        ]
      },
      columns: [
        { prop: "created_at", label: "Created at", width: 250 },
        { prop: "initiator", label: "Initiator" },
        { prop: "their_label", label: "Agent Name", minWidth: 200 },
        { prop: "alias", style: "font-weight: bold", label: "Alisas" },
        {
          prop: "connection_id",
          label: "Connection ID",
          minWidth: 300
        },
        {
          prop: "state",
          label: "State",
          width: 100,
          render: row => {
            const { state } = row;
            return state;
          }
        },
        { label: "Details", minWidth: 180, slotName: "detail" }
      ]
    };
  },
  computed: {
    ...mapState("connections/", ["connections"]),
    ...mapState(["loading", "error", "errorMessage"]),
    ...mapGetters("connections/", ["activeConnections"])
  },
  components: {
    DetailConnection
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}
#open-connection__container {
  display: inline;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
