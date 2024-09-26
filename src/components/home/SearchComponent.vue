<template>
  <div class="relative h-10 md:w-[70%] w-[150px]">
    <input
      @click="emit('modal-open')"
      v-model="search"
      type="search"
      class="peer h-full w-full rounded-full border border-primaryColor px-3 py-2.5 pr-20 font-sans text-sm font-normal !text-black outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primaryColor focus:outline-0"
      placeholder="Search title, idea"
    />
    <button
      @click="handleShowResultsInHomePage"
      class="hidden md:inline-block !absolute right-1 top-1 select-none rounded-full bg-primaryColor py-2 px-4 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 shadow-md shadow-blue-gray-500/10 transition-all hover:shadow-lg hover:shadow-blue-gray-500/20 hover:bg-secondaryColor focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-white"
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
<!-- <template>
  <nav
    class="block px-2 w-full py-3 mx-auto text-black bg-gradient-to-tr from-blue-gray-900 to-blue-gray-800 border-b border-b-borderColor bg-backgroundColor"
  >
    <div class="flex md:grid md:grid-cols-12 items-center text-black gap-y-4">
      <div class="md:col-span-2 flex justify-center">
        <img src="../../assets/icons/png/logo.png" alt="" class="w-[40px] md:w-14 h-auto max-w-[500px]" @click="router.push('/')"/>
        <a
          href="/"
          class="hidden md:grid text-[#4d3d91] w-fit cursor-pointer py-1.5 font-sans text-2xl font-bold leading-relaxed tracking-normal text-inherit antialiased"
        >
          Happy Board
        </a>
      </div>
  
      <div class="md:hidden flex w-full gap-2 px-2 justify-between items-center">
        <SearchComponent
          :isOpen="isModalOpened"
          @modal-open="openModal"
          @modal-close="closeModal"
        />
      </div>
  
      <div class="hidden md:col-span-7 md:flex items-center justify-between">
        <button
          @click="openModal"
          class="p-2 bg-transparent rounded-full text-white hover:bg-secondaryColor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 4a7 7 0 110 14 7 7 0 010-14zm0 0v2m0-2l2 2m0-2l-2 2"
            />
          </svg>
        </button>
      </div>
  
      <div class="md:col-span-3 flex items-center justify-end gap-4 px-2 md:px-5">
        <router-link
          to="/create-idea"
          class="hidden md:flex bg-primaryColor items-center px-3 py-1 text-white rounded-full hover:bg-secondaryColor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="hidden md:inline ml-2">New Idea</span>
        </router-link>
  
        <NotificationComponent />
  
        <div @click="openUserOption" class="flex items-center cursor-pointer">
          <img
            :src="!profile.avatar ? '../../avatar/default-avatar.jpg' : profile.avatar"
            alt="avatar"
            class="aspect-square rounded-full md:w-10 w-[6rem]"
          />
          <span class="hidden md:flex ms-1 font-semibold text-lg line-clamp-1 break-words">
            {{ profile.username }}
            <PopUpUserOption
              v-if="showUserOption"
              @logout="handleLogout"
              @closeUserOption="closeUserOption"
            />
          </span>
        </div>
      </div>
    </div>
  </nav>
</template> -->

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
