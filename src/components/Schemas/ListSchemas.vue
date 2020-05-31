<template>
  <el-container class="list-schemas-container">
    <h2>Danh sách Schema hiện tại</h2>
    <el-tabs
      v-if="schemaIds.length > 0"
      v-loading="loading"
      tab-position="left"
      type="border-card"
    >
      <el-tab-pane v-for="id in schemaIds" :key="id" :label="id">
        <SchemaInfo :schema_id="id" />
      </el-tab-pane>
    </el-tabs>
    <el-card v-else>Trống</el-card>
    <p>
      <i>Lưu ý:</i> Các schema sau khi tạo không thể update. Nếu muốn update, ta
      có thể tạo mới schema với các thuộc tính cũ và <b>version mới</b> của
      Schema
    </p>
  </el-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SchemaInfo from "./SchemaInfo";
export default {
  async mounted() {
    await this.fetchSchemaIds();
    if (this.error) {
      this.$notify({
        title: "Error/Schema",
        type: "error",
        message: this.errorMessage
      });
      this.reset();
    }
  },
  components: {
    SchemaInfo
  },
  computed: {
    ...mapState("schemas/", ["schemaIds"]),
    ...mapState(["loading", "error", "errorMessage"])
  },
  methods: {
    ...mapActions("schemas/", ["fetchSchemaIds"]),
    ...mapActions(["reset"])
  }
};
</script>

<style>
.list-schemas-container {
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 5px;
}
</style>
