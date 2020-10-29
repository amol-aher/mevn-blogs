<template>
  <div class="blog-index">
    <PageHeader :title="'Categories'" />
    <div class="page-content">
      <div class="container">
        <CategoryList />
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Blog-Index',
  components: {
    CategoryList: () => import(/* webpackPrefetch: true */ './CategoryList'),
    PageHeader: () => import(/* webpackPrefetch: true */ '@/components/frontend/layouts/PageHeader'),
  }
}
</script>