<template>
  <div>
    <Header />
    <router-view />
    <BottomSection />
    <Footer />
  </div>
</template>
<script>
import '@/assets/frontend/theme.scss'
import '@/assets/frontend/fontawesome/js/all.min.js'

export default {
  name: 'frontend-layout',
  mounted() {
    console.log('Frontend mounted')
  },
  components: {
    Header: () => import(/* webpackPrefetch: true */ '@/components/frontend/layouts/Header'),
    BottomSection: () => import(/* webpackPrefetch: true */ '@/components/frontend/layouts/BottomSection'),
    Footer: () => import(/* webpackPrefetch: true */ '@/components/frontend/layouts/Footer')
  }
}
</script>
