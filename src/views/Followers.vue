<template>
  <Spinner v-if="isLoading" />
  <section v-else class="px-2">
    <div class="row">
      <div class="col-3">
        <!--Profile-->
      </div>
      <div class="col-9 row">
        <h4 class="col-12 title">Follower</h4>
        <UserFollowCard v-for="user in followers" :key="user.id" :initial-user="user" />
        <div class="col-12 shadow-sm p-3 rounded" v-if="followers.length < 1">
          <i class="fas fa-user mr-2"></i>No followers
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const dummyUser = {
  id: 1,
  name: "root",
  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/lawlbwoy/128.jpg",
  introduction: null,
  TweetsCount: 5,
  FollowerCount: 2,
  FollowingCount: 0,
  LikeCount: 0
};

import UserFollowCard from "../components/UserFollowCard";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";

export default {
  components: {
    UserFollowCard,
    Spinner
  },
  data() {
    return {
      followers: [],
      user: {},
      isLoading: false
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUserFollowers(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.id;
    this.fetchUserFollowers(userId);
    next();
  },
  methods: {
    async fetchUserFollowers(userId) {
      try {
        // update loading status
        this.isLoading = true;
        const { statusText, data } = await userAPI.getFollowers({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.followers = data.followshipData;
        this.user = data.userData;
        // update loading status
        this.isLoading = false;
      } catch (error) {
        // update loading status
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get followers, please try again later!"
        });
      }
    }
  }
};
</script>