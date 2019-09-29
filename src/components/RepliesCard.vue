<template>
  <div class="col-12 p-2">
    <div class="tweets rounded shadow-sm">
      <div class="avatar">
        <router-link :to="{name: 'user-tweets', params: {id: reply.UserId}}">
          <img :src="reply.User.avatar | placeholderImage" class="mr-3 rounded-circle" alt="avatar" />
        </router-link>
      </div>
      <div class="content">
        <div class="username mb-3">
          <router-link :to="{name: 'user-tweets', params: {id: reply.UserId}}" class="userName">
            <span class="pr-2">@{{reply.User.name}},</span>
          </router-link>
          <span>{{ reply.createdAt | date }}</span>
        </div>
        <!-- reply comment -->
        <p v-show="!reply.isEditing">{{reply.comment}}</p>
        <textarea
          type="text"
          v-show="reply.isEditing"
          v-model="reply.comment"
          class="textarea col-12 p-3 bg-light rounded"
        ></textarea>
      </div>
      <div v-if="reply.UserId === currentUser.id || currentUser.role === 'Admin'" class="button">
        <!-- delete button -->
        <button
          class="btn btn-danger"
          :disabled="isProcessing"
          @click.stop.prevent="deleteReply(reply.id)"
        >Delete</button>
        <div class="edit my-3" v-if="reply.UserId === currentUser.id">
          <!-- edit button -->
          <button
            class="btn btn-primary"
            v-show="!reply.isEditing"
            :disabled="isProcessing"
            @click.stop.prevent="toggleIsEditing(reply.id)"
          >Edit</button>
          <!-- editing -->
          <button
            class="btn btn-info"
            v-show="reply.isEditing"
            :disabled="isProcessing"
            @click.stop.prevent="updateReply(reply.id, reply.comment)"
          >Save</button>
        </div>
        <button
          class="cancel btn btn-warning"
          v-show="reply.isEditing"
          @click="handleCancel(reply.id)"
        >Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { placeholderImageCreator } from "../utils/mixins";
import replyApi from "../apis/reply";
import moment from "moment";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  mixins: [placeholderImageCreator],
  props: {
    initialReply: {
      type: Object,
      require: true
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  filters: {
    date(datetime) {
      return moment(datetime).format("YYYY-MM-DD, HH:MM");
    }
  },
  data() {
    return {
      reply: this.initialReply,
      isProcessing: false
    };
  },
  methods: {
    async deleteReply(reply_id) {
      this.isProcessing = true
      const { data, statusText } = await replyApi.deleteReply({ reply_id });
        if (statusText !== "Accepted" || data.status !== "success") {
          throw new Error(statusText);
        }
      this.$emit("after-delete-reply", reply_id);
    },
    toggleIsEditing(reply_id) {
      this.isProcessing = true
      if (this.reply.id !== reply_id) return this.reply;
      this.reply.commentCached = this.reply.comment;
      this.reply.isEditing = !this.reply.isEditing;
      this.isProcessing = false
    },
    async updateReply(id, comment) {
      try {
        this.isProcessing = true
        this.toggleIsEditing(id);
        const { data, statusText } = await replyApi.putReply({
          reply_id: id,
          reply: { comment: comment }
        });
        if (statusText !== "Created" || data.status !== "success") {
          throw new Error(statusText);
        }
        this.isProcessing = false
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "cannot edit reply, please try again later"
        });
      }
    },
    handleCancel(reply_id) {
      if (this.reply.id !== reply_id) return this.reply;
      this.reply.comment = this.reply.commentCached;
      this.toggleIsEditing(reply_id);
    }
  }
};
</script>

<style scoped>
.tweets {
  display: flex;
  padding: 20px 15px 15px;
  margin-bottom: 10px;
}
.avatar {
  flex-basis: 0px;
  flex-grow: 1;
  margin: auto;
  text-align: center;
}
img {
  max-width: 128px;
}
.button {
  flex-basis: 0px;
  flex-grow: 1;
  text-align: end;
}
.content {
  flex-basis: 0px;
  flex-grow: 4;
}
.username,
.context,
.replies,
.like,
.unlike {
  padding: 10px 1.1rem;
  font-size: 1.1rem;
}
a.replies {
  color: #1da1f2;
  transition: all 0.5s;
}
a.replies:hover {
  color: #006dbf;
}
.cancel {
  /* display: block; */
  user-select: none;
  cursor: pointer;
}
</style>