<template>
<div class="email-content-wrapper pY-15">
  <div class="masonry-item col-md-12">
    <div class="bgc-white p-20 bd">
      <h6 class="c-grey-900">{{ formTitle }}</h6>
      <div class="mT-30">
        <div class="alert alert-danger" role="alert" v-if="errorMessage" @click="errorMessage = ''">
          {{ errorMessage }}
        </div>
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
          <button type="button" class="btn btn-primary" @click="submitForm">Save</button>
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
  name: 'BlogForm',
  props: ['blogData'],
  mounted() {
    CategoryService.getAll().then(response => {
      this.categories = response.data
    }).catch(err => console.log(err) )
  },
  data() {
    return {
      errorMessage: '',
      categories: []
    }
  },
  methods: {
    closeForm() {
      this.$eventBus.$emit('closeBlogForm')
    },
    isNew() {
      return Object.keys(this.blog).length > 0 ? false : true
    },
    submitForm() {
      if (this.blog._id) {
        this.updateBlog()
      } else {
        this.createBlog()
      }
    },
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
        this.errorMessage = err
      })
    }
  },
  computed: {
    formTitle() {
      return this.isNew() ? 'Create Blog' : 'Update Blog'
    },
    blog() {
      return this.blogData
    }
  },
}
</script>