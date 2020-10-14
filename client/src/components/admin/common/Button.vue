<template>
  <button type="button" :class="btnClass" @click="buttonClicked">
    <i :class="iconClass"></i>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: ["btnClass", 'iconClass', 'event'],
  methods: {
    buttonClicked() {
      this.$eventBus.$emit(this.event)
    }
  },
}
</script>