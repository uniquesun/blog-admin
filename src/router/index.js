import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layouts/IndexView.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/contents/HomeView.vue')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/contents/CategoryView.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/contents/ArticleView.vue')
      },
      {
        path: '/article/create',
        name: 'articleCreate',
        component: () => import('@/views/contents/ArticleCreateView.vue'),
      },
      {
        path: '/article/:id/edit',
        name: 'articleEdit',
        component: () => import('@/views/contents/ArticleCreateView.vue'),
        props: true
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/contents/CommentView.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/contents/UserView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.state.token
  // 没登录就去登录页面
  if (!token) {
    return to.name === 'login' ? next() : next('/login')
  }
  return to.name === 'login' ? next('/') : next()

})

export default router
