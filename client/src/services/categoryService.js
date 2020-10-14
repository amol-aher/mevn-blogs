import {HTTP} from './httpCommon';
const RESOURCE_NAME = 'categories'

export default {
  async getAll() {
    return HTTP.get(`${RESOURCE_NAME}`)
  },

  async search(searchText) {
    return HTTP.get(`${RESOURCE_NAME}/search/${searchText}`);
  },
  
  async get(id) {
    return HTTP.get(`${RESOURCE_NAME}/${id}`);
  },

  async create(data) {
    return HTTP.post(`${RESOURCE_NAME}`, data);
  },

  async update(id, data) {
    return HTTP.put(`${RESOURCE_NAME}/${id}`, data);
  },

  async delete(id) {
    return HTTP.delete(`${RESOURCE_NAME}/${id}`);
  }
}