<template>
  <div class="comment-card border border-borderColor rounded-lg p-4">
    <!-- Header Section -->
    <div class="header flex justify-between items-center">
      <div class="author-info flex items-center">
        <img :src="avatarURL" alt="avatar" class="w-10 h-10 rounded-full mr-3" />
        <div>
          <h3 class="font-bold text-lg">{{ ideaAuthor }}</h3>
          <h3
            class="idea-title text-lg text-gray-600 cursor-pointer"
            @click="viewDetailIdea(props.ideaId, 'publish')"
          >
            {{ ideaTitle }}
          </h3>
        </div>
      </div>
    </div>
    <!-- Comment Header -->
    <div class="header text-gray-600 text-sm font-semibold mb-2">
      <span class="font-bold text-black"> {{ author }} </span> commented {{ updatedAt }}
    </div>

    <!-- Content Section -->
    <div
      class="content text-gray-800 text-lg mb-1 cursor-pointer"
      v-html="commentContent"
      @click="viewDetailIdea(props.ideaId, 'publish', props.commentId)"
    ></div>

    <!-- Footer Actions -->
    <!-- <div class="footer flex items-center gap-6 text-gray-600">
      
      <button class="flex items-center text-gray-700 hover:text-primaryColor" @click="onUpvote">
        <i class="fa-regular fa-thumbs-up mr-2"></i>
        <span>{{ upvotes }}</span>
      </button>

      <button class="flex items-center text-gray-700 hover:text-secondaryColor" @click="onDownvote">
        <i class="fa-regular fa-thumbs-down mr-2"></i>
        <span>{{ downvotes }}</span>
      </button>
    </div> -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps, ref } from 'vue'

const router = useRouter()
const props = defineProps({
  commentId: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/100' // Default avatar
  },
  author: {
    type: String,
    required: true
  },
  ideaTitle: {
    type: String,
    required: true
  },
  ideaId: {
    type: String,
    required: true
  },
  commentContent: {
    type: String,
    required: true
  },
  initialUpvotes: {
    type: Number,
    default: 0
  },
  initialDownvotes: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: String
  },
  ideaAuthor: {
    type: String
  }
})

// const upvotes = ref(props.initialUpvotes)
// const downvotes = ref(props.initialDownvotes)

// const onUpvote = () => {
//   upvotes.value += 1
// }

// const onDownvote = () => {
//   downvotes.value += 1
// }

const viewDetailIdea = (id, type, commentId = null) => {
  const params = { id, type }
  if (commentId) params.commentId = commentId
  router.push({ name: 'detail-idea', params })
}

const avatarURL = ref(props.avatar)
</script>

<style scoped>
.comment-card {
  transition: box-shadow 0.3s ease-in-out;
}

.comment-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.idea-title {
  transition:
    color 0.3s ease-in-out,
    text-decoration 0.3s ease-in-out;
}

.idea-title:hover {
  color: #1d4ed8; /* Màu xanh */
  text-decoration: underline;
}
</style>
