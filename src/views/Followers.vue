<template>
  <Spinner v-if="isLoading" />
  <section v-else class="container">
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
          <h4 class="col-12 title">Follower</h4>
          <UserFollowCard
            v-for="user in followers"
            :key="user.id"
            :initial-user="user"
            @add-following="handleAfterFollow"
            @remove-following="handleAfterUnfollow"
          />
          <div class="col-12 shadow-sm p-3 rounded bg-white" v-if="followers.length < 1">
            <i class="fas fa-user mr-2"></i>No followers
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
    },
    //update userFollowing data after afterAddFollowship
    async afterAddFollowship(payload) {
      const { currentUser } = payload;
      // push currentUser to followers
      this.followers.push({
        ...currentUser,
        isFollowing: true
      });
    },
    //update userFollowing data after afterRemoveFollowship
    async afterRemoveFollowship(payload) {
      const { currentUser } = payload;
      this.followers = this.followers.filter(
        follower => follower.id !== currentUser.id
      );
    },
    handleAfterFollow() {
      this.user.FollowingCount = Number(this.user.FollowingCount) + 1;
    },
    handleAfterUnfollow() {
      this.user.FollowingCount = Number(this.user.FollowingCount) - 1;
    }
  }
};
</script>