<template>
  <div>
    <img v-if="verified" src="../../../assets/tick.svg" class="image" />
    <img
      v-else-if="!verified && sent"
      src="../../../assets/loader.svg"
      class="image"
    />
    <img v-else src="../../../assets/cross.svg" class="image" />
    <el-alert
      v-if="verified"
      :closable="false"
      title="Đã xác minh"
      type="success"
      center
      show-icon
    ></el-alert>
    <el-alert
      v-else-if="!verified && sent"
      :closable="false"
      title="Đã gửi yêu cầu"
      type="info"
      center
      show-icon
    ></el-alert>
    <el-alert
      v-else
      :closable="false"
      title="Không xác minh"
      center
      type="error"
      show-icon
    ></el-alert>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  props: {
    verified: Boolean,
    sent: Boolean
  }
};
</script>

<style scoped>
.image {
  width: 50%;
  display: block;
  margin: 0 auto;
}
</style>
