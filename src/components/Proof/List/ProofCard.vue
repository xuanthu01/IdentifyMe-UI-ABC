<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold">{{
          proof.presentation_request.name
        }}</span>
      </div>
      <CardBody :verified="isVerified" :sent="isProofSent" />
      <div class="bottom clearfix">
        <time class="time">Yêu cầu được tạo lúc {{ proof.created_at }}</time>
        <el-button type="text" class="button" @click="show = !show"
          >Chi tiết</el-button
        >
        <ProofItemDetail
          v-if="show"
          :item="proof"
          :setVisible="setVisible"
          :show="show"
          :requested_attributes="requested_attributes.toString()"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import CardBody from "./CardBody";
import ProofItemDetail from "./ProofItemDetail";
export default {
  components: { CardBody, ProofItemDetail },
  props: {
    proof: Object
  },
  mounted() {
    this.isProofSent = this.proof.state === "request_sent";
    this.isVerified =
      this.proof.state === "verified" && this.proof.verified === "true";
    this.proofKeys = Object.keys(this.proof);
    for (let object in this.proof.presentation_request.requested_attributes) {
      const name = this.proof.presentation_request.requested_attributes[object]
        .name;
      this.requested_attributes.push(name);
    }
  },
  data() {
    return {
      isVerified: false,
      isProofSent: false,
      proofKeys: null,
      requested_attributes: [],
      show: false
    };
  },
  methods: {
    handleDetailClick() {},
    setVisible(status) {
      this.show = status;
    }
  },
  watch: {
    proof: {
      deep: true,
      handler(value, oldValue) {
        this.isProofSent = value.state === "request_sent";
        this.isVerified =
          value.state === "verified" && this.proof.verified === "true";
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin: 5px;
}
.time {
  font-size: 13px;
  color: #2b2a2a;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
