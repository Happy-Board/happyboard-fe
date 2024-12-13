<template>
  <header class="flex flex-col items-start bg-white">
    <div class="flex items-center gap-x-6 my-10">
      <!-- Avatar -->
      <img :src="avatar" alt="Profile Picture" class="w-20 h-20 rounded-full object-cover" />

      <!-- User Information -->
      <div>
        <h1 class="text-xl font-bold text-gray-800">{{ fullName }}</h1>
        <p class="text-gray-500">{{ email }}</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <nav class="flex gap-1">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="px-4 py-2 text-sm font-medium rounded-2xl hover:bg-gray-200"
        :class="{ 'bg-gray-200': tab === activeTab }"
        @click="changeTab(tab)"
      >
        {{ tab }}
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { useProfileStore } from '@/stores/profile.store'
import { storeToRefs } from 'pinia'

// Tabs
const tabs = ['Comments', 'Posts', 'Upvoted', 'Downvoted']

// Profile Store
const profileStore = useProfileStore()
const { tab: activeTab } = storeToRefs(profileStore) 

// Change tab
const changeTab = (tab) => {
  profileStore.setTab(tab)  // Update the tab in the store
  console.log('profileStore.tab: ', profileStore.tab)
}

// Watch for activeTab change
// watch(activeTab, (newTab) => {
//   console.log('Active Tab changed to: ', newTab)  // Log when activeTab changes
// })

// Fetch user profile
const router = useRouter()
const userStore = useUserStore()
const { getProfile } = userStore
await getProfile().catch((error) => {
  if (error.response.status === 401) {
    localStorage.clear()
    router.push({ name: 'sign-in' })
  }
})
const { profile } = storeToRefs(userStore)
const fullName = ref(profile.value.username)
const email = ref(profile.value.email)
const avatar = ref(profile.value.avatar)
</script>
