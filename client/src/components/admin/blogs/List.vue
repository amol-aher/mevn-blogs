<template>
  <div class="layer w-100 fxg-1 scrollable pos-r">
    <div class="">
      <template v-for="blog in blogs">
        <div class="email-list-item peers fxw-nw p-20 bdB bgcH-grey-100 cur-p" @click="showEvent(blog)" :key="blog._id">
          <div class="peer peer-greed ov-h">
            <div class="peers ai-c">
              <div class="peer peer-greed">
                <h6>{{ blog.title }}</h6>
              </div>
              <div class="peer" v-if="blog.category">
                <span class="badge badge-pill bgc-green-50 c-green-700">{{ blog.category ? blog.category.title : '' }}</span>
              </div>
            </div>
            <span class="whs-nw w-100 ov-h tov-e d-b"><timeago :datetime="blog.createdAt"></timeago></span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog-List',
  props: ['blogs'],
  methods: {
    showEvent(blog) {
      this.$parent.showItem(blog)
    }
  },
}
</script>