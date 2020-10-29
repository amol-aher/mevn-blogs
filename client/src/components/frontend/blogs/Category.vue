<template>
  <div class="col-12 col-lg-4 py-3">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title mb-3">
          <span class="card-title-text">{{ category.title }}</span>
        </h5>
        <div class="card-text">
          {{ category.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Category',
  props: {
    category: {
      type: Object
    }
  }
}
</script>