import {HTTP} from './httpCommon';

export default {
  async getCategories(params) {
    return HTTP.get('/guest/guest-categories')
  },
}