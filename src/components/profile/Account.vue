<script async setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import InputField from './InputField.vue'
import Modal from './Modal.vue'
import { apiUpdateProfile } from '@/apis/user.api'
import { notify } from '@/utils/toast'
import { nextTick } from 'vue'

const userStore = useUserStore()
const { getProfile } = userStore
await getProfile()
const { profile } = storeToRefs(userStore)

const initialFullName = profile.value.username
const initialEmail = profile.value.email
const initialAvatar = profile.value.avatar
const initialPhone = '0378481575'
const initialJobPosition = profile.value.jobPosition
const initialBio = profile.value.introduce

const fullName = ref(initialFullName)
const email = ref(initialEmail)
const avatar = ref(initialAvatar)
const phone = ref(initialPhone)
const jobPosition = ref(initialJobPosition)
const bio = ref(initialBio)

let isChanged = ref(false)

function handleUpdate(InputField, value) {
  eval(InputField).value = value

  let equalFullName = fullName.value === initialFullName
  let equalEmail = email.value === initialEmail
  let equalJobPosition = jobPosition.value === initialJobPosition
  let equalPhone = phone.value === initialPhone
  let equalBio = bio.value.replace(/\n$/, '') === initialBio

  isChanged.value = !equalFullName || !equalEmail || !equalPhone || !equalJobPosition || !equalBio
}

const visible = ref(false)
const visibleSaveChange = ref(false)

const onToggle = () => {
  visible.value = !visible.value
}

// Upload image
const fileInput = ref(null)
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const loading = ref(false)

const uploadAvatar = async (event) => {
  let file = event.target.files[0]
  if (file) {
    const formData = new FormData()
    formData.append('file', file)
    let isUpdated = await updateData(formData)
    console.log(`isUpdated:`, isUpdated)
    isUpdated ? (avatar.value = URL.createObjectURL(file)) : null
  }
}

const removeAvatar = async (event) => {
  try {
    const DefaultAvatar = await import('@/assets/default-avatar.jpg')
    const blob = await fetch(DefaultAvatar.default).then((r) => r.blob())
    const file = new File([blob], 'default-avatar.jpg', { type: blob.type })
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      let isUpdated = await updateData(formData)
      console.log(`isUpdated:`, isUpdated)
      if (isUpdated) {
        avatar.value = URL.createObjectURL(file)
      }
    }
    onToggle()
  } catch (error) {
    onToggle()
    console.error('Error removing avatar:', error)
  }
}

const updateInfo = async () => {
  let isValidPhone = checkPhone(phone.value)
  if (!isValidPhone) {
    notify('error', 'Phone number is invalid')
    visibleSaveChange.value = false
    phone.value = initialPhone
    return
  }

  let isValidFullName = fullName.value.trim().length !== 0
  if (!isValidFullName) {
    notify('error', 'Full name is required')
    fullName.value = initialFullName
    visibleSaveChange.value = false
    return
  }

  let isTooLongFullName = fullName.value.trim().length >= 50
  if (isTooLongFullName) {
    notify('error', 'Full name is too long')
    fullName.value = initialFullName
    visibleSaveChange.value = false
    return
  }

  const formData = new FormData()
  formData.append('username', fullName.value)
  formData.append('jobPosition', jobPosition.value)
  formData.append('introduce', bio.value)
  let isUpdated = await updateData(formData)
  visibleSaveChange.value = false
  isChanged.value = false
}

const updateData = async (formData) => {
  let isUpdated = false
  loading.value = true
  await apiUpdateProfile(formData)
    .then(() => {
      isUpdated = true
      getProfile()
      notify('success', 'Your profile updated successfully!')
    })
    .catch((err) => {
      console.error(err)
      notify('error', 'Update your profile failed')
    })
    .finally(() => {
      loading.value = false
    })
  return isUpdated
}

const checkPhone = (phone) => {
  const regex = /^(0[3|5|7|8|9])+([0-9]{8})$/
  let isValidPhone = regex.test(phone)
  console.log(phone, ':', isValidPhone)
  return isValidPhone
}

const resetData = () => {
  fullName.value = initialFullName
  email.value = initialEmail
  phone.value = initialPhone
  jobPosition.value = initialJobPosition
  bio.value = initialBio
  visibleSaveChange.value = false
  isChanged.value = false
}

// Move point to last bio (in contenteditable)
const moveCursorToEnd = (element) => {
  const range = document.createRange()
  const selection = window.getSelection()
  range.selectNodeContents(element)
  range.collapse(false)
  selection.removeAllRanges()
  selection.addRange(range)
}

const updateBio = (event) => {
  const bioDiv = event.target
  const newBio = bioDiv.innerHTML
  handleUpdate('bio', newBio)

  nextTick(() => {
    moveCursorToEnd(bioDiv)
  })
}

// const update
</script>
<template>
  <!-- Avatar -->
  <div class="avatar flex items-center flex-col md:flex-row gap-2 mb-4">
    <img
      :src="avatar"
      class="w-32 h-32 md:w-28 md:h-28 object-cover rounded-lg shadow-2xl"
      alt="Avatar"
    />
    <div class="addition md:ms-5 flex flex-col">
      <h4 class="font-semibold text-lg mb-3 mx-auto md:mx-0">Profile Picture</h4>
      <div class="action mb-2 flex flex-col md:flex-row items-center gap-3">
        <button
          class="w-[150px] md:w-auto bg-blue-700 hover:bg-blue-800 font-normal py-1 px-2 rounded text-sm text-white focus:outline-none"
          @click="triggerFileInput"
        >
          <i class="fas fa-upload"></i> Upload Image
        </button>
        <!-- <button
          class="w-[150px] md:w-auto bg-red-500 hover:bg-red-600 font-normal py-1 px-2 rounded text-sm text-white focus:outline-none"
          @click="onToggle"
        >
          <i class="fas fa-trash"></i> Remove
        </button> -->
      </div>
      <p class="font-thin text-sm md:text-md">We support PNGs and JPEGs under 10MB</p>
    </div>
  </div>
  <!-- End Avatar -->
  <!-- Form Infomation -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <InputField
      type="text"
      name="Full Name"
      placeholder="Please enter full name"
      :readonly="false"
      :value="fullName"
      required="true"
      @update:value="handleUpdate('fullName', $event)"
    />
    <InputField
      type="email"
      name="Email"
      placeholder="Please enter email"
      :readonly="true"
      :value="email"
      @update:value="handleUpdate('email', $event)"
    />
    <InputField
      type="phone"
      name="Phone"
      placeholder="Please enter phone"
      :readonly="false"
      :value="phone"
      @update:value="handleUpdate('phone', $event)"
    />
    <InputField
      type="text"
      name="Job Position"
      placeholder="Please enter job position"
      :readonly="false"
      :value="jobPosition"
      @update:value="handleUpdate('jobPosition', $event)"
    />

    <div class="col-span-1 md:col-span-2">
      <label :for="bio" class="block text-sm font-medium leading-6 text-purple-800"> Bio </label>
      <div
        id="bio"
        contenteditable="true"
        spellcheck="false"
        class="font-semibold block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none overflow-hidden min-h-[2.5rem] whitespace-pre-wrap"
        v-html="bio"
        @input="updateBio"
      ></div>
    </div>
  </div>
  <!-- End Form Infomation -->
  <div class="mt-8 flex flex-col md:flex-row justify-center md:justify-end">
    <button
      type="button"
      class="w-full md:w-auto text-white bg-gray-400 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      @click="resetData"
    >
      Cancel
    </button>
    <button
      v-if="!isChanged"
      type="button"
      class="w-full md:w-auto text-white bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      :style="{ cursor: 'not-allowed' }"
      disabled
    >
      Save Change
    </button>
    <button
      v-if="isChanged"
      type="button"
      class="w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      :style="{ cursor: 'pointer' }"
      @click="visibleSaveChange = true"
    >
      Save Change
    </button>
  </div>
  <Modal
    v-if="visible"
    title="Confirm Action"
    maxWidth="sm"
    :visible="visible"
    v-on:close="onToggle"
  >
    <p class="text-gray-800">
      Are you sure you want you delete your avatar? This action cannot be undone.
    </p>

    <div class="text-right mt-4">
      <button
        @click="onToggle"
        class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline"
      >
        Cancel
      </button>
      <button
        class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
        @click="removeAvatar"
      >
        Remove
      </button>
    </div>
  </Modal>
 
  <!-- Model Confirm Save Change -->
  <Modal
    v-if="visibleSaveChange"
    title="Confirm Action"
    maxWidth="sm"
    :visible="visibleSaveChange"
    v-on:close="visibleSaveChange = false"
  >
    <p class="text-gray-800">Are you sure you want update infomation ?</p>

    <div class="text-right mt-4">
      <button
        @click="resetData"
        class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline"
      >
        Cancel
      </button>
      <button
        class="mr-2 px-4 py-2 text-sm rounded text-white bg-blue-600 focus:outline-none hover:bg-blue-700"
        @click="updateInfo"
      >
        Save
      </button>
    </div>
  </Modal>
  <!-- End Model Confirm Save Change -->

  <!-- Loading -->
  <div
    class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out"
    :class="{ 'opacity-0 pointer-events-none': !loading, 'opacity-100': loading }"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 transition-opacity duration-500 ease-in-out"
      @click="closeModal"
    ></div>

    <div
      class="absolute max-h-full transition-transform duration-500 ease-in-out transform"
      :class="[maxWidth, { 'scale-100': loading, 'scale-0': !loading }]"
    >
      <div class="container overflow-hidden md:rounded">
        <div class="max-h-full px-4 py-4 flex flex-col items-center gap-3">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <p class="font-semibold text-white">Loading ...</p>
        </div>
      </div>
    </div>
  </div>
  <!-- End Loading -->

  <!-- Input File -->
  <input type="file" ref="fileInput" class="hidden" @change="uploadAvatar" />
  <!-- End Input File -->
</template>

<style scoped></style>
