<template>
  <Spinner v-if="isLoading" />
  <section v-else class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <h4 class="title">Tweet Admin</h4>
        <div class="accordion my-3" id="tweets">
          <!--Admin nav-->
          <div class="bg-white px-3 py-2 rounded-top admin-nav">
            <router-link class="mr-3" :to="{name: 'admin-tweets'}">Tweets</router-link>
            <router-link :to="{name: 'admin-users'}">Users</router-link>
          </div>
          <!--Tweet list-->
          <AdminTweetCard
            v-for="tweet in tweets"
            :key="tweet.id"
            :tweet="tweet"
            @after-delete="handleAfterDelete"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AdminTweetCard from "../components/AdminTweetCard";
import { fromNowFilter, placeholderImageCreator } from "../utils/mixins";
import adminAPI from "../apis/admin";
import Spinner from "../components/Spinner";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      tweets: [],
      isLoading: true
    };
  },
  components: {
    Spinner,
    AdminTweetCard
  },
  mixins: [fromNowFilter, placeholderImageCreator],
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const { data, statusText } = await adminAPI.getTweets();
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.tweets = data.tweets;
        // update loading status
        this.isLoading = false;
      } catch (error) {
        // update loading status
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get tweet data, please try again later"
        });
      }
    },
    handleAfterDelete(tweetId) {
      // update the data
      this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId);
    }
  }
};
</script>

<style scoped>
.admin-nav a {
  color: #4c4c4c;
}

.admin-nav a:first-of-type {
  color: rgb(0, 132, 180);
}

.admin-nav a:hover {
  color: #1da1f2;
  text-decoration: none;
}
</style>