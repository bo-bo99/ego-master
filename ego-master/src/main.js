import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import i18n from './lang/index' 
import './router/permission'
import '@/utils/localStorage.js'
import * as echarts from 'echarts'
// console.log(echarts);
Vue.prototype.$echarts=echarts;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
