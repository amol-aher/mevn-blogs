<template>
  <div class="layer w-100 fxg-1 scrollable pos-r">
    <div class="">
      <template v-for="item in items">
        <Item :item="item" :key="item.id" />
      </template>
    </div>
  </div>
</template>

<script>
import Item from './Item'
export default {
  name: 'Email-List',
  props: ['items'],
  components: {
    Item
  }
}
</script>