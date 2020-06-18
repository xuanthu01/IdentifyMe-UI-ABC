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
            <el-form-item
              v-if="revealed_attrs"
              label="Các thuộc tính được cung cấp"
              :label-width="labelWidth"
            >
              <el-input
                class="input-readonly"
                v-for="attr in Object.keys(revealed_attrs)"
                :key="attr"
                :value="revealed_attrs[attr].raw"
                disabled
                autocomplete="off"
              >
                <div class="detail-prepend" slot="prepend">
                  {{ attr.split("_")[1] }}
                </div>
              </el-input>
              <el-input
                class="input-readonly"
                v-for="attr in Object.keys(requested_predicates)"
                :key="attr"
                :value="predicates[attr] ? 'true' : 'false'"
                disabled
                autocomplete="off"
              >
                <div class="detail-prepend" style="width: 100px" slot="prepend">
                  {{
                    "Is " +
                      requested_predicates[attr]["name"] +
                      " " +
                      requested_predicates[attr]["p_type"] +
                      " " +
                      requested_predicates[attr]["p_value"] +
                      " ?"
                  }}
                </div>
              </el-input>
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
  mounted() {
    console.log("proof", this.item);
    this.revealed_attrs = this.item.presentation.requested_proof.revealed_attrs;
    this.predicates = this.item.presentation.requested_proof.predicates;
    this.requested_predicates = this.item.presentation_request.requested_predicates;
    console.log(
      "mounted -> this.requested_predicates",
      this.requested_predicates
    );
  },
  data() {
    return {
      labelWidth: "120px",
      proof: this.item,
      showDetails: this.show,
      isMobile: isMobile,
      revealed_attrs: null,
      predicates: null,
      requested_predicates: null
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

<style>
.el-input__inner {
  color: #000 !important;
}
.detail-prepend {
  width: 100px !important;
  font-weight: bold !important;
  color: #000;
}
.input-readonly {
  margin: 3px 0;
}
</style>
