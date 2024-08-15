<template>
  <div
    class="fixed flex flex-col px-3 min-h-screen bg-white font-semibold text-base pt-[95px] w-full gap-1"
  >
    <div
      class="cursor-pointer hover:text-blue-700 px-4 bg-white flex items-center gap-10"
      @click="handleShowDropDown"
    >
      <span class="">My Ideas</span>
      <svg
        class="w-2 h-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </div>
    <div class="ms-4 flex flex-col gap-1 text-sm mb-2" v-if="isShowDropDown">
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
    <div
      @click="handleSetTab('activity-history')"
      class="cursor-pointer hover:text-blue-700 px-4 bg-white"
      :class="tab === 'activity-history' ? 'border-l-2 border-l-blue-700 text-blue-700' : ''"
    >
      My Actions
    </div>
    <!-- <div
      @click="handleSetTab('my-credential')"
      class="cursor-pointer hover:text-blue-700 px-4 bg-white"
      :class="tab === 'my-credential' ? 'border-l-2 border-l-blue-700 text-blue-700' : ''"
    >
      My Credential
    </div> -->
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useMyBoardStore } from '@/stores/my-board.store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const myBoardStore = useMyBoardStore()
const { tab } = storeToRefs(myBoardStore)
const { setTab } = myBoardStore
const isShowDropDown = ref(true)

const handleSetTab = (newTab) => {
  setTab(newTab)
  if (newTab === 'activity-history') {
    router.push({ name: 'history', params: {} })
  } else {
    router.push({ name: 'my-board-ideas', params: {} })
  }
}

const handleShowDropDown = () => {
  isShowDropDown.value = !isShowDropDown.value
}
</script>
<style scoped></style>
