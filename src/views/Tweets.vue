<template>
  <Spinner v-if="isLoading" />
  <section v-else class="container">
    <div class="row">
      <div class="col-lg-7 col-xl-8">
        <h1>Tweet</h1>
        <div class="postTweet col-12 p-2">
          <CreateComment :user-id="currentUser.id" @after-create-comment="afterCreateComment" />
        </div>
        <br />
        <br />
        <!-- tweets-->
        <TweetCard v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet" />
      </div>
      <div class="col-lg-5 col-xl-4">
        <!-- top 10 users -->
        <h1>Popular</h1>
        <UserFollowCard
          v-for="user in popularUsersData"
          :key="user.id"
          :initial-user="user"
          class="col-md-12"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import TweetCard from "../components/TweetCard";
import CreateComment from "../components/CreateComment";
import UserFollowCard from "../components/UserFollowCard";
import Spinner from "../components/Spinner";
import tweetApi from "../apis/tweet";
import { Toast } from "../utils/helpers";

export default {
  components: {
    TweetCard,
    CreateComment,
    UserFollowCard,
    Spinner
  },
  computed: {
    ...mapState(["currentUser"])
  },
  data() {
    return {
      tweets: [],
      popularUsersData: [],
      isLoading: false
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        this.isLoading = true;
        const response = await tweetApi.getTweets();
        const { data, statusText } = response;
        if (statusText !== "Accepted" || data.status !== "success") {
          throw new Error(data.message);
        }
        this.tweets = data.tweets;
        this.popularUsersData = data.popularUsersData;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: error.message || "Cannot get tweets, please try again."
        });
      }
    },
    async afterCreateComment(formData) {
      try {
        const { data, statusText } = await tweetApi.postTweet({ formData });
        if (statusText !== "Created" || data.status !== "success") {
          throw new Error(data.message);
        }
        this.tweets.unshift({
          id: data.tweet_id,
          description: formData.description,
          createdAt: new Date(),
          Likes: Array(0),
          LikesCount: 0,
          RepliesCount: 0,
          User: {
            id: this.currentUser.id,
            name: this.currentUser.name,
            avatar: this.currentUser.avatar
          },
          isLiked: false
        });
      } catch (error) {
        Toast.fire({
          type: "error",
          title: error.message || "Cannot get tweets, please try again."
        });
      }
    }
  }
};
</script>

<style scoped>
h1 {
  color: #1da1f2;
}
</style>