<template>
  <el-row>
    <el-container>
      <el-col :span="24">
        <el-header id="header-container">
          <el-menu
            :default-active="activeItem"
            class="menu-header"
            mode="horizontal"
            background-color="#ef5734"
            text-color="#fff"
            active-text-color="#fff"
          >
            <el-submenu index="1">
              <template slot="title">Giới thiệu</template>
              <el-menu-item @click="handleAboutSSIClick" index="1-1"
                >Self-Sovereign Identity</el-menu-item
              >
              <el-menu-item @click="handleAboutTeamClick" index="1-2"
                >Đội ngũ phát triển</el-menu-item
              >
            </el-submenu>
            <el-menu-item index="5" @click="handleConnectionClick"
              >Kết nối công dân</el-menu-item
            >
            <el-submenu index="6">
              <template slot="title">Quản lý Schema</template>
              <el-menu-item index="6-1" @click="handleListSchemaClick"
                >Danh sách Schema</el-menu-item
              >
              <el-menu-item index="6-2" @click="handleCreateSchemaClick"
                >Tạo mới Schema</el-menu-item
              >
              <el-menu-item index="6-33" @click="handleCreateCredDefClick"
                >Tạo mới Credential Definition</el-menu-item
              >
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">Cấp Chứng nhận</template>
              <el-menu-item index="4-1" @click="handleIssueClick"
                >Việc làm</el-menu-item
              >
              <el-menu-item index="4-2" disabled>Bảng lương</el-menu-item>
              <el-menu-item index="4-3" disabled>Thực tập</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">Xác minh/ Chứng thực</template>
              <el-menu-item index="7-1" @click="handleProofListClick"
                >Danh sách bằng chứng</el-menu-item
              >
              <el-menu-item index="7-2" @click="handleRequestProofClick"
                >Yêu cầu xác minh</el-menu-item
              >
            </el-submenu>
            <el-submenu v-if="!!user" index="user">
              <template slot="title">
                Hi, {{ user.username }}
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </template>
              <el-menu-item index="7-1" @click="logoutUser"
                >Logout</el-menu-item
              >
            </el-submenu>
            <el-menu-item @click="gotoLogin" v-else index="login"
              >Login</el-menu-item
            >
          </el-menu>
        </el-header>
      </el-col>
    </el-container>
  </el-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      activeItem: "1"
    };
  },
  methods: {
    ...mapActions("auth/", ["logoutUser"]),
    gotoLogin() {
      if (this.$route.path !== "/login") this.$router.push("/login");
    },
    handleConnectionClick() {
      if (this.$route.path !== "/connections")
        this.$router.push("/connections");
    },
    handleListSchemaClick() {
      if (this.$route.path !== "/schemas/list")
        this.$router.push("/schemas/list");
    },
    handleCreateSchemaClick() {
      if (this.$route.path !== "/schemas/create")
        this.$router.push("/schemas/create");
    },
    handleCreateCredDefClick() {
      if (this.$route.path !== "/schemas/create-definition")
        this.$router.push("/schemas/create-definition");
    },
    handleIssueClick() {
      if (this.$route.path !== "/credentials/issue")
        this.$router.push("/credentials/issue");
    },
    handleProofListClick() {
      if (this.$route.path !== "/proof/list") this.$router.push("/proof/list");
    },
    handleRequestProofClick() {
      if (this.$route.path !== "/proof/request")
        this.$router.push("/proof/request");
    },
    handleAboutTeamClick() {
      if (this.$route.path !== "/about/team") this.$router.push("/about/team");
    },
    handleAboutSSIClick() {
      if (this.$route.path !== "/about/ssi") this.$router.push("/about/ssi");
    }
  },
  computed: {
    ...mapState("auth/", ["user"])
  }
};
</script>

<style scoped>
#header-container {
  margin-top: 3px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  padding: 0;
}
.el-icon-user-solid {
  margin-right: 0px;
}
.menu-header {
  border-radius: 5px;
}
.el-submenu__title {
  border-radius: 5px;
}
</style>
