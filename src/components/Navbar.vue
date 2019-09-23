<template>
  <nav class="navbar navbar-expand-md navbar-dark shadow-sm">
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
        <li v-if="currentUser.role ==='Admin'" class="nav-item">
          <!--Must be changed into router link-->
          <a class="nav-link" href="#">Admin</a>
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

export default {
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