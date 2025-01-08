<template>
  <div v-if="myIdeas?.length === 0" class="mt-20">
    <NotFoundData />
  </div>
  <div v-if="myIdeas.length !== 0" class="w-full">
    <div v-for="idea in myIdeas" :key="idea?.id" class="w-full">
      <CardIdeaComponent
        :id="idea?.id"
        :author="idea?.User.username"
        :category="idea?.Category"
        :content="idea?.content"
        :title="idea?.title"
        :totalComment="idea?.commentCount"
        :totalVote="idea?.voteCount"
        :totalView="idea?.viewCount"
        :createdAt="idea?.createdAt"
        :isDraft="idea?.isDrafted"
        :isPublish="idea?.isPublished"
        :imageUrls="idea?.linkMedia"
        :avatar="idea?.User?.avatar"
        :voteStatus="idea?.vote"
      />
    </div>
    <InfiniteLoading @infinite="loadMore" />
  </div>
  <div
    v-if="myIdeas?.length !== 0"
    class="flex justify-center items-center gap-3 text-md text-gray-600 font-semibold border-t border-t-borderColor py-2 pt-5 mb-5"
  >
    <img src="/icons/png/folder.png" class="w-6" alt="" />
    No more ideas to show
  </div>
</template>
<script async setup>
import InfiniteLoading from 'v3-infinite-loading'
import { useProfileStore } from '@/stores/profile.store'
import { storeToRefs } from 'pinia'
// import { useSearchStore } from '@/stores/search.store'
import CardIdeaComponent from '../idea/CardIdeaComponent.vue'
import NotFoundData from '../notfound-data/NotFoundData.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profilePageStore = useProfileStore()
const { myIdeas } = storeToRefs(profilePageStore)
const { loadMore } = profilePageStore

await loadMore().catch((error) => {
  if (error.response.status === 401) {
    localStorage.clear()
    router.push({ name: 'sign-in' })
  }
})
</script>
<style scoped>
.spinner {
  display: none;
}
</style>
