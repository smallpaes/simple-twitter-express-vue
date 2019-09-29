<template>
  <li class="media bg-white m-0 p-3 border-top">
    <img :src="user.avatar | placeholderImage" class="mr-3 rounded-circle" alt="avatar" />
    <div class="media-body">
      <h6 class="mt-0 font-weight-bold d-inline-block">
        <router-link :to="{name: 'user-tweets', params: {id: user.id}}">{{user.name}}</router-link>
      </h6>
      <p>{{user.introduction}}</p>
      <p class="m-0 text-secondary user-data">
        <router-link class="py-1 pr-2" :to="{name: 'user-tweets', params: {id: user.id}}">
          <i class="fas fa-comment mr-1"></i>
          {{user.tweetCount}}
        </router-link>
        <router-link class="py-1 pr-2" :to="{name: 'likes', params: {id: user.id}}">
          <i class="fas fa-heart ml-1"></i>
          {{user.totalLikes}}
        </router-link>
        <router-link class="py-1 pr-2" :to="{name: 'followings', params: {id: user.id}}">
          <i class="fas fa-user-plus ml-1"></i>
          {{user.FollowingCount}}
        </router-link>
        <router-link class="py-1 pr-2" :to="{name: 'followers', params: {id: user.id}}">
          <i class="fas fa-users ml-1"></i>
          {{user.followerCount}}
        </router-link>
      </p>
    </div>
  </li>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";

export default {
  mixins: [placeholderImageCreator],
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.admin-nav a:nth-of-type(2) {
  color: rgb(0, 132, 180);
}

img {
  width: 50px;
}

li a,
li button {
  color: #4c4c4c;
}

li a[data-v-7f2df0f2]:hover,
li a:hover,
li button:hover {
  color: #1da1f2;
  text-decoration: none;
}

li p {
  font-size: 0.9rem;
  line-height: 20px;
}

.user-data a {
  color: #82878b;
  font-size: 1rem;
}
</style>