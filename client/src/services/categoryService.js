import {HTTP} from './httpCommon';
const RESOURCE_NAME = 'categories'

export default {
  async getAll(params = {}) {
    return HTTP.get(`${RESOURCE_NAME}`, { 
      params
    })
  },

  async search(searchText, page = 0) {
    return HTTP.get(`${RESOURCE_NAME}/search/${searchText}/${page}`);
  },
  
  async get(id) {
    return HTTP.get(`${RESOURCE_NAME}/${id}`);
  },

  async getAllCategories() {
    return HTTP.get(`${RESOURCE_NAME}/all-categories`);
  },

  async create(data) {
    return HTTP.post(`${RESOURCE_NAME}`, data);
  },

  async update(id, data) {
    return HTTP.patch(`${RESOURCE_NAME}/${id}`, data);
  },

  async delete(id) {
    return HTTP.delete(`${RESOURCE_NAME}/${id}`);
  },

  async parentCategories(id) {
    return HTTP.get(`${RESOURCE_NAME}/parentCategories/${id}`);
  }
}