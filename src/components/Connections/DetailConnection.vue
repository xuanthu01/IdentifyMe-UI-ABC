<template>
  <transition name="el-zoom-in-center">
    <portal to="detail-connection">
      <el-container>
        <el-dialog
          :title="'Connection state is ' + connection.state"
          :visible.sync="showDetails"
          :closeOnClickModal="false"
          :closeOnPressEscape="false"
          :showClose="false"
          width="95%"
        >
          <el-form :model="connection">
            <el-form-item label="Agent Name" :label-width="labelWidth">
              <el-input
                v-model="connection.their_label"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="My DID" :label-width="labelWidth">
              <el-input
                v-model="connection.my_did"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Their DID" :label-width="labelWidth">
              <el-input
                v-model="connection.their_did"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Invitation Key" :label-width="labelWidth">
              <el-input
                v-model="connection.invitation_key"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Invitation mode" :label-width="labelWidth">
              <el-input
                v-model="connection.invitation_mode"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Created At" :label-width="labelWidth">
              <el-input
                v-model="connection.created_at"
                disabled
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Updated At" :label-width="labelWidth">
              <el-input
                v-model="connection.updated_at"
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
export default {
  props: { connectionDetail: Object, setVisible: Function, show: Boolean },
  mounted() {},
  data() {
    return {
      labelWidth: "120px",
      connection: this.connectionDetail,
      showDetails: this.show
    };
  },
  methods: {},
  computed: {}
};
</script>

<style></style>
