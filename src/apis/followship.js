import { apiHelper } from "../utils/helpers"

export default {
  addFollowing({ userId }) {
    return apiHelper.post('/followships', {
      userId
    })
  },
  removeFollowing({ userId }) {
    return apiHelper.delete(`/followships/${userId}`)
  }
}