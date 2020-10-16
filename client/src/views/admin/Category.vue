<template>
  <div class="full-container">
    <div class="email-app">
      <div class="email-wrapper row remain-height bgc-white ov-h">
        <div class="email-list h-100 layers">
          <div class="layer w-100">
            <div class="bgc-grey-100 peers ai-c jc-sb p-20 fxw-nw">
              <div class="peer">
                <div class="btn-group" role="group">
                  <Button :btnClass="'fsz-xs btn bgc-white bdrs-2 mR-3 cur-p'" :iconClass="'ti-angle-left'" />
                  <Button :btnClass="'fsz-xs btn bgc-white bdrs-2 mR-3 cur-p'" :iconClass="'ti-angle-right'" />
                </div>
              </div>
              <div class="peer">
                <div class="btn-group" role="group">
                  <Button :btnClass="'fsz-xs btn bgc-white bdrs-2 mR-3 cur-p'" :iconClass="'ti-plus'" :event="'loadCategoryForm'" />
                </div>
              </div>
            </div>
          </div>
          <SearchBar />
          <ItemList :items="items" />
        </div>
        <div class="email-content h-100">
          <div class="h-100 scrollable pos-r">
            <CategoryForm v-if="showForm == true" v-bind:categoryData="selectedCategory" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemList from '@/components/admin/common/ItemList'
import SearchBar from '@/components/admin/common/SearchBar'
import Button from '@/components/admin/common/Button'
import CategoryService from '@/services/categoryService'

export default {
  name: 'Admin-Category',
  data() {
    return {
      items: [],
      showForm: false,
      selectedCategory: {}
    }
  },
  mounted() {
    this.getCategories()
    this.$eventBus.$on('SearchChanged', searchText => {
      if (searchText.length > 0) {
        this.fetchCategories(searchText)
      } else {
        this.getCategories()
      }
    })
    this.$eventBus.$on('loadCategoryForm', () => {
      this.selectedCategory = {}
      this.showForm = true
    })
    this.$eventBus.$on('closeCategoryForm', () => {
      this.selectedCategory = {}
      this.showForm = false
    })
    this.$eventBus.$on('categoryCreated', data => {
      this.showForm = false
      this.items.unshift(data)
      this.selectedCategory = {}
    })
    this.$eventBus.$on('categoryUpdated', data => {
      this.showForm = false
      this.selectedCategory = {}
    })
  },
  methods: {
    getCategories: function() {
      CategoryService.getAll().then(response => {
        this.items = response.data
      }).catch(err => console.log(err) )
    },
    fetchCategories: function(searchText) {
      CategoryService.search(searchText).then(response => {
        this.items = response.data
      }).catch(err => console.log(err) )
    },
    editItem: function(category) {
      this.selectedCategory = category
      this.showForm = true
    },
    deleteItem: function(category) {
      let categoryItem = this.items.filter(function(item){
        return item._id == category._id;
      })[0]
      console.log(categoryItem)
      if (categoryItem) {
        CategoryService.delete(category._id).then(response => {
          this.items.splice(this.items.indexOf(categoryItem), 1);
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  components: {
    ItemList,
    SearchBar,
    Button,
    CategoryForm: () => import(/* webpackPrefetch: true */ '@/components/admin/categories/Form')
  }
}
</script>