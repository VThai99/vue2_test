import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import storeConfig from "./store";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store(storeConfig);

new Vue({
  render: (h) => h(App),
  vuetify,
  store
}).$mount("#app");
