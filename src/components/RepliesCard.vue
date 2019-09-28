<template>
  <div class="col-12 p-2">
    <div class="tweets rounded shadow-sm">
      <div class="avatar">
        <router-link :to="{name: 'user-tweets', params: {id: reply.UserId}}">
          <img :src="reply.User.avatar | placeholderImage" class="mr-3 rounded-circle" alt="avatar" />
        </router-link>
      </div>
      <div class="content">
        <div class="username mb-3">
          <router-link :to="{name: 'user-tweets', params: {id: reply.UserId}}" class="userName">
            <span class="pr-2">@{{reply.User.name}},</span>
          </router-link>
          <span>{{ reply.createdAt | date }}</span>
        </div>
        <p class="context">{{reply.comment}}</p>
      </div>
      <div class="button">
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";
import moment from "moment";
import { Toast } from "../utils/helpers";

export default {
  mixins: [placeholderImageCreator],
  props: {
    initialReply: {
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
      reply: this.initialReply,
      isProcessing: false
    };
  }
};
</script>

<style scoped>
.tweets {
  display: flex;
  padding: 20px 15px 15px;
  margin-bottom: 10px;
}
.avatar,
.button {
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
</style>