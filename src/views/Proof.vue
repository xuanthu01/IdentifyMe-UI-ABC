<template>
  <el-row>
    <el-col>
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </el-col>
  </el-row>
</template>
<script>
export default {};
</script>

<style></style>
