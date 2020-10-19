<template>
  <div class="btn-group" role="group">
    <button class='fsz-xs btn bgc-white bdrs-2 mR-3 cur-p' @click="prevPage">
      <i class="ti-angle-left" />
    </button>
    <button class='fsz-xs btn bgc-white bdrs-2 mR-3 cur-p' @click="nextPage">
      <i class="ti-angle-right" />
    </button>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['pagesCount', 'currPage'],
  data() {
    return {
      totalPages: 1,
      currentPage: 1
    }
  },
  mounted() {
    this.totalPages = this.pagesCount - 1
    this.currentPage = this.currPage
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.$eventBus.$emit('paginate', this.currentPage)
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--
        this.$eventBus.$emit('paginate', this.currentPage)
      }
    }
  }
}
</script>