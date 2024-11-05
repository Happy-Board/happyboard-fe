<template>
  <div class="idea-card grid grid-cols-9 pt-2 pb-1 border-t border-borderColor">
    <div class="col-span-9 flex overflow-hidden">
      <!-- Image Section on the Left -->
      <div
        :style="{
          position: 'relative',
          overflow: 'hidden',
          width: '150px',
          height: '100px'
        }"
        @click="showLightbox = true"
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
          <img
            v-for="(image, index) in imagesArray"
            :key="index"
            :src="image"
            alt="Idea Image"
            :style="{
              width: '150px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '8px'
            }"
          />
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
            zIndex: '1'
          }"
        >
          {{ currentIndex + 1 }} / {{ imagesArray.length }}
        </div>
      </div>

      <!-- Content Section on the Right -->
      <div class="w-4/5 flex flex-col justify-between pl-5">
        <!-- Title Section, aligned at the top -->
        <div class="title-section mb-2">
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
            <img :src="avatarURL" alt="avatar" class="w-8 h-8 rounded-full cursor-pointer" />
            <span class="ms-2 me-2 font-bold cursor-pointer">{{ props.author }}</span>

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
import { defineProps, computed, ref, onMounted, onBeforeUnmount } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

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
  createdAt: String,
  isPublish: Boolean,
  isDraft: Boolean,
  avatar: String,
  imageUrls: {
    type: String,
    default: 'https://res.cloudinary.com/daokqrkdk/image/upload/default-image_z4afoc.jpg' // Provide a default image URL if none is provided
  }
})

// Split the image URLs into an array
const imagesArray = computed(() => props.imageUrls.split(',').map((url) => url.trim()))

// Track the index of the currently displayed image
const currentIndex = ref(0)
const showLightbox = ref(false)

// Function to update the image index every 3 seconds
let intervalId

const startSlideshow = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % imagesArray.value.length
  }, 3000) // 3000ms = 3 seconds
}

// Start the slideshow on component mount and clean up on unmount
onMounted(() => {
  startSlideshow()
})


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
  return props.title.length > maxContentLength
    ? props.title.slice(0, maxContentLength) + '...'
    : props.title
})
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
</style>
