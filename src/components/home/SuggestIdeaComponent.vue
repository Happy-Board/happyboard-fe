<template>
  <div
    class="hidden md:block w-full p-2 px-4 rounded-lg mb-2 border border-borderColor mx-auto bg-backgroundColor"
  >
    <div class="flex justify-between border-b border-b-borderColor mb-3 items-end">
      <span class="font-semibold text-[18px]">{{ props.feature }}</span>
    </div>

    <div
      v-for="(idea, index) in props.ideas"
      :key="index"
      @click="viewDetailIdea(idea.id)"
      class="my-2 flex items-center justify-between p-2 rounded hover:bg-gray-100 border-b border-gray-300"
    >
      <!-- Left side with icon, title, and meta information -->
      <div class="flex flex-col flex-grow pr-4">
        <div class="flex items-center">
          <i :class="idea?.Category?.icon + ' fa-solid text-black mr-2'"></i>
          <!-- Add `cursor-pointer` and `hover:underline` to the title span -->
          <span
            class="font-medium text-primaryColor text-sm cursor-pointer hover:underline"
            :title="truncatedTitleArray[index]"
            @click.stop="viewDetailIdea(idea.id)"
          >
            {{ truncatedTitleArray[index] }}
          </span>
        </div>
        <div class="text-xs text-gray-500 mt-1">
          <span>{{ idea.voteCount }} {{ idea.voteCount !== 1 ? 'votes' : 'vote' }} </span>
          &bull;
          <span
            >{{ idea.commentCount }} {{ idea.commentCount !== 1 ? 'comments' : 'comment' }}</span
          >
        </div>
      </div>

      <!-- Right side with image -->
      <div
        class="w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-gray-200 relative"
      >
        <div v-if="!imagesArray[index]">
          <svg
            class="absolute inset-0 m-auto w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 13h8v1.25H6V13Zm0-2.75h8V9H6v1.25Zm13-7.625v14.75A1.627 1.627 0 0 1 17.375 19H2.625A1.627 1.627 0 0 1 1 17.375V2.625A1.627 1.627 0 0 1 2.625 1h14.75A1.627 1.627 0 0 1 19 2.625Zm-1.25 0a.375.375 0 0 0-.375-.375H2.625a.375.375 0 0 0-.375.375v14.75a.375.375 0 0 0 .375.375h14.75a.375.375 0 0 0 .375-.375V2.625ZM6 6.25h8V5H6v1.25Z"
            ></path>
          </svg>
        </div>
        <!-- Image -->
        <img
          :src="imagesArray[index]"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />

        <div v-if="imagesArray[index]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 50 50"
            class="absolute bottom-1 right-1 z-10 w-7 h-7 bg-gray-200 px-1 py-1 rounded-full bg-opacity-80 text-white"
          >
            <path
              d="M 14 4 C 8.4886661 4 4 8.4886661 4 14 L 4 36 C 4 41.511334 8.4886661 46 14 46 L 36 46 C 41.511334 46 46 41.511334 46 36 L 46 14 C 46 8.4886661 41.511334 4 36 4 L 14 4 z M 14 6 L 36 6 C 40.430666 6 44 9.5693339 44 14 L 44 36 C 44 40.430666 40.430666 44 36 44 L 14 44 C 9.5693339 44 6 40.430666 6 36 L 6 14 C 6 9.5693339 9.5693339 6 14 6 z M 21.132812 12 C 20.079884 12 19.101556 12.55485 18.560547 13.457031 L 16.724609 16.513672 C 16.542289 16.815645 16.218154 17 15.867188 17 L 11 17 C 9.9069372 17 9 17.906937 9 19 L 9 35 C 9 36.093063 9.9069372 37 11 37 L 39 37 C 40.093063 37 41 36.093063 41 35 L 41 19 C 41 17.906937 40.093063 17 39 17 L 34.132812 17 C 33.779742 17 33.456382 16.817444 33.275391 16.515625 A 1.0001 1.0001 0 0 0 33.275391 16.513672 L 31.439453 13.457031 C 30.898444 12.55485 29.919615 12 28.867188 12 L 21.132812 12 z M 12 14 C 11.448 14 11 14.448 11 15 L 11 16 L 15 16 L 15 15 C 15 14.448 14.552 14 14 14 L 12 14 z M 21.132812 14 L 28.867188 14 C 29.21876 14 29.543618 14.182556 29.724609 14.484375 A 1.0001 1.0001 0 0 0 29.724609 14.486328 L 31.558594 17.542969 C 32.099603 18.445103 33.079884 19 34.132812 19 L 39 19 L 39 35 L 11 35 L 11 19 L 15.867188 19 C 16.919615 19 17.897599 18.446016 18.439453 17.544922 A 1.0001 1.0001 0 0 0 18.441406 17.542969 L 20.275391 14.486328 A 1.0001 1.0001 0 0 0 20.275391 14.484375 C 20.456335 14.18265 20.779742 14 21.132812 14 z M 25 20 C 21.145849 20 18 23.145852 18 27 C 18 30.854148 21.145849 34 25 34 C 28.854151 34 32 30.854148 32 27 C 32 23.145852 28.854151 20 25 20 z M 34 20 A 1 1 0 0 0 34 22 A 1 1 0 0 0 34 20 z M 25 22 C 27.773271 22 30 24.226731 30 27 C 30 29.773269 27.773271 32 25 32 C 22.226729 32 20 29.773269 20 27 C 20 24.226731 22.226729 22 25 22 z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <div
      v-if="props.ideas.length === 0"
      class="flex flex-col justify-center items-center gap-1 text-gray-400 pb-5"
    >
      <i class="fa-regular fa-newspaper fa-3x"></i>
      <div class="text-center">
        <p v-if="props.feature === 'Recently ideas'" class="font-bold text-gray-400 text-sm">
          You haven't seen any ideas recently!
        </p>
        <p v-if="props.feature === 'Related ideas'" class="font-bold text-gray-400 text-sm">
          No ideas related to this idea
        </p>
      </div>
    </div>
  </div>
</template>

<script async setup>
import { useRouter } from 'vue-router'
import { useIdeaStore } from '@/stores/idea.store'
import { useHomePageStore } from '@/stores/home.store'
import { useCommentStore } from '@/stores/comment.store'
import { computed } from 'vue'

const homePageStore = useHomePageStore()
const commentStore = useCommentStore()
const { getRecentIdeas } = homePageStore
const ideaStore = useIdeaStore()
const { getDetailIdea, getRelatedIdeas } = ideaStore
const { getAllComments } = commentStore

const props = defineProps({
  feature: String,
  ideas: Array
})

let imagesArray = computed(() => {
  return props.ideas.map((idea) => {
    const defaultImageUrl = ''
    if (idea.thumbnailUrl) {
      return idea.thumbnailUrl
    }

    if (idea.linkMedia && idea.linkMedia.trim()) {
      return idea.linkMedia ? idea.linkMedia.split(',')[0] : defaultImageUrl
    }

    if (idea.content) {
      const match = idea.content.match(/<img[^>]*src="([^"]+)"/)
      return match ? match[1] : defaultImageUrl
    }
  })
})

function handleImageError(event) {
  event.target.style.display = 'none'
}

// const imageUrls = computed(() => {
//   return props.ideas.map((idea) => {
//     const firstImage = idea.linkMedia
//       ? idea.linkMedia.split(',')[0]
//       : 'https://res.cloudinary.com/daokqrkdk/image/upload/v1730017098/default-image_z4afoc.jpg'
//     return firstImage
//   })
// })

const truncatedTitleArray = computed(() => {
  return props.ideas.map((idea) => {
    const title = idea.title
    const maxTitleLength = 23
    return title.length > maxTitleLength ? title.slice(0, maxTitleLength) + '...' : title
  })
})

const router = useRouter()
const viewDetailIdea = (id) => {
  router.push({ name: 'detail-idea', params: { type: 'publish', id } })
  getDetailIdea(id)
  getAllComments(id)
  getRelatedIdeas(id)
}

await getRecentIdeas()
</script>

<style scoped>
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.bg-backgroundColor {
  --tw-bg-opacity: 1;
  background-color: rgb(239 241 243 / var(--tw-bg-opacity));
}
</style>
