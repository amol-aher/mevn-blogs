<template>
  <div class="email-content-wrapper">
    <div class="peers ai-c jc-sb pX-40 pY-30">
      <div class="peers peer-greed">
        <div class="peer mR-20">
          <img class="bdrs-50p w-3r h-3r" alt="" src="https://randomuser.me/api/portraits/men/11.jpg"></div>
        <div class="peer">
          <small><timeago :datetime="category.createdAt" /></small>
          <h5 class="c-grey-900 mB-5">{{ category.user ? category.user.name : '' }}</h5>
          <span>{{ category.user ? category.user.email : '' }}</span>
        </div>
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
    <div class="bdT pX-40 pY-30">
      <h4>{{ category.title }}</h4>
      <p>
        {{ category.description }}
      </p>
    </div>
  </div>
</template>

<script>
import CategoryService from '@/services/categoryService'
import IconButton from '@/components/admin/common/IconButton'

export default {
  name: 'Category-Show',
  data() {
    return {
      category: {}
    }
  },
  mounted() {
    if (this.$route.params.category_id) {
      CategoryService.get(this.$route.params.category_id).then(response => {
        this.category = response.data
      })
    }
  },
  methods: {
    editEvent() {
      this.$parent.editItem(this.category)
    },
    deleteEvent() {
      this.$parent.deleteItem(this.category)
    }
  },
  components: {
    IconButton
  }
}
</script>