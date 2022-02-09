import Vue from 'vue'
import VueRouter from 'vue-router'
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/checkout'
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  }
]

const router = new VueRouter({
  routes
})

export default router
