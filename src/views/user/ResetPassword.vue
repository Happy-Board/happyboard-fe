<template>
  <section class="bg-gray-200">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img
          class="w-10 h-10 mr-2"
          src="../../assets/devops-boards.svg"
          alt="logo"
        />
        HAPPY BOARD
      </a>
      <div class="w-full p-6 bg-white rounded-lg shadow sm:max-w-md sm:p-8">
        <h2
          class="text-center mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Reset Password
        </h2>
        <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
              >New Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required=""
              v-model="password"
            />
          </div>
          <div>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900"
              >Confirm password</label
            >
            <input
              type="confirm-password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required=""
              v-model="confirmPassword"
            />
          </div>

          <div class="text-center">
            <button
              @click.prevent="handleResetPassWord"
              class="text-black bg-gray-200 border border-gray-400 focus:outline-none hover:bg-blue-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Reset passwod
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { notify } from '@/utils/toast'
import { apiResetPassword } from '@/apis/user.api'
const router = useRouter()

const route = useRoute()

const token = route.params.token

const password = ref()
const confirmPassword = ref()

const handleResetPassWord = () => {
  if (!password.value || !confirmPassword.value) {
    notify('warning', 'Please fill in all fields')
    return
  }
  if (password.value !== confirmPassword.value) {
    notify('warning', 'Passwords do not match')
    return
  }
 console.log({ token: token, new_password: password.value })
  apiResetPassword({ token: token, new_password: password.value })
    .then(() => {
      notify('success', 'Password reset successfully')
      setTimeout(() => {
        router.push({ name: 'sign-in' })
      }, 1000)
    })
    .catch((err) => console.log(err))
}
</script>
