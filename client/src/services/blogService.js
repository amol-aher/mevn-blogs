import {HTTP} from './httpCommon';
const RESOURCE_NAME = 'blogs'

export default {
  async getAll(page = 0) {
    return HTTP.get(`${RESOURCE_NAME}?page=${page}`)
  },

  async search(searchText, page = 0) {
    return HTTP.get(`${RESOURCE_NAME}/search/${searchText}/${page}`);
  },
  
  async get(id) {
    return HTTP.get(`${RESOURCE_NAME}/${id}`);
  },

  async create(data) {
    return HTTP.post(`${RESOURCE_NAME}`, data);
  },

  async update(id, data) {
    return HTTP.patch(`${RESOURCE_NAME}/${id}`, data);
  },

  async delete(id) {
    return HTTP.delete(`${RESOURCE_NAME}/${id}`);
  }
}