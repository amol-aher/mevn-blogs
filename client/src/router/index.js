import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/frontend/Home'), meta: { layout: 'frontend', requriesAuth: false } },
  { path: '/profile', name: 'profile', component: () => import('@/views/frontend/Profile'), meta: { layout: 'frontend', requriesAuth: false } },
  { path: '/abilities', name: 'abilities', component: () => import('@/views/frontend/Abilities'), meta: { layout: 'frontend', requriesAuth: false } },
  { path: '/education', name: 'education', component: () => import('@/views/frontend/Education'), meta: { layout: 'frontend', requriesAuth: false } },
  { path: '/career', name: 'career', component: () => import('@/views/frontend/Career'), meta: { layout: 'frontend', requriesAuth: false } },
  { path: '/blogs', name: 'blogs', component: () => import('@/views/frontend/Blog'), meta: { layout: 'frontend', requriesAuth: false } },
  { path: '/contact', name: 'contact', component: () => import('@/views/frontend/Contact'), meta: { layout: 'frontend', requriesAuth: false } },

  { path: '/admin/login', name: 'Login', component: () => import('@/views/Login'), meta: { layout: 'auth', requriesAuth: false } },
  { path: '/admin', name: 'AdminDashboard', component: () => import('@/views/admin/Dashboard'), meta: { layout: 'admin', requriesAuth: true } },
  { 
    path: '/admin/categories', component: () => import('@/views/admin/Category'), meta: { layout: 'admin', requriesAuth: true },
    children: [
      { path: '/', name: 'categories_index', component: () => import('@/components/admin/categories/Index'), meta: { layout: 'admin', requriesAuth: true }, props: true },
      { path: '/admin/categories/new', name: 'new_category', component: () => import('@/components/admin/categories/Form'), meta: { layout: 'admin', requriesAuth: true }, props: true },
      { path: '/admin/categories/:category_id/edit', name: 'edit_category', component: () => import('@/components/admin/categories/Form'), meta: { layout: 'admin', requriesAuth: true }, props: true },
      { path: '/admin/categories/:category_id/show', name: 'show_category', component: () => import('@/components/admin/categories/Show'), meta: { layout: 'admin', requriesAuth: true }, props: true }
    ]
  },
  { 
    path: '/admin/blogs', component: () => import('@/views/admin/Blog'), meta: { layout: 'admin', requriesAuth: true },
    children: [
      { path: '/', name: 'blogs_index', component: () => import('@/components/admin/blogs/Index'), meta: { layout: 'admin', requriesAuth: true }, props: true },
      { path: '/admin/blogs/new', name: 'new_blog', component: () => import('@/components/admin/blogs/Form'), meta: { layout: 'admin', requriesAuth: true }, props: true },
      { path: '/admin/blogs/:blog_id/edit', name: 'edit_blog', component: () => import('@/components/admin/blogs/Form'), meta: { layout: 'admin', requriesAuth: true }, props: true },
      { path: '/admin/blogs/:blog_id/show', name: 'show_blog', component: () => import('@/components/admin/blogs/Show'), meta: { layout: 'admin', requriesAuth: true }, props: true }
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