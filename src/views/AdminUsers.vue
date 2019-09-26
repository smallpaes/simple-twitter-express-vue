<template>
  <Spinner v-if="isLoading" />
  <section v-else class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <h4 class="title">User Admin</h4>
        <ul class="list-unstyled mt-3">
          <li
            v-for="user in users"
            :key="user.id"
            class="media bg-white align-items-center my-3 rounded-sm shadow-sm"
          >
            <img :src="user.avatar" class="mr-3 rounded-left" alt="avatar" />
            <div class="media-body">
              <h5 class="mb-3">
                <router-link :to="{name: 'user-tweets', params: {id: user.id}}">{{user.name}}</router-link>
              </h5>
              <p class="m-0 text-secondary user-data">
                <router-link :to="{name: 'user-tweets', params: {id: user.id}}">
                  <i class="fas fa-comment"></i>
                  {{user.tweetCount}}
                </router-link>
                <router-link :to="{name: 'user-likes', params: {id: user.id}}">
                  <i class="fas fa-heart ml-2"></i>
                  {{user.totalLikes}}
                </router-link>
                <router-link :to="{name: 'followings', params: {id: user.id}}">
                  <i class="fas fa-user-plus ml-2"></i>
                  {{user.FollowingCount}}
                </router-link>
                <router-link :to="{name: 'followers', params: {id: user.id}}">
                  <i class="fas fa-users ml-2"></i>
                  {{user.followerCount}}
                </router-link>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import adminAPI from "../apis/admin";
import Spinner from "../components/Spinner";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      users: [],
      isLoading: true
    };
  },
  components: {
    Spinner
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const { data, statusText } = await adminAPI.getUsers();
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.users = data.users;
        // update loading status
        this.isLoading = false;
      } catch (error) {
        // update loading status
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get user data, please try again later"
        });
      }
    }
  }
};
</script>

<style scoped>
img {
  max-width: 128px;
}

h5 a {
  color: #343a40;
}

h5 a:hover {
  color: #1da1f2;
}

.user-data a {
  color: #82878b;
}

.user-data a:hover {
  color: #1da1f2;
  text-decoration: none;
}
</style>