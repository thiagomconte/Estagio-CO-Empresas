import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import routerLoadedWithRoutes from "./router";
import VueTheMask from "vue-the-mask";
import VueToastify from "vue-toastify";

Vue.use(VueToastify, {
  singular: false,
  position: "top-right",
  hideProgressbar: true,
  errorDuration: 2000,
  successDuration: 2000
}, routerLoadedWithRoutes);
Vue.use(VueTheMask);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
