<template>
  <form @submit.stop.prevent="handleSubmit" class="mb-5 p-2">
    <div class="test">
      <textarea
        @input="input"
        v-model="comment"
        minlength="1"
        maxlength="140"
        class="textarea col-12 mb-3 bg-light rounded"
        style="min-height: 9em;"
      ></textarea>
    </div>
    <div class="text-right pr-4">
      <button type="submit" class="btn btn-primary rounded" :disabled="isProcessing">Reply</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    UserId: {
      type: Number,
      required: true
    },
    TweetId: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      comment: "",
      isProcessing: true,
    };
  },
  methods: {
    handleSubmit() {
      const formData = {
        TweetId: this.TweetId,
        UserId: this.UserId,
        comment: this.comment
      };
      this.comment = "";
      this.$emit("after-create-reply", formData);
      this.isProcessing = true;
    },
    input(e) {
      if (e.target.value.length > 0) {
        this.isProcessing = false;
        e.target.style.cssText = `min-height: 9em;`
        e.target.style.cssText = `min-height: ${e.target.scrollHeight}px;`
      } else {
        this.isProcessing = true;
      }
      this.comment = e.target.value;
    }
  }
};
</script>

<style scoped>
.countText {
  color: #aaa;
}
</style>