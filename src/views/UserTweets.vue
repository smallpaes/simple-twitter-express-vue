<template>
  <Spinner v-if="isLoading" />
  <section v-else class="px-2">
    <div class="row">
      <div class="col-lg-3">
        <!--Profile-->
        <UserProfile :initial-user="user" :key="user.id" />
      </div>
      <div class="col-lg-9">
        <div class="row px-3">
          <h4 class="col-12 title">Tweets</h4>
          <TweetCard v-for="tweet in tweets" :key="tweet.id" :initial-tweet="tweet" />
          <div class="col-12 shadow-sm p-3 rounded bg-white" v-if="tweets.length < 1">
            <i class="fas fa-user mr-2"></i>Haven't post any tweets yet
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserProfile from "../components/UserProfile";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";
import userAPI from "../apis/users";
import TweetCard from "../components/TweetCard";

export default {
  components: {
    UserProfile,
    TweetCard,
    Spinner
  },
  data() {
    return {
      user: {},
      tweets: [],
      isLoading: false
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUserTweets(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.id;
    this.fetchUserTweets(userId);
    next();
  },
  methods: {
    async fetchUserTweets(userId) {
      try {
        // update loading status
        this.isLoading = true;
        const { statusText, data } = await userAPI.getUserTweets({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        const raw_tweets = data.tweets.map(tweet => {
          return {
            ...tweet,
            User: {
              id: userId,
              avatar: data.userData.avatar,
              name: data.userData.name
            }
          };
        });
        this.tweets = raw_tweets;

        this.user = {
          ...data.userData,
          TweetsCount: data.tweetsCount,
          FollowerCount: data.followersCount,
          FollowingCount: data.followingsCount,
          LikeCount: data.likesCount
        };
        // update loading status
        this.isLoading = false;
      } catch (error) {
        // update loading status
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get  user tweets, please try again later!"
        });
      }
    }
  }
};
</script>

<style>
</style>