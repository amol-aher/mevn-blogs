<template>
  <div class="bgc-white bd bdrs-3 p-20 mB-20">
    <h4 class="c-grey-900">{{ formTitle }}</h4>
    <div class="mT-30">
      <notifications group="error" />
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
        <router-link :to="{ name: 'categories_index' }" class='btn cur-p btn-secondary'>
          Cancel
        </router-link>
      </form>
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
      }).catch(err => {
        if (err) {
          this.notifyErrors(err.response.data.errors)
        }
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
        this.$router.push({name: 'categories_index'})
      }).catch(err => {
        if (err) {
          this.notifyErrors(err.response.data.errors)
        }
      })
    },
    updateCategory() {
      CategoryService.update(this.category._id, this.category).then(response => {
        this.$router.push({name: 'categories_index'})
      }).catch(err => {
        if (err) {
          this.notifyErrors(err.response.data.errors)
        }
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