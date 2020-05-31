<template>
  <el-row class="proof_request_container">
    <el-col>
      <el-divider></el-divider>
      <h2>Yêu cầu xác minh bằng chứng</h2>
      <br />
      <p>
        Vui lòng chọn ít nhất một kết nối ở trạng thái hoạt động (active hoặc
        response)
      </p>
      <p>
        Sau đó, chọn một (hoặc nhiều) các thuộc tính cần thiết để gửi yêu cầu
      </p>
      <i>
        Hệ thống sẽ tự gợi ý các thuộc tính dựa theo credential_definition_id mà
        người quản trị cung cấp
      </i>
    </el-col>
    <el-col :span="24">
      <br />
      <p>
        Nếu chưa có
        <b>cred_def_id</b> cụ thể, vui lòng tìm kiếm một credential để có thể
        tạo yêu cầu.
      </p>
      <p>
        Bước đầu tiên, bạn cần xác định credential, bằng cách tìm với công cụ
        dưới đây.
      </p>
      <el-steps
        :active="active"
        finish-status="success"
        simple
        style="margin-top: 20px"
      >
        <el-step title="1. Tìm chứng chỉ"
          ><template slot="description">Tìm credential</template></el-step
        >
        <el-step title="2. Yêu cầu xác minh"></el-step>
      </el-steps>
      <FindCredentials v-if="active === 0" />
      <ProofRequest v-else />
      <el-button type="primary" :disabled="active === 0" @click="back"
        >Back</el-button
      >
      <el-button type="primary" @click="next" :disabled="finish"
        >Next</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
import ProofRequest from "./ProofRequest";
import FindCredentials from "./FindCredentials";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    ProofRequest,
    FindCredentials
  },
  data() {
    return {
      dialogVisible: false,
      active: 0,
      finish: false
    };
  },
  methods: {
    next() {
      if (this.active === 1) this.finish = true;
      if (this.active++ > 1) {
        this.active = 1;
      }
      console.log(this.active);
    },
    back() {
      if (this.active === 1) this.finish = true;
      this.finish = false;
      if (this.active-- < 0) {
        this.active = 0;
      }
      console.log(this.active);
    }
  },
  computed: {
    ...mapGetters("connections/", ["activeConnections"]),
    ...mapState("proof/", ["currentCredential"])
  }
};
</script>

<style>
.proof_request_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
