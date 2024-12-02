<template>
  <div class="md:col-span-7 col-span-12 pt-[75px] bg-white px-5 min-h-screen md:ms-5">
    <header class="flex flex-col items-start bg-white">
      <Suspense>
        <HeaderProfileComponent v-model:tab="currentTab" />
      </Suspense>
    </header>
    <div class="flex-1">
      <FilterComponent :store="profilePageStore"/>
      <Suspense>
        <template v-if="currentTab === 'Comments'">
          <ListCommentProfileComponent />
        </template>
        <template v-else>
          <ListIdeaProfileComponent :activeTab="currentTab" />
        </template>
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
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { defineAsyncComponent } from 'vue'
import SuggestIdeaSkeleton from '@/components/skeletons/SuggestIdeaSkeleton.vue'
// import { useProfileStore } from '@/stores/profile.store'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'
import ListIdeaSkeleton from '@/components/skeletons/ListIdeaSkeleton.vue'
import ActivityHistory from '@/components/history-activities/ActivityHistory.vue'
import FilterComponent from '@/components/home/FilterComponent.vue'
import HeaderProfileComponent from '@/components/profile/HeaderProfileComponent.vue'
import { useProfileStore } from '@/stores/profile.store'

const SuggestIdeaComponent = defineAsyncComponent(
  () => import('@/components/home/SuggestIdeaComponent.vue')
)
const ListIdeaProfileComponent = defineAsyncComponent(
  () => import('@/components/profile/ListIdeaProfileComponent.vue')
)
const ListCommentProfileComponent = defineAsyncComponent(
  () => import('@/components/profile/ListCommentProfileComponent.vue')
)

// Current active tab
const currentTab = ref('Posts')

// Recent ideas store
const homePageStore = useHomePageStore()
const { recentIdeas } = storeToRefs(homePageStore)

const profilePageStore = useProfileStore()
const { setTab, loadMore } = profilePageStore

watch(currentTab, async (newTab) => {
  setTab(newTab) // Thay đổi tab
  await loadMore() // Tải dữ liệu mới theo tab
})

// const profilePageStore = useProfileStore()
// const { loadMore, setTab } = storeToRefs(profilePageStore)

// Token management
const cookie = document.cookie.split('; ')
const setTokenToLocalStorage = () => {
  let token
  if (cookie[0] !== '') {
    cookie.forEach((element) => {
      const subCookie = element.split('=')
      if (subCookie[0] === 'access-token') {
        token = subCookie[1]
      }
    })
  }
  localStorage.setItem('accessToken', token)
}

// watch(currentTab, async (newTab) => {
//   setTab(newTab)
//   await loadMore() 
// })

// onActivated(async () => {
//   await loadMore()
// })

setTokenToLocalStorage()
</script>

<style>
.container.spinner {
  margin: 10px !important;
  border: blue !important;
}
</style>
