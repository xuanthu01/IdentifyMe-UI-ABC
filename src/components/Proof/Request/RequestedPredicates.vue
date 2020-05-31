<template>
  <el-container style="flex-direction: column; align-items: center;">
    <el-divider>
      Thuộc tính bí mật
    </el-divider>
    <el-card>
      <div slot="header">
        <span>
          <b>Chọn thuộc tính kiểu số</b>
        </span>
      </div>
      <el-checkbox
        :indeterminate="isIndeterminatePreds"
        v-model="checkAllPreds"
        @change="handleCheckAllPredsChange"
        >All</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedPreds"
        @change="handleCheckedPredsChange"
      >
        <div>
          <el-checkbox v-for="attr in attributes" :label="attr" :key="attr">{{
            attr
          }}</el-checkbox>
        </div>
      </el-checkbox-group>
      <el-row
        class="predicates_element"
        v-for="attr in requestedPredicates"
        :key="attr.name"
      >
        <el-col :span="22">
          <div class="predicates">{{ attr.name }}</div>
        </el-col>
        <el-col :span="10">
          <el-input placeholder=">=,<=,>,<" v-model="attr.p_type"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input
            type="number"
            v-model="attr.p_value"
            placeholder="0"
          ></el-input>
        </el-col>
      </el-row>
      <el-button
        style="margin-top: 20px"
        type="primary"
        @click.prevent="onClickSave"
        >Lưu</el-button
      >
      <el-button style="margin-top: 20px" @click.prevent="onClickReset"
        >Reset</el-button
      >
    </el-card>
  </el-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    attributes: Array
  },
  data() {
    return {
      attrsObject: {},
      requestedPredicates: [],
      checkAllPreds: false,
      checkedPreds: [],
      isIndeterminatePreds: false
    };
  },
  methods: {
    ...mapActions("proof/", ["setRequestedPredicates"]),
    handleCheckAllPredsChange(val) {
      this.checkedPreds = val ? this.attributes : [];
      this.isIndeterminatePreds = false;
    },
    handleCheckedPredsChange(value) {
      let checkedCount = value.length;
      this.checkAllPreds = checkedCount === this.attributes.length;
      this.isIndeterminatePreds =
        checkedCount > 0 && checkedCount < this.attributes.length;
    },
    onClickSave() {
      this.setRequestedPredicates(this.requestedPredicates);
      this.$notify({
        title: "Saved",
        message: "Đã lưu lại các thuộc tính",
        type: "success"
      });
      this.$emit("isFinished", true);
    },
    onClickReset() {
      this.checkedPreds = [];
      this.requestedPredicates = [];
      this.isIndeterminatePreds = false;
      this.setRequestedPredicates([]);
      this.$notify({
        title: "Reseted",
        message: "Đã xóa các thuộc tính",
        type: "warning"
      });
      this.$emit("isFinished", false);
    }
  },
  watch: {
    checkedPreds: function(value, oldValue) {
      this.requestedPredicates = this.checkedPreds.map(attr => {
        return {
          name: attr,
          p_type: ">=",
          p_value: "0",
          restrictions: [
            {
              cred_def_id: this.currentCredential.credential_definition_id
            }
          ]
        };
      });
    }
  },
  computed: {
    ...mapState("proof/", ["currentCredential"])
  }
};
</script>

<style>
.predicates {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  height: 38px;
  background-color: rgba(0, 0, 0, 0.12);
}
.predicates_element {
  margin: 1px;
  display: flex;
  padding: 1px;
}
</style>
