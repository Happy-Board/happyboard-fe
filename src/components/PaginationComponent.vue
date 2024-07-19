<template>
  <div class="w-full flex justify-center mt-10 mb-5" v-if="props.totalPage !== 0">
    <button
      :class="
        currentPage === 1
          ? 'flex justify-center items-center px-2 border cursor-not-allowed rounded-lg bg-gray-200'
          : 'flex justify-center items-center px-2 border rounded-lg bg-gray-200 hover:bg-gray-300'
      "
      @click="emits('prePage')"
    >
      <i class="fa-solid fa-angles-left"></i>
    </button>
    <div v-for="index in props.totalPage" :key="index" class="flex gap-1">
      <div
        :class="
          currentPage === index
            ? 'px-2 border bg-blue-900 text-white font-medium cursor-pointer mx-1 rounded-lg'
            : 'px-2 border bg-gray-200 text-black font-medium cursor-pointer hover:bg-gray-300 mx-1 rounded-lg'
        "
        @click="emits('getPage', index)"
      >
        {{ index }}
      </div>
    </div>
    <button
      :class="
        currentPage === props.totalPage
          ? 'flex justify-center items-center px-2 border cursor-not-allowed rounded-lg bg-gray-200'
          : 'flex justify-center items-center px-2 border rounded-lg bg-gray-200 hover:bg-gray-300'
      "
      @click="emits('nextPage')"
    >
      <i class="fa-solid fa-angles-right"></i>
    </button>
  </div>
</template>
<script setup>
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'

const homePageStore = useHomePageStore()
const { currentPage } = storeToRefs(homePageStore)
// const { setCurrentPage } = homePageStore
const props = defineProps({
  totalPage: Number,
})
const emits = defineEmits(['nextPage', 'prePage', 'getPage'])
</script>
<style scoped></style>
