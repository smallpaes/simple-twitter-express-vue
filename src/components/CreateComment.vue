<template>
  <form @submit.stop.prevent="handleSubmit">
    <div
      @input="onInput"
      class="p-3 mb-3 bg-light rounded"
      style="min-height: 9em; border: 2px solid #1da1f2;"
      contenteditable="true"
      placeholder="What's on your mind?"
    ></div>
    <span class="countText">尚可填寫 {{countText}} 字</span>
    <div class="text-right">
      <button type="submit" class="btn btn-primary rounded" :disabled="isProcessing">Tweet</button>
    </div>
  </form>
</template>

<script>
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
      const formData = {
        UserId: this.UserId,
        description: this.description
      };
      this.$emit("after-create-comment", formData);
    },
    onInput(e) {
      let content = e.target.innerText;
      this.countText = 140 - content.length;
      if (content.length > 0 || content.length > 0) {
        this.isProcessing = false;
      } else {
        this.isProcessing = true;
      }
      this.description = content
    }
  }
};
</script>

<style scoped>
div[contenteditable]:empty:not(:focus):before {
  content: attr(placeholder);
  color: #aaa;
}
.countText {
  color: #aaa;
}
</style>