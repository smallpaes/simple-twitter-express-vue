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
  },
  getEditUser({ userId }) {
    return apiHelper.get(`/users/${userId}/edit`)
  },
  postEditUser({ userId, formData }) {
    return apiHelper.post(`/users/${userId}/edit`, formData)
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  }
}