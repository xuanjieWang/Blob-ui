import { createRouter, createWebHistory } from 'vue-router'
import Test from '../views/Context/card/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'test',
      component: Test
    }
  ]
})

export default router
