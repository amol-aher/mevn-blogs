<template>
  <div class="peers ai-s fxw-nw h-100vh">
    <div class="d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv" v-bind:style="{'background-image': 'url(' + background + ')'}">
      <div class="pos-a centerXY">
        <div class="bgc-white bdrs-50p pos-r" style='width: 120px; height: 120px;'>
          <img class="pos-a centerXY" src="@/assets/admin/static/images/logo.png" alt="">
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import '@/assets/admin/scripts/index.js'
import '@/assets/admin/styles/index.js'
export default {
  name: 'Auth-Layout',
  computed: {
    background () {
      return require('@/assets/admin/static/images/bg.jpg')
    }
  }
}
</script>