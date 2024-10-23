import { createRouter, createWebHistory } from 'vue-router'
import Context from '../views/Context/index.vue' //主页
import BlogId from '../views/Context/blog/index.vue'
import allBlog from '../views/Context/allBlog/index.vue'
import aboutMe from '../views/Header/aboutMe/index.vue'
import addBlog from '../views/Admin/addBlog/index.vue' //添加博客
import dyVideo from '../views/DY/Video/index.vue'

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
      path: '/aboutMe',
      name: 'aboutMe',
      component: aboutMe
    },
    {
      path: '/addBlog',
      name: 'addBlog',
      component: addBlog
    },
    {
      path: '/dyVideo',
      name: 'dyVideo',
      component: dyVideo
    }
  ]
})

export default router
