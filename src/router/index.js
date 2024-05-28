import { createRouter, createWebHistory } from 'vue-router'
import Context from '../views/Context/index.vue' //主页
import Blog from '../views/Context/blog/index.vue' //blog
import BlogId from '../views/Context/card/index.vue'
import aboutMe from '../views/Header/aboutMe/index.vue'
import addBlog from '../views/Admin/addBlog/index.vue' //添加博客

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
    },
    {
      path: '/blog:blogId(\\d+)',
      name: 'BlogId',
      component: BlogId
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
    }
  ]
})

export default router
