<template>
  <div
    class="flex flex-col justify-center h-screen bg-primaryColor bg-gradient-to-r from-primaryColor to-backgroundColor items-center relative z-10"
  >
    <div :class="`container${classAdded} z-10 mt-10`" id="container">
      <div class="form-container sign-up">
        <form>
          <h1 class="font-bold text-2xl mb-3">Create Account</h1>

          <input name="username" type="text" placeholder="Name" v-model="signUpInfo.username" />
          <input name="email" type="email" placeholder="Email" v-model="signUpInfo.email" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            v-model="signUpInfo.password"
          />
          <input
            name="passwordConfirm"
            type="password"
            placeholder="Password confirm"
            v-model="signUpInfo.passwordConfirm"
          />
          <button
            @click.prevent="signUp"
            class="group overflow-hidden relative before:absolute before:inset-0 before:bg-gray-300 before:scale-x-0 before:origin-right before:transition before:duration-300 hover:before:scale-x-100 hover:before:origin-left hover:!bg-secondaryColor"
          >
            <span class="relative !text-white font-bold">Sign Up</span>
          </button>
          <div class="!text-center !w-full !mt-5">
            <span class="font-light text-gray-300"
              >---------------------------
              <span class="text-gray-500 font-medium">or</span>
              ---------------------------</span
            >
            <div class="flex mt-4 !items-center">
              <button
                @click.prevent="ggLogin"
                class="gg-login !bg-white w-full !text-black flex border !border-borderColor !rounded-full px-2 py-1 font-medium hover:!bg-gray-200 hover:text-secondaryColor justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 256 262"
                  class="!mr-3"
                >
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  />
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  />
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  />
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  />
                </svg>
                <span class=""> Sign in with google</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="form-container sign-in">
        <form>
          <h1 class="font-bold text-2xl !mb-4">Sign In</h1>
          <!-- <div class="!text-center !w-full !mb-2">
            <div class="flex mt-4 !items-center">
              <button
                @click="ggLogin"
                class="gg-login !mb-3 !bg-gray-200 w-full flex border border-gray-300 !rounded-md px-2 py-1 font-medium hover:!bg-gray-300 hover:text-secondaryColor justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 256 262"
                  class="!mr-3"
                >
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  />
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  />
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  />
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  />
                </svg>
                <span class=""> Sign in with google</span>
              </button>
            </div>
            <span class="font-light text-gray-300"
              >---------------------------
              <span class="text-gray-500 font-medium">or</span>
              ---------------------------</span
            >
          </div> -->
          <input name="email" type="email" placeholder="Email" v-model="signInInfo.email" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            v-model="signInInfo.password"
          />
          <span
            @click="setIsShowForgetPasswordPopUp(true)"
            class="my-2 font-medium hover:text-secondaryColor hover:cursor-pointer"
          >
            Forget Your Password?
          </span>
          <button
            @click.prevent="signIn"
            class="group overflow-hidden relative hover:!bg-secondaryColor"
          >
            <span class="relative font-bold text-white">Sign In</span>
          </button>
          <div class="!text-center !w-full !mt-5">
            <span class="font-light text-gray-300"
              >---------------------------
              <span class="text-gray-500 font-medium">or</span>
              ---------------------------</span
            >
            <div class="flex mt-4 !items-center">
              <button
                @click.prevent="ggLogin"
                class="gg-login !bg-white w-full !text-black flex border !border-borderColor !rounded-full px-2 py-1 font-medium hover:!bg-gray-200 hover:text-secondaryColor justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 256 262"
                  class="!mr-3"
                >
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  />
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  />
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  />
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  />
                </svg>
                <span class=""> Sign in with google</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1 class="font-extrabold text-3xl">Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button
              class="hidden-button group overflow-hidden relative !bg-primaryColor !text-white hover:!bg-secondaryColor !border !border-white"
              id="login"
              @click="setClassAdded('')"
            >
              <span class="relative text-base !text-white font-bold"> Sign In </span>
            </button>
          </div>
          <div class="toggle-panel toggle-right">
            <h1 class="font-extrabold text-3xl">Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>

            <button
              class="hidden-button group overflow-hidden relative !bg-primaryColor !text-white hover:!bg-secondaryColor !border !border-white"
              id="register"
              @click="setClassAdded(' active')"
            >
              <span class="relative text-base text-white font-bold"> Sign Up </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isShowForgetPasswordPopUp"
      class="forget-password absolute flex flex-col items-center justify-center w-full h-full bg-backgroundColor/80 z-50"
    >
      <div
        class="bg-[#fff] h-auto rounded-lg shadow-md !p-8 text-center relative border border-borderColor"
      >
        <div v-if="!isSentEmail">
          <p class="font-bold text-xl">Enter your Email to get new password.</p>
          <input
            class="bg-[#eee] !py-2 !px-3 w-full focus:outline-0 !my-4 rounded-sm"
            type="email"
            placeholder="example@gmail.com"
            v-model="emailToGetPassword"
          />

          <button
            @click="handleForgotPassword"
            class="group !px-3 !py-1 rounded-full overflow-hidden relative bg-primaryColor hover:bg-secondaryColor"
          >
            <span class="relative text-white">Get password</span>
          </button>
        </div>
        <div v-if="isSentEmail" class="space-y-5 w-full">
          <p class="font-bold text-xl">
            We have sent an email to account <span class="">{{ emailToGetPassword }}</span>
          </p>
          <p class="font-bold text-xl">Please confirm it to reset your password!</p>
        </div>
        <svg
          @click="setIsShowForgetPasswordPopUp(false)"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="absolute right-[2px] top-[2px] w-5 h-5 hover:cursor-pointer font-bold"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  </div>
  <div
    class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out"
    :class="{ 'opacity-0 pointer-events-none': !loading, 'opacity-100': loading }"
  >
    <div
      class="absolute w-full h-full !bg-gray-900 opacity-50 transition-opacity duration-500 ease-in-out"
      @click="closeModal"
    ></div>

    <div
      class="absolute max-h-full transition-transform duration-500 ease-in-out transform"
      :class="[maxWidth, { 'scale-100': loading, 'scale-0': !loading }]"
    >
      <div class="container-loading overflow-hidden md:rounded">
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
          <p class="font-semibold text-white">Wait a minute ...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiSignIn, apiSignUp } from '@/apis/auth.api'
import { notify } from '../utils/toast'
import { requestPermission } from '@/configs/firebase.config'
import { apiForgotPassword } from '@/apis/user.api'

onMounted(() => {
  requestPermission()
})
const ggLogin = () => {
  console.log('gg login')
  window.open('http://localhost:8000/api/v1/auth/google', '_self')
}
const router = useRouter()
const signInInfo = reactive({
  email: '',
  password: ''
})
const signUpInfo = reactive({
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
})
const isSentEmail = ref(true)
const classAdded = ref('')
const isShowForgetPasswordPopUp = ref(false)
const emailToGetPassword = ref()
const loading = ref(false)
// const sendEmailSuccess = () => {
//   isSentEmail.value = true
// }

const handleForgotPassword = () => {
  loading.value = true
  apiForgotPassword({ email: emailToGetPassword.value })
    .then((res) => {
      loading.value = false
      notify('success', 'Please visit the link we sent to your email to reset your password!')
      isShowForgetPasswordPopUp.value = false
      emailToGetPassword.value = ''
      console.log(res)
    })
    .catch((err) => {
      loading.value = false
      if (err.response.status === 400) {
        notify('error', 'Email does not exist!')
      }
    })
}
const setIsShowForgetPasswordPopUp = (value) => {
  isSentEmail.value = false
  isShowForgetPasswordPopUp.value = value
}

const resetInfo = () => {
  signInInfo.email = ''
  signInInfo.password = ''
  signUpInfo.email = ''
  signUpInfo.username = ''
  signUpInfo.password = ''
  signUpInfo.passwordConfirm = ''
}

const setClassAdded = (value) => {
  classAdded.value = value
  resetInfo()
}

const signIn = () => {
  loading.value = true
  if (!signInInfo.email || !signInInfo.password) {
    notify('warning', 'Please complete all information !')
    return
  }
  apiSignIn(signInInfo)
    .then((res) => {
      loading.value = false
      localStorage.setItem('uname', res.data.data.user.username)
      localStorage.setItem('uid', res.data.data.user.id)
      localStorage.setItem('accessToken', res.data.data.tokens.accessToken)
      localStorage.setItem('isLoggedIn', true)
      notify('success', 'Sign in successfully !')
      setTimeout(() => {
        router.push('/')
      }, 1000)
    })
    .catch((err) => {
      loading.value = false
      if (err?.response?.status === 400) {
        notify('error', 'Password incorrect!')
      } else if (err?.response?.status === 409) {
        notify('error', 'Account does not exist!')
      } else {
        console.log('some thing went wrong')
        notify('error', 'Something went wrong !')
      }
    })
}

const signUp = () => {
  loading.value = true
  if (
    !signUpInfo.email ||
    !signUpInfo.password ||
    !signUpInfo.username ||
    !signUpInfo.passwordConfirm
  ) {
    notify('warning', 'Please complete all information !')
    return
  }
  if (signUpInfo.password !== signUpInfo.passwordConfirm) {
    notify('warning', 'Password and Password confirm is not the same !')
    return
  }
  apiSignUp(signUpInfo)
    .then((res) => {
      loading.value = false
      notify('success', 'Sign up successfully, please sign in !')
      console.log(res)
      setClassAdded('')
      resetInfo()
    })
    .catch((err) => {
      loading.value = false
      console.log('err: ', err.response.status)
      if (err.response.status === 409) {
        notify('error', 'Email existed !')
      } else {
        console.log('some thing went wrong')
        notify('error', 'Something went wrong !')
      }
    })
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.container {
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0 10px;
}

.container button {
  background-color: #7061d1;
  color: #ffffff;
  font-size: 15px;
  padding: 8px 45px;
  border: 1px solid transparent;
  border-radius: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 10px;
  cursor: pointer;
}

.container button.hidden-button {
  background-color: transparent;
}

.container button::before {
  font-size: 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.container form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
}

.container input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.active .sign-in {
  transform: translateX(100%);
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: move 0.6s;
}

@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.social-icons {
  margin: 20px 0;
}

.social-icons a {
  border: 1px solid #ccc;
  border-radius: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  width: 40px;
  height: 40px;
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 100px 0;
}

.toggle {
  height: 100%;
  background: linear-gradient(to right, #eff1f3, #5d4ca5);
  color: #000000;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
  font-weight: bold;
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}
</style>
