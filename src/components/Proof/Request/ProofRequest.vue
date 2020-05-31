<template>
  <el-container style=" justify-content: center;">
    <el-row class="proof-request-container">
      <!-- :xs="24" :md="24" :lg="12" :xl="12" -->
      <el-col :xs="24" :md="24" :lg="12" :xl="12" :span="24">
        <el-form>
          <el-divider>Chọn kết nối</el-divider>
          <SelectConnection :connections="activeConnections" />
          <el-divider>Tên yêu cầu</el-divider>
          <div class="proof_request_name">
            <el-form-item>
              <el-input
                v-model="proofReqName"
                placeholder="Proof request name"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-divider>Credential hiện tại</el-divider>
            <el-input
              :value="currentCredential.credential_definition_id"
              :disabled="true"
            ></el-input>
            <RequestedAttributes :attributes="currentCredential.attributes" />
            <RequestedPredicates
              :attributes="currentCredential.attributes"
              @isFinished="handleFinished"
            />
          </el-form-item>
          <el-divider>Ghi chú</el-divider>
          <el-form-item>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="Comment"
              v-model="comment"
            >
            </el-input>
          </el-form-item>
          <el-button
            type="success"
            @click="sendRequest"
            :disabled="!isFinished"
            :loading="loading"
            >Gửi yêu cầu</el-button
          >
          <el-divider></el-divider>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import RequestedAttributes from "./RequestedAttributes";
import RequestedPredicates from "./RequestedPredicates";
import SelectConnection from "../../shared/SelectConnection";
export default {
  name: "ProofRequest",
  async mounted() {
    await this.fetchAndSetConnections();
    if (this.error) {
      this.$notify({
        title: "Error",
        type: "error",
        message: this.errorMessage
      });
      this.reset();
    }
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    connected: function(data) {
      console.log("Message received:", data);
    }
  },
  data: () => ({
    proofReqName: "",
    isFinished: false,
    comment: ""
  }),
  methods: {
    ...mapActions("proof/", ["sendProofRequest", "updateProofList"]),
    ...mapActions("connections/", ["fetchAndSetConnections"]),
    ...mapActions(["reset"]),
    async sendRequest() {
      const payload = {
        connection_id: this.connectionId,
        proof_request_name: this.proofReqName,
        requested_attributes: this.requestedAttributes,
        requested_predicates: this.requestedPredicates,
        comment: this.comment
      };
      if (this.requestedAttributes.length === 0) {
        this.$alert("Không thể thiếu các thuộc tính", "Lưu ý", {
          confirmButtonText: "OK"
        });
        return;
      }
      const result = await this.sendProofRequest(payload);
      console.log("sendRequest -> result", result);
      if (result.presentation_exchange_id) {
        this.$notify({
          title: "Sent",
          message: "Đã gửi yêu cầu xác minh",
          type: "success"
        });
        this.sockets.subscribe(
          `proof_verified_${result.presentation_exchange_id}`,
          presentationExchange => {
            console.log(
              "sockets received -> presentationExchange",
              presentationExchange
            );
            console.log("received presentationExchange", presentationExchange);
            this.$notify({
              title: "Nhận một Presentation",
              message: `Đã nhận được một presentation từ connection_id ${presentationExchange.connection_id}`,
              type: "success",
              duration: 5000
            });
            this.updateProofList(presentationExchange);
          }
        );
      }
    },
    handleFinished(isFinished) {
      this.isFinished = isFinished;
    }
  },
  computed: {
    ...mapState(["loading", "error", "errorMessage"]),
    ...mapState("proof/", [
      "foundCredentials",
      "currentCredential",
      "requestedPredicates",
      "requestedAttributes"
    ]),
    ...mapState("credentials/", ["connectionId"]),
    ...mapGetters("connections/", ["activeConnections"])
  },
  components: {
    RequestedAttributes,
    RequestedPredicates,
    SelectConnection
  }
};
</script>

<style scope>
.proof_request_name {
  display: flex;
  justify-content: center;
}
.proof-request-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
