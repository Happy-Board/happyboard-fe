<template>
  <div class="flex flex-col border-borderColor pb-2">
    <!-- Pending Notification -->
    <div v-if="typeIdea === 'pending'" class="pending-notification">
      <i class="fa-solid fa-clock text-yellow-500 text-2xl mr-2"></i>
      <span class="text-yellow-700 font-semibold">This idea is currently under review.</span>
    </div>
    <!-- Avatar, Username, Category, and Created Date -->
    <div class="flex items-center mb-3">
      <img
        :src="
          idea?.User?.avatar === ''
            ? 'https://res.cloudinary.com/daokqrkdk/image/upload/v1730884402/default-avatar_shzypu.jpg'
            : idea?.User?.avatar
        "
        alt="avatar"
        class="w-10 h-10 rounded-full cursor-pointer mr-2"
      />
      <span class="text-sm font-semibold cursor-pointer">{{ idea?.User?.username }}</span>
      <div class="flex gap-3 items-center ml-4 text-gray-600 text-sm">
        <div class="flex items-center">
          <i :class="idea?.Category?.icon + ' fa-solid text-gray-700'"></i>
          <span class="ml-1">{{ idea?.Category?.title }}</span>
        </div>
        <div>
          <span>{{ idea?.createdAt }}</span>
        </div>
      </div>
    </div>

    <!-- Title -->
    <div class="text-3xl font-bold overflow-hidden break-words mb-3" v-html="idea?.title"></div>

    <!-- Content or Image Display -->
    <div class="ql-toolbar ql-snow border-0 pb-5 border-b h-auto">
      <div
        v-if="idea?.content && !idea?.thumbnailUrl"
        class="ql-editor"
        data-gram="false"
        contenteditable="false"
        readonly="true"
        v-html="idea?.content"
      ></div>

      <video
        v-if="idea?.thumbnailUrl"
        controls
        :src="idea?.linkMedia"
        style="max-width: 100%"
      ></video>

      <div v-if="!idea?.content && !idea?.thumbnailUrl" class="image-container bg-gray-700">
        <button
          v-if="imagesArray?.length > 1 && currentIndex > 0"
          @click="prevImage"
          class="arrow-button left-arrow"
        >
          <i class="fas fa-arrow-left"></i>
        </button>

        <!-- <div class='img-display-container' @click=> -->

        <img
          v-if="currentImage"
          :src="currentImage"
          alt="idea image"
          class="image"
          @click="openLightBox"
        />
        <!-- </div> -->

        <button
          v-if="imagesArray?.length > 1 && currentIndex < imagesArray?.length - 1"
          @click="nextImage"
          class="arrow-button right-arrow"
        >
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <div v-if="idea.poll">
      <PollVoteComponent
        :options="idea?.poll?.options"
        :responses="idea?.poll?.responses"
        :userId="idea?.userId"
        :pollId="idea?.poll.id"
        :endDate="idea?.poll?.endDate"
      />
    </div>

    <!-- Action Buttons -->
    <div v-if="typeIdea !== 'pending'" class="flex gap-4 mt-3 action-bar">
      <div
        class="action-container"
        :class="{
          'action-container-color-up': vote === 'up',
          'action-container-color-down': vote === 'down'
        }"
      >
        <div
          class="arrow-container upvote-container"
          :class="{
            'active-background-up': vote === 'up'
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5"
            :class="{
              'hover-color-up': vote === 'up'
            }"
            @click="toggleUpvote"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.682l1.318-1.364a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </div>

        <span class="action-count">{{ idea.voteCount !== 0 ? idea.voteCount : 'Vote' }}</span>

        <div
          class="arrow-container downvote-container"
          :class="{
            'active-background-down': vote === 'down'
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5"
            :class="{
              'hover-color-down': vote === 'down'
            }"
            @click="toggleDownvote"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.66l-1.06-1.05a5.5 5.5 0 00-7.78 7.78l1.08 1.08L12 21.5l7.78-7.78 1.08-1.08a5.5 5.5 0 000-7.78z"
            />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.5l3 3-3 3 3 3" />
          </svg>
        </div>
      </div>
      <!-- Comment Count -->
      <button class="flex items-center p-2">
        <i class="fa-regular fa-comment-dots mr-2"></i>
        <span class="action-count">{{
          idea.commentCount > 0 ? idea.commentCount : 'Comment'
        }}</span>
      </button>

      <!-- View Count -->
      <button class="">
        <i class="fa-regular fa-eye mr-2"></i>
        <span class="action-count"> {{ idea.viewCount }} views</span>
      </button>
    </div>

    <!-- Lightbox Component -->
    <VueEasyLightbox
      style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9999"
      :visible="showLightBox"
      :imgs="imagesArray"
      :index="currentIndex"
      @hide="closeLightBox"
    />
  </div>
</template>

<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useIdeaStore } from '@/stores/idea.store'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { faArrowUp, faArrowDown, faComment } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import VueEasyLightbox from 'vue-easy-lightbox'
import { nextTick } from 'vue'
import PollVoteComponent from '../../components/idea/PollVoteComponent.vue'

library.add(faArrowUp, faArrowDown, faComment)

const route = useRoute()
const router = useRouter()
const ideaStore = useIdeaStore()
const ideaId = route.params.id
const typeIdea = route.params.type
const { idea } = storeToRefs(ideaStore)

const {
  getDetailIdea,
  increaseVote,
  decreaseVote,
  cancelVote,
  getRelatedIdeas,
  getDetailPendingIdea
} = ideaStore

if (typeIdea === 'pending') {
  await getDetailPendingIdea(ideaId)
}
if (typeIdea === 'publish') {
  await getDetailIdea(ideaId)
}

await getRelatedIdeas(ideaId).catch((error) => {
  if (error.response.status === 401) {
    localStorage.clear()
    router.push({ name: 'sign-in' })
  }
})

const isVotingAllowed = ref(true)
const debounceTime = 2000
const vote = ref(idea.value?.vote)

const toggleUpvote = () => {
  if (!isVotingAllowed.value) return

  if (vote.value === 'up') {
    // If already upvoted, clicking will cancel the upvote
    cancelVote(ideaId)
    vote.value = null // Clear the vote
  } else if (vote.value === 'down') {
    cancelVote(ideaId)
    vote.value = null
  } else {
    // Set vote to up
    increaseVote(ideaId)
    vote.value = 'up'
  }

  // Prevent rapid multiple votes
  isVotingAllowed.value = false
  setTimeout(() => {
    isVotingAllowed.value = true
  }, debounceTime)
}

const toggleDownvote = () => {
  if (!isVotingAllowed.value) return

  if (vote.value === 'down') {
    // If already downvoted, clicking will cancel the downvote
    cancelVote(ideaId)
    vote.value = null // Clear the vote
  } else if (vote.value === 'up') {
    cancelVote(ideaId)
    vote.value = null
  } else {
    // Set vote to down
    decreaseVote(ideaId)
    vote.value = 'down'
  }

  // Prevent rapid multiple votes
  isVotingAllowed.value = false
  setTimeout(() => {
    isVotingAllowed.value = true
  }, debounceTime)
}
const currentIndex = ref(0)

// const imagesArray = computed(() =>
//   idea.value.linkMedia
//     ? idea.value.linkMedia.includes(',')
//       ? idea.value.linkMedia.split(',').map((url) => url.trim())
//       : [idea.value.linkMedia]
//     : null
// )

const imagesArray = computed(() => {
  if (!idea?.linkMedia) return null
  return idea.linkMedia.includes(',')
    ? idea.linkMedia.split(',').map((url) => url?.trim())
    : [idea.linkMedia]
})

const currentImage = computed(() => {
  if (!Array.isArray(imagesArray?.value) || imagesArray.value.length === 0) {
    return null
  }
  return imagesArray.value[currentIndex.value] || null
})

const showLightBox = ref(false)

const openLightBox = async () => {
  await nextTick()
  showLightBox.value = true
}

const closeLightBox = () => {
  showLightBox.value = false
}

const nextImage = () => {
  if (currentIndex.value < imagesArray.value.length - 1) {
    ++currentIndex.value
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    --currentIndex.value
  }
}
</script>

<style scoped>
.image-container {
  /* width: 100%; */
  /* height: 100%; */
  width: 841.4px;
  height: 340px;
  position: relative;
  overflow: 'hidden';
  /* background: rgba(0, 0, 0, 0.5); */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  /* overflow: hidden; */
  /* border: '1px solid gray'; */
}

.image {
  max-width: 60%;
  max-height: 100%;
  object-fit: contain;
}

.image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0);
  color: black;
  border: none;
  padding: 12px;
  cursor: pointer;
  border-radius: 50%;
  outline: none;
  transition: background 0.8s ease;
}

.arrow-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.fa-arrow-left:before {
  content: '\f053';
  font-size: 24px;
}

.fa-arrow-right:before {
  content: '\f054';
  font-size: 24px;
}

.left-arrow {
  left: 15px;
}

.right-arrow {
  right: 15px;
}

.ql-toolbar {
  border: 0 !important;
}

.comment-input[contentEditable='true']:empty:before {
  content: attr(placeholder);
  color: gray;
  cursor: text;
}

.ql-editor {
  padding: 12px 0px;
}
.ql-toolbar.ql-snow {
  padding: 0 !important;
}

.action-container {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgb(239 241 243 / var(--tw-bg-opacity));
  border-radius: 20px;
  padding: 3px 9px;
}

.arrow-container {
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active-background-up {
  background-color: #d0e3ff;
}
.active-background-down {
  background-color: #ffe3e0;
}

.action-container-color-up {
  background-color: #7193ff;
}

.action-container-color-down {
  background-color: #ff4500;
}

.vote-icon {
  cursor: pointer;
  font-size: 18px;
  color: black;
}

.action-count {
  font-size: 16px;
}

.upvote-icon:hover {
  color: #7193ff;
}

.hover-color-up {
  color: #8b71ff;
}

.downvote-icon:hover {
  color: #ff0000;
}

.hover-color-down {
  color: #ff0000;
}

.content {
  /* Điều chỉnh chiều cao tối đa và cuộn nếu content quá dài */
  max-height: 400px;
  overflow-y: auto;

  /* Tự động điều chỉnh padding khi content ngắn */
  padding: 16px;
  margin-bottom: 8px;
}

.pending-notification {
  background-color: #fff4e5;
  border: 1px solid #ffe3b3;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
