<template>
  <div class="alert alert-danger" v-if="errorData" >
    {{ errorData.msg }}
  </div>
</template>
<script>
export default {
  name: 'Flash-Error',
  props: ['errorData']
}
</script>