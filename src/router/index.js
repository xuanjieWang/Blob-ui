import { createRouter, createWebHistory } from 'vue-router'
import Context from '../views/Context/index.vue' //主页
import Blog from '../views/Context/blog/index.vue' //blog

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
      path: '/blog',
      name: 'blog',
      component: Blog
    }
    // {
    //   path: '/blog:blogId(\\d+)',
    //   name: 'blog',
    //   component: Blog
    // }
  ]
})

export default router
