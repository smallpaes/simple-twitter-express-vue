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
          <router-link :to="{name: 'user-tweets', params: {id: tweet.User.id}}">
            <span class="pr-2">@{{tweet.User.name}},</span>
          </router-link>
            <span> {{ tweet.createdAt | date }}</span>
        </div>
        <p>{{tweet.description}}</p>
        <div class="mt-4">
          <router-link :to="{name: 'user-tweets', params: {id: tweet.id}}" class="mr-3">
            <span class="text-primary">Reply ({{tweet.RepliesCount}})</span>
          </router-link>
          <span class="text-danger">Like ({{tweet.LikesCount}})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";
import moment from 'moment'

export default {
  props: {
    initialTweet: {
      type: Object,
      require: true
    }
  },
  filters: {
    date(datetime) {
      return moment(datetime).format('YYYY-MM-DD, HH:MM')
    }
  },
  data() {
    return {
      tweet: this.initialTweet
    };
  },
  mixins: [placeholderImageCreator]
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
  width: 90px;
}
.content {
  flex-basis: 0px;
  flex-grow: 4;
  font-size: 1.25rem;
}
</style>