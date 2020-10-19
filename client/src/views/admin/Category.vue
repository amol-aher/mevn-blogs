<template>
  <div class="full-container">
    <div class="email-app">
      <div class="email-wrapper row remain-height bgc-white ov-h">
        <div class="email-list h-100 layers">
          <div class="layer w-100">
            <div class="bgc-grey-100 peers ai-c jc-sb p-20 fxw-nw">
              <div class="peer">
                <div class="btn-group" role="group">
                  <Button :btnClass="'fsz-xs btn bgc-white bdrs-2 mR-3 cur-p'" :iconClass="'ti-reload'" :event="'reload'" />
                  <Paginate :pagesCount="categoriesData.totalPages" :currPage="categoriesData.currentPage" />
                </div>
              </div>
              <div class="peer">
                <div class="btn-group" role="group">
                  <router-link :to="{ name: 'new_category' }" class='fsz-xs btn bgc-white bdrs-2 mR-3 cur-p'>
                    <i class="ti-plus"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <SearchBar />
          <CategoryList :categories="categoriesData.categories" />
        </div>
        <div class="email-content h-100">
          <div class="h-100 scrollable pos-r">
            <router-view :key="$route.fullPath"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CategoryList from '@/components/admin/categories/List'
import SearchBar from '@/components/admin/common/SearchBar'
import Button from '@/components/admin/common/Button'
import CategoryService from '@/services/categoryService'

export default {
  name: 'Admin-Category',

  data() {
    return {
      categoriesData: {
        categories: [],
        totalPages: 1  ,
        currentPage: 0
      }
    }
  },
  mounted() {
    this.getCategories()
    this.$eventBus.$on('SearchChanged', searchText => {
      if (searchText.length >= 3) {
        this.fetchCategories(searchText)
      } else if (searchText.length == 0) {
        this.getCategories()
      }
    })

    this.$eventBus.$on('closeCategoryForm', () => {
      let firstCategory = this.categoriesData.categories[0]
      if (firstCategory) {
        this.$router.push({ name: 'show_category', params: { category_id: firstCategory._id }}).catch(err => {})
      }
    })

    this.$eventBus.$on('categoryCreated', category => {
      this.getCategories()
      this.$router.push({ name: 'show_category', params: { category_id: category._id }}).catch(err => {})
    })

    this.$eventBus.$on('categoryUpdated', category => {
      this.getCategories()
      this.$router.push({ name: 'show_category', force: true, params: { category_id: category._id }}).catch(err => {})
    })
    
    this.$eventBus.$on('reload', () => {
      this.getCategories()
    })

    this.$eventBus.$on('paginate', pageNum => {
      this.getCategories(pageNum)
    })

  },

  methods: {
    getCategories: function(page = this.currentPage) {
      CategoryService.getAll(page).then(response => {
        this.categoriesData = response.data
      }).catch(err => console.log(err) )
    },

    fetchCategories: function(searchText) {
      this.categoriesData.currentPage = 0
      CategoryService.search(searchText, this.categoriesData.currentPage).then(response => {
        this.categoriesData = response.data
      }).catch(err => {} )
    },

    editItem: function(category) {
      this.$router.push({ name: 'edit_category', force: true, params: { category_id: category._id }}).catch(err => {})
    },

    showItem: function(category) {
      this.$router.push({ name: 'show_category', params: { category_id: category._id }}).catch(err => {})
    },

    deleteItem: function(category) {
      if (confirm('Are you sure to delete this category?')) {
        CategoryService.delete(category._id).then(response => {
          this.getCategories()
          this.$router.push({ name: 'categories_index'}).catch(err => {})
        }).catch(err => {
          console.log(err)
        })
      }      
    }
  },

  components: {
    CategoryList,
    SearchBar,
    Button,
    Paginate: () => import(/* webpackPrefetch: true */ '@/components/admin/common/Paginate')
  }
}
</script>