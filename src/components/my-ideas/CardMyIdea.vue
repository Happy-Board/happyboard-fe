<template>
  <div class="idea-card grid grid-cols-9 pt-2 pb-1 border-t border-borderColor">
    <div class="col-span-9 flex overflow-hidden">
      <!-- Image Section on the Left -->
      <div
        :style="{
          position: 'relative',
          overflow: 'hidden',
          width: '150px',
          height: '100px',
          borderRadius: '8px',
          border: '1px solid gray'
        }"
        class="container-image"
      >
        <!-- Slideshow Container -->
        <div
          :style="{
            display: 'flex',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.7s ease'
          }"
        >
          <!-- Loop over images and display each image -->
          <div class="thumbnail-wrapper">
            <img
              v-for="(image, index) in imagesArray"
              :key="index"
              :src="image"
              alt="Idea Image"
              :style="{
                width: '100%' /* Làm cho ảnh chiếm đầy chiều rộng của div */,
                height: '100%' /* Làm cho ảnh chiếm đầy chiều cao của div */,
                objectFit:
                  'contain' /* Đảm bảo ảnh co lại mà không bị cắt, có thể có khoảng trống */
              }"
            />
            <!-- Biểu tượng "play" nếu là video -->
            <div v-if="thumbnailUrl" class="video-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="play-icon">
                <circle cx="12" cy="12" r="10" fill="rgba(0, 0, 0, 0.5)" />
                <polygon points="10,8 16,12 10,16" fill="#fff" />
              </svg>
            </div>
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
        <!-- Title Section, aligned at the top -->
        <div class="title-section flex justify-between mb-2">
          <div
            @click="viewDetailIdea()"
            class="title font-bold text-2xl text-primaryColor hover:text-secondaryColor hover:underline break-words cursor-pointer line-clamp-2"
          >
            {{ truncatedTitle }}
          </div>
          <div
            v-if="props.isDraft === true"
            class="bg-gray-600 px-2 rounded-lg text-[10px] h-fit font-bold text-white"
          >
            Draft
          </div>
          <div
            v-if="props.isPublish === true"
            class="bg-green-600 px-2 rounded-lg text-[10px] h-fit font-bold text-white"
          >
            Release
          </div>
          <div
            v-if="props.isPublish === false && props.isDraft === false"
            class="bg-yellow-600 px-2 rounded-lg text-[10px] h-fit font-bold text-white"
          >
            Pending
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
          <div class="stats flex items-center gap-3 text-[12px]">
            <div class="flex items-center font-medium text-gray-900">
              <span class="font-medium mr-0.5 text-sm">{{ props.totalComment }}</span>
              <i class="fa-regular fa-comment-dots"></i>
            </div>
            <div class="flex items-center font-medium text-primaryColor">
              <span class="font-medium mr-0.5 text-sm">{{ props.totalVote }}</span>
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="flex items-center font-medium text-secondaryColor">
              <span class="font-medium mr-0.5 text-sm">{{ props.totalView }}</span>
              <i class="fa-regular fa-eye"></i>
            </div>
          </div>

          <!-- Author, Category, Date Section aligned to the bottom right -->
          <div class="meta flex items-center text-[12px] justify-end">
            <!-- <img :src="avatarURL" alt="avatar" class="w-8 h-8 rounded-full cursor-pointer" /> -->
            <!-- <span class="ms-2 me-2 font-bold cursor-pointer">{{ props.author }}</span> -->

            <div class="flex items-center relative">
              <i :class="props?.category?.icon + ' fa-solid text-gray-700'"></i>
              <span class="ps-1">{{ props?.category?.title }}</span>
            </div>

            <div class="flex">
              <span class="ms-2 text-[12px]">{{ props.createdAt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal for Deletion Confirmation -->
  <ModalConfirmDelete
    v-if="visible"
    title="Confirm Action"
    maxWidth="sm"
    :visible="visible"
    @close="onToggle"
  >
    <p class="text-gray-800">Are you sure you want to delete this idea?</p>
    <div class="text-right mt-4">
      <button @click="onToggle" class="px-4 py-1 text-sm text-gray-600 hover:underline">
        Cancel
      </button>
      <button
        class="mr-2 px-4 py-1 text-sm rounded text-white bg-red-500 hover:bg-red-400"
        @click="handleDelete"
      >
        Yes
      </button>
    </div>
  </ModalConfirmDelete>
</template>
<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'
import ModalConfirmDelete from './ModalConfirmDelete.vue'
import { notify } from '@/utils/toast'
import { useMyBoardStore } from '@/stores/my-board.store'
import { useUserStore } from '@/stores/user.store'
import { defineProps, computed, ref, onMounted, onBeforeUnmount } from 'vue'

const myBoardStore = useMyBoardStore()
const userStore = useUserStore()
const { deleteIdea } = myBoardStore
const { getMyHistoryActivities } = userStore
const router = useRouter()
const props = defineProps({
  index: Number,
  id: String,
  author: String,
  title: String,
  content: String,
  category: Object,
  totalComment: Number,
  totalVote: Number,
  totalView: Number,
  description: String,
  createdAt: String,
  isPublish: Boolean,
  isDraft: Boolean,
  avatar: String,
  imageUrls: {
    type: String,
    default: 'https://res.cloudinary.com/daokqrkdk/image/upload/default-image_z4afoc.jpg' // Provide a default image URL if none is provided
  },
  thumbnailUrl: String
})

// const avatarURL = props.avatar === '' ? 'avatar/default-avatar.jpg' : props.avatar
let imagesArray = []
imagesArray = computed(() => {
  const defaultImageUrl =
    'https://res.cloudinary.com/daokqrkdk/image/upload/default-image_z4afoc.jpg'

  // Kiểm tra nếu có `thumbnailUrl` (video)
  if (props.thumbnailUrl) {
    return [props.thumbnailUrl] // Trả về thumbnail vì đó là video
  }

  // Nếu không có thumbnail, xử lý như danh sách ảnh
  if (props.imageUrls && props.imageUrls.trim()) {
    return props.imageUrls.split(',').map((url) => url.trim()) // Tách và trả về danh sách ảnh
  }

  // Nếu không có `imageUrls`, kiểm tra nội dung hoặc trả về ảnh mặc định
  if (props.content) {
    const match = props.content.match(/<img[^>]*src="([^"]+)"/)
    return [match ? match[1] : defaultImageUrl]
  }

  return [defaultImageUrl] // Trả về ảnh mặc định nếu không có gì
})

const currentIndex = ref(0)

let intervalId

const startSlideshow = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % imagesArray.value.length
  }, 3000)
}

onMounted(() => {
  startSlideshow()
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const truncatedTitle = computed(() => {
  const maxTitleLength = 60
  return props.title.length > maxTitleLength
    ? props.title.slice(0, maxTitleLength) + '...'
    : props.title
})

const truncatedContent = computed(() => {
  const maxContentLength = 100
  return props.title.length > maxContentLength
    ? props.title.slice(0, maxContentLength) + '...'
    : props.title
})

const visible = ref(false)

const handleEdit = () => {
  router.push({ name: 'edit', params: { type: props.isDraft ? 'draft' : 'pending', id: props.id } })
}

const onToggle = () => {
  visible.value = !visible.value
}

const handleDelete = () => {
  onToggle()

  deleteIdea(props.id, props.index)
    .then(() => {
      getMyHistoryActivities()
      notify('success', 'Idea deleted successfully')
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear()
        router.push({ name: 'sign-in' })
      }
    })
}
const viewDetailIdea = () => {
  if (props.isDraft === true) {
    router.push({ name: 'edit', params: { type: 'draft', id: props.id } })
  } else if (props.isPublish === true) {
    router.push({ name: 'detail-idea', params: { type: 'publish', id: props.id } })
  } else {
    router.push({ name: 'detail-idea', params: { type: 'pending', id: props.id } })
  }
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

.thumbnail-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.video-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; /* Không ảnh hưởng tới thao tác chuột */
}

.play-icon {
  width: 64px;
  height: 64px;
}
</style>
