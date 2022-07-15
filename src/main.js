import Vue from "vue";
import App from "./App.vue";
import { ValidationProvider } from 'vee-validate';

Vue.config.productionTip = false;
Vue.component('ValidationProvider', ValidationProvider);


new Vue({
  render: (h) => h(App)
}).$mount("#app");
