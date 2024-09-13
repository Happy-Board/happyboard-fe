<template>
  <section class="bg-gray-200">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-3xl font-semibold text-primaryColor">
        <img class="w-12 h-auto mr-2" src="../../assets/icons//png/logo.png" alt="logo" />
        HAPPY BOARD
      </a>
      <div class="w-full p-6 bg-white rounded-lg shadow sm:max-w-md sm:p-8">
        <h2
          class="text-center mb-1 text-xl font-bold leading-tight tracking-tight text-primaryColor md:text-2xl"
          class="text-center mb-1 text-xl font-bold leading-tight tracking-tight text-primaryColor md:text-2xl"
        >
          Reset Password
        </h2>
        <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div class="w-full relative !my-1">
            <span
              v-if="!isValidPassword"
              class="text-xs !pl-1 text-red-700 font-medium absolute -top-2 -left-1"
              ><i class="fa-solid fa-circle-exclamation !mr-1"></i>Password must be at least 8
              characters</span
            >
            <div class="relative w-full">
              <i
                @click="handleShowPassword"
                v-if="isShowPassword"
                class="fa-regular fa-eye-slash absolute right-3 cursor-pointer text-gray-600 fa-sm top-1/2 -translate-y-1/2"
              ></i>
              <i
                v-if="!isShowPassword"
                @click="handleShowPassword"
                class="fa-regular fa-eye absolute right-3 cursor-pointer text-gray-600 fa-sm top-1/2 -translate-y-1/2"
              ></i>
              <input
                name="password"
                :type="isShowPassword ? 'text' : 'password'"
                placeholder="Password"
                v-model="password"
                class="!pr-10"
                :class="isValidPassword ? '' : ' !border !border-red-700'"
              />
            </div>
          </div>
          <div class="relative w-full">
            <i
              @click="handleShowPasswordConfirm"
              v-if="isShowPasswordConfirm"
              class="fa-regular fa-eye-slash absolute right-3 cursor-pointer text-gray-600 fa-sm top-1/2 -translate-y-1/2"
            ></i>
            <i
              v-if="!isShowPasswordConfirm"
              @click="handleShowPasswordConfirm"
              class="fa-regular fa-eye absolute right-3 cursor-pointer text-gray-600 fa-sm top-1/2 -translate-y-1/2"
            ></i>
            <input
              name="passwordConfirm"
              :type="isShowPasswordConfirm ? 'text' : 'password'"
              placeholder="Password confirm"
              v-model="confirmPassword"
            />
          </div>        
          <div class="text-center">
            <button
              @click.prevent="handleResetPassWord"
              class="text-white bg-primaryColor border border-borderColor focus:outline-none hover:bg-secondaryColor focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2"
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
import { watch } from 'vue'
const router = useRouter()

const route = useRoute()

const token = route.params.token

const password = ref('')
const confirmPassword = ref('')
const isShowPassword = ref(false)
const isShowPasswordConfirm = ref(false)
const isValidPassword = ref(false)

watch(
  password,
  (newPassword) => {
    isValidPassword.value = newPassword.length >= 8 || newPassword.length === 0
  },
  {
    immediate: true
  }
)

const handleShowPassword = () => {
  isShowPassword.value = !isShowPassword.value
}

const handleShowPasswordConfirm = () => {
  isShowPasswordConfirm.value = !isShowPasswordConfirm.value
}

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
<style scoped>
input {
  background-color: #eee;
  border: 1px solid #ffffff;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}
</style>