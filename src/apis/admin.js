import { apiHelper } from "../utils/helpers"

export default {
  getUsers() {
    return apiHelper.get('/admin/users')
  },
  getTweets() {
    return apiHelper.get('/admin/tweets')
  },
  deleteTweet({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  }
}