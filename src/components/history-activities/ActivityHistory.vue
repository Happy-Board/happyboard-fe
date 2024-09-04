<script setup>
// import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia';
import ListActivityHistory from './ListActivityHistory.vue'

const userStore = useUserStore()

const { historyActivities } = storeToRefs(userStore)

</script>

<template>
  <div v-if="historyActivities.length !== 0" class="w-full border border-borderColor rounded-md bg-slate-100 mb-5">
    <div class="px-4 pt-2 text-lg font-semibold border-b border-borderColor bg-white rounded-tl-lg rounded-tr-lg">
      Activity Histories
    </div>
    <ListActivityHistory/>
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
