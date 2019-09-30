<template>
  <Spinner v-if="isLoading" />
  <section v-else class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
        <h4 class="title">User Admin</h4>
        <ul class="list-unstyled mt-3">
          <!--Admin Nav-->
          <li class="bg-white px-3 py-2 rounded-top admin-nav">
            <router-link class="mr-3" :to="{name: 'admin-tweets'}">Tweets</router-link>
            <router-link :to="{name: 'admin-users'}">Users</router-link>
          </li>
          <!--User list-->
          <AdminUserCard v-for="user in users" :user="user" :key="user.id" />
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import AdminUserCard from "../components/AdminUserCard";
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
    AdminUserCard,
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
.admin-nav a:first-of-type {
  color: #4c4c4c;
}

.admin-nav a:hover,
.admin-nav a:nth-of-type(2):hover {
  text-decoration: none;
  color: #1da1f2;
}

.admin-nav a:nth-of-type(2) {
  color: rgb(0, 132, 180);
}
</style>