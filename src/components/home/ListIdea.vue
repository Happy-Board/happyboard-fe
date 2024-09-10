<template>
  <!-- <div v-if="searchResults.length !== 0" class="w-full">
    <div v-for="idea in searchResults.ideas" :key="idea.id" class="w-full">
      <CartIdeaComponent
        :id="idea.id"
        :author="idea.User.username"
        :category="idea.Category"
        :description="idea.content"
        :title="idea.title"
        :totalComment="idea.commentCount"
        :totalVote="idea.voteCount"
        :totalView="idea.viewCount"
        :createdAt="idea.createdAt"
      />
    </div>
    <InfiniteLoading @infinite="loadMore" />
  </div> -->
  <NotFoundData v-if="pageData.length === 0" />
  <div class="w-full">
    <div v-for="idea in pageData" :key="idea?.id" class="w-full">
      <CartIdeaComponent
        :id="idea.id"
        :author="idea.User.username"
        :category="idea?.Category"
        :description="idea.content"
        :title="idea.title"
        :totalComment="idea.commentCount"
        :totalVote="idea.voteCount"
        :totalView="idea.viewCount"
        :createdAt="idea.createdAt"
        :isDraft="idea.isDrafted"
        :avatar="idea.User.avatar"
      />
    </div>
    <InfiniteLoading @infinite="loadMore" />
  </div>
  <div
    v-if="pageData?.length !== 0"
    class="flex justify-center items-center gap-3 text-md text-gray-600 font-semibold border-t border-t-borderColor py-2 pt-5 mb-5"
  >
    <img src="/icons/png/folder.png" class="w-5" alt="" />
    No more ideas to show
  </div>
</template>
<script async setup>
import InfiniteLoading from 'v3-infinite-loading'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'
// import { useSearchStore } from '@/stores/search.store'
import CartIdeaComponent from '../idea/CardIdeaComponent.vue'
import NotFoundData from '../notfound-data/NotFoundData.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// const searchStore = useSearchStore()
// const { searchResults } = storeToRefs(searchStore)
const homePageStore = useHomePageStore()
const { pageData } = storeToRefs(homePageStore)
const { loadMore } = homePageStore

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
