<template>
  <div class="col-span-12 md:col-span-10 flex pt-[90px] z-0 bg-white px-5 min-h-screen md:ms-5">
    <div class="flex flex-col gap-5 md:w-[80%]">
      <p class="font-semibold text-3xl">Let's create your group</p>

      <div>
        <label for="name" class="block text-sm font-medium text-black mb-3">
          Name <span class="text-red-600">*</span>
        </label>
        <input
          v-model="groupData.name"
          type="text"
          placeholder="Enter group name..."
          maxlength="100"
          class="text-sm border border-gray-300 focus:outline-0 px-3 py-2 rounded-lg w-full"
          id="name"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-black mb-3">
          Description <span class="text-red-600">*</span>
        </label>
        <textarea
          v-model="groupData.description"
          placeholder="Write group description here..."
          rows="3"
          maxlength="500"
          class="text-sm border border-gray-300 focus:outline-0 px-3 py-2 rounded-lg w-full"
          id="description"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-black mb-3">
          Avatar <span class="text-red-600">*</span>
        </label>
        <div class="relative flex items-center">
          <div v-if="groupData.avatar" class="relative w-32 h-32">
            <img
              :src="groupData.avatar"
              alt="Avatar Preview"
              class="w-full h-full object-cover rounded-full"
            />
            <button
              @click="removeAvatar"
              class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
              title="Remove Avatar"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div v-else class="flex flex-col items-center justify-center cursor-pointer">
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              @change="onAvatarChange"
              class="hidden"
            />
            <label
              for="avatar-upload"
              class="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              <i class="fa-solid fa-upload mr-2"></i>
              Upload Avatar
            </label>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-black mb-3">
          Background <span class="text-red-600">*</span>
        </label>
        <div class="relative flex items-center">
          <div v-if="groupData.background" class="relative w-full h-48">
            <img
              :src="groupData.background"
              alt="Background Preview"
              class="w-full h-full object-cover rounded-lg"
            />
            <button
              @click="removeBackground"
              class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
              title="Remove Background"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div v-else class="flex flex-col items-center justify-center cursor-pointer">
            <input
              id="background-upload"
              type="file"
              accept="image/*"
              @change="onBackgroundChange"
              class="hidden"
            />
            <label
              for="background-upload"
              class="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              <i class="fa-solid fa-upload mr-2"></i>
              Upload Background
            </label>
          </div>
        </div>
      </div>

      <div class="my-10 flex justify-end">
        <router-link
          to="/"
          class="text-white bg-red-500 border border-borderColor focus:outline-none hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2 me-2 md:mb-2 mt-5"
        >
          Cancel
        </router-link>
        <button
          @click.prevent="createGroup"
          type="button"
          class="text-white bg-primaryColor border border-borderColor focus:outline-none hover:bg-secondaryColor focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 md:mb-2 mt-5"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { apiCreateGroup } from '../../apis/group.api'
import { SANITIZE_ALLOWED_TAGS } from '@/constants'
import { notify } from '@/utils/toast'
import sanitizeHtml from 'sanitize-html'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
let selectedFiles = ref([])

const groupData = reactive({
  name: '',
  description: '',
  avatar: '',
  background: ''
})

const onAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    groupData.avatar = URL.createObjectURL(file)
    selectedFiles.value[0] = file
  }
}

const removeAvatar = () => {
  groupData.avatar = ''
}

const onBackgroundChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    groupData.background = URL.createObjectURL(file)
    selectedFiles.value[1] = file
  }
}

const removeBackground = () => {
  groupData.background = ''
}

const createGroup = () => {
  if (groupData.name && !sanitizeHtml(groupData.name, { allowedTags: SANITIZE_ALLOWED_TAGS })) {
    notify('error', 'Invalid name group!')
    return
  } else if (
    groupData.name !== sanitizeHtml(groupData.name, { allowedTags: SANITIZE_ALLOWED_TAGS })
  ) {
    toast.warning('Your name is not allowed to contain html tags! We will strip your html tags', {
      autoClose: 5000
    })
    groupData.name = sanitizeHtml(groupData.name, { allowedTags: SANITIZE_ALLOWED_TAGS })
    return
  }
  if (!groupData.name && !groupData.description && !groupData.avatar && !groupData.background) {
    notify('warning', 'Nothing to save')
    return
  }

  if (!groupData.name) {
    notify('warning', 'Group name is not empty !')
    return
  }
  const formData = new FormData()

  formData.append('name', groupData.name)
  formData.append('description', groupData.description)
  selectedFiles.value.forEach((file) => {
    formData.append('files', file)
  })
  apiCreateGroup(formData)
    .then(() => {
      notify('success', 'Create group successfully !')
      setTimeout(() => {
        router.push({ name: 'home' })
      }, 1000)
    })
    .catch((err) => {
      console.log(err)
      notify('error', 'Create group failed, some thing went wrong !')
    })
}
</script>

<style>
/* Add your styles here */
</style>
