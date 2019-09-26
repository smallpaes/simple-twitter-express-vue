<template>
  <Spinner v-if="isLoading" />
  <section v-else class="container">
    <form @submit.stop.prevent="handleSubmit" class="row">
      <div class="col-12 col-md-3 bg-white rounded p-3 mr-3 mb-3 mb-md-0">
        <img :src="avatar | placeholderImage" alt="avatar" class="rounded img-thumbnail w-100" />
        <div class="form-group mt-3">
          <input
            @input="handleFileChange"
            type="file"
            class="form-control-file"
            id="avatar"
            name="avatar"
            accept=".jpg, .jpeg, .png"
          />
        </div>
      </div>
      <div class="col-12 col-md-8 bg-white rounded p-3">
        <div class="form-group">
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <textarea
            v-model="introduction"
            placeholder="Type any thing about you here..."
            class="form-control"
            id="introduction"
            name="introduction"
            rows="3"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn" type="submit" :disabled="isProcessing">Submit</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import Spinner from "../components/Spinner";

export default {
  mixins: [placeholderImageCreator],
  components: {
    Spinner
  },
  data() {
    return {
      id: "",
      name: "",
      introduction: "",
      avatar: "",
      isLoading: true,
      isProcessing: false
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUser(userId);
  },
  methods: {
    async fetchUser(userId) {
      try {
        // update loading status
        this.isLoading = true;
        const { data, statusText } = await userAPI.getEditUser({ userId });
        // error handing
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.id = data.user.id;
        this.name = data.user.name;
        this.introduction = data.user.introduction;
        this.avatar = data.user.avatar;
        // update loading status
        this.isLoading = false;
      } catch (error) {
        // update loading status
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "Cannot get your data, please try again later"
        });
      }
    },
    async handleFileChange(e) {
      // access the image
      const file = e.target.files[0];
      if (!file) return;
      // create url for the url
      const url = window.URL.createObjectURL(file);
      // update avatar url
      this.avatar = url;
    },
    async handleSubmit(e) {
      if (!this.name) {
        Toast.fire({
          type: "error",
          title: "Please enter your name"
        });
        return;
      }
      // create fromData object for the form
      const form = e.target;
      const formData = new FormData(form);
      try {
        // update processing status
        this.isProcessing = true;
        const { data, statusText } = await userAPI.postEditUser({
          formData,
          userId: this.id
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(data.message);
        }
        // update user data in Vuex
        this.$store.commit("setCurrentUser", { avatar: this.avatar });
        // redirect back to user page
        this.$router.push(`/users/${this.id}/tweets`);
      } catch (error) {
        // update processing status
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title:
            error.message ||
            "Cannot update your profile, please try again later"
        });
      }
    }
  }
};
</script>

<style scoped>
.btn {
  background: #1da1f2;
  color: white;
  padding: 0.1rem 0.7rem;
}

.btn:hover {
  background: #006dbf;
}
</style>