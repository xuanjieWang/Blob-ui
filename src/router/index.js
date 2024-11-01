import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { createRouter, createWebHistory } from 'vue-router'
import Context from '../views/Context/index.vue' //主页
import BlogId from '../views/Context/blog/index.vue'
import lifeBlog from '../views/Context/lifeBlog/index.vue'
import allBlog from '../views/Context/allBlog/index.vue'
import aboutMe from '../views/Header/aboutMe/index.vue'
import login from '../views/Admin/login/index.vue'
import adminRouter from './admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Context',
      component: Context
    },
    {
      path: '/index',
      name: 'index',
      component: Context
    },
    {
      path: '/blog:blogId(\\d+)',
      name: 'BlogId',
      component: BlogId
    },
    {
      path: '/allBlog',
      name: 'allBlog',
      component: allBlog
    },
    {
      path: '/lifeBlog',
      name: 'lifeBlog',
      component: lifeBlog
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: aboutMe
    },
    {
      path: '/dy',
      name: 'dy',
      component: () => import('@/views/DY/Video/index.vue')
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
