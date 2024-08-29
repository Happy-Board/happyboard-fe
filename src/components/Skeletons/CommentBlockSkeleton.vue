<template>
  <div class="bg-backgroundColor p-4 rounded-xl mb-10">
    <div class="relative">
      <div
        id="comment-input"
        placeholder="Write a comment…"
        class="comment-input rounded-lg border-0 bg-white border-white focus:border-0 focus:outline-0 p-3 pe-12"
        contentEditable="true"
        spellcheck="false"
      ></div>

      <button class="absolute top-3 right-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6 text-gray-600 hover:text-black"
        >
          <path
            d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
          />
        </svg>
      </button>
    </div>
    <CommentSkeleton />
    <CommentSkeleton />
  </div>
</template>
<script setup>
import CommentSkeleton from './CommentSkeleton.vue'
</script>
<style scoped>
.ql-toolbar {
  border: 0 !important;
  border-bottom: 1px solid rgb(218, 218, 218) !important;
}
.comment-input[contentEditable='true']:empty:before {
  content: attr(placeholder);
  color: gray;
  cursor: text;
}
</style>
