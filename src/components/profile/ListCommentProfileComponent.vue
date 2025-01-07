<template>
  <div v-if="!myComments?.length" class="mt-20">
    <NotFoundData />
  </div>
  <div v-if="myComments?.length" class="w-full">
    <div v-for="comment in myComments" :key="comment?.id" class="w-full">
      <CardCommentProfileComponent
        :commentId="comment.id"
        :author="comment.User.username"
        :commentContent="comment.content"
        :createdAt="comment.createdAt"
        :updatedAt="comment.updatedAt"
        :avatar="comment.User.avatar"
        :ideaTitle="comment.Idea.title"
        :ideaAuthor="comment.ideaAuthor[0].username"
        :ideaId="comment.Idea.id"
      />
    </div>
    <InfiniteLoading @infinite="loadMore" />
  </div>
  <div
    v-if="myComments?.length !== 0"
    class="flex justify-center items-center gap-3 text-md text-gray-600 font-semibold border-t border-t-borderColor py-2 pt-5 mb-5"
  >
    <img src="/icons/png/folder.png" class="w-6" alt="" />
    No more comments to show
  </div>
</template>
<script async setup>
import InfiniteLoading from 'v3-infinite-loading'
import { useProfileStore } from '@/stores/profile.store'
import { storeToRefs } from 'pinia'
// import { useSearchStore } from '@/stores/search.store'
import CardCommentProfileComponent from '../profile/CardCommentProfileComponent.vue'
import NotFoundData from '../notfound-data/NotFoundData.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profilePageStore = useProfileStore()
const { myComments, tab } = storeToRefs(profilePageStore)
const { loadMore } = profilePageStore

if (tab.value === 'Comments') {
  await loadMore().catch((error) => {
    if (error.response.status === 401) {
      localStorage.clear()
      router.push({ name: 'sign-in' })
    }
  })
}
</script>
<style scoped>
.spinner {
  display: none;
}
</style>
