<template>
  <div
    @click="viewDetailIdea(props.id)"
    :style="{ width: '400px', height: '145px' }"
    class="relative px-2 py-1 mt-3 mx-2 border border-borderColor rounded-lg overflow-hidden cursor-pointer hover:bg-slate-50 bg-backgroundColor"
  >
    <img src="/animations/fire.gif" class="absolute top-0 right-0 w-10 h-10" alt="Hot idea icon" />

    <!-- Flex container to place image on the left and text on the right -->
    <div class="flex">
      <!-- Display the first image with an indicator if there are multiple images -->
      <div
        :style="{
          position: 'relative',
          overflow: 'hidden',
          width: '150px',
          height: '100px'
        }"
        class="mr-4 rounded-lg border border-gray-400 bg-gray-200"
      >
        <div>
          <svg
            class="absolute inset-0 m-auto w-7 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 13h8v1.25H6V13Zm0-2.75h8V9H6v1.25Zm13-7.625v14.75A1.627 1.627 0 0 1 17.375 19H2.625A1.627 1.627 0 0 1 1 17.375V2.625A1.627 1.627 0 0 1 2.625 1h14.75A1.627 1.627 0 0 1 19 2.625Zm-1.25 0a.375.375 0 0 0-.375-.375H2.625a.375.375 0 0 0-.375.375v14.75a.375.375 0 0 0 .375.375h14.75a.375.375 0 0 0 .375-.375V2.625ZM6 6.25h8V5H6v1.25Z"
            ></path>
          </svg>
        </div>
        <div>
          <!-- Dispslay only the first image -->
          <img
            v-if="imagesArray.length > 0"
            class="relative z-10 inset-0 w-full h-full object-cover "
            :src="imagesArray[0]"
            :style="{
              width: '150px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '8px'
            }"
            @error="handleImageError"
          />
        </div>

        <!-- Image Indicator -->
        <!-- <div
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
          1 / {{ imagesArray.length }}
        </div> -->
      </div>

      <!-- Title and Content Section -->
      <div class="flex-1">
        <div class="title ms-1 me-3 overflow-hidden">
          <div
            class="font-bold text-xl text-primaryColor hover:text-blue-900 hover:underline cursor-pointer !line-clamp-1 text-left"
            v-html="props.title"
          ></div>
        </div>
        <div class="content mt-2 ms-1">
          <div class="content border-0 line-clamp-2">
            <div
              class="break-words line-clamp-2 text-sm text-left min-h-[40px]"
              data-gram="false"
              contenteditable="false"
              readonly="true"
              v-html="props.content"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Section with Author and Stats -->
    <div class="flex justify-between items-center text-[12px] pt-1 mx-2">
      <div class="flex justify-start items-center text-[12px]">
        <img :src="avatarURL" alt="avatar" class="w-[6%] aspect-square rounded-full" />
        <span class="ms-1 me-6 font-semibold text-xs">{{ props.author }}</span>
      </div>
      <div class="flex items-center gap-3 mt-1.5 text-[12px]">
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
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: String,
  content: String,
  author: String,
  id: Number,
  avatar: String,
  totalComment: Number,
  totalView: Number,
  totalVote: Number,
  imageUrls: String,
  thumbnailUrl: String
})

// Handle avatar URL
const avatarURL = props.avatar === '' ? 'avatar/default-avatar.jpg' : props.avatar

// Router for navigating to idea details
const router = useRouter()
const viewDetailIdea = (id) => {
  router.push({ name: 'detail-idea', params: { type: 'publish', id: id } })
}

// Split the image URLs into an array
// const imagesArray = computed(() => props.imageUrls.split(',').map((url) => url.trim()))

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

function handleImageError(event) {
  event.target.style.display = 'none'
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
</style>
