import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 新定義一個vue實例，並建立 $bus prototype
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
