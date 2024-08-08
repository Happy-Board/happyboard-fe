<template>
  <div class="bg-gray-100 p-4 rounded-xl mb-10">
    <div class="relative">
      <div
        id="comment-input"
        placeholder="Write a comment…"
        class="comment-input rounded-lg border-0 bg-white border-white focus:border-0 focus:outline-0 p-3 pe-12"
        contentEditable="true"
        spellcheck="false"
        @keypress="handleComment"
        ref="editorRef"
      ></div>

      <button @click="commitComment" class="absolute top-3 right-2 cursor-pointer">
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

    <div v-for="(comment, index) in comments" :key="index" class="">
      <CommentComponent
        :content="comment?.content"
        :author="comment?.User?.username"
        :id="comment?.id"
        :ideaId="props?.ideaId"
        :createdAt="comment?.createdAt"
        :react="comment?.reaction"
      />
      <div
        v-for="(reply, index) in comment?.children"
        :key="index"
        class="ms-[3%] lg:ms-[5%] md:ms-[7%] sm:ms-[8%] xl:ms-[3.5%]"
      >
        <CommentComponent
          :content="reply?.content"
          :author="reply?.User?.username"
          :id="reply?.id"
          :ideaId="props?.ideaId"
          :createdAt="reply?.createdAt"
          :react="reply?.reaction"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import CommentComponent from '@/components/CommentComponent.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommentStore } from '@/stores/comment.store'

const commentStore = useCommentStore()
const { comments } = storeToRefs(commentStore)
const { addComment, getAllComments } = commentStore

const props = defineProps({
  ideaId: Number
})

 await getAllComments(props.ideaId)

const editorRef = ref()
const handleComment = (event) => {
  if (!event.ctrlKey || event.code !== 'Enter') return
  commitComment()
}

const commitComment = () => {
  addComment(props.ideaId, { content: editorRef.value.innerHTML })
  const comment = document.querySelector('#comment-input')
  comment.innerHTML = ''
}
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
