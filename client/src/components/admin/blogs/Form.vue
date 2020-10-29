<template>
  <div class="bgc-white bd bdrs-3 p-20 mB-20">
    <h4 class="c-grey-900">{{ formTitle }}</h4>
    <div class="mT-30">
      <notifications group="error" />
      <form>
        <div class="form-group">
          <label for="title">Category</label>
            <select class="form-control" :v-model="blog.category">
              <option :selected="true">Choose Category</option>
              <option v-for="option in categories" v-bind:value="option.id" :key="option._id">{{ option.title }}</option>
            </select>
        </div>
        <div class="form-group">
          <label for="title">Title</label>
            <input type="text" id="title" class="form-control" placeholder="Title" v-model="blog.title" />
        </div>
        <div class="form-group">
          <label for="title">Description</label>
          <input type="text" id="title" class="form-control" placeholder="Description" v-model="blog.description" />
        </div>
        <div class="form-group">
          <label for="title">Content</label>
          <vue-simplemde v-model="blog.content" ref="markdownEditor" :highlight="true" />
        </div>
        <button type="button" class="btn btn-primary" @click="$route.params.blog_id ? updateBlog() : createBlog()">Save</button>
        <router-link :to="{ name: 'blogs_index' }" class='btn cur-p btn-secondary'>
          Cancel
        </router-link>
      </form>
    </div>
  </div>
</template>
<script>
import BlogService from '@/services/blogService'
import CategoryService from '@/services/categoryService'

export default {
  name: 'Blog-Form',
  data() {
    return {
      blog: {},
      categories: []
    }
  },
  mounted() {
    this.loadCategories()
  },
  created: function () {    
    if (this.$route.params.blog_id) {
      BlogService.get(this.$route.params.blog_id).then(response => {
        this.blog = response.data
      }).catch(err => {
        if (err) {
          this.notifyErrors(err.response.data.errors)
        }
      })
    }
  },
  computed: {
    formTitle() {
      return this.$route.params.blog_id ? 'Update Blog' : 'Create Blog'
    }
  },
  methods: {
    createBlog() {
      BlogService.create(this.blog).then(response => {
        this.$router.push({name: 'blogs_index'})
      }).catch(err => {
        if (err) {
          this.notifyErrors(err.response.data.errors)
        }
      })
    },
    updateBlog() {
      BlogService.update(this.blog._id, this.blog).then(response => {
        this.$router.push({name: 'blogs_index'})
      }).catch(err => {
        if (err) {
          this.notifyErrors(err.response.data.errors)
        }
      })
    },
    loadCategories() {
      CategoryService.getAllCategories().then(response => {
        this.categories = response.data.list
      }).catch(err => {
        this.notifyErrors(err.response.data.errors)
      })
    },
    notifyErrors(newErrors) {
      newErrors.forEach((value, index) => {
          this.$notify({
          group: 'error',
          title: 'Error',
          text: value.msg,
          type: 'error'
        })
      })     
    }
  }
}
</script>