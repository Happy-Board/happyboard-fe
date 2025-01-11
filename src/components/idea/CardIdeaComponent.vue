<template>
  <div class="idea-card grid grid-cols-9 pt-2 pb-1 border-t border-borderColor">
    <div class="col-span-9 flex overflow-hidden">
      <!-- Image Section on the Left -->
      <div
        class="relative w-[150px] h-[100px] overflow-hidden rounded-lg border border-gray-400 bg-gray-200"
      >
        <svg
          class="absolute inset-0 m-auto w-7 h- text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 13h8v1.25H6V13Zm0-2.75h8V9H6v1.25Zm13-7.625v14.75A1.627 1.627 0 0 1 17.375 19H2.625A1.627 1.627 0 0 1 1 17.375V2.625A1.627 1.627 0 0 1 2.625 1h14.75A1.627 1.627 0 0 1 19 2.625Zm-1.25 0a.375.375 0 0 0-.375-.375H2.625a.375.375 0 0 0-.375.375v14.75a.375.375 0 0 0 .375.375h14.75a.375.375 0 0 0 .375-.375V2.625ZM6 6.25h8V5H6v1.25Z"
          ></path>
        </svg>
        <!-- Slideshow Images -->
        <div
          v-if="imagesArray.length > 0"
          class="relative w-full h-full"
          :style="{
            display: 'flex',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.7s ease'
          }"
        >
          <img
            v-for="(image, index) in imagesArray"
            :key="index"
            :src="image"
            class="absolute inset-0 w-full h-full object-cover"
            style="font-size: 0"
            @error="handleImageError"
          />

          <div v-if="props.thumbnailUrl" class="video-overlay">
            <svg
              class="bg-gray-200 rounded-full px-1 w-8 h-8 bg-opacity-80"
              id="Video_File_24"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <rect width="24" height="24" stroke="none" fill="#000000" opacity="0" />

              <g transform="matrix(0.36 0 0 0.36 12 12)">
                <path
                  style="
                    stroke: none;
                    stroke-width: 1;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-dashoffset: 0;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 4;
                    fill: rgb(0, 0, 0);
                    fill-rule: nonzero;
                    opacity: 1;
                  "
                  transform=" translate(-33, -32)"
                  d="M 23.65625 4 C 22.320313 4 21.0625 4.519531 20.121094 5.464844 L 11.464844 14.121094 C 10.519531 15.066406 10 16.320313 10 17.65625 L 10 57 C 10 58.652344 11.347656 60 13 60 L 53 60 C 54.652344 60 56 58.652344 56 57 L 56 7 C 56 5.347656 54.652344 4 53 4 Z M 24 6 L 53 6 C 53.550781 6 54 6.449219 54 7 L 54 57 C 54 57.550781 53.550781 58 53 58 L 13 58 C 12.449219 58 12 57.550781 12 57 L 12 18 L 21 18 C 22.652344 18 24 16.652344 24 15 Z M 22 6.5 L 22 15 C 22 15.550781 21.550781 16 21 16 L 12.5 16 C 12.613281 15.835938 12.738281 15.675781 12.878906 15.535156 L 21.535156 6.878906 C 21.679688 6.734375 21.835938 6.609375 22 6.5 Z M 28.023438 21.816406 C 27.671875 21.808594 27.316406 21.890625 26.996094 22.0625 C 26.355469 22.417969 25.964844 23.085938 25.964844 23.816406 L 25.964844 42.183594 C 25.964844 42.910156 26.355469 43.582031 26.996094 43.933594 C 27.296875 44.097656 27.632813 44.183594 27.964844 44.183594 C 28.335938 44.183594 28.707031 44.078125 29.03125 43.871094 L 43.53125 34.6875 C 44.113281 34.320313 44.464844 33.6875 44.464844 33 C 44.464844 32.308594 44.113281 31.679688 43.53125 31.3125 L 29.03125 22.125 C 28.722656 21.933594 28.375 21.828125 28.023438 21.816406 Z M 27.964844 23.816406 L 42.464844 33 L 27.964844 42.1875 Z M 15 52 C 14.449219 52 14 52.449219 14 53 L 14 55 C 14 55.550781 14.449219 56 15 56 C 15.550781 56 16 55.550781 16 55 L 16 53 C 16 52.449219 15.550781 52 15 52 Z M 20 52 C 19.449219 52 19 52.449219 19 53 L 19 55 C 19 55.550781 19.449219 56 20 56 C 20.550781 56 21 55.550781 21 55 L 21 53 C 21 52.449219 20.550781 52 20 52 Z M 25 52 C 24.449219 52 24 52.449219 24 53 L 24 55 C 24 55.550781 24.449219 56 25 56 C 25.550781 56 26 55.550781 26 55 L 26 53 C 26 52.449219 25.550781 52 25 52 Z M 30 52 C 29.449219 52 29 52.449219 29 53 L 29 55 C 29 55.550781 29.449219 56 30 56 C 30.550781 56 31 55.550781 31 55 L 31 53 C 31 52.449219 30.550781 52 30 52 Z M 35 52 C 34.449219 52 34 52.449219 34 53 L 34 55 C 34 55.550781 34.449219 56 35 56 C 35.550781 56 36 55.550781 36 55 L 36 53 C 36 52.449219 35.550781 52 35 52 Z M 40 52 C 39.449219 52 39 52.449219 39 53 L 39 55 C 39 55.550781 39.449219 56 40 56 C 40.550781 56 41 55.550781 41 55 L 41 53 C 41 52.449219 40.550781 52 40 52 Z M 45 52 C 44.449219 52 44 52.449219 44 53 L 44 55 C 44 55.550781 44.449219 56 45 56 C 45.550781 56 46 55.550781 46 55 L 46 53 C 46 52.449219 45.550781 52 45 52 Z M 50 52 C 49.449219 52 49 52.449219 49 53 L 49 55 C 49 55.550781 49.449219 56 50 56 C 50.550781 56 51 55.550781 51 55 L 51 53 C 51 52.449219 50.550781 52 50 52 Z"
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </div>
        </div>

        <!-- Image Indicator -->
        <div
          v-if="imagesArray.length > 1"
          :style="{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            zIndex: '1' /* Ensures the indicator is on top */
          }"
        >
          {{ currentIndex + 1 }} / {{ imagesArray.length }}
        </div>
      </div>

      <!-- Content Section on the Right -->
      <div class="w-4/5 flex flex-col justify-between pl-5">
        <!-- Author, Category, Date Section aligned to the bottom right -->
        <div class="meta flex items-center text-[12px] justify-start">
          <img :src="avatarURL" alt="avatar" class="w-6 h-6 rounded-full cursor-pointer" />
          <span class="ms-2 me-2 font-bold cursor-pointer">{{ props.author }}</span>
          <div class="flex items-center relative">
            <i :class="props?.category?.icon + ' fa-solid text-gray-700'"></i>
            <span class="ps-1">{{ props?.category?.title }}</span>
          </div>

          <div class="flex">
            <span class="ms-2 text-[12px]">{{ props.createdAt }}</span>
          </div>
        </div>
        <!-- Title Section, aligned at the top -->
        <div class="title-section">
          <div
            @click="viewDetailIdea(props.id, 'publish')"
            class="title font-bold text-2xl text-primaryColor hover:text-secondaryColor hover:underline break-words cursor-pointer line-clamp-2"
          >
            {{ truncatedTitle }}
          </div>
        </div>

        <!-- Stats and Description Section -->
        <div class="content-section flex-grow border-0 break-words">
          <div
            class="idea-content text-xl text-gray-600"
            :style="{ fontSize: '16px', textAlign: 'left' }"
            v-html="truncatedContent"
          ></div>
        </div>

        <!-- Footer Section aligned to the bottom-right -->
        <div class="footer-section flex justify-between items-center">
          <!-- Stats Section -->
          <div class="footer-section flex justify-between items-center">
            <!-- Expand button -->
            <button
              class="flex items-center gap-1 font-medium hover:text-blue-700 mr-2 bg-gray-200 hover:bg-gray-300 bg-opacity-50 px-2 py-2 rounded-full"
              @click="toggleExpandedContentSection"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
              >
                <path
                  d="M3 21L21 3M3 21H9M3 21L3 15M21 3H15M21 3V9"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <!-- Action Buttons -->
            <div class="actions flex items-center gap-3 text-sm">
              <div
                class="flex items-center gap-2 bg-gray-200 bg-opacity-50 px-2 py-1 rounded-full"
                :class="{
                  'action-container-color-up': voteStatus === 'up',
                  'action-container-color-down': voteStatus === 'down'
                }"
              >
                <!-- Upvote Button -->
                <button class="flex items-center gap-1 font-medium hover:text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6"
                    @click="toggleUpvote"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.682l1.318-1.364a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                    />
                  </svg>
                </button>

                <!-- Vote Count -->
                <span class="text-sm black">{{ totalVote }}</span>

                <!-- Downvote Button -->
                <button class="flex items-center gap-2 hover:text-red-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5"
                    @click="toggleDownvote"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.66l-1.06-1.05a5.5 5.5 0 00-7.78 7.78l1.08 1.08L12 21.5l7.78-7.78 1.08-1.08a5.5 5.5 0 000-7.78z"
                    />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.5l3 3-3 3 3 3" />
                  </svg>
                </button>
              </div>

              <!-- Comment Button -->
              <button
                class="flex items-center text-sm hover:bg-gray-200 px-2 py-1.5 rounded-full hover:bg-opacity-50"
                @click="onComment"
              >
                <span>{{ props.totalComment }} comments</span>
              </button>
              <span class="text-sm">{{ props.totalView }} views</span>
              <!-- <div class="relative">
                <button
                  class="flex items-center text-sm hover:bg-gray-200 px-2 py-2 rounded-full hover:bg-opacity-50"
                  @click="toggleDropdown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12h12M6 6h12M6 18h12"
                    />
                  </svg>
                </button>
                <ul
                  v-if="isDropdownOpen"
                  class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-300 z-10"
                >
                  <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">Hide</li>
                  <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800">Delete</li>
                </ul>
              </div> -->
            </div>
            <!-- Expanded Content Section -->
          </div>
        </div>
        <div v-if="isExpandedContentSection">
          <div v-if="isVideoUrl(props.imageUrls)">
            <video :src="props.imageUrls" controls class="w-full h-auto"></video>
          </div>
          <div v-if="props.content" class="mt-4 text-gray-800">
            <div v-html="props.content"></div>
          </div>
          <div v-else v-html="createImageElements(imagesArray)"></div>
        </div>
      </div>
    </div>

    <!-- Lightbox Component -->
    <VueEasyLightbox
      :visible="showLightbox"
      :imgs="imagesArray"
      :index="currentIndex"
      @hide="showLightbox = false"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps, computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { useIdeaStore } from '@/stores/idea.store'

const router = useRouter()
const ideaStore = useIdeaStore()
const { increaseVote, decreaseVote, cancelVote } = ideaStore
const isVotingAllowed = ref(true)
const debounceTime = 2000

const props = defineProps({
  index: Number,
  id: String,
  author: String,
  title: String,
  content: String,
  category: Object,
  totalComment: Number,
  totalVote: Number,
  voteStatus: String,
  totalView: Number,
  createdAt: String,
  isPublish: Boolean,
  isDraft: Boolean,
  avatar: String,
  imageUrls: {
    type: String
  },
  thumbnailUrl: String
})

const totalVote = ref(props.totalVote)
const voteStatus = ref(props.voteStatus)
const totalView = ref(props.totalView)

let imagesArray = []

imagesArray = computed(() => {
  const defaultImageUrl = ''
  if (props.thumbnailUrl) {
    return [props.thumbnailUrl]
  }

  if (props.imageUrls && props.imageUrls.trim()) {
    return props.imageUrls.split(',').map((url) => url.trim())
  }

  if (props.content) {
    const match = props.content.match(/<img[^>]*src="([^"]+)"/)
    return [match ? match[1] : defaultImageUrl]
  }

  return [defaultImageUrl]
})

const currentIndex = ref(0)
const showLightbox = ref(false)
const isExpandedContentSection = ref(false)

// toggle expand content
const toggleExpandedContentSection = () => {
  isExpandedContentSection.value = !isExpandedContentSection.value
}

const isVideoUrl = (url) => {
  const videoExtensions = ['.mp4', '.webm', '.ogg']
  return videoExtensions.some((extension) => url?.toLowerCase().endsWith(extension))
}

const isImageUrl = (url) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']
  return imageExtensions.some((extension) => url?.toLowerCase().endsWith(extension))
}

const createImageElements = (urlsArr) => {
  return urlsArr
    .filter((url) => isImageUrl(url))
    .map((url) => `<img src="${url}" alt="image" style="width:100%; height:auto;" />`)
    .join('')
}

function handleImageError(event) {
  event.target.style.display = 'none'
}

let intervalId = null

const startSlideshow = () => {
  if (!imagesArray.value || imagesArray.value.length === 0) {
    console.error('Images array is empty')
    return
  }
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value) % imagesArray.value.length
  }, 3000)
}

// Start the slideshow on component mount and clean up on unmount
onMounted(() => {
  console.log("imagesArray.value: ", imagesArray.value)
  startSlideshow()
})

// watch(imagesArray, (newArray) => {
//   if (newArray && newArray.length > 0) {
//     startSlideshow()
//   }
// })

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const avatarURL = computed(() => {
  return props.avatar && props.avatar !== '' ? props.avatar : 'avatar/default-avatar.jpg'
})

const viewDetailIdea = (id, type) => {
  router.push({ name: 'detail-idea', params: { type, id } })
}

const truncatedTitle = computed(() => {
  const maxTitleLength = 40
  return props.title.length > maxTitleLength
    ? props.title.slice(0, maxTitleLength) + '...'
    : props.title
})

const truncatedContent = computed(() => {
  const maxContentLength = 100
  return props.content?.length > maxContentLength
    ? props.content?.slice(0, maxContentLength) + '...'
    : props.content
})

const toggleUpvote = () => {
  console.log('toggleVote: ', voteStatus.value)
  if (!isVotingAllowed.value) return

  if (voteStatus.value === 'up') {
    // If already upvoted, clicking will cancel the upvote
    cancelVote(props.id)
    --totalVote.value
    voteStatus.value = null // Clear the vote
  } else if (voteStatus.value === 'down') {
    cancelVote(props.id)
    ++totalVote.value
    voteStatus.value = null
  } else {
    // Set vote to up
    increaseVote(props.id)
    ++totalVote.value
    voteStatus.value = 'up'
  }

  // Prevent rapid multiple votes
  isVotingAllowed.value = false
  setTimeout(() => {
    isVotingAllowed.value = true
  }, debounceTime)
}

const toggleDownvote = () => {
  if (!isVotingAllowed.value) return

  if (voteStatus.value === 'down') {
    // If already downvoted, clicking will cancel the downvote
    cancelVote(props.id)
    ++totalVote.value
    voteStatus.value = null // Clear the vote
  } else if (voteStatus.value === 'up') {
    cancelVote(props.id)
    voteStatus.value = null
    --totalVote.value
  } else {
    // Set vote to down
    decreaseVote(props.id)
    voteStatus.value = 'down'
    --totalVote.value
  }

  // Prevent rapid multiple votes
  isVotingAllowed.value = false
  setTimeout(() => {
    isVotingAllowed.value = true
  }, debounceTime)
}
</script>

<style scoped>
.ql-toolbar {
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

.ql-editor {
  padding: 0 !important;
}

.grid {
  display: grid;
  gap: 1px;
}

.w-full {
  max-width: 150px; /* Đặt kích thước tối đa cho khung hình ảnh */
}
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.object-cover {
  object-fit: cover;
}
.rounded-lg {
  border-radius: 8px;
}

.slideshow-image {
  width: 150px;
  height: 100px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.video-overlay {
  position: absolute;
  top: 80%;
  left: 85%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.play-icon {
  width: 64px;
  height: 64px;
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

.upvote-icon:hover {
  color: #7193ff;
}

.hover-color-up {
  color: #8b71ff;
}

.downvote-icon:hover {
  color: #ff0000;
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
</style>
