import { createRouter, createWebHistory } from 'vue-router'
import Blog from '../views/Context/card/index.vue'
import Context from '../views/Context/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Context',
      component: Context
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    }
  ]
})

export default router
