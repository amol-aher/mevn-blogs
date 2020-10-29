<template>
  <div class="bgc-white bd bdrs-3 p-20 mB-20">
    <IndexHeader :title="'Categories'" :link="headerLink"/>
    <DynamicTable :resource="'/categories'" :columns="columns" :paramNames="paramNames"/>
  </div>
</template>
<script>
import IndexHeader from '@/components/admin/common/IndexHeader'
import DynamicTable from '@/components/admin/common/DynamicTable'
import CategoryService from '@/services/categoryService'
export default {
  name: 'Category',
  data() {
    return {
      columns: [
        {label: 'Title', name: 'title'},
        {label: 'Show On Website', name: 'show_on_website'},
        {label: 'Created At', name: 'createdAt'}
      ],
      headerLink: {
        name: 'new_category',
        icon: 'ti-plus'
      },
      paramNames: {
        edit: 'edit_category',
        idParam: 'category_id'
      }
    }
  },
  methods: {
    deleteCategory: function(categoryId) {
      if (confirm('Are you sure to delete this category?')) {
        CategoryService.delete(categoryId).then(response => {
          this.getCategories()
        }).catch(err => {
          console.log(err)
        })
      } 
    }
  },
  components: {
    IndexHeader, DynamicTable
  }
}
</script>