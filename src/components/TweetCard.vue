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
          <span class="text-muted">{{ tweet.createdAt | date }}</span>
        </div>
        <p v-show="!tweet.isEditing" class="context">{{tweet.description}}</p>
        <textarea
          type="text"
          v-show="tweet.isEditing"
          v-model="tweet.description"
          class="textarea col-12 ml-3 p-3 bg-light rounded"
        ></textarea>
        <div class="d-flex justify-content-end">
          <!-- editing -->
          <button
            class="cancel-btn btn mr-2"
            v-if="tweet.isEditing"
            :disabled="isProcessing"
            @click="handleCancel(tweet.id)"
          >Cancel</button>
          <button
            class="btn save-btn"
            v-if="tweet.isEditing"
            :disabled="isProcessing"
            @click.stop.prevent="putTweet(tweet.id, tweet.description)"
          >Save</button>
        </div>
        <div class="mt-1">
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
      <div v-if="tweet.UserId === currentUser.id" class="button dropdown">
        <button
          class="btn btn-link dropdown-toggle"
          type="button"
          id="tweetActionsDropdwonMenu"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        ></button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="tweetActionsDropdwonMenu">
          <!-- delete button -->
          <button
            class="dropdown-item"
            type="button"
            :disabled="isProcessing"
            @click="deleteTweet(tweet.id)"
          >Delete</button>
          <!-- edit button -->
          <button
            class="dropdown-item"
            type="button"
            :disabled="isProcessing || tweet.isEditing"
            @click="toggleIsEditing(tweet.id)"
          >Edit</button>
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
import { mapState } from "vuex";

export default {
  mixins: [placeholderImageCreator],
  props: {
    initialTweet: {
      type: Object,
      require: true
    }
  },
  computed: {
    ...mapState(["currentUser"])
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
    },
    toggleIsEditing(tweetId) {
      this.isProcessing = true;
      if (this.tweet.id !== tweetId) return this.tweet;
      this.tweet.descriptionCached = this.tweet.description;
      this.tweet.isEditing = !this.tweet.isEditing;
      this.isProcessing = false;
    },
    async putTweet(id, description) {
      try {
        this.isProcessing = true;
        const { data, statusText } = await tweetApi.putTweet({
          tweetId: id,
          tweet: { description: description }
        });
        if (statusText !== "Accepted" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.toggleIsEditing(id);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "cannot edit tweet, please try again later"
        });
      }
    },
    handleCancel(tweetId) {
      if (this.tweet.id !== tweetId) return this.tweet;
      this.tweet.description = this.tweet.descriptionCached;
      this.toggleIsEditing(tweetId);
    },
    async deleteTweet(tweetId) {
      this.isProcessing = true;
      const { data, statusText } = await tweetApi.deleteTweet({ tweetId });
      if (statusText !== "OK" || data.status !== "success") {
        throw new Error(statusText);
      }
      this.$emit("after-delete-tweet", tweetId);
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

textarea {
  border: 1px solid rgb(158, 157, 157);
}

textarea:focus {
  border: 1px solid #007bff;
  outline: none;
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

.button {
  flex-basis: 0px;
  flex-grow: 1;
  text-align: end;
}

.btn-link {
  color: #9fa1a2;
}

.btn-link:hover {
  color: #717272;
}

.dropdown-item {
  color: #4c4c4c;
}

.dropdown-item:disabled {
  color: #c7c9ca;
}

.save-btn {
  background: #1da1f2;
  color: white;
  height: 28px;
  padding: 0.1rem 0.4rem;
}

.save-btn:hover {
  background: #006dbf;
}

.cancel-btn {
  background: #9fa1a2;
  color: white;
  height: 28px;
  padding: 0.1rem 0.4rem;
}

.cancel-btn:hover {
  background: #717272;
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