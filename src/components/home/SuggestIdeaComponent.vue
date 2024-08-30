<template>
  <div class="w-full bg-white p-2 px-4 rounded-lg mb-2 border border-borderColor mx-auto">
    <div class="flex justify-between border-b border-b-borderColor mb-3 items-end">
      <span class="font-semibold text-[18px]">{{ props.feature }}</span>
      <!-- <span class="hover:underline text-sm"><a href="" class="">Sea all</a></span> -->
    </div>
    <div
      class="my-2 grid grid-cols-10 devide-y gap-1 text-primaryColor text-sm cursor-pointer font-medium hover:underline hover:text-secondaryColor hover:font-semibold"
      v-for="(idea, index) in props.ideas"
      :key="index"
      @click="viewDetailIdea(idea.id)"
    >
      <div class="col-span-1"><i :class="idea?.Category?.icon + ' fa-solid text-black'"></i></div>
      <div class="col-span-9 break-words line-clamp-1">{{ idea.title }}</div>
    </div>
    <div v-if="ideas?.length === 0" class="flex flex-col justify-center items-center gap-1 text-gray-400 pb-5">
      <i class="fa-regular fa-newspaper fa-5x"></i>
      <div
          class="table text-center"
        >
        <p v-if="props.feature === 'Recently ideas'" class="font-bold text-gray-400 text-sm table-cell align-middle">You haven't seen any ideas recently!</p>
        <p v-if="props.feature === 'Related ideas'" class="font-bold text-gray-400 text-sm table-cell align-middle">No ideas related to this idea</p>
      </div>
    </div>
  </div>
</template>
<script async setup>
import { useRouter } from 'vue-router'
import { useIdeaStore } from '@/stores/idea.store'
import { useHomePageStore } from '@/stores/home.store'
import { useCommentStore } from '@/stores/comment.store'

const homePageStore = useHomePageStore()
const commentStore = useCommentStore()
const { getRecentIdeas } = homePageStore
const ideaStore = useIdeaStore()
const { getDetailIdea, getRelatedIdeas } = ideaStore

const props = defineProps({
  feature: String,
  ideas: Array
})

const {  getAllComments } = commentStore
const router = useRouter()
const viewDetailIdea = (id) => {
  router.push({ name: 'detail-idea', params: { type: 'publish', id: id } })
  getDetailIdea(id)
  getAllComments(id)
  getRelatedIdeas(id)
}

await getRecentIdeas()
</script>
