<template>
  <NotFoundData v-if="myIdeas?.length === 0" />
  <div v-if="myIdeas.length !== 0" class="w-full">
    <div v-for="idea in myIdeas" :key="idea?.id" class="w-full">
      <CardMyIdea
        :id="idea.id"
        :author="idea.User.username"
        :category="idea.Category"
        :description="idea.content"
        :title="idea.title"
        :totalComment="idea.commentCount"
        :totalVote="idea.voteCount"
        :totalView="idea.viewCount"
        :updatedAt="idea.updatedAt"
        :isDraft="idea.isDrafted"
        :isPublish="idea.isPublished"
        :avatar="idea.User.avatar"
      />
    </div>
    <InfiniteLoading @infinite="loadMore" />
  </div>
  <div v-if="myIdeas?.length !== 0"
    class="flex justify-center items-center gap-3 text-md text-gray-600 font-semibold mt-5 bg-backgroundColor py-2 mb-5"
  >
  <img src="/icons/png/folder.png" class="w-6" alt="">
    No more ideas to show
  </div>
</template>
<script async setup>
import InfiniteLoading from 'v3-infinite-loading'
import { useMyBoardStore } from '@/stores/my-board.store'
import { storeToRefs } from 'pinia'
// import { useSearchStore } from '@/stores/search.store'
import CardMyIdea from './CardMyIdea.vue'
import NotFoundData from '../notfound-data/NotFoundData.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const myBoardStore = useMyBoardStore()
const { myIdeas } = storeToRefs(myBoardStore)
const { loadMore } = myBoardStore

await loadMore().catch((error) => {
  if (error.response.status === 401) {
    router.push({ name: 'sign-in' })
  }
})
</script>
<style scoped>
.spinner {
  display: none;
}
</style>
