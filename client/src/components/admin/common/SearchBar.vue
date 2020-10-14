<template>
  <div class="layer w-100">
    <div class="bdT bdB">
      <input type="text" class="form-control m-0 bdw-0 pY-15 pX-20" placeholder="Search..." v-model="searchText" @input="textChange">
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminSearchBar',
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    textChange: function(event) {
      this.$eventBus.$emit('SearchChanged', this.searchText)
    }
  },
}
</script>