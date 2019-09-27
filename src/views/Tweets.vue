<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="postTweet col-12 p-2">
          <CreateComment
            :user-id="currentUser.id"
            @after-create-comment="afterCreateComment"
          />
        </div>
        <br />
        <br />
        <!-- tweets-->
        <Tweets
          v-for="tweet in tweets"
          :key="tweet.id"
          :initial-tweet="tweet"
        />
      </div>
      <div class="col-md-4">
        <h1>Popular</h1>
        <!-- top 10 users -->
        <UserFollowCard v-for="user in popularUsersData" :key="user.id" :initial-user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tweets from "../components/Tweets";
import CreateComment from "../components/CreateComment";
import UserFollowCard from "../components/UserFollowCard";
import tweetApi from "../apis/tweet";
import { Toast } from "../utils/helpers";

export default {
  components: {
    Tweets,
    CreateComment,
    UserFollowCard
  },
  computed: {
    ...mapState(["currentUser"])
  },
  data() {
    return {
      tweets: [],
      popularUsersData: [],
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
      } catch (error) {
        Toast.fire({
          type: "error",
          title: error.message || "Cannot get tweets, please try again."
        });
      }
    },
    async afterCreateComment(formData) {
      try {
        const { data, statusText } = await tweetApi.postTweet({ formData });
        if (statusText !== 'Created' || data.status !== "success") {
          throw new Error(data.message);
        }
        const { data: updateData } = await tweetApi.getTweets();
        this.tweets= updateData.tweets;
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