const adminRouter = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/index.vue')
  }
]

export default adminRouter
