<template>
  <a href="javascript:void(0)" :class="btnClass" @click="buttonClicked" >
    <i :class="iconClass"></i>
  </a>
</template>
<script>
export default {
  name: 'Button',
  props: ["btnClass", 'iconClass', 'btnFor'],
  methods: {
    buttonClicked() {
      if (this.btnFor == 'edit') {
        this.$parent.editEvent()
      } else if (this.btnFor == 'delete') {
        this.$parent.deleteEvent()
      }
    }
  },
}
</script>