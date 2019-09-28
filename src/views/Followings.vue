<template>
  <Spinner v-if="isLoading" />
  <section v-else class="px-2">
    <div class="row">
      <div class="col-lg-3">
        <!--Profile-->
        <UserProfile
          :initial-user="user"
          :key="user.id"
          @after-add-followship="afterAddFollowship"
          @after-remove-followship="afterRemoveFollowship"
        />
      </div>
      <div class="col-lg-9">
        <div class="row px-3">
          <h4 class="col-12 title">Following</h4>
          <UserFollowCard v-for="user in followings" :key="user.id" :initial-user="user" />
          <div class="col-12 shadow-sm p-3 rounded bg-white" v-if="followings.length < 1">
            <i class="fas fa-user mr-2"></i>No following users
          </div>
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
import UserProfile from "../components/UserProfile";

export default {
  components: {
    UserFollowCard,
    Spinner,
    UserProfile
  },
  data() {
    return {
      followings: [],
      user: {},
      isLoading: false,
      dummyUser: dummyUser
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUserFollowings(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.id;
    this.fetchUserFollowings(userId);
    next();
  },
  methods: {
    async fetchUserFollowings(userId) {
      try {
        // update loading status
        this.isLoading = true;
        const { statusText, data } = await userAPI.getFollowings({ userId });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.followings = data.followshipData;
        this.user = data.userData;
        // update loading status
        this.isLoading = false;
      } catch (error) {
        // update loading status
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get following users, please try again later!"
        });
      }
    },
    //update userFollowing data after afterAddFollowship
    async afterAddFollowship(payload) {
      const { userId, currentUser } = payload;
      this.fetchUserFollowings(userId);
    },
    //update userFollowing data after afterRemoveFollowship
    async afterRemoveFollowship(payload) {
      const { userId, currentUser } = payload;
      this.fetchUserFollowings(userId);
    }
  }
};
</script>