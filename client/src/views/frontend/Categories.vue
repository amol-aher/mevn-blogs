<template>
  <div class="categories">
    <Index />
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Blog-Index',
  components: {
    Index: () => import(/* webpackPrefetch: true */ '@/components/frontend/categories/Index')
  }
}
</script>