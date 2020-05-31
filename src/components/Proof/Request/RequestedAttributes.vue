<template>
  <el-container style="flex-direction: column;align-items: center">
    <el-divider><i>Thuộc tính công khai</i></el-divider>
    <el-card>
      <div slot="header">
        <span>
          <b>Chọn thuộc tính</b>
        </span>
      </div>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >All</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedAttrs"
        @change="handleCheckedAttrsChange"
      >
        <div>
          <el-checkbox v-for="attr in attributes" :label="attr" :key="attr">{{
            attr
          }}</el-checkbox>
        </div>
      </el-checkbox-group>
    </el-card>
  </el-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    attributes: Array
  },
  data() {
    return {
      checkAll: false,
      checkedAttrs: [],
      isIndeterminate: false,
      requestedAttrs: {}
    };
  },
  methods: {
    ...mapActions("proof/", ["setRequestedAttributes"]),
    handleCheckAllChange(val) {
      this.checkedAttrs = val ? this.attributes : [];
      this.isIndeterminate = false;
    },
    handleCheckedAttrsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.attributes.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.attributes.length;
    }
  },
  computed: {
    ...mapState("proof/", ["currentCredential"])
  },
  watch: {
    checkedAttrs: function(value, oldValue) {
      if (value.length !== oldValue.length) {
        const requestAttr = {
          schema_attrs: this.checkedAttrs,
          restrictions: [
            {
              cred_def_id: this.currentCredential.credential_definition_id
            }
          ]
        };
        this.setRequestedAttributes(requestAttr);
      }
    }
  }
};
</script>

<style></style>
