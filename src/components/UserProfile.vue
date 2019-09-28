<template>
  <div class="text-center">
    <h1 class="mb-2 username">{{user.name}}</h1>
    <div class="userpic mb-2">
      <img :src="user.avatar | placeholderImage" style="height:150px;width:150px" alt="avatar" />
    </div>
    <p class="mt-3 mb-3">{{user.introduction}}</p>
    <ul class="mt-3">
      <li>
        <router-link
          :to="{name:'followings',params:{id:user.id}}"
        >{{user.FollowingCount}} Followings</router-link>
      </li>
      <li>
        <router-link :to="{name:'followers',params:{id:user.id}}">{{user.FollowerCount}} Followers</router-link>
      </li>
      <li>
        <router-link :to="{name:'likes',params:{id:user.id}}">{{user.LikeCount}} Likes</router-link>
      </li>
      <li>
        <router-link :to="{name:'user-tweets',params:{id:user.id}}">{{user.TweetsCount}} Tweets</router-link>
      </li>
    </ul>
    <div class="userbuttons">
      <button
        class="btn btn-danger"
        v-if="user.isFollowing"
        @click.prevent.stop="removeFollowing(user.id)"
      >unFollow</button>
      <router-link
        class="btn btn-secondary"
        :to="{name:'user-edit',params:{id:user.id}}"
        v-else-if="user.id==currentUser.id"
      >Edit</router-link>
      <button class="btn btn-primary" v-else @click.prevent.stop="addFollowing(user.id)">Follow</button>
    </div>
  </div>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";
import { mapState } from "vuex";
import followshipAPI from "../apis/followship";
import { Toast } from "../utils/helpers";

export default {
  mixins: [placeholderImageCreator],
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: this.initialUser
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    async addFollowing(userId) {
      try {
        // update processing status
        const { data, statusText } = await followshipAPI.addFollowing({
          userId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.user = {
          ...this.user,
          isFollowed: true
        };
        // notify parent
        this.$emit("after-add-followship", {
          userId,
          currentUser: this.currentUser
        });

        // show message
        Toast.fire({
          type: "success",
          title: "Successfully follow the user!"
        });
      } catch (error) {
        // update processing status
        Toast.fire({
          type: "error",
          title: "Cannot follow the user, please try again later"
        });
      }
    },
    async removeFollowing(userId) {
      try {
        const { data, statusText } = await followshipAPI.removeFollowing({
          userId
        });
        // error handling
        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // update data
        this.user = {
          ...this.user,
          isFollowed: false
        };
        // notify parent
        this.$emit("after-remove-followship", {
          userId,
          currentUser: this.currentUser
        });

        // show message
        Toast.fire({
          type: "success",
          title: "Successfully unfollow the user!"
        });
      } catch (error) {
        // update processing status
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "Cannot unfollow the user, please try again later"
        });
      }
    }
  }
};
</script>

<style>
li {
  position: relative;
  list-style: none;
  right: 25px;
}

li a:hover {
  background-color: #fafcfd;
  color: #5b9bd1;
}
.userpic img {
  float: none;
  margin: 0 auto;
  width: 50%;
  height: 50%;
  -webkit-border-radius: 50% !important;
  -moz-border-radius: 50% !important;
  border-radius: 50% !important;
}

.username {
  color: #5a7391;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 7px;
}

.userbuttons {
  text-align: center;
  margin-top: 10px;
}

.userbuttons .btn {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 15px;
  margin-right: 5px;
}
</style>