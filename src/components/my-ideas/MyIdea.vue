<template>
  <TabIdea />
  <div v-if="tab === 'all'">
    <Suspense>
      <ListMyIdea :tab="tab" />
      <template #fallback>
        <ListIdeaSkeleton />
      </template>
    </Suspense>
  </div>
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
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
const ListMyIdea = defineAsyncComponent(() => import('@/components/my-ideas/ListMyIdea.vue'))
import ListIdeaSkeleton from '@/components/skeletons/ListIdeaSkeleton.vue'
//   import HistoryActivitySkeleton from '@/components/Skeletons/HistoryActivitySkeleton.vue'
//   import CardProfile from '@/components/CardProfile.vue'
import { useMyBoardStore } from '@/stores/my-board.store'
import { storeToRefs } from 'pinia'
import TabIdea from './TabIdea.vue'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()

const { getMyHistoryActivities } = userStore
const myBoardStore = useMyBoardStore()
const { tab } = storeToRefs(myBoardStore)
getMyHistoryActivities()
</script>
<style scoped></style>
