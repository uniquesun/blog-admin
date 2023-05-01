import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ls from '@/utils/localStorage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = ls.getItem('token')
  // 没登录就去登录页面
  if (!token) {
    return to.name === 'login' ? next() : next('/login')
  }
  return to.name === 'login' ? next(from.path) : next()

})

export default router
