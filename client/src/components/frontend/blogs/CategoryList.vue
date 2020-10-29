<template>
  <div class="docs-overview py-5">
    <div class="row justify-content-center">
      <Category :category="category" v-for="category in categories" :key="category._id"/>
    </div>
  </div>
</template>
<script>
import GuestService from '@/services/guestService'
export default {
  name: 'Category-List',
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    GuestService.getCategories().then(response => {
      this.categories = response.data.list
    })
  },
  components: {
    Category: () => import(/* webpackPrefetch: true */ './Category')
  }
}
</script>