import { apiHelper } from "../utils/helpers"

export default {
  getUsers() {
    return apiHelper.get('/admin/users')
  }
}