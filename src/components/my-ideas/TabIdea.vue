<template>
  <div
    class=" flex bg-white font-semibold text-base w-full space-x-3"
  >
  <div
        @click="handleSetTab('all')"
        class="cursor-pointer hover:text-secondaryColor px-2 bg-white w-fit"
        :class="tab === 'all' ? 'border-b-2 border-b-secondaryColor text-secondaryColor' : ''"
      >
        All
      </div>
      <div
        @click="handleSetTab('publish')"
        class="cursor-pointer hover:text-green-700 px-2 bg-white w-fit flex items-center gap-2"
        :class="tab === 'publish' ? 'border-b-2 border-b-secondaryColor text-green-700' : ''"
      >
        <div class="w-2 h-2 aspect-square bg-green-700 rounded-full"></div> Released
      </div>
      <div
        @click="handleSetTab('hide')"
        class="cursor-pointer hover:text-yellow-700 px-2 bg-white w-fit flex items-center gap-2"
        :class="tab === 'hide' ? 'border-b-2 border-b-secondaryColor text-yellow-700' : ''"
      > <div class="w-2 h-2 aspect-square bg-yellow-700 rounded-full"></div>
        Pending
      </div>
      <div
        @click="handleSetTab('draft')"
        class="cursor-pointer hover:text-gray-700 px-2 bg-white w-fit flex items-center gap-2"
        :class="tab === 'draft' ? 'border-b-2 border-b-secondaryColor text-gray-700' : ''"
      > <div class="w-2 h-2 aspect-square bg-gray-700 rounded-full"></div>
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
