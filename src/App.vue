<template>
  <div id="app">
    <el-row>
      <el-container>
        <Banner />
        <Header />
        <el-main style="margin-bottom: 50px;">
          <transition name="el-zoom-in-center">
            <router-view />
          </transition>
        </el-main>
        <el-footer class="app-footer">
          <p style="color:#FF9E39;">
            Made by
            <b>Identify.Me</b> Teams
          </p>
          <i style="color:#FF9E39" class="el-icon-loading"></i>
        </el-footer>
      </el-container>
    </el-row>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapState(["loading", "error", "errorMessage"])
  },
  methods: {
    ...mapActions(["reset"])
  },
  watch: {
    error: function(value, oldValue) {
      if (value === true)
        this.$notify({
          title: "Error",
          message: this.errorMessage,
          type: "error"
        });
      this.reset();
    }
  },
  components: {
    // HelloWorld,
    Banner,
    Header
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");

body {
  overflow: unset !important;
  background-color: rgba(217, 225, 236, 0.4);
}
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  font-family: "Open Sans", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#content {
  width: 100px;
  height: 100px;
  background-color: #2c3e50;
}
.app-footer {
  /* background-color: rgba(0, 0, 0, 0.08); */
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  align-items: center;
  display: flex;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #1d69ab;
  z-index: 3000;
}
.el-submenu__title {
  border-radius: 5px;
}
#devider {
  background-color: #2c3e50;
}
#devider .el-divider__text {
  background-color: #d8d0f3;
  border-radius: 3px;
}
</style>
