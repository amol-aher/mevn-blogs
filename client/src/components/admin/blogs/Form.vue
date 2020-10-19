<template>
  <div class="email-content-wrapper pY-15">
    <div class="masonry-item col-md-12">
      <div class="bgc-white p-20 bd">
        <h6 class="c-grey-900">{{ formTitle }}</h6>
        <div class="mT-30">
          <form>
            <div class="form-group">
              <label for="category">Category</label>
                <select id="category" v-model="blog.category" class="form-control">
                  <option v-for="item in categories" :value="item._id" :key="item._id" >{{ item.title }}</option>
                </select>
            </div>
            <div class="form-group">
              <label for="title">Title</label>
                <input type="text" id="title" class="form-control" placeholder="Title" v-model="blog.title" />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" id="description" class="form-control" placeholder="Description" v-model="blog.description" />
            </div>
            <div class="form-group">
              <label for="content">Content</label>
              <textarea v-model="blog.content" class='form-control' />
            </div>
            <button type="button" class="btn btn-primary" @click="$route.params.blog_id ? updateBlog() : createBlog()">Save</button>
            <button type="button" class="btn cur-p btn-secondary" @click="closeForm">Cancel</button>
          </form>
        </div>
      </div>
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
  created: function () {
    if (this.$route.params.blog_id) {
      BlogService.get(this.$route.params.blog_id).then(response => {
        this.blog = response.data
      })
    }
  },
  mounted() {
    CategoryService.getAll().then(response => {
      this.categories = response.data.categories
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    formTitle() {
      return this.$route.params.blog_id ? 'Update Blog' : 'Create Blog'
    }
  },
  methods: {
    createBlog() {
      BlogService.create(this.blog).then(response => {
        this.$eventBus.$emit('blogCreated', response.data)
      }).catch(err => {
        this.errorMessage = err
      })
    },
    updateBlog() {
      BlogService.update(this.blog._id, this.blog).then(response => {
        this.$eventBus.$emit('blogUpdated', response.data)
      }).catch(err => {
        console.log(err.data)
        this.errorMessage = err
      })
    },
    closeForm() {
      this.$eventBus.$emit('closeBlogForm')
    }
  }
}
</script>