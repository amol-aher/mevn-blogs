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

  { 
    path: '/admin/categories', 
    name: 'categories_index', 
    component: () => import('@/views/admin/Category'), 
    meta: { layout: 'admin', requriesAuth: true },
    children: [
      {
        path: '/admin/categories/new', name: 'new_category', component: () => import('@/components/admin/categories/Form'), meta: { layout: 'admin', requriesAuth: true }, props: true
      },
      {
        path: '/admin/categories/:category_id/edit', name: 'edit_category', component: () => import('@/components/admin/categories/Form'), meta: { layout: 'admin', requriesAuth: true }, props: true
      },
      {
        path: '/admin/categories/:category_id/show', name: 'show_category', component: () => import('@/components/admin/categories/Show'), meta: { layout: 'admin', requriesAuth: true }, props: true
      }
    ]
  },

  { 
    path: '/admin/blogs', 
    name: 'blogs_index', 
    component: AdminBlog, 
    meta: { layout: 'admin', requriesAuth: true },
    children: [
      {
        path: '/admin/blogs/new', name: 'new_blog', component: () => import('@/components/admin/blogs/Form'), meta: { layout: 'admin', requriesAuth: true }, props: true
      },
      {
        path: '/admin/blogs/:blog_id/edit', name: 'edit_blog', component: () => import('@/components/admin/blogs/Form'), meta: { layout: 'admin', requriesAuth: true }, props: true
      },
      {
        path: '/admin/blogs/:blog_id/show', name: 'show_blog', component: () => import('@/components/admin/blogs/Show'), meta: { layout: 'admin', requriesAuth: true }, props: true
      }
    ]
  }
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