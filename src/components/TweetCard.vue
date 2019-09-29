<template>
  <div class="col-12 p-2">
    <div class="tweets bg-light rounded shadow-sm">
      <div class="avatar">
        <router-link :to="{name: 'user-tweets', params: {id: tweet.User.id}}">
          <img :src="tweet.User.avatar | placeholderImage" class="mr-3 rounded-circle" alt="avatar" />
        </router-link>
      </div>
      <div class="content">
        <div class="username mb-3">
          <router-link :to="{name: 'user-tweets', params: {id: tweet.User.id}}" class="userName">
            <span class="pr-2">@{{tweet.User.name}},</span>
          </router-link>
          <span>{{ tweet.createdAt | date }}</span>
        </div>
        <p class="context">{{tweet.description}}</p>
        <div class="mt-4">
          <router-link
            :to="{name: 'tweet-replies', params: {tweet_id: tweet.id}}"
            class="mr-3 replies"
          >
            <span>
              <i class="far fa-comment-alt"></i>
              Reply ({{tweet.RepliesCount}})
            </span>
          </router-link>
          <button
            class="btn like"
            v-if="tweet.isLiked"
            :disabled="isProcessing"
            @click.stop.prevent="removeLike(tweet.id)"
          >
            <i class="fas fa-heart"></i>
            Like ({{tweet.LikesCount}})
          </button>
          <button
            class="btn unlike"
            v-else
            :disabled="isProcessing"
            @click.stop.prevent="addLike(tweet.id)"
          >
            <i class="far fa-heart"></i>
            Like ({{tweet.LikesCount}})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetApi from "../apis/tweet";
import { placeholderImageCreator } from "../utils/mixins";
import moment from "moment";
import { Toast } from "../utils/helpers";

export default {
  mixins: [placeholderImageCreator],
  props: {
    initialTweet: {
      type: Object,
      require: true
    }
  },
  filters: {
    date(datetime) {
      return moment(datetime).format("YYYY-MM-DD, HH:MM");
    }
  },
  data() {
    return {
      tweet: this.initialTweet,
      isProcessing: false
    };
  },
  methods: {
    async addLike(tweetId) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await tweetApi.addLike({ tweetId });
        if (statusText !== "Created" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.tweet = {
          ...this.tweet,
          LikesCount: Number(this.tweet.LikesCount) + 1,
          isLiked: true
        };
        // notify parent
        this.$emit("after-add-like");
        this.isProcessing = false;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot Like the user, please try again later"
        });
      }
    },
    async removeLike(tweetId) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await tweetApi.removeLike({ tweetId });
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.tweet = {
          ...this.tweet,
          LikesCount: Number(this.tweet.LikesCount) - 1,
          isLiked: false
        };
        // notify parent
        this.$emit("after-remove-like");
        this.isProcessing = false;
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "Cannot unLike the user, please try again later"
        });
      }
    }
  }
};
</script>

<style scoped>
.tweets {
  display: flex;
  padding: 20px 15px 15px;
  margin-bottom: 10px;
}
.avatar {
  flex-basis: 0px;
  flex-grow: 1;
  margin: auto;
  text-align: center;
}
img {
  max-width: 128px;
}
.content {
  flex-basis: 0px;
  flex-grow: 4;
}
.username,
.context,
.replies,
.like,
.unlike {
  padding: 10px 1.1rem;
  font-size: 1.1rem;
}

a.replies {
  color: #1da1f2;
  transition: all 0.5s;
}
a.replies:hover {
  color: #006dbf;
}

.unlike {
  color: #777;
  transition: all 0.5s;
}
.unlike:hover {
  color: #f00000;
}
.like {
  color: #ee0000;
  transition: all 0.5s;
}
.like:hover {
  color: #bb0000;
}
</style>