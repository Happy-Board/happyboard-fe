<template>
  <div
    class="fixed flex flex-col px-3 min-h-screen bg-white font-semibold text-base pt-[95px] w-full gap-1"
  >
    
      <div
        @click="handleSetTab('all')"
        class="cursor-pointer hover:text-blue-700 px-4 bg-white"
        :class="tab === 'all' ? 'border-l-2 border-l-blue-700 text-blue-700' : ''"
      >
        All
      </div>
      <div
        @click="handleSetTab('publish')"
        class="cursor-pointer hover:text-blue-700 px-4 bg-white"
        :class="tab === 'publish' ? 'border-l-2 border-l-blue-700 text-blue-700' : ''"
      >
        Released
      </div>
      <div
        @click="handleSetTab('hide')"
        class="cursor-pointer hover:text-blue-700 px-4 bg-white"
        :class="tab === 'hide' ? 'border-l-2 border-l-blue-700 text-blue-700' : ''"
      >
        Pending
      </div>
      <div
        @click="handleSetTab('draft')"
        class="cursor-pointer hover:text-blue-700 px-4 bg-white"
        :class="tab === 'draft' ? 'border-l-2 border-l-blue-700 text-blue-700' : ''"
      >
        Draft
      </div>
    </div>
  
</template>
<script setup>
import { useMyBoardStore } from '@/stores/my-board.store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const myBoardStore = useMyBoardStore()
const { tab } = storeToRefs(myBoardStore)
const { setTab } = myBoardStore

const handleSetTab = (newTab) => {
  setTab(newTab)
  if (newTab === 'activity-history') {
    router.push({ name: 'history', params: {} })
  } else {
    router.push({ name: 'my-board-ideas', params: {} })
  }
}

</script>
<style scoped></style>
