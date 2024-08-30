<template>
  <nav
    class="block w-full py-3 mx-auto text-black bg-gradient-to-tr from-blue-gray-900 to-blue-gray-800 border-b border-b-borderColor bg-backgroundColor"
  >
    <div class="grid grid-cols-12 items-center text-black gap-y-4">
      <div class="col-span-2 flex justify-center">
        <img src="../../assets/icons/png/logo.png" alt="" class="w-14 h-auto" />
        <a
          href="/"
          class="text-[#4d3d91] w-fit block cursor-pointer py-1.5 font-sans text-2xl font-bold leading-relaxed tracking-normal text-inherit antialiased"
        >
          Happy Board
        </a>
      </div>
      <div class="col-span-7 flex w-full gap-2 ms-5 px-5 justify-between">
        <SearchComponent
          :isOpen="isModalOpened"
          @modal-open="openModal"
          @modal-close="closeModal"
        />
        <div class="w-fit pe-5">
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
      </div>
      <div class="col-span-3 flex me-5 items-center gap-8 px-5">
     
          <NotificationComponent />
          <div  @click="openUserOption" class="flex items-center cursor-pointer">
            <img
              :src="!profile.avatar ? '../../avatar/default-avatar.jpg' : profile.avatar"
              alt="avatar"
              class="aspect-square rounded-full w-[18%]"
            />
            <span class="ms-1 font-semibold text-lg  line-clamp-1 break-words"
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
<style scoped></style>
