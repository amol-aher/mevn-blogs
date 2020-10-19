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
                  <Paginate :pagesCount="blogsData.totalPages" :currPage="blogsData.currentPage" />
                </div>
              </div>
              <div class="peer">
                <div class="btn-group" role="group">
                  <router-link :to="{ name: 'new_blog' }" class='fsz-xs btn bgc-white bdrs-2 mR-3 cur-p'>
                    <i class="ti-plus"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <SearchBar />
          <BlogList :blogs="blogsData.blogs" />
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
import BlogList from '@/components/admin/blogs/List'
import SearchBar from '@/components/admin/common/SearchBar'
import Button from '@/components/admin/common/Button'
import BlogService from '@/services/blogService'

export default {
  name: 'Admin-Blog',

  data() {
    return {
      blogsData: {
        blogs: [],
        totalPages: 1  ,
        currentPage: 0
      }
    }
  },
  mounted() {
    this.getBlogs()
    this.$eventBus.$on('SearchChanged', searchText => {
      if (searchText.length >= 3) {
        this.fetchBlogs(searchText)
      } else if (searchText.length == 0) {
        this.getBlogs()
      }
    })

    this.$eventBus.$on('closeBlogForm', () => {
      let firstBlog = this.blogsData.blogs[0]
      if (firstBlog) {
        this.$router.push({ name: 'show_blog', params: { blog_id: firstBlog._id }}).catch(err => {})
      }
    })

    this.$eventBus.$on('blogCreated', blog => {
      this.getBlogs()
      this.$router.push({ name: 'show_blog', params: { blog_id: blog._id }}).catch(err => {})
    })

    this.$eventBus.$on('blogUpdated', blog => {
      this.getBlogs()
      this.$router.push({ name: 'show_blog', force: true, params: { blog_id: blog._id }}).catch(err => {})
    })
    
    this.$eventBus.$on('reload', () => {
      this.getBlogs()
    })

    this.$eventBus.$on('paginate', pageNum => {
      this.getBlogs(pageNum)
    })

  },

  methods: {
    getBlogs: function(page = this.currentPage) {
      BlogService.getAll(page).then(response => {
        this.blogsData = response.data
      }).catch(err => { console.log(err) } )
    },

    fetchBlogs: function(searchText) {
      this.categoriesData.currentPage = 0
      BlogService.search(searchText, this.categoriesData.currentPage).then(response => {
        this.blogsData = response.data
      }).catch(err => {} )
    },

    editItem: function(blog) {
      this.$router.push({ name: 'edit_blog', force: true, params: { blog_id: blog._id }}).catch(err => {})
    },

    showItem: function(blog) {
      this.$router.push({ name: 'show_blog', params: { blog_id: blog._id }}).catch(err => {})
    },

    deleteItem: function(blog) {
      if (confirm('Are you sure to delete this blog?')) {
        BlogService.delete(blog._id).then(response => {
          this.getBlogs()
          this.$router.push({ name: 'blogs_index'}).catch(err => {})
        }).catch(err => { console.log(err) } )
      }
    }
  },

  components: {
    BlogList,
    SearchBar,
    Button,
    Paginate: () => import(/* webpackPrefetch: true */ '@/components/admin/common/Paginate')
  }
}
</script>