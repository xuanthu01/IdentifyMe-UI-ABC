<template>
  <transition name="el-zoom-in-center">
    <portal to="proof-item-detail">
      <el-container>
        <el-dialog
          :title="proof.presentation_request.name"
          :visible.sync="showDetails"
          :closeOnClickModal="false"
          :closeOnPressEscape="false"
          :showClose="false"
          :width="isScreenMobile || isMobile ? '95%' : '40%'"
          :lock-scroll="false"
        >
          <el-form :model="proof" label-position="top">
            <el-form-item label="Proof Request Name" :label-width="labelWidth">
              <el-input
                v-model="proof.presentation_request.name"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Connection ID" :label-width="labelWidth">
              <el-input
                v-model="proof.connection_id"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Presentation Exchange ID"
              :label-width="labelWidth"
            >
              <el-input
                v-model="proof.presentation_exchange_id"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Khởi tạo bởi" :label-width="labelWidth">
              <el-input
                v-model="proof.initiator"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Trạng thái" :label-width="labelWidth">
              <el-input
                v-model="proof.state"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Đã được xác thực" :label-width="labelWidth">
              <el-input
                v-model="proof.verified"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="Các thuộc tính yêu cầu"
              :label-width="labelWidth"
            >
              <el-input
                v-model="requested_attributes"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="setVisible(false)"
              >Close</el-button
            >
          </span>
        </el-dialog>
      </el-container>
    </portal>
  </transition>
</template>

<script>
import isMobile from "../../../utils/detect-user-agent";
export default {
  props: {
    item: Object,
    setVisible: Function,
    show: Boolean,
    requested_attributes: String
  },
  mounted() {},
  data() {
    return {
      labelWidth: "120px",
      proof: this.item,
      showDetails: this.show,
      isMobile: isMobile
    };
  },
  methods: {},
  computed: {
    isScreenMobile() {
      return window.matchMedia("screen and (max-width: 768px)").matches;
    }
  }
};
</script>

<style></style>
