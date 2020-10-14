<template>
  <div>
    <Sidebar></Sidebar>
    <div class="page-container">
      <Header></Header>
      <main class='main-content bgc-grey-100'>
        <div id='mainContent'>
          <router-view></router-view>
        </div>
      </main>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import '@/assets/admin/styles/index.js'
import '@/assets/admin/scripts/index.js'
import '@/assets/admin/styles/index.scss'
import Header from '@/components/admin/layouts/Header'
import Sidebar from '@/components/admin/layouts/Sidebar'
import Footer from '@/components/admin/layouts/Footer'

export default {
  name: 'Admin-Layout',
  created() {
    this.$forceUpdate();
  },
  components: {
    Header, Sidebar, Footer
  }
}
</script>