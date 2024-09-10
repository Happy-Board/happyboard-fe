<template>
  <div>
    <div class="">
      <div>
        <div id="comment-block" class="comment-level-1 mt-5 flex items-start gap-1 min-w-[50%]">
          <img
            :src="props.avatar === '' ? '../../avatar/default-avatar.jpg' : props.avatar"
            alt="avatar"
            class="w-[3%] aspect-square rounded-full cursor-pointer lg:w-[5%] md:w-[7%] sm:w-[8%] xl:w-[3.5%]"
          />
          <div>
            <div class="relative">
              <div
                class="comment-input rounded-lg border-0 bg-white border-white focus:border-0 focus:outline-0 px-4 py-2 w-fit break-words max-w-[650px]"
                contentEditable="false"
                spellcheck="false"
                v-html="`<div><strong>${props.author}</strong><br>${props.content}`"
              ></div>
              <!-- <div class="absolute top-0 -right-10">
                <OptionComponent target="comment" :target-id="`${props.id}`" @edit="handleEditComment" />
              </div> -->
            </div>
            <div class="flex gap-1 mt-1 text-xs">
              <span
                @mouseover="handleShowReactions"
                @mouseleave="handleCloseReactions"
                class="font-medium text-gray-600 cursor-pointer mx-1 hover:text-gray-800 hover:underline relative"
                ><span v-if="props.react === null" @click="handleCreateReaction('like')">
                  Like
                </span>
                <img
                  v-else
                  @click="cancelReaction(props?.id, props?.ideaId)"
                  :src="`/icons/png/${props?.react}.png`"
                  class="size-4"
                  alt="" />
                <ReactionComponent
                  v-if="isShowReactions"
                  @mouseleave="closeReactions"
                  @mouseover="setKeepShowReactions(true)"
                  :currentReact="props?.react"
                  @reaction="handleCreateReaction"
                  @cancelReaction="cancelReaction(props?.id, props?.ideaId)"
              /></span>

              <span
                @click="handleOpenReply"
                class="font-medium text-gray-600 cursor-pointer mx-1 hover:text-gray-800 hover:underline"
                >Reply</span
              >
              <span class="font-medium text-gray-600 text-[12px] mx-1">{{ props.updatedAt }}</span>
            </div>
            <div v-if="isOpenReply" class="comment-level-1 mt-5 flex items-start gap-1">
              <img
                :src="profile.avatar || '../../avatar/default-avatar.jpg'"
                alt="avatar"
                class="w-[3%] lg:w-[5%] md:w-[7%] sm:w-[8%] xl:w-[3.5%] aspect-square rounded-full cursor-pointer"
              />
              <div class="w-full">
                <div class="relative input-box">
                  <div
                    :placeholder="'Reply to ' + props.author"
                    class="comment-input rounded-lg border-0 bg-white border-white focus:border-0 focus:outline-0 py-1 px-3 pe-11 w-full"
                    contentEditable="true"
                    spellcheck="false"
                   
                    @keyup.enter="commitComment"
                    ref="editorRef"
                  ></div>
                  <span
                    @click="commitComment"
                    class="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                  >
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
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useCommentStore } from '@/stores/comment.store'
import ReactionComponent from './ReactionComponent.vue'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import { useIdeaStore } from '@/stores/idea.store'
// import OptionComponent from './OptionComponent.vue'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)
const { increaseComment } = useIdeaStore()
const commentStore = useCommentStore()
const { addComment, createReaction, cancelReaction } = commentStore
const props = defineProps({
  ideaId: Number,
  id: Number,
  content: String,
  author: String,
  updatedAt: String,
  react: String,
  avatar: String
})
const editorRef = ref()
const isShowReactions = ref(false)
const keepReactionsDisplay = ref(false)

// const handleComment = (event) => {
//   if (!event.ctrlKey || event.code !== 'Enter') return
//   commitComment(event)
// }

// const handleEditComment = () => {
//   //handleEditComment
// }

const commitComment = (event) => {
  if (event.target.closest('.input-box').querySelector('.comment-input').innerHTML === '') return
  const content = `<div><strong>@${props.author}</strong> ${event.target.closest('.input-box').querySelector('.comment-input').innerHTML}`
  addComment(props.ideaId, { content: content, parentId: props.id })
  increaseComment()
  event.target.closest('.input-box').querySelector('.comment-input').innerHTML = ''
  handleCloseReply()
}
const isOpenReply = ref(false)

const handleOpenReply = () => {
  isOpenReply.value = true
}

const handleCloseReply = () => {
  isOpenReply.value = false
}
const handleShowReactions = () => {
  isShowReactions.value = true
}
const handleCloseReactions = () => {
  setTimeout(() => {
    if (!keepReactionsDisplay.value) {
      isShowReactions.value = false
    }
  }, 200)
}
const setKeepShowReactions = (value) => {
  keepReactionsDisplay.value = value
}

const closeReactions = () => {
  setKeepShowReactions(false)
  handleCloseReactions()
}

const handleCreateReaction = (reaction) => {
  createReaction(props.id, { reaction: reaction }, props.ideaId)
}
</script>
<style scoped>
.comment-input[contentEditable='true']:empty:before {
  content: attr(placeholder);
  color: gray;
  cursor: text;
  font-size: small;
}
</style>
