<template>
  <div class="page-header theme-bg-dark py-5 text-center position-relative">
	    <div class="theme-bg-shapes-right"></div>
	    <div class="theme-bg-shapes-left"></div>
	    <div class="container">
		    <h1 class="page-heading single-col-max mx-auto">{{ title }}</h1>
		    <div class="page-intro single-col-max mx-auto" v-if="shortDescription">{{ shortDescription }}</div>
		    <div class="main-search-box pt-3 d-block mx-auto">
          <form class="search-form w-100">
            <input type="text" placeholder="Search the docs..." name="search" class="form-control search-input">
            <button type="submit" class="btn search-btn" value="Search"><i class="fas fa-search"></i></button>
          </form>
      </div>
	  </div>
  </div>
</template>
<script>
export default {
  name: 'Page-Header',
  props: {
    title: {
      type: String
    },
    shortDescription: {
      type: String
    }
  }
}
</script>