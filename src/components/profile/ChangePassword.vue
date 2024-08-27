<script setup>
import { apiUpdatePassword } from '@/apis/user.api'
import { notify } from '@/utils/toast'
import { ref, watch } from 'vue'
import ModalComponent from './ModalComponent.vue'

const loading = ref(false)
const maxlength = 20
const minLength = 8

const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const isOldPasswordShow = ref(false)
const isNewPasswordShow = ref(false)
const isConfirmNewPasswordShow = ref(false)

const isErrorOldPasswordShow = ref(false)
const isErrorNewPasswordShow = ref(false)
const isErrorConfirmNewPasswordShow = ref(false)

const isEmptyFields = ref(true)

let visibleSubmit = ref(false)

const validateOldPassword = () => {
  if (oldPassword.value === '') {
    isErrorOldPasswordShow.value = true
  } else {
    isErrorOldPasswordShow.value = false
  }
}

const validateNewPassword = () => {
  if (newPassword.value === '') {
    isErrorNewPasswordShow.value = true
  } else {
    isErrorNewPasswordShow.value = false
  }

  if (newPassword.value !== confirmNewPassword.value) {
    isErrorConfirmNewPasswordShow.value = true
  } else {
    isErrorConfirmNewPasswordShow.value = false
  }
}

const resetFields = () => {
  oldPassword.value = ''
  newPassword.value = ''
  confirmNewPassword.value = ''
  isErrorOldPasswordShow.value = false
  isErrorNewPasswordShow.value = false
  isErrorConfirmNewPasswordShow.value = false

  isOldPasswordShow.value = false
  isNewPasswordShow.value = false
  isConfirmNewPasswordShow.value = false
}

const handleUpdate = (fieldRef, value) => {
  eval(fieldRef).value = value

  const isEmptyOldPassword = oldPassword.value === ''
  const isEmptyNewPassword = newPassword.value === ''
  const isEmptyConfirmNewPassword = confirmNewPassword.value === ''
  isEmptyFields.value = isEmptyOldPassword || isEmptyNewPassword || isEmptyConfirmNewPassword
  console.log(`isEmptyFields:`, isEmptyFields.value)
}
const submitForm = async () => {
  validateOldPassword()
  validateNewPassword()
  if (!isErrorOldPasswordShow.value && !isErrorConfirmNewPasswordShow.value)
    visibleSubmit.value = true
}

const changePassword = () => {
  if (!isErrorOldPasswordShow.value && !isErrorConfirmNewPasswordShow.value) {
    loading.value = true
    let payload = {
      old_password: oldPassword.value,
      new_password: newPassword.value
    }
    apiUpdatePassword(payload)
      .then(() => {
        notify('success', 'Password updated successfully')
      })
      .catch((err) => {
        if (err.response.status === 400) isErrorOldPasswordShow.value = true
      })
      .finally(() => {
        visibleSubmit.value = false
        loading.value = false
      })
  }
}

// Follow field change
watch(oldPassword, () => {
  handleUpdate('oldPassword', oldPassword.value)
  isErrorOldPasswordShow.value = false
})

watch(newPassword, () => {
  handleUpdate('newPassword', newPassword.value)
  isErrorConfirmNewPasswordShow.value = false
})

watch(confirmNewPassword, () => {
  handleUpdate('confirmNewPassword', confirmNewPassword.value)
  isErrorConfirmNewPasswordShow.value = false
})
</script>

<template>
  <form @submit.prevent="submitForm">
    <!-- Old Password -->
    <div class="mb-8">
      <label
        for="oldPassword"
        class="block text-sm font-medium leading-6 text-purple-800 cursor-pointer"
      >
        Old Password
        <span class="text-red-600 font-semibold text-lg">*</span>
      </label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <input
          required="true"
          :maxlength="maxlength"
          :minlength="minLength"
          id="oldPassword"
          name="oldPassword"
          :type="isOldPasswordShow ? 'text' : 'password'"
          v-model="oldPassword"
          class="font-semibold block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          @input="validateOldPassword"
        />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          @click="isOldPasswordShow = !isOldPasswordShow"
        >
          <i v-if="!isOldPasswordShow" class="fa fa-eye"></i>
          <i v-else class="fa fa-eye-slash"></i>
        </div>
        <p v-if="isErrorOldPasswordShow" class="text-red-600 font-semibold absolute">
          <i class="fa fa-warning"></i> Incorrect password
        </p>
      </div>
    </div>

    <!-- New Password -->
    <div class="mb-8">
      <label
        for="newPassword"
        class="block text-sm font-medium leading-6 text-purple-800 cursor-pointer"
      >
        New Password
        <span class="text-red-600 font-semibold text-lg">*</span>
      </label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <input
          required="true"
          :maxlength="maxlength"
          :minlength="minLength"
          id="newPassword"
          name="newPassword"
          :type="isNewPasswordShow ? 'text' : 'password'"
          v-model="newPassword"
          class="font-semibold block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          @input="validateNewPassword"
        />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          @click="isNewPasswordShow = !isNewPasswordShow"
        >
          <i v-if="!isNewPasswordShow" class="fa fa-eye"></i>
          <i v-else class="fa fa-eye-slash"></i>
        </div>
        <p v-if="isErrorNewPasswordShow" class="text-red-600 font-semibold absolute">
          <i class="fa fa-warning"></i> New password cannot be blank
        </p>
      </div>
    </div>

    <!-- Confirm New Password -->
    <div class="mb-8">
      <label
        for="confirmNewPassword"
        class="block text-sm font-medium leading-6 text-purple-800 cursor-pointer"
      >
        Confirm New Password
        <span class="text-red-600 font-semibold text-lg">*</span>
      </label>
      <div class="relative mt-2 rounded-md shadow-sm">
        <input
          required="true"
          :maxlength="maxlength"
          :minlength="minLength"
          id="confirmNewPassword"
          name="confirmNewPassword"
          :type="isConfirmNewPasswordShow ? 'text' : 'password'"
          v-model="confirmNewPassword"
          class="font-semibold block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          @input="validateNewPassword"
        />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          @click="isConfirmNewPasswordShow = !isConfirmNewPasswordShow"
        >
          <i v-if="!isConfirmNewPasswordShow" class="fa fa-eye"></i>
          <i v-else class="fa fa-eye-slash"></i>
        </div>
        <p v-if="isErrorConfirmNewPasswordShow" class="text-red-600 font-semibold absolute">
          <i class="fa fa-warning"></i> Passwords do not match
        </p>
      </div>
    </div>

    <!-- Buttons -->
    <div class="pt-4 flex flex-col md:flex-row-reverse gap-3">
      <button
        v-if="isEmptyFields"
        type="button"
        class="text-white font-bold bg-blue-700 rounded-lg text-sm w-full md:max-w-40 px-5 py-2.5 text-center"
        :style="{ cursor: 'not-allowed' }"
      >
        Submit
      </button>
      <button
        v-else
        type="submit"
        class="text-white font-bold bg-blue-700 hover:bg-blue-800 rounded-lg text-sm w-full md:max-w-40 px-5 py-2.5 text-center"
      >
        Submit
      </button>
      <button
        type="button"
        class="text-white font-bold bg-gray-400 hover:bg-gray-600 rounded-lg text-sm w-full md:max-w-20 px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-600"
        @click="resetFields"
      >
        Cancel
      </button>
    </div>
  </form>

  <!-- Modal Confirm Save Change -->
  <ModalComponent
    v-if="visibleSubmit"
    title="Confirm Action"
    maxWidth="sm"
    :visible="visibleSubmit"
    v-on:close="visibleSubmit = false"
  >
    <p class="text-gray-800">Are you sure you want change password ?</p>

    <div class="text-right mt-4">
      <button
        @click="visibleSubmit = false"
        class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline"
      >
        Cancel
      </button>
      <button
        class="mr-2 px-4 py-2 text-sm rounded text-white bg-blue-700 focus:outline-none hover:bg-blue-800"
        @click="changePassword"
      >
        Submit
      </button>
    </div>
  </ModalComponent>
  <!-- End Modal Confirm Save Change -->

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
      :class="[{ 'scale-100': loading, 'scale-0': !loading }]"
    >
      <div class="container overflow-hidden md:rounded">
        <div class="max-h-full px-4 py-4 flex flex-col items-center gap-3">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-blue-700 animate-spin fill-blue-800"
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
</template>

<style>
/* Optional: Add some styles for the error messages */
</style>
