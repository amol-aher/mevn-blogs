<template>
  <div class="layer w-100 mB-15">
    <div class="peers ai-c jc-sb fxw-nw">
      <div class="peer">
        <h4 class="c-grey-900">{{ title }}</h4>
        <p v-if="info">{{ info }}</p>
      </div>
      <div class="peer" v-if="link">
        <div class="btn-group" role="group">
          <router-link :to="{ name: link.name }" class='fsz-xs btn btn-primary bdrs-2 mR-3 cur-p'>
            <i :class="link.icon"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableHeader',
  props: {
    title: {
      type: String
    },
    info: {
      type: String
    },
    link: {
      type: Object
    }
  }
}
</script>