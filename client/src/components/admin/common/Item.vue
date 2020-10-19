<template>
  <div class="email-list-item peers fxw-nw p-20 bdB bgcH-grey-100 cur-p" @click="showEvent">
    <div class="peer peer-greed ov-h">
      <div class="peers ai-c">
        <div class="peer peer-greed">
          <h6>{{ item.title }}</h6>
        </div>
        <div class="peer" v-if="secondaryTitle">
          <small>
            {{ secondaryTitle }}
          </small>
        </div>
      </div>
      <span class="whs-nw w-100 ov-h tov-e d-b"><timeago :datetime="item.createdAt"></timeago></span>
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/admin/common/IconButton'
export default {
  name: 'ListItem',
  props: ["item", "secondaryTitle"],
  methods: {
    showEvent() {
      this.$parent.$parent.showItem(this.item)
    },
  },
  components: {
    IconButton
  }
}
</script>