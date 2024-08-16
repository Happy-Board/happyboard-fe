<template>
  <div class="mx-20 w-full">
    <div class="flex mb-10">
      <div class="">
        <div class="rounded-full w-36 overflow-hidden border border-gray-300 shadow-md relative">
          <img :src="profile.avatar" alt="" class="aspect-square object-cover w-full" />
        </div>
      </div>
      <div class="ms-5 flex flex-col justify-center gap-1">
        <div class="font-bold text-xl justify-center">{{ profile?.username }}</div>
        <div class="flex gap-1 font-semibold text-sm justify-start items-center">
          <i class="fa-solid fa-briefcase"></i
          ><span class="flex font-semibold text-xs justify-center">{{ profile?.jobPosition }}</span>
        </div>
        <div class="flex gap-1 font-semibold text-sm justify-start items-center">
          <i class="fa-solid fa-envelope"></i
          ><span class="flex font-semibold text-xs justify-center">{{ profile?.email }}</span>
        </div>
        <div class="mt-2 font-bold text-gray-600">
          {{ profile?.introduce }}
        </div>
      </div>
    </div>
    <div class="my-5 space-y-5">
      <p class="font-bold text-gray-700 text-2xl border-t-2 pt-2 mb-5 mx-auto">
        Update your profile
      </p>
      <div class="flex justify-between">
        <div class="text-center space-y-2">
          <Label class="font-semibold">Avatar</Label>
          <div class="rounded-full w-36 overflow-hidden border border-gray-300 shadow-md relative">
            <input type="file" class="hidden" @change="change" ref="file" />
            <img :src="url" alt="" class="aspect-square object-cover w-full" />
            <button
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 p-2 rounded-full hover:bg-black/90"
              @click="uploadImage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="space-y-1">
            <Label for="name" class="font-semibold text-sm">Display Name</Label>
            <input
              :placeholder="profile.username"
              type="text"
              id="name"
              class="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-0"
              v-model="formDataProfile.username"
            />
          </div>
          <div class="space-y-1">
            <Label for="position" class="font-semibold text-sm">Job Position</Label>
            <input
              :placeholder="profile.jobPosition"
              type="text"
              id="position"
              class="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-0"
              v-model="formDataProfile.jobPosition"
              autocomplete="off"
            />
          </div>
          <div class="space-y-1">
            <Label for="email" class="font-semibold text-sm">Email</Label>
            <input
              disabled
              :placeholder="profile.email"
              type="email"
              id="email"
              class="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-0 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
      <div class="mx-auto">
        <label for="message" class="block text-sm font-medium text-black mb-3"
          >Introduce Yourself
        </label>
        <div
          id="introduce"
          :placeholder="profile?.introduce"
          class="comment-input rounded-md border bg-white border-gray-400 focus:outline-0 py-2 px-3 pe-11 w-full text-sm"
          contentEditable="true"
          spellcheck="false"
        ></div>
      </div>
      <div class="text-center">
        <button
          @click.prevent="handleUpdateProfile"
          class="text-black bg-gray-200 border border-gray-400 focus:outline-none hover:bg-blue-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Update
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center mx-auto border-gray-300 border-t-2 py-5">
      <p class="font-bold text-gray-700 text-2xl mb-5 mx-auto">Change your password</p>
      <div class="flex flex-col gap-2 w-[40%] mb-5">
        <div class="space-y-1">
          <Label for="old-password" class="font-semibold text-sm">Old Password</Label>
          <input
            type="password"
            id="old-password"
            class="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-0"
            v-model="changePasswordData.old_password"
          />
        </div>
        <div class="space-y-1">
          <Label for="new-password" class="font-semibold text-sm">New Password</Label>
          <input
            type="password"
            id="new-password"
            class="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-0"
            v-model="changePasswordData.new_password"
          />
        </div>
        <div class="space-y-1">
          <Label for="confirm-password" class="font-semibold text-sm">Confirm New Password</Label>
          <input
            type="password"
            id="confirm-password"
            class="w-full border border-gray-400 rounded-md px-2 py-1 focus:outline-0"
            v-model="changePasswordData.confirm_password"
          />
        </div>
      </div>
      <button
        @click.prevent="handleChangePassword"
        class="text-black bg-gray-200 border border-gray-400 focus:outline-none hover:bg-blue-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Change Password
      </button>
    </div>
  </div>
</template>
<script async setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import { apiUpdatePassword, apiUpdateProfile } from '@/apis/user.api'
import { notify } from '../utils/toast'

const userStore = useUserStore()

const { profile } = storeToRefs(userStore)
const { getProfile } = userStore

await getProfile()

const file = ref()
const avatarImage = ref()
const formDataProfile = reactive({
  username: '',
  jobPosition: ''
})
const avatarName = ref('default-avatar.jpg')
const url = ref(profile.value.avatar)
const change = (e) => {
  // fileSelected.value = e.target.files[0]
  avatarImage.value = e.target.files[0]
  avatarName.value = e.target.files[0].name
  url.value = URL.createObjectURL(e.target.files[0])
}
const uploadImage = () => {
  file.value.click()
}

const changePasswordData = reactive({
  old_password: '',
  new_password: '',
  confirm_password: ''
})

const resetChangePassWordData = () => {
  changePasswordData.old_password = ''
  changePasswordData.new_password = ''
  changePasswordData.confirm_password = ''
} 

const resetFormDataProfile = () => {
  formDataProfile.username = ''
  formDataProfile.jobPosition = ''
  document.querySelector('#introduce').innerHTML = ''
}

const handleUpdateProfile = async () => {
  const formData = new FormData()
  const introduce = document.querySelector('#introduce').innerHTML
  if (avatarImage.value) {
    formData.append('file', avatarImage.value)
  }
  formData.append('username', formDataProfile.username)
  formData.append('jobPosition', formDataProfile.jobPosition)
  formData.append('introduce', introduce ?? '')

  await apiUpdateProfile(formData)
    .then(() => {
      getProfile()
      resetFormDataProfile()
      notify('success', 'Your profile updated successfully!')
    })
    .catch((err) => {
      console.error(err)
      notify('error', 'Update your profile failed')
    })
}

const handleChangePassword = async () => {
  if (!changePasswordData.old_password) {
    notify('warning', 'Missing old password')
    return
  }
  if (!changePasswordData.new_password) {
    notify('warning', 'Missing old password')
    return
  }
  if (!changePasswordData.confirm_password) {
    notify('warning', 'Missing old password')
    return
  }

  if (changePasswordData.new_password !== changePasswordData.confirm_password) {
    notify('warning', 'New password and comfirm password are not the same!')
    return
  }

  apiUpdatePassword({
    old_password: changePasswordData.old_password,
    new_password: changePasswordData.new_password
  })
    .then(() => {
      notify('success', 'Password updated successfully')
      resetChangePassWordData()
    })
    .catch((err) => {
      if(err.response.status === 400) notify('error', 'Old password incorrect!')
    })
}
</script>
<style scoped>
.ql-editor {
  margin-bottom: 50px;
}

.comment-input[contentEditable='true']:empty:before {
  content: attr(placeholder);
  color: gray;
  cursor: text;
}
</style>
