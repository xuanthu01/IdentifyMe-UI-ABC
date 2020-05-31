<template>
  <el-container style="justify-content: center">
    <el-card>
      <el-select
        v-model="value"
        @change="setSelectConnection(value)"
        placeholder="Chọn một kết nối đang hoạt động"
        clearable
      >
        <el-option
          v-for="conn in connections"
          :key="conn.connection_id"
          :label="conn.their_label"
          :value="conn.connection_id"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="conn.connection_id"
            placement="bottom-start"
          >
            <span style="float: left">{{ conn.their_label }}</span>
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
    connections: Array
  },
  methods: {
    ...mapActions("credentials/", ["setSelectConnection"])
  },
  data() {
    return {
      value: ""
    };
  }
};
</script>

<style></style>
