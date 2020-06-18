<template>
  <div @click="handleClick" id="banner">
    <div id="bannerimage"></div>
  </div>
</template>
<script>
export default {
  name: "Banner",
  methods: {
    handleClick() {
      if (this.$route.path !== "/") this.$router.push("/");
    }
  }
};
</script>

<style>
#banner {
  background: linear-gradient(315deg, #ef5734 0%, #ffcc2f 74%);
}
#bannerimage {
  cursor: pointer;
  width: 100%;
  background-image: url("../assets/neeboo-banner.png");
  height: 140px;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: 300px 100px;
  background-position: 2%;
}
#team-logo {
  cursor: pointer;
  width: 100%;
  background-image: url("../assets/Identifyme-logo.png");
  height: 140px;
  border-radius: 5px;
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  float: right;
}
</style>
