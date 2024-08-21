<template>
  <div class="col-span-6 pt-[100px] z-0 bg-white px-5 min-h-screen overflow-hidden space-y-5">
    <router-view></router-view>
  </div>
  <div class="col-span-2">
    <LeftbarComponent />
  </div>
</template>
<script setup>
import LeftbarComponent from '@/components/my-ideas/LeftbarComponent.vue'
import { onMounted } from 'vue'
import { useMyBoardStore } from '@/stores/my-board.store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

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
