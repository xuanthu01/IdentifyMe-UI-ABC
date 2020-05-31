<template>
  <div class="connections">
    <portal-target name="detail-connection"></portal-target>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Danh sách kết nối" name="first">
        <OpenConnection />
      </el-tab-pane>
      <el-tab-pane label="Tạo lời mời kết nối" name="second">
        <CreateConnection />
      </el-tab-pane>
      <el-tab-pane label="Chấp nhận kết nối" name="third">
        <AcceptInvitation />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreateConnection from "@/components/Connections/CreateConnection";
import OpenConnection from "@/components/Connections/OpenConnection";
import AcceptInvitation from "@/components/Connections/AcceptInvitation";
export default {
  name: "Connection",
  components: {
    CreateConnection,
    OpenConnection,
    AcceptInvitation
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    //eslint-disable-next-line
    handleClick(tab, event) {
      //   console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.connections {
  margin-top: 10px;
}
</style>
