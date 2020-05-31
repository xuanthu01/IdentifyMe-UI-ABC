<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/Identifyme-logo.png" />
    <HelloWorld
      msg="Identify.Me - Ứng dụng mô hình Self-Sovereign Identity (SSI) trong quản lý thông tin cá nhân."
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
