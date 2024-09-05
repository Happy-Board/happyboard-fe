<template>
  <div class="col-span-7 pt-[100px] bg-white px-5 min-h-screen overflow-hidden space-y-5 ms-5">
    <router-view></router-view>
  </div>
  <div class="col-span-3 pt-[85px] px-2 me-5">
    <Suspense>
      <div>
        <SuggestIdeaComponent
          feature="Recently ideas"
          :titleIdeas="titleIdea"
          :ideas="recentIdeas"
        />
      </div>
      <template #fallback>
        <SuggestIdeaSkeleton />
      </template>
    </Suspense>
    <Suspense>
      <ActivityHistory />
      <template #fallback>
        <SuggestIdeaSkeleton />
      </template>
    </Suspense>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useMyBoardStore } from '@/stores/my-board.store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ActivityHistory from '@/components/history-activities/ActivityHistory.vue'
import SuggestIdeaSkeleton from '@/components/skeletons/SuggestIdeaSkeleton.vue'
import SuggestIdeaComponent from '@/components/home/SuggestIdeaComponent.vue'
import { useHomePageStore } from '@/stores/home.store'

const router = useRouter()
const myBoardStore = useMyBoardStore()
const { tab } = storeToRefs(myBoardStore)
const homePageStore = useHomePageStore()
const { recentIdeas } = storeToRefs(homePageStore)
onMounted(() => {
  if (tab.value === 'activity-history') {
    router.push({ name: 'history', params: {} })
  }
})
</script>
<style scoped></style>
