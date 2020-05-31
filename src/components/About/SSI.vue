<template>
  <el-container>
    <el-row style="display:flex;justify-content: center;text-align:justify">
      <el-col :xs="24" :md="24" :lg="12" :xl="12">
        <vue-simple-markdown :source="content"></vue-simple-markdown>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { content } from "./ssi-content";
export default {
  data() {
    return {
      content
    };
  }
};
</script>

<style></style>
