<template>
  <NotFoundData v-if="myIdeas?.length === 0" />
  <div v-if="myIdeas.length !== 0" class="w-full">
    <div v-for="idea in myIdeas" :key="idea?.id" class="w-full">
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
        :isDraft="idea.isDrafted"
      />
    </div>
    <InfiniteLoading @infinite="loadMore" />
  </div>
</template>
<script async setup>
import InfiniteLoading from 'v3-infinite-loading'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
// import { useSearchStore } from '@/stores/search.store'
import CartIdeaComponent from './CartIdeaComponent.vue'
import NotFoundData from './NotFoundData.vue'

// const searchStore = useSearchStore()
// const { searchResults } = storeToRefs(searchStore)
const userStore = useUserStore()
const { myIdeas } = storeToRefs(userStore)
const { getMyPublishIdeas, getMyDraftIdeas, getMyHideIdeas } = userStore

const props = defineProps({
  tab: String
})

if (props.tab === 'publish') {
  await getMyPublishIdeas()
}
if (props.tab === 'hide') {
  await getMyHideIdeas()
}
if (props.tab === 'draft') {
  await getMyDraftIdeas()
}
</script>
<style scoped>
.spinner {
  display: none;
}
</style>
