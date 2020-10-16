import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import AdminCategory from '@/views/admin/Category'
import AdminBlog from '@/views/admin/Blog'

Vue.use(Router)

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/frontend/Home'), meta: { layout: 'frontend', requriesAuth: false } },
  { path: '/admin/login', name: 'Login', component: () => import('@/views/Login'), meta: { layout: 'auth', requriesAuth: false } },
  { path: '/admin', name: 'AdminDashboard', component: () => import('@/views/admin/Dashboard'), meta: { layout: 'admin', requriesAuth: true } },
  { path: '/admin/categories', name: 'Categories', component: AdminCategory, meta: { layout: 'admin', requriesAuth: true } },

  { path: '/admin/blogs', name: 'Blogs', component: AdminBlog, meta: { layout: 'admin', requriesAuth: true } }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(( to, from, next ) => {
  if( to.matched.some( record => record.meta.requriesAuth ) ) {
    if( localStorage.getItem('jwt') == null ) {
      next({
        path: '/admin/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router