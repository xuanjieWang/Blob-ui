import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { createRouter, createWebHistory } from 'vue-router'
import adminRouter from './admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Context',
      component: import('../views/Context/index.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: import('../views/Context/index.vue')
    },
    {
      path: '/blog:blogId(\\d+)',
      name: 'BlogId',
      component: import('../views/Context/blog/index.vue')
    },
    {
      path: '/allBlog',
      name: 'allBlog',
      component: import('../views/Context/blog/allBlog/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: import('../views/Admin/login/index.vue')
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: import('../views/Header/aboutMe/index.vue')
    },
    {
      path: '/Blogs',
      name: 'Blogs',
      component: import('../views/Context/blog/Blogs/index.vue')
    },
    {
      path: '/wallHaven',
      name: 'wallHaven',
      component: import('/src/views/Context/blog/wallHaven/index.vue')
    },
    {
      path: '/Video',
      name: 'Video',
      component: import('/src/views/Context/blog/Video/index.vue')
    },
    ...adminRouter
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
