<template>
  <div>
    <Sidebar></Sidebar>
    <div class="page-container">
      <Header></Header>
      <main class='main-content bgc-grey-100'>
        <div id='mainContent'>
          <router-view />
        </div>
      </main>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import '@/assets/admin/scripts/index.js'
import '@/assets/admin/styles/index.js'
import Header from '@/components/admin/layouts/Header'
import Sidebar from '@/components/admin/layouts/Sidebar'
import Footer from '@/components/admin/layouts/Footer'
export default {
  name: 'admin-layout',
  components: {
    Header, Sidebar, Footer
  },
  mounted() {
    console.log('Admin mounted')
  }
}
</script>