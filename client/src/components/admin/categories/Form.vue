<template>
  <div class="email-content-wrapper pY-15">
    <div class="masonry-item col-md-12">
      <div class="bgc-white p-20 bd">
        <h6 class="c-grey-900">{{ formTitle }}</h6>
        <div class="mT-30">
          <form>
            <div class="form-group">
              <label for="title">Title</label>
                <input type="text" id="title" class="form-control" placeholder="Title" v-model="category.title" />
            </div>
            <div class="form-group">
              <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                <input type="checkbox" id="show_on_website" name="show_on_website" class="peer" v-model="category.show_on_website" >
                <label for="inputCall2" class=" peers peer-greed js-sb ai-c">
                  <span class="peer peer-greed">Show on Website</span>
                </label>
              </div>
            </div>
            <button type="button" class="btn btn-primary" @click="$route.params.category_id ? updateCategory() : createCategory()">Save</button>
            <button type="button" class="btn cur-p btn-secondary" @click="closeForm">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryService from '@/services/categoryService'

export default {
  name: 'Category-Form',
  data() {
    return {
      category: {}
    }
  },
  created: function () {
    if (this.$route.params.category_id) {
      CategoryService.get(this.$route.params.category_id).then(response => {
        this.category = response.data
      })
    }
  },
  computed: {
    formTitle() {
      return this.$route.params.category_id ? 'Update Category' : 'Create Category'
    }
  },
  methods: {
    createCategory() {
      CategoryService.create(this.category).then(response => {
        this.$eventBus.$emit('categoryCreated', response.data)
      }).catch(err => {
        this.errorMessage = err
      })
    },
    updateCategory() {
      CategoryService.update(this.category._id, this.category).then(response => {
        this.$eventBus.$emit('categoryUpdated', response.data)
      }).catch(err => {
        this.errorMessage = err
      })
    },
    closeForm() {
      this.$eventBus.$emit('closeCategoryForm')
    }
  }
}
</script>