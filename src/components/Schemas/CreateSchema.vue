<template>
  <el-container class="create-schema-container">
    <h2>Tạo mới</h2>
    <el-divider></el-divider>
    <p>
      Trong trường hợp update lại schema, cần lưu ý các thuộc tính cũ và
      <b>PHẢI</b> đánh lại version mới hơn version cũ.
    </p>
    <p>
      Xin vui lòng điền đầy đủ thông tin cho schema, bao gồm các trường dưới
      đây:
    </p>
    <el-form
      label-position="left"
      label-width="150px"
      :model="formCreateSchema"
      ref="formCreateSchema"
      v-loading="loading"
    >
      <el-form-item
        label="Schema Name"
        prop="name"
        :rules="[{ required: true, message: 'Schema name is required' }]"
      >
        <el-input
          v-model="formCreateSchema.name"
          placeholder="Schema name"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Schema Version"
        prop="version"
        :rules="[{ required: true, message: 'Schema version is required' }]"
      >
        <el-input
          v-model="formCreateSchema.version"
          placeholder="1.0.0"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Schema Attributes"
        :rules="[{ required: true, message: 'Schema attributes is required' }]"
      >
        <el-tag
          :key="attribute"
          v-for="attribute in attributes"
          closable
          :disable-transitions="false"
          @close="handleClose(attribute)"
          >{{ attribute }}</el-tag
        >
        <el-input
          class="input-new-attribute"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveAttrInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button
          v-else
          class="button-new-attribute"
          size="small"
          @click="showInput"
          >+ New Attribute</el-button
        >
      </el-form-item>
      <el-button type="primary" @click="submitForm('formCreateSchema')"
        >Create</el-button
      >
      <el-divider></el-divider>
    </el-form>
  </el-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      attributes: [],
      inputVisible: false,
      inputValue: "",
      formCreateSchema: {
        name: "",
        version: ""
      }
    };
  },
  mounted() {
    if (this.error) {
      this.$notify({
        title: "Error",
        type: "error",
        message: this.errorMessage
      });
      this.reset();
    }
  },
  computed: {
    ...mapState(["loading", "error", "errorMessage"])
  },
  methods: {
    ...mapActions("schemas/", ["createNewSchema"]),
    ...mapActions(["reset"]),
    handleClose(attribute) {
      this.attributes.splice(this.attributes.indexOf(attribute), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveAttrInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.attributes.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    submitForm(formName) {
      if (this.attributes.length === 0) {
        alert("Please add an attribute");
        return;
      }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const schemaPayload = {
            schema_name: this.formCreateSchema.name,
            schema_version: this.formCreateSchema.version,
            attributes: this.attributes
          };
          await this.createNewSchema(schemaPayload);
          if (this.error) {
            this.$notify({
              title: "Error",
              type: "error",
              message: this.errorMessage,
              duration: 5000
            });
          } else {
            this.$notify({
              title: "Created",
              type: "success",
              message:
                "Created new schema with name " + this.formCreateSchema.name,
              duration: 5000
            });
          }
          this.$refs[formName].resetFields();
          this.attributes = [];
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.create-schema-container {
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 5px;
  align-items: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-attribute {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-attribute {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
