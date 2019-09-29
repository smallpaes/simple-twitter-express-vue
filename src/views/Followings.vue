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
          <h4 class="col-12 title">Following</h4>
          <UserFollowCard
            v-for="user in followings"
            :key="user.id"
            :initial-user="user"
            @add-following="handleAfterFollow"
            @remove-following="handleAfterUnfollow"
          />
          <div class="col-12 shadow-sm p-3 rounded bg-white" v-if="followings.length < 1">
            <i class="fas fa-user mr-2"></i>No following users
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
import { mapState } from "vuex";

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
      isLoading: false
    };
  },
  computed: {
    ...mapState(["currentUser"])
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
    handleAfterFollow() {
      if (this.currentUser.id === this.user.id) {
        this.user.FollowingCount = Number(this.user.FollowingCount) + 1;
      }
    },
    handleAfterUnfollow() {
      if (this.currentUser.id === this.user.id) {
        this.user.FollowingCount = Number(this.user.FollowingCount) - 1;
      }
    }
  }
};
</script>
