<template>
  <div class="card border-left-0 border-right-0">
    <div class="card-header bg-white" id="headingOne">
      <div class="media">
        <img :src="tweet.User.avatar | placeholderImage" class="mr-3 rounded-circle" alt="avatar" />
        <div class="media-body">
          <h6 class="mt-0 font-weight-bold d-inline-block">
            <router-link
              :to="{name: 'user-tweets', params: {id: tweet.User.id}}"
            >{{tweet.User.name}}</router-link>
          </h6>
          <small class="text-muted ml-2">&sdot; {{tweet.createdAt | fromNow}}</small>
          <button
            @click.stop="deleteTweet(tweet.id)"
            :disabled="isProcessing"
            type="button"
            class="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <p>{{tweet.description}}</p>
          <span>
            <i class="far fa-heart mr-1"></i>
            {{tweet.LikesCount}}
          </span>
          <button
            class="btn btn-link action-btn"
            type="button"
            data-toggle="collapse"
            :data-target="'#index' + tweet.id"
            aria-expanded="false"
            :aria-controls="'index' + tweet.id"
          >
            <i class="far fa-comment mr-1"></i>
            {{tweet.RepliesCount}}
          </button>
        </div>
      </div>
    </div>

    <div
      :id="'index' + tweet.id"
      class="collapse"
      aria-labelledby="headingOne"
      data-parent="#tweets"
    >
      <div v-for="reply in tweet.Replies" :key="reply.id" class="card-body reply-box">
        <div class="media">
          <img :src="reply.User.avatar | placeholderImage" class="mr-3 rounded-circle" alt="avatar" />
          <div class="media-body">
            <h6 class="mt-0 font-weight-bold d-inline-block">
              <router-link
                :to="{name: 'user-tweets', params: {id: reply.User.id}}"
              >{{reply.User.name}}</router-link>
            </h6>
            <small class="text-muted ml-2">&sdot; {{reply.createdAt | fromNow}}</small>
            <p>{{reply.comment}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, placeholderImageCreator } from "../utils/mixins";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  props: {
    tweet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false
    };
  },
  mixins: [fromNowFilter, placeholderImageCreator],
  methods: {
    async deleteTweet(tweetId) {
      try {
        // update process status
        this.isProcessing = true;
        const { data, statusText } = await adminAPI.deleteTweet({ tweetId });
        // error handling
        if (statusText !== "Accepted" || data.status !== "success") {
          throw new Error(statusText);
        }
        // notify parent component of the action
        this.$emit("after-delete", tweetId);
        // update process status
        this.isProcessing = false;
      } catch (error) {
        // update process status
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Cannot delete the tweet, please try again later"
        });
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 50px;
}

.media-body p {
  font-size: 0.9rem;
  line-height: 20px;
}

.media-body a,
.media-body button {
  color: #4c4c4c;
}

.action-btn {
  color: #82878b;
}

.media-body a[data-v-7f2df0f2]:hover,
.media-body a:hover,
.media-body button:hover {
  color: #1da1f2;
  text-decoration: none;
}

.media-body button:focus {
  text-decoration: none;
}

.close {
  font-weight: 100;
}

.reply-box {
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.reply-box:last-child {
  border-bottom: none;
}
</style>