<template>
  <div class="col-span-5 pt-[75px] z-0 bg-white px-8 border w-full min-h-screen">
    <div class="mb-2 min-h-[136px]">
      <Suspense>
        <HotIdea />
        <template #fallback>
          <HotIdeaSkeleton />
        </template>
      </Suspense>
    </div>
    <div class="flex-1">
      <div class="min-w-full flex mb-2 justify-end items-end">
        <div class="px-1.5 py-1 border border-gray-400 rounded-md flex items-center">
          <button
            @click="setTab('newest')"
            type="button"
            :class="
              tab === 'newest'
                ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
            "
          >
            Newest
          </button>
          <button
            @click="setTab('highvote')"
            type="button"
            :class="
              tab === 'highvote'
                ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
            "
          >
            Highest vote
          </button>
          <button
            @click="setTab('highview')"
            type="button"
            :class="
              tab === 'highview'
                ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
            "
          >
            Most view
          </button>
          <button
            @click="setTab('highcomment')"
            type="button"
            :class="
              tab === 'highcomment'
                ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
            "
          >
            Most comment
          </button>
        </div>
      </div>
      <Suspense>
        <ListIdea />

        <template #fallback>
          <ListIdeaSkeleton />
        </template>
      </Suspense>
    </div>
  </div>

  <div class="col-span-3">
    <div class="col-span-3 mt-[95px] ms-14">
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

      <!-- <SuggestIdeaComponent feature="History activity" :ideas="titleIdea" /> -->
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
import SuggestIdeaSkeleton from '@/components/Skeletons/SuggestIdeaSkeleton.vue'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'
import ListIdeaSkeleton from '@/components/Skeletons/ListIdeaSkeleton.vue'
import HotIdeaSkeleton from '@/components/Skeletons/HotIdeaSkeleton.vue'
const HotIdea = defineAsyncComponent(() => import('@/components/HotIdea.vue'))
const SuggestIdeaComponent = defineAsyncComponent(
  () => import('@/components/SuggestIdeaComponent.vue')
)
const ListIdea = defineAsyncComponent(() => import('@/components/ListIdea.vue'))

const homePageStore = useHomePageStore()
const { tab, recentIdeas } = storeToRefs(homePageStore)
const { setTab } = homePageStore


</script>
<style>
.container.spinner {
  margin: 10px !important;
  border: blue !important;
}
</style>
