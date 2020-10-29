<template>
  <div id="dataTable_wrapper" class="dataTables_wrapper">
    <div class="dataTables_length" id="dataTable_length">
      <label>Show 
        <select name="dataTable_length" aria-controls="dataTable" class="" v-model="limit" @change="resetPagination()">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select> entries
      </label>
    </div>
    <div id="dataTable_filter" class="dataTables_filter">
      <label>Search:<input type="search" class="" placeholder="" aria-controls="dataTable" v-model="search" @input="resetPagination()"></label>
    </div>
    <table id="dataTable" class="table table-striped table-bordered dataTable" cellspacing="0" width="100%" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
      <thead>
        <tr role="row">
          <th v-for="column in columns" :key="column.name" @click="sortBy(column.name)" :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'" >
            {{ column.label }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td v-for="(column,index) in columns" :key="index">
            {{ item[column.name] }}
          </td>
          <td>
            <div class="peers mR-15">
              <div class="peer">
                <router-link :to="{ name: paramNames.edit, params: { [paramNames.idParam]: item._id } }" class='td-n c-deep-purple-500 cH-blue-500 fsz-md p-5'>
                  <i class="ti-pencil"></i>
                </router-link>
              </div>
              <div class="peer">
                <a href="" class="td-n c-red-500 cH-blue-500 fsz-md p-5">
                  <i class="ti-trash"></i>
                </a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
      <a v-if="pagination.currentPage > 1" class="paginate_button previous" @click="changePage(pagination.currentPage - 1)"> Prev </a>
      <a class="paginate_button previous disabled" v-else disabled> Prev </a>
      <a v-if="pagination.currentPage < pagination.totalPages" class="paginate_button next" @click="changePage(pagination.currentPage + 1)"> Next </a>
      <a class="paginate_button next" v-else disabled> Next </a>
    </div>
  </div>
</template>
<script>
import {HTTP} from '@/services/httpCommon';
export default {
  name: 'DataTable',
  props: {
    resource: {
      type: String
    },
    columns: {
      type: Array
    },
    paramNames: {
      type: Object
    }
  },
  created() {
    this.getItems()
  },
  data() {
    let sortOrders = {}
    this.columns.forEach((column) => {
      sortOrders[column.name] = -1
    })
    return {
      items: [],
      sortKey: 'title',
      sortOrders: sortOrders,
      limit: 10,
      search: '',
      pagination: {
        currentPage: 1,
        total: '',
        totalPages: '',
        nextPage: '',
        prevPage: '',
        from: '',
        to: ''
      }
    }
  },
  methods: {
    resetPagination() {
      this.pagination.currentPage = 1
      this.pagination.prevPage = ''
      this.pagination.nextPage = ''
      this.getItems()
    },
    sortBy(key) {
      this.resetPagination()
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      this.getItems()
    },
    getItems() {
      HTTP.get(this.resource, {
        params: { 
          reqParams: {
            pagination: this.pagination,
            sorting: {
              sortKey: this.sortKey,
              sortOrder: this.sortOrders[this.sortKey] || 1
            },
            search: this.search,
            limit: this.limit
          }
        } 
      }).then(response => {
        this.items = response.data.list
        this.pagination.total = response.data.totalEntries
        this.pagination.totalPages = response.data.totalPages
      }).catch(errors => {
        console.log(errors);
      })
    },
    getIndex(array, key, value) {
      return array.findIndex(i => i[key] == value)
    },
    changePage: function (page) {
      this.pagination.currentPage = page
      this.getItems()
    }
  }
}
</script>