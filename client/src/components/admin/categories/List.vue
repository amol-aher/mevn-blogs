<template>
  <div class="layer w-100 fxg-1 scrollable pos-r">
    <div class="">
      <template v-for="category in categories">
        <div class="email-list-item peers fxw-nw p-20 bdB bgcH-grey-100 cur-p" @click="showEvent(category)" :key="category._id">
          <div class="peer peer-greed ov-h">
            <div class="peers ai-c">
              <div class="peer peer-greed">
                <h6>{{ category.title }}</h6>
              </div>
              <div class="peer" v-if="category.category">
                <span class="badge badge-pill bgc-green-50 c-green-700"><timeago :datetime="category.createdAt" /></span>
              </div>
            </div>
            <span class="whs-nw w-100 ov-h tov-e d-b"><timeago :datetime="category.createdAt" /></span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category-List',
  props: ['categories'],
  methods: {
    showEvent(category) {
      this.$parent.showItem(category)
    }
  },
}
</script>