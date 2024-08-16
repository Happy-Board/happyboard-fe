<template>
  <nav
    class="block w-full px-[2%] py-3 mx-auto text-black shadow-md bg-gradient-to-tr from-blue-gray-900 to-blue-gray-800 border-b border-b-gray-400 bg-white"
  >
    <div class="grid grid-cols-10 items-center justify-between text-black gap-y-4">
      <div class="col-span-2">
        <a
          href="/"
          class="w-fit block cursor-pointer py-1.5 font-sans text-2xl font-bold leading-relaxed tracking-normal text-inherit antialiased"
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
          <NotificationComponent />
          <!-- <button
            v-if="mode === 'light'"
            @click="handleChangeMode('dark')"
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-700 transition-all hover:bg-white/10 active:bg-white/30 hover:text-black disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-7 h-7"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button> -->
          <!-- <button
            v-if="mode === 'dark'"
            @click="handleChangeMode('light')"
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-700 transition-all hover:bg-white/10 active:bg-white/30 hover:text-black disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-7 h-7"
              >
                <path
                  d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
                />
              </svg>
            </span>
          </button> -->
          <!-- <button
            class="relative ms-5 me-10 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-700 transition-all hover:bg-white/10 active:bg-white/30 hover:text-black disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-7 h-7"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button> -->
          <img
            @click="openUserOption"
            :src="profile.avatar"
            alt="avatar"
            class="w-[5%] aspect-square rounded-full cursor-pointer lg:w-[8%] md:w-[7%] sm:w-[8%] xl:w-[7%]"
          />
          <span @click="openUserOption" class="ms-2 font-semibold text-lg cursor-pointer"
            >{{ profile.username }}
            <!-- <div
              class="absolute top-16 right-4 bg-white text-sm rounded-lg border p-2"
              v-if="showUserOption"
            >
              <div>
                <router-link
                  to="/profile"
                  class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
                </router-link>
              </div>
              <div>
                <div
                  @click="handleLogout"
                  to=""
                  class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span class="flex-1 ms-3 whitespace-nowrap">Sign out</span>
                </div>
              </div>
            </div> -->
            <PopUpUserOption v-if="showUserOption" @logout="handleLogout" @closeUserOption="closeUserOption" />
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
import NotificationComponent from './NotificationComponent.vue'
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
