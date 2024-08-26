<template>
  <div class="col-span-7 pt-[75px] z-0 bg-white px-8 w-full min-h-screen ms-5">
    <div>
      <Suspense>
        <HotIdea />
        <template #fallback>
          <HotIdeaSkeleton />
        </template>
      </Suspense>
    </div>
    <div class="flex-1 mx-2">
      <div class="min-w-full flex mb-2 justify-start items-end mt-3">
        <div class="px-1.5 py-1 border border-gray-400 rounded-md flex items-center">
          <button
            @click="setTab('newest')"
            type="button"
            :class="
              tab === 'newest'
                ? 'text-gray-900 bg-backgroundButtonColor focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
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
                ? 'text-gray-900 bg-backgroundButtonColor focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
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
                ? 'text-gray-900 bg-backgroundButtonColor focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
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
                ? 'text-gray-900 bg-backgroundButtonColor focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
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
    <div class=" mt-[90px] ">
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
import SuggestIdeaSkeleton from '@/components/skeletons/SuggestIdeaSkeleton.vue'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'
import ListIdeaSkeleton from '@/components/skeletons/ListIdeaSkeleton.vue'
import HotIdeaSkeleton from '@/components/skeletons/HotIdeaSkeleton.vue'
const HotIdea = defineAsyncComponent(() => import('@/components/hot-ideas/HotIdea.vue'))
const SuggestIdeaComponent = defineAsyncComponent(
  () => import('@/components/home/SuggestIdeaComponent.vue')
)
const ListIdea = defineAsyncComponent(() => import('@/components/home/ListIdea.vue'))

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
