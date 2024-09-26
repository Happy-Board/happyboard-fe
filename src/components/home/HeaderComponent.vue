<template>
  <nav
    class="block px-2 w-full py-3 mx-auto text-black bg-gradient-to-tr from-blue-gray-900 to-blue-gray-800 border-b border-b-borderColor bg-backgroundColor"
  >
    <div class="flex md:grid md:grid-cols-12 items-center text-black gap-y-4">
      <div class="md:col-span-2 flex justify-center">
        <img src="../../assets/icons/png/logo.png" alt="" class=" w-[40px] md:w-14 h-auto max-w-[500px]" @click="router.push('/')"/>
        <a
          href="/"
          class="hidden md:grid text-[#4d3d91] w-fit cursor-pointer py-1.5 font-sans text-2xl font-bold leading-relaxed tracking-normal text-inherit antialiased"
        >
          Happy Board
        </a>
      </div>
      <div class="md:col-span-7 flex w-full gap-2 px-2 md:px-5 md:justify-center items-center">
        <SearchComponent
          :isOpen="isModalOpened"
          @modal-open="openModal"
          @modal-close="closeModal"
        />
      </div>
      <div class="md:col-span-3 flex items-center justify-end px-1 gap-3 md:px-5">
        <div class="w-fit pe-0">
          <router-link
            to="/create-idea"
            class="flex bg-primaryColor items-center md:ps-1.5 md:pe-3 md:py-1 text-white rounded-full hover:bg-secondaryColor group"
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
  
            <span class="hidden md:flex md:ms-1 whitespace-nowrap text-white font-sans text-sm font-bold"
              >New idea</span
            >
          </router-link>
        </div>
        <NotificationComponent />
        <div @click="openUserOption" class="flex items-center cursor-pointer">
          <img
            :src="!profile.avatar ? '../../avatar/default-avatar.jpg' : profile.avatar"
            alt="avatar"
            class="aspect-square rounded-full md:w-8 w-[6rem]"
          />
            <PopUpUserOption
              v-if="showUserOption"
              @logout="handleLogout"
              @closeUserOption="closeUserOption"
            />
        </div>
      </div>
    </div>
  </nav>
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

    <div class="md:col-span-10 flex items-center justify-end gap-4 px-2 md:px-5">
      <button
        @click="openModal"
        class="md:flex hidden bg-transparent rounded-full text-white hover:bg-secondaryColor p-2"
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

      <router-link
        to="/create-idea"
        class="flex bg-primaryColor items-center px-3 py-1 text-white rounded-full hover:bg-secondaryColor"
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

    <div class="md:col-span-7 flex w-full gap-2 px-2 md:px-5 justify-between items-center">
      <SearchComponent
        :isOpen="isModalOpened"
        @modal-open="openModal"
        @modal-close="closeModal"
        class="hidden md:flex"
      />
    </div>

    <div class="md:col-span-3 flex justify-end items-center gap-4 px-2 md:px-5">
      <div class="flex items-center gap-4">
        <NotificationComponent />

        <router-link
          to="/create-idea"
          class="flex bg-primaryColor items-center px-3 py-1 text-white rounded-full hover:bg-secondaryColor"
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

        <div @click="openUserOption" class="flex items-center cursor-pointer">
          <img
            :src="!profile.avatar ? '../../avatar/default-avatar.jpg' : profile.avatar"
            alt="avatar"
            class="aspect-square rounded-full md:w-10 w-[6rem]"
          />
          <span class="hidden md:flex ms-1 font-semibold text-lg line-clamp-1 break-words">
            {{ profile.username }}
          </span>
          <PopUpUserOption
            v-if="showUserOption"
            @logout="handleLogout"
            @closeUserOption="closeUserOption"
          />
        </div>
      </div>
    </div>
  </div>
</nav>
  
</template> -->


<script setup>
import { onMounted, ref, watch } from 'vue'
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

watch(showUserOption,() => {
console.log(showUserOption.value);
})
</script>
<style scoped>

</style>
