<template>
  <div class="row">
    <div class="col-md-12">
      <router-view :key="$route.fullPath"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Category'
}
</script>