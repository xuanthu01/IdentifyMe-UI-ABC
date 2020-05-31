<template>
  <el-container style="flex-direction: column;">
    <el-row v-loading="loading" justify="center">
      <el-col :span="24">
        <portal-target name="proof-item-detail"></portal-target>
        <el-divider></el-divider>
        <h2>Danh sách bằng chứng</h2>
        <p>
          Danh sách dưới đây bao gồm các bằng chứng đã yêu cầu, nhận được yêu
          cầu từ agent khác.
        </p>
        <p>
          Nhấn "
          <b>Chi tiết</b>" để biết thêm chi tiết
        </p>
      </el-col>
      <div v-if="proofList.length > 0">
        <el-col
          :xs="24"
          :md="12"
          :lg="8"
          :xl="8"
          v-for="proof in proofList"
          :key="proof.presentation_exchange_id"
        >
          <ProofCard :proof="proof" />
        </el-col>
      </div>
      <div v-else>
        <el-col :span="24">
          Trống
        </el-col>
      </div>
    </el-row>
  </el-container>
</template>

<script>
import ProofCard from "./ProofCard";
import { mapActions, mapState } from "vuex";
export default {
  name: "ProofList",
  components: { ProofCard },
  async mounted() {
    await this.getProofRequests();
  },
  methods: {
    ...mapActions("proof/", ["getProofRequests", "addProofToList"])
  },
  computed: {
    ...mapState("proof/", ["proofList"]),
    ...mapState(["loading", "error", "errorMessage"])
  }
};
</script>

<style></style>
