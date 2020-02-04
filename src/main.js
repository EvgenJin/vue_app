import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store/store'
export const bus = new Vue();
Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
  }),
});
