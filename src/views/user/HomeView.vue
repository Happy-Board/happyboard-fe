<template>
  <div class="col-span-7 pt-[75px] bg-white px-5 min-h-screen ms-5">
    <div>
      <Suspense>
        <HotIdea />
        <template #fallback>
          <HotIdeaSkeleton />
        </template>
      </Suspense>
    </div>
    <div class="flex-1">
      <FilterComponent />
      <Suspense>
        <ListIdea />

        <template #fallback>
          <ListIdeaSkeleton />
        </template>
      </Suspense>
    </div>
  </div>

  <div class="col-span-3 px-2 me-5">
    <div class="mt-[86px] sticky top-[86px]">
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
        <div>
          <ActivityHistory />
        </div>
        <template #fallback>
          <SuggestIdeaSkeleton />
        </template>
      </Suspense>

      <!-- <SuggestIdeaComponent feature="History activity" :ideas="titleIdea" /> -->
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
import SuggestIdeaSkeleton from '@/components/skeletons/SuggestIdeaSkeleton.vue'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'
import ListIdeaSkeleton from '@/components/skeletons/ListIdeaSkeleton.vue'
import HotIdeaSkeleton from '@/components/skeletons/HotIdeaSkeleton.vue'
import ActivityHistory from '@/components/history-activities/ActivityHistory.vue'
import FilterComponent from '@/components/home/FilterComponent.vue'
const HotIdea = defineAsyncComponent(() => import('@/components/hot-ideas/HotIdea.vue'))
const SuggestIdeaComponent = defineAsyncComponent(
  () => import('@/components/home/SuggestIdeaComponent.vue')
)
const ListIdea = defineAsyncComponent(() => import('@/components/home/ListIdea.vue'))

const homePageStore = useHomePageStore()
const { recentIdeas } = storeToRefs(homePageStore)
</script>
<style>
.container.spinner {
  margin: 10px !important;
  border: blue !important;
}
</style>
