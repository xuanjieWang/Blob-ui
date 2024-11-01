const adminRouter = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/index.vue')
  },
  {
    path: '/addBlog',
    name: 'addBlog',
    component: () => import('@/views/Admin/addBlog/index.vue')
  }
]

export default adminRouter
