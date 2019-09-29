<template>
  <Spinner v-if="isLoading" />
  <section v-else class="container">
    <div class="row">
      <div class="col-lg-3">
        <!--Profile-->
        <UserProfile :initial-user="user" :key="user.id" />
      </div>
      <div class="col-lg-9">
        <div class="row px-3">
          <h4 class="col-12 title">Tweet</h4>
          <TweetCard :key="tweets.id" :initial-tweet="tweets" />
          <h4 class="col-12 title">Replies</h4>
          <RepliesCard
            v-for="reply in replies"
            :key="reply.id"
            :initial-reply="reply"
            @after-delete-reply="afterDeleteReply"
          />
          <CreateReply
            :tweet-id="tweets.id"
            :user-id="currentUser.id"
            @after-create-reply="afterCreateReply"
            class="col-12"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TweetCard from "../components/TweetCard";
import tweetApi from "../apis/tweet";
import UserProfile from "../components/UserProfile";
import RepliesCard from "../components/RepliesCard";
import CreateReply from "../components/CreatReply";
import Spinner from "../components/Spinner";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    TweetCard,
    Spinner,
    UserProfile,
    RepliesCard,
    CreateReply
  },
  computed: {
    ...mapState(["currentUser"])
  },
  data() {
    return {
      tweets: {},
      replies: [],
      followings: [],
      user: {},
      isLoading: false
    };
  },
  created() {
    const tweet_id = this.$route.params.tweet_id;
    this.fetchUserTweet(tweet_id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUserTweet(to.params.tweet_id);
    next();
  },
  methods: {
    async fetchUserTweet(tweet_id) {
      try {
        // update loading status
        this.isLoading = true;
        const { statusText, data } = await tweetApi.getReplies({ tweet_id });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.tweets = data.tweetData;
        this.user = data.userData;
        this.replies = data.Replies.map(reply => ({
          ...reply,
          isEditing: false
        }));
        // update loading status
        this.isLoading = false;
      } catch (error) {
        // update loading status
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get tweet and replies, please try again later!"
        });
      }
    },
    // update replies after create reply
    async afterCreateReply(formData) {
      try {
        const { data, statusText } = await tweetApi.postReplies({
          tweet_id: formData.TweetId,
          formData
        });
        if (statusText !== "Created" || data.status !== "success") {
          throw new Error(data.message);
        }
        this.replies.unshift({
          id: data.reply_id,
          comment: formData.comment,
          TweetId: formData.TweetId,
          UserId: formData.UserId,
          createdAt: new Date(),
          isEditing: false,
          User: {
            id: this.currentUser.id,
            name: this.currentUser.name,
            avatar: this.currentUser.avatar
          }
        });
        this.tweets.RepliesCount += 1;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: error.message || "Cannot post tweet, please try again."
        });
      }
    },
    async afterDeleteReply(reply_id) {
      try {
        this.replies = this.replies.filter(reply => reply.id !== reply_id);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "cannot delete reply, please try again later"
        });
      }
    }
  }
};
</script>