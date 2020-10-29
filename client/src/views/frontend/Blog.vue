<template>
  <div class="blogs">
    <Index />
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Blog-Index',
  components: {
    Index: () => import(/* webpackPrefetch: true */ '@/components/frontend/blogs/Index')
  }
}
</script>