<template>
   
      <div v-if="tab === 'publish'">
        <Suspense>
          <ListMyIdea :tab="tab" />
          <template #fallback>
            <ListIdeaSkeleton />
          </template>
        </Suspense>
      </div>
      <div v-if="tab === 'hide'">
        <Suspense>
          <ListMyIdea :tab="tab" />
          <template #fallback>
            <ListIdeaSkeleton />
          </template>
        </Suspense>
      </div>
      <div v-if="tab === 'draft'">
        <Suspense>
          <ListMyIdea :tab="tab" />
          <template #fallback>
            <ListIdeaSkeleton />
          </template>
        </Suspense>
      </div>
      <!-- <div v-if="tab === 'my-actions'">
        <Suspense>
          <ListHistory />
          <template #fallback>
            <HistoryActivitySkeleton />
          </template>
        </Suspense>
      </div>
      <div v-if="tab === 'my-credential'">
        <CardProfile />
      </div> -->


  </template>
  <script setup>
  import { defineAsyncComponent } from 'vue'
  const ListMyIdea = defineAsyncComponent(() => import('@/components/ListMyIdea.vue'))
  import ListIdeaSkeleton from '@/components/Skeletons/ListIdeaSkeleton.vue'
//   import HistoryActivitySkeleton from '@/components/Skeletons/HistoryActivitySkeleton.vue'
//   import CardProfile from '@/components/CardProfile.vue'
  import { useMyBoardStore } from '@/stores/my-board.store'
  import { storeToRefs } from 'pinia'
//   import ListHistory from '@/components/ListHistory.vue'
  
  const myBoardStore = useMyBoardStore()
  const { tab } = storeToRefs(myBoardStore)
  </script>
  <style scoped></style>
  