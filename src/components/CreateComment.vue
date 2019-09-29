<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="test">
      <textarea
        @input="input"
        v-model.trim="description"
        minlength="1"
        maxlength="140"
        class="textarea col-12 p-3 mb-3 bg-light rounded"
        style="min-height: 9em;"
        placeholder="What's on your mind?"
        required
      ></textarea>
    </div>
    <span class="countText">尚可填寫 {{countText}} 字</span>
    <div class="text-right">
      <button type="submit" class="btn btn-primary rounded" :disabled="isProcessing">Tweet</button>
    </div>
  </form>
</template>

<script>
import { Toast } from "../utils/helpers";
export default {
  props: {
    UserId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      description: "",
      isProcessing: true,
      countText: 140
    };
  },
  methods: {
    handleSubmit() {
      const descriptionlength = this.description.split(" ").join("").length;
      if (descriptionlength === 0 || this.description.length > 140) {
        this.description = "";
        return Toast.fire({
          type: "error",
          title: "cannot empty or over 140 words."
        });
      }
      const formData = {
        UserId: this.UserId,
        description: this.description
      };
      this.description = "";
      this.$emit("after-create-comment", formData);
      this.isProcessing = true;
    },
    input(e) {
      this.countText = 140 - e.target.value.length;
      if (e.target.value.length > 0) {
        this.isProcessing = false;
        e.target.style.cssText = `min-height: 9em;`;
        e.target.style.cssText = `min-height: ${e.target.scrollHeight}px;`;
      } else {
        this.isProcessing = true;
      }
      this.description = e.target.value;
    }
  }
};
</script>

<style scoped>
.countText {
  color: #aaa;
}
</style>