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
      <div v-if="imageUrls[index]" class="w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg">
        <img :src="imageUrls[index]" alt="Idea image" class="w-full h-full object-cover" />
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

const imageUrls = computed(() => {
  return props.ideas.map((idea) => {
    const firstImage = idea.linkMedia
      ? idea.linkMedia.split(',')[0]
      : 'https://res.cloudinary.com/daokqrkdk/image/upload/v1730017098/default-image_z4afoc.jpg'
    return firstImage
  })
})

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
