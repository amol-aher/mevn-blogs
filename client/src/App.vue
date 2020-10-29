<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = 'admin'

export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout"
    }
  },
  components: {
    'admin-layout': () => import(/* webpackPrefetch: true */ '@/views/layouts/Admin'),
    'auth-layout': () => import(/* webpackPrefetch: true */ '@/views/layouts/Auth'),
    'frontend-layout': () => import(/* webpackPrefetch: true */ '@/views/layouts/Frontend'),
  }
}
</script>