import { apiHelper } from "../utils/helpers"

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  postTweet({ formData }) {
    return apiHelper.post('/tweets', formData )
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },
  removeLike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`)
  },
  deleteTweet({ tweetId }) {
    return apiHelper.delete(`/tweets/${tweetId}`)
  },
  putTweet({ tweetId, tweet }) {
    return apiHelper.put(`/tweets/${tweetId}`, tweet)
  }
}