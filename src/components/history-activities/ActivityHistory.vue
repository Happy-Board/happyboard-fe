<script setup>
// import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import ListActivityHistory from './ListActivityHistory.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()

const { historyActivities } = storeToRefs(userStore)
const { getMyHistoryActivities } = userStore
const router = useRouter()

await getMyHistoryActivities().catch((error) => {
  if (error.response.status === 401) {
    router.push({ name: 'sign-in' })
  }
})
</script>

<template>
  <div class="w-full border border-borderColor rounded-md bg-slate-100 mb-5">
    <div
      class="px-4 pt-2 text-lg font-semibold border-b border-borderColor bg-white rounded-tl-lg rounded-tr-lg"
    >
      Activity Histories
    </div>
    <div v-if="historyActivities.length !== 0">
      <ListActivityHistory />
    </div>
    <div
      v-if="historyActivities.length === 0"
      class="flex flex-col justify-center items-center gap-1 text-gray-400 py-5"
    >
      <i class="fa-solid fa-clock-rotate-left fa-3x"></i>
      <p class="font-bold text-gray-400 text-sm table-cell align-middle">
        You have no activity yet!
      </p>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
