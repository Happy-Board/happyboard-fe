<template>
  <div class="relative h-10 w-[70%] min-w-[288px]">
    <input
      @click="emit('modal-open')"
      v-model="search"
      type="search"
      class="peer h-full w-full rounded-full border border-primaryColor px-3 py-2.5 pr-20 font-sans text-sm font-normal !text-black outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primaryColor focus:outline-0"
      placeholder="Search title, idea"
    />
    <button
      @click="handleShowResultsInHomePage"
      class="!absolute right-1 top-1 select-none rounded-full bg-primaryColor py-2 px-4 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 shadow-md shadow-blue-gray-500/10 transition-all hover:shadow-lg hover:shadow-blue-gray-500/20 hover:bg-secondaryColor focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-white"
      type="button"
    >
      Search
    </button>
    <ul
    v-if="searchData.length && props.isOpen"
    ref="target"
    class="w-full rounded-xl bg-white border border-borderColor px-4 py-2 space-y-1 absolute z-10 top-12 shadow-xl"
  >
    <li
      v-for="result in searchData"
      :key="result.id"
      @click="handleShowDetailIdea(result.id)"
      class="cursor-pointer hover:bg-backgroundColor p-1 rounded-lg px-2 text-primaryColor"
    >
      <div class=" font-semibold" v-html="result.highlight.title ? result.highlight.title : result.title "></div>
      <div class="text-black text-xs line-clamp-1 break-words" v-html="result.highlight.content"></div>
    </li>
  </ul>
  </div>
  
</template>
<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useSearchStore } from '@/stores/search.store'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useHomePageStore } from '@/stores/home.store'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  isOpen: Boolean
})

const searchStore = useSearchStore()
const homePageStore = useHomePageStore()
const { setSearchString, loadMore } = homePageStore
const { searchData } = storeToRefs(searchStore)
const { getAllResults, resetSearchData } = searchStore
const emit = defineEmits(['modal-close', 'modal-open'])
const search = ref('')

watch(search, () => {
  getAllResults(`?q=${search.value}`)
})
const target = ref(null)
onClickOutside(target, () => emit('modal-close'))

const handleShowResultsInHomePage = () => {
  resetSearchData()
  setSearchString(search.value)
  setTimeout(() => {
    if (route.path === '/') {
      loadMore()
    }
    router.push({ name: 'home' })
  }, 500)
}
const handleShowDetailIdea = (id) => {
  resetSearchData()
  if (route.path.includes('idea')) {
    router.push({ name: 'detail-idea', params: { id: id, type: 'publish' } })
    router.go()
  } else {
    router.push({ name: 'detail-idea', params: { id: id, type: 'publish' } })
  }
}
</script>
<style scoped></style>
