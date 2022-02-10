import Vue from 'vue'
import VueRouter from 'vue-router'
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/1'
  },
  {
    // 限定配對數字，到checkout裡讀取 :step渲染畫面
    path: '/:step(\\d+)',
    // route name 資料型別不能用數字，router.push 遇到0會壞掉
    name: 'checkout',
    component: Checkout
  },
  {
    path: '*',
    name: 'not-found',
    redirect: '/1'
  }
]

const router = new VueRouter({
  routes
})

export default router
