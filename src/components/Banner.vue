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
  background: linear-gradient(
    90deg,
    rgba(220, 210, 245, 1) 0%,
    rgba(7, 125, 138, 1) 93%
  );
}
#bannerimage {
  cursor: pointer;
  width: 100%;
  background-image: url("../assets/uit-banner.png");
  height: 140px;
  border-radius: 5px;
  background-position: left;
  background-size: contain;
  background-repeat: no-repeat;
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
