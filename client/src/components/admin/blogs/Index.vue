<template>
  <div class="bgc-white bd bdrs-3 p-20 mB-20">
    <IndexHeader :title="'Blogs'" :link="headerLink"/>
    <DynamicTable :resource="'/blogs'" :columns="columns" :paramNames="paramNames"/>
  </div>
</template>
<script>
import IndexHeader from '@/components/admin/common/IndexHeader'
import DynamicTable from '@/components/admin/common/DynamicTable'
export default {
  name: 'Blog',
  data() {
    return {
      columns: [
        {label: 'Title', name: 'title'},
        {label: 'Description', name: 'description'},
        {label: 'Created At', name: 'createdAt'}
      ],
      headerLink: {
        name: 'new_blog',
        icon: 'ti-plus'
      },
      paramNames: {
        edit: 'edit_blog',
        idParam: 'blog_id'
      }
    }
  },
  components: {
    IndexHeader, DynamicTable
  }
}
</script>