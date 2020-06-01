<template>
  <el-row style="display:flex;justify-content: center">
    <el-col v-if="user.role === 'admin'" :xs="24" :md="24" :lg="8" :xl="8">
      <h2>Nhập URL hoặc chuỗi base64</h2>
      <el-input
        :disabled="loading"
        v-model="invitation"
        :rows="8"
        type="textarea"
      ></el-input>
      <el-divider />
      <el-button
        :loading="loading"
        type="primary"
        :disabled="invitation.length === 0"
        @click="onAcceptClick"
        >Chấp nhận</el-button
      >
    </el-col>
    <el-col v-else :span="24">
      <h1>401 Unauthorized</h1>
      <h3>You are not have permission to access this page.</h3>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AcceptInvitation",
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    connected: function(data) {
      console.log("Message received:", data);
    }
  },
  data() {
    return {
      invitation: "",
      connectionRecord: null
    };
  },
  methods: {
    ...mapActions("connections/", ["acceptInvitation"]),
    async onAcceptClick() {
      this.connectionRecord = await this.acceptInvitation(this.invitation);
      if (this.connectionRecord) this.handleConnectionConnected();
    },
    handleConnectionConnected() {
      //state o trang thai active hoac response moi nhan duoc data de notify
      this.sockets.subscribe(
        this.connectionRecord.connection_id,
        connectionPayload => {
          this.$notify({
            title: "Connected",
            message: `Connected with ${connectionPayload.their_label}`,
            type: "success",
            duration: 5000
          });
        }
      );
    }
  },
  computed: {
    ...mapState(["loading", "error", "errorMessage"]),
    ...mapState("auth/", ["user"])
  }
};
</script>

<style></style>
