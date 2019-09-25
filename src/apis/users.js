import { apiHelper } from "../utils/helpers"

export default {
  getCurrentUser() {
    return apiHelper.get('/users/current_user')
  },
  getFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  }
}