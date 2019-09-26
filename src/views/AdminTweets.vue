<template>
  <Spinner v-if="isLoading" />
  <section v-else class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <h4 class="title">User Admin</h4>
        <div class="accordion my-3" id="tweets">
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
</template>s

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