<template>
  <el-container>
    <el-row class="find-credential-container" justify="center">
      <h2>Công cụ tìm kiếm trên sổ cái</h2>
      <el-col :xs="24" :md="24" :lg="8" :xl="8">
        <el-input
          placeholder="Tìm trên sổ cái"
          v-model="filter"
          @keyup.enter="onSearch"
        >
          <el-select
            v-model="pageSize"
            slot="prepend"
            placeholder="Page size"
            style="width:70px"
          >
            <el-option label="5" value="5"></el-option>
            <el-option label="10" value="10"></el-option>
            <el-option label="20" value="20"></el-option>
            <el-option label="50" value="50"></el-option>
            <el-option label="100" value="100"></el-option>
          </el-select>
          <el-button
            slot="append"
            @click="onSearch"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="24" :xs="24">
        <TableFoundCredentials :data="foundCredentials" v-loading="loading" />
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import TableFoundCredentials from "./TableFoundCredentials";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    TableFoundCredentials
  },
  data: () => ({
    pageSize: 50,
    filter: "",
    page: 1
  }),
  methods: {
    ...mapActions("proof/", ["findAndSetCredentials"]),
    async onSearch() {
      const query = {
        pageSize: this.pageSize,
        filter: this.filter,
        page: this.page
      };
      await this.findAndSetCredentials(query);
    }
  },
  computed: {
    ...mapState(["loading", "error", "errorMessage"]),
    ...mapState("proof/", ["foundCredentials"])
  }
};
</script>

<style>
.find-credential-container {
  overflow: hidden;
}
</style>
