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
                  <Button :btnClass="'fsz-xs btn bgc-white bdrs-2 mR-3 cur-p'" :iconClass="'ti-plus'" :event="'loadBlogForm'" />
                </div>
              </div>
            </div>
          </div>
          <SearchBar />
          <ItemList :items="items" />
        </div>
        <div class="email-content h-100">
          <div class="h-100 scrollable pos-r">
            <BlogForm v-if="showForm === true" :blogData="selectedBlog" />
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
import BlogService from '@/services/blogService'

export default {
  name: 'Admin-Blog',
  data() {
    return {
      items: [],
      showForm: false,
      selectedBlog: {}
    }
  },
  mounted() {
    this.getBlogs()
    this.$eventBus.$on('SearchChanged', searchText => {
      if (searchText.length > 0) {
        this.fetchBlogs(searchText)
      } else {
        this.getBlogs()
      }
    })
    this.$eventBus.$on('loadBlogForm', () => {
      this.createItem()
    })
    this.$eventBus.$on('closeBlogForm', () => {
      this.selectedBlog = {}
      this.showForm = false
    })
    this.$eventBus.$on('blogCreated', data => {
      this.showForm = false
      this.items.unshift(data)
      this.selectedBlog = {}
    })
    this.$eventBus.$on('blogUpdated', data => {
      this.showForm = false
      this.selectedBlog = {}
    })
  },
  methods: {
    getBlogs: function() {
      BlogService.getAll().then(response => {
        this.items = response.data
      }).catch(err => console.log(err) )
    },
    fetchBlogs: function(searchText) {
      BlogService.search(searchText).then(response => {
        this.items = response.data
      }).catch(err => console.log(err) )
    },
    createItem: function() {
      this.showForm = false
      this.selectedBlog = {}
      this.showForm = true
    },
    editItem: function(blog) {
      this.showForm = false
      this.selectedBlog = blog
      this.showForm = true
    },
    deleteItem: function(blog) {
      let blogItem = this.items.filter(function(item){
        return item._id == category._id;
      })[0]
      if (blogItem) {
        BlogService.delete(blog._id).then(response => {
          this.items.splice(this.items.indexOf(blogItem), 1);
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
    BlogForm: () => import(/* webpackPrefetch: true */ '@/components/admin/blogs/Form')
  }
}
</script>