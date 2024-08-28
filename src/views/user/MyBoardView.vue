<template>
  <div class="col-span-7 pt-[100px] bg-white px-5 min-h-screen overflow-hidden space-y-5 ms-5">
    <router-view></router-view>
  </div>
  <div class="col-span-3 pt-[100px] px-2 me-5">
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
import ActivityHistory from '@/components/my-ideas/ActivityHistory.vue'
import SuggestIdeaSkeleton from '@/components/skeletons/SuggestIdeaSkeleton.vue'

const router = useRouter()
const myBoardStore = useMyBoardStore()
const { tab } = storeToRefs(myBoardStore)
onMounted(() => {
  if (tab.value === 'activity-history') {
    router.push({ name: 'history', params: {} })
  }
})
</script>
<style scoped></style>
