<template>
  <div v-if="searchResults.length !== 0" class="w-full">
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
  </div>
  <div v-else class="w-full">
    <div v-for="idea in pageData" :key="idea?.id" class="w-full">
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
  </div>
</template>
<script async setup>
import InfiniteLoading from 'v3-infinite-loading'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/search.store'
import CartIdeaComponent from './CartIdeaComponent.vue'

const searchStore = useSearchStore()
const { searchResults } = storeToRefs(searchStore)
const homePageStore = useHomePageStore()
const { pageData } = storeToRefs(homePageStore)
const { loadMore } = homePageStore

await loadMore()

</script>
<style scoped>
.spinner{
  display: none
}
</style>
