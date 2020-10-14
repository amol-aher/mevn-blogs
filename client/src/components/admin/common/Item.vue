<template>
  <div class="email-list-item peers fxw-nw p-20 bdB bgcH-grey-100 cur-p">
    <div class="peer peer-greed ov-h">
      <div class="peers ai-c">
        <div class="peer peer-greed">
          <h6>{{ item.title }}</h6>
        </div>
        <div class="peer">
          <small>
            <div class="peers mR-15">
              <div class='peer'>
                <IconButton :btnClass="'td-n c-deep-purple-500 cH-blue-500 fsz-md p-5'" :iconClass="'ti-pencil'" :btnFor="'edit'"/>
              </div>
              <div class='peer'>
                <IconButton :btnClass="'td-n c-red-500 cH-blue-500 fsz-md p-5'" :iconClass="'ti-trash'" :btnFor="'delete'" />
              </div>
            </div>
          </small>
        </div>
      </div>
      <span class="whs-nw w-100 ov-h tov-e d-b">{{ item.description }}</span>
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/admin/common/IconButton'
export default {
  name: 'ListItem',
  props: ["item"],
  methods: {
    editEvent() {
      this.$parent.$parent.editItem(this.item)
    },
    deleteEvent() {
      this.$parent.$parent.deleteItem(this.item)
    }
  },
  components: {
    IconButton
  }
}
</script>