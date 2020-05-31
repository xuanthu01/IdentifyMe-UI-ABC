import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import PortalVue from "portal-vue";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import "./plugins/element.js";
import ElTablePagination from "el-table-pagination";
import ElSearchTablePagination from "el-search-table-pagination";
import SocketIOClient from "socket.io-client";
import { SOCKET_ENDPOINT } from "./config";
import VueSimpleMarkdown from "vue-simple-markdown";
import "vue-simple-markdown/dist/vue-simple-markdown.css";

Vue.use(VueSimpleMarkdown);
Vue.config.productionTip = false;
Vue.use(PortalVue);
Vue.use(
  new VueSocketIO({
    debug: process.env.NODE_ENV !== "production",
    connection: SocketIOClient(SOCKET_ENDPOINT, {
      polling: {
        extraHeaders: {
          "Access-Control-Allow-Origin": "http://localhost:8080"
        }
      }
    })
  })
);
Vue.use(ElTablePagination);
Vue.use(ElSearchTablePagination);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
