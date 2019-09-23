<template>
  <div class="auth-container shadow-sm mt-5 mx-auto rounded">
    <form @submit.prevent.stop="handlesubmit" class="p-3">
      <h3 class="mt-2 mb-4">Log in to Simple Twitter</h3>
      <div class="form-group">
        <input
          type="name"
          v-model="name"
          class="form-control"
          id="name"
          placeholder="Name"
          autofocus
        />
      </div>
      <div class="form-group">
        <input type="email" v-model="email" class="form-control" id="email" placeholder="Email" />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="passwordCheck"
          class="form-control"
          id="ppasswordCheck"
          placeholder="Re-enter password"
        />
      </div>
      <button class="btn" v-if="isProcessing" type="button" disabled>
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        Signning up...
      </button>
      <button v-else type="submit" class="btn">Sign up</button>
    </form>
    <div class="p-3 bg-light mt-2">
      <p class="m-0 text-secondary">
        Already on Simple Twitter?
        <router-link :to="{name: 'log-in'}" class="ml-2">Log in now &rsaquo;&rsaquo;</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import authorizationAPI from "../apis/authorization";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false
    };
  },
  methods: {
    async handlesubmit(e) {
      // check if any field is empty
      if (!this.name || !this.email || !this.password || !this.passwordCheck) {
        Toast.fire({
          type: "error",
          title: "Please fill out all the fields"
        });
        return;
      }
      // check if password length is between 8-12
      if (this.password.length < 8 || this.password.length > 12) {
        Toast.fire({
          type: "error",
          title: "Password length should be between 8-12"
        });
      }

      // check if two passwords match
      if (this.password !== this.passwordCheck) {
        Toast.fire({
          type: "error",
          title: "Please make sure two passwords match"
        });
        return;
      }
      try {
        // switch processing status
        this.isProcessing = true;
        // submit the signup form
        const { data, statusText } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // redirect to login page
        this.$router.push({ name: "log-in" });
        // switch processing status
        this.isProcessing = false;
      } catch (error) {
        // switch processing status
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Sign up failed, please try again later"
        });
      }
    }
  }
};
</script>