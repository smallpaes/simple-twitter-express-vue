<template>
  <nav class="navbar navbar-expand-md navbar-dark shadow-sm fixed-top">
    <router-link to="/" class="navbar-brand">Simple Twitter</router-link>
    <button
      v-if="isAuthenticated"
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto align-items-center">
        <li class="nav-item avatar" v-if="isAuthenticated">
          <a href class="nav-link py-2 p-md-0">
            <span class="d-inline d-md-none">Profile</span>
            <img
              :src="currentUser.avatar | placeholderImage"
              alt="User avatar"
              class="rounded d-none d-md-inline"
            />
          </a>
        </li>
        <li v-if="currentUser.role ==='Admin'" class="nav-item">
          <router-link :to="{name: 'admin-tweets'}" class="nav-link">Admin</router-link>
        </li>
        <button
          v-if="isAuthenticated"
          class="btn btn-sm ml-2 d-none d-md-inline-block btn-outline-light rounded-lg"
          @click.stop.prevent="logout"
        >Log out</button>
        <li class="nav-item" v-if="isAuthenticated">
          <!--Must be changed into router link-->
          <button @click.stop.prevent="logout" class="btn d-md-none">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { placeholderImageCreator } from "../utils/mixins";

export default {
  mixins: [placeholderImageCreator],
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
nav {
  background: #1da1f2;
}

.navbar-brand,
.navbar-brand:hover {
  color: white;
}

.navbar-dark .navbar-toggler {
  border-color: transparent;
}

li a:hover {
  background-color: transparent;
}

.avatar img {
  height: 40px;
  width: auto;
}

.btn-outline-light:hover {
  color: white;
  background-color: #f8f9fa2f;
}

.nav-item button.btn {
  color: rgba(255, 255, 255, 0.5);
}

.nav-item button.btn:focus,
.nav-item button.btn:hover {
  color: rgba(255, 255, 255, 0.75);
}
</style>