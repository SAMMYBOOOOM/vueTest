import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/global.css'
import request from "@/utils/request";

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' }) // normal, small, mini

Vue.prototype.$request=request
// Vue.prototype.$baseUrl=process.env.VUE_APP_BASEURL
Vue.prototype.$baseUrl="http://localhost:9090"  // Like global var

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
