<template>
  <nav
    class="block w-full px-[2%] py-3 mx-auto text-black bg-gradient-to-tr from-blue-gray-900 to-blue-gray-800 border-b border-b-borderColor bg-backgroundColor"
  >
    <div class="grid grid-cols-10 items-center justify-between text-black gap-y-4">
      <div class="col-span-2 flex">
        <img src="../../assets/icons/png/logo.png" alt="" class="w-14 h-auto">
        <a
          href="/"
          class="text-[#4d3d91] w-fit block cursor-pointer py-1.5 font-sans text-2xl font-bold leading-relaxed tracking-normal text-inherit antialiased"
        >
          Happy Board
        </a>
      </div>
      <div class="col-span-4 relative flex w-full gap-2">
        <!-- <div class="relative h-10 w-full min-w-[288px]">
          <input
            @click="emit('modal-close')"
            v-model="searchString"
            type="search"
            class="peer h-full w-full rounded-full border border-slate-500 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal !text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder="Search author, idea,..."
          />
        </div>
        <ul
          v-if="searchResults.length && props.isOpen"
          class="w-full rounded-xl bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10 top-12 shadow-xl"
        >
          <li
            v-for="result in searchResults"
            :key="result.id"
            @click="findResults(result.id)"
            class="cursor-pointer hover:bg-gray-100 p-1 rounded-lg px-2 text-blue-900 font-semibold"
          >
            <div v-html="result.title"></div>
          </li>
        </ul>
        <button
          class="!absolute right-1 top-1 select-none rounded-full bg-gray-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 shadow-md shadow-blue-gray-500/10 transition-all hover:shadow-lg hover:shadow-blue-gray-500/20 hover:bg-black focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-white"
          type="button"
        >
          Search
        </button> -->
        <SearchComponent
          :isOpen="isModalOpened"
          @modal-open="openModal"
          @modal-close="closeModal"
        />
      </div>
      <div class="col-span-4 flex justify-end gap-1">
        <div class="flex justify-end items-center object-fill">
          <div class="">
            <router-link
              to="/create-idea"
              :class="`flex bg-primaryColor items-center ps-1.5 pe-3 py-1 text-white rounded-full hover:bg-secondaryColor group`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                :class="`flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-white`"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="flex-1 ms-1 whitespace-nowrap text-white font-sans text-sm font-bold"
                >New idea</span
              >
              <!-- <span
              class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
              >Pro</span
              > -->
            </router-link>
          </div>
          <NotificationComponent />
          <img
            @click="openUserOption"
            :src="!profile.avatar ? 'avatar/default-avatar.jpg' : profile.avatar"
            alt="avatar"
            class="w-[5%] aspect-square rounded-full cursor-pointer lg:w-[8%] md:w-[7%] sm:w-[8%] xl:w-[7%]"
          />
          <span @click="openUserOption" class="ms-2 font-semibold text-lg cursor-pointer"
            >{{ profile.username }}
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
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiLogOut } from '@/apis/auth.api'
import SearchComponent from './SearchComponent.vue'
import NotificationComponent from '../notification/NotificationComponent.vue'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import PopUpUserOption from './PopUpUserOption.vue'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)
const { getProfile } = userStore

await getProfile()

const router = useRouter()

const isModalOpened = ref(false)

const openModal = () => {
  isModalOpened.value = true
  console.log(profile.value)
}
const closeModal = () => {
  isModalOpened.value = false
}

const showUserOption = ref(false)

onMounted(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const cookies = document.cookie.split('; ')
  if ((!isLoggedIn && cookies.length === 0) || (isLoggedIn !== 'true' && cookies.length === 0)) {
    router.push('/sign-in')
  }
})

// const userName = ref()
// const mode = ref('')

// mode.value = localStorage.getItem('mode') || 'light'
// userName.value = localStorage.getItem('uname')
// const handleChangeMode = (newMode) => {
//   mode.value = newMode
//   localStorage.setItem('mode', newMode)
// }

const openUserOption = () => {
  showUserOption.value = !showUserOption.value
}
const closeUserOption = () => {
  showUserOption.value = false
}

const handleLogout = () => {
  apiLogOut()
    .then(() => {
      localStorage.clear()
      router.push('/sign-in')
    })
    .catch((err) => console.log(err))
}
</script>
<style scoped></style>
