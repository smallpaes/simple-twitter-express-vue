<template>
  <div class="auth-container shadow-sm mx-auto rounded">
    <form @submit.prevent.stop="handlesubmit" class="p-3">
      <h3 class="mt-2 mb-4">Log in to Simple Twitter</h3>
      <div class="form-group">
        <input
          type="email"
          v-model="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email"
          autofocus
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button class="btn" v-if="isProcessing" type="button" disabled>
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        Logging in...
      </button>
      <button v-else type="submit" class="btn">Log in</button>
    </form>
    <div class="p-3 bg-light mt-2">
      <p class="m-0 text-secondary">
        New to Simple Twitter?
        <router-link :to="{name: 'sign-up'}" class="ml-2">Sign up now &rsaquo;&rsaquo;</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false
    };
  },
  methods: {
    async handlesubmit(e) {
      try {
        // validate
        if (!this.email || !this.password) {
          Toast.fire({
            type: "warning",
            title: "Email and password are required"
          });
          return;
        }

        // switch process status
        this.isProcessing = true;

        const { data, statusText } = await authorizationAPI.logIn({
          email: this.email,
          password: this.password
        });

        // error handleing
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        // store token in localStorage
        localStorage.setItem("token", data.token);

        // update state in Vuex
        this.$store.commit("setCurrentUser", data.user);

        this.$router.push("/tweets");
        // switch process status
        this.isProcessing = false;
      } catch (error) {
        // switch process status
        this.isProcessing = false;
        Toast.fire({
          type: "warning",
          title: "Log in failed, please try again later"
        });
      }
    }
  }
};
</script>