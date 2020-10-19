<template>
  <div class="email-content-wrapper">
    <div class="peers ai-c jc-sb pX-40 pY-30">
      <div class="peers peer-greed">
        <div class="peer mR-20">
          <img class="bdrs-50p w-3r h-3r" alt="" src="https://randomuser.me/api/portraits/men/11.jpg"></div>
        <div class="peer">
          <small><timeago :datetime="blog.createdAt" /></small>
          <h5 class="c-grey-900 mB-5">{{ blog.user ? blog.user.name : '' }}</h5>
          <span>{{ blog.user ? blog.user.email : '' }}</span>
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
      <h4>{{ blog.title }}</h4>
      <p>
        {{ blog.content }}
      </p>
    </div>
  </div>
</template>

<script>
import BlogService from '@/services/blogService'
import IconButton from '@/components/admin/common/IconButton'

export default {
  name: 'Blog-Show',
  data() {
    return {
      blog: {}
    }
  },
  mounted() {
    if (this.$route.params.blog_id) {
      BlogService.get(this.$route.params.blog_id).then(response => {
        this.blog = response.data
      })
    }
  },
  methods: {
    editEvent() {
      this.$parent.editItem(this.blog)
    },
    deleteEvent() {
      this.$parent.deleteItem(this.blog)
    }
  },
  components: {
    IconButton
  }
}
</script>