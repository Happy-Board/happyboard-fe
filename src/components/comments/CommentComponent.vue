<template>
  <div>
    <div class="">
      <div>
        <div
          :id="`comment-${props.id}`"
          class="comment-level-1 mt-5 flex items-start gap-1 min-w-[50%]"
        >
          <img
            :src="props.avatar === '' ? '../../avatar/default-avatar.jpg' : props.avatar"
            alt="avatar"
            class="w-[3%] aspect-square rounded-full cursor-pointer lg:w-[5%] md:w-[7%] sm:w-[8%] xl:w-[3.5%]"
          />
          <div>
            <div class="relative">
              <!-- Display Content -->
              <div
                v-if="globalEditingId !== props.id"
                class="comment-input rounded-lg border-0 bg-white border-white focus:border-0 focus:outline-0 px-4 py-2 w-fit break-words max-w-[650px]"
                contentEditable="false"
                spellcheck="false"
              >
                <strong>{{ props.author }}</strong
                ><br />
                <span v-html="props.content"></span>
              </div>

              <!-- Editing Content -->
              <div v-else>
                <div>
                  <strong>{{ props.author }}</strong
                  ><br />
                </div>
                <textarea
                  class="comment-input rounded-lg border-0 bg-white border-white focus:border-0 focus:outline-0 px-4 py-2 w-fit break-words max-w-[650px]"
                  v-model.trim="editedComment"
                  rows="4"
                ></textarea>
                <div class="flex gap-2 mt-2">
                  <button
                    @click="handleCancelEdit"
                    class="bg-gray-300 hover:bg-red-500 text-white px-4 py-2 rounded-2xl text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleSaveEdit"
                    class="bg-primaryColor hover:bg-secondaryColor text-white px-4 py-2 rounded-2xl text-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div class="flex gap-1 mt-1 text-xs">
              <span
                @mouseover="handleShowReactions"
                @mouseleave="handleCloseReactions"
                class="font-medium text-gray-600 cursor-pointer mx-1 hover:text-gray-800 hover:underline relative p-1"
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
                class="font-medium text-gray-600 cursor-pointer mx-1 hover:text-gray-800 hover:underline p-1"
                >Reply</span
              >
              <span class="font-medium text-gray-600 text-[12px] mx-1 p-1">{{
                props.updatedAt
              }}</span>
              <!-- Action Menu -->
              <div class="action-menu relative" ref="menuContainer">
                <span
                  v-if="isCommentOwner"
                  class="menu-toggle fas fa-ellipsis-h font-medium text-gray-600 cursor-pointer mx-1 hover:text-gray-800 hover:bg-gray-200 p-1 rounded-2xl text-base"
                  @click="toggleActionMenu(props.id)"
                ></span>
                <div
                  v-if="openedMenuId === props.id"
                  class="absolute -right-24 -top-16 w-24 bg-white border border-gray-200 rounded shadow-lg z-10"
                >
                  <ul class="py-1">
                    <li
                      @click="handleOpenEdit"
                      class="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded cursor-pointer"
                    >
                      Edit
                    </li>
                    <li
                      @click="handleDelete"
                      class="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded cursor-pointer"
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              </div>
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
import { ref, onBeforeUnmount, onMounted, computed } from 'vue'
import { useCommentStore } from '@/stores/comment.store'
import ReactionComponent from './ReactionComponent.vue'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import { useIdeaStore } from '@/stores/idea.store'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()
const { profile } = storeToRefs(userStore)
const { increaseComment, decreaseComment } = useIdeaStore()
const commentStore = useCommentStore()
const { addComment, createReaction, cancelReaction, editComment, deleteComment } = commentStore
const props = defineProps({
  ideaId: Number,
  id: Number,
  content: String,
  author: String,
  updatedAt: String,
  react: String,
  avatar: String,
  userId: Number
})
const editorRef = ref(null)
const isShowReactions = ref(false)
const keepReactionsDisplay = ref(false)
const isEditing = ref(false)
const isOpenReply = ref(false)
const openedMenuId = ref(null)
const menuContainer = ref(null)
const globalEditingId = ref(null)
const isReply = ref(false)

const commitComment = (event) => {
  let contentElement = event.target.closest('.input-box').querySelector('.comment-input')

  if (!contentElement) {
    console.log('Input element not found')
    return
  }

  let content = contentElement.innerHTML.replace(/(?:&nbsp;|\s)+/g, ' ').trim()

  if (content === '') {
    console.log('Content is empty after trimming spaces')
    return
  }

  content = `<div><strong>@${props.author}</strong> ${content}</div>`

  addComment(props.ideaId, { content: content, parentId: props.id })
  increaseComment()

  contentElement.innerHTML = ''

  handleCloseReply()
}

const extractTextContent = (content) => {
  isReply.value = content.includes('@')
  content = content.replace(/<strong>.*?<\/strong>/gi, '')
  const tempElement = document.createElement('div')
  tempElement.innerHTML = content
  return tempElement.textContent || tempElement.innerText || ''
}
const editedComment = ref(extractTextContent(props.content))

const toggleActionMenu = (commentId) => {
  if (openedMenuId.value === commentId) {
    openedMenuId.value = null
  } else {
    if (globalEditingId.value !== null) {
      globalEditingId.value = null
      isEditing.value = false
    }
    openedMenuId.value = commentId
  }
}

const handleClickOutside = (event) => {
  if (menuContainer.value && !menuContainer.value.contains(event.target)) {
    openedMenuId.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

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

const handleOpenEdit = () => {
  if (globalEditingId.value === props.id) {
    globalEditingId.value = null
    isEditing.value = false
  } else {
    globalEditingId.value = null
    isEditing.value = false

    globalEditingId.value = props.id
    isEditing.value = true
  }
  openedMenuId.value = null
}

const handleCancelEdit = () => {
  globalEditingId.value = null
  isEditing.value = false
  editedComment.value = props.content
}

const handleSaveEdit = () => {
  console.log('isReply: ', isReply.value)
  if (isReply.value) {
    const content = `<div><strong>@${props.author}</strong>${editedComment.value}</div>`
    editComment(props.id, props.ideaId, { content: content })
  } else {
    editComment(props.id, props.ideaId, { content: editedComment.value })
  }
  isEditing.value = false
  globalEditingId.value = null
}

const handleDelete = () => {
  deleteComment(props.id, props.ideaId)
  decreaseComment()
  isEditing.value = false
  globalEditingId.value = null
}

const isCommentOwner = computed(() => {
  return profile.value.id === props.userId
})

onMounted(() => {
  const commentId = route.params.commentId; // Lấy từ params
  if (commentId) {
    const commentElement = document.getElementById(`comment-${commentId}`);
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
})
</script>
<style scoped>
.comment-input[contentEditable='true']:empty:before {
  content: attr(placeholder);
  color: gray;
  cursor: text;
  font-size: small;
}
</style>
