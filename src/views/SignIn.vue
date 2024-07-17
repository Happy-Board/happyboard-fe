<template>
  <div
    class="flex flex-col justify-center h-screen bg-[#c9d6ff] bg-gradient-to-r from-gray-400 to-white items-center relative"
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
            class="group overflow-hidden relative before:absolute before:inset-0 before:bg-gray-300 before:scale-x-0 before:origin-right before:transition before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
          >
            <span class="relative text-black font-bold">Sign Up</span>
          </button>
        </form>
      </div>
      <div class="form-container sign-in">
        <form>
          <h1 class="font-bold text-2xl mb-3">Sign In</h1>
          <input name="email" type="email" placeholder="Email" v-model="signInInfo.email" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            v-model="signInInfo.password"
          />
          <span
            @click="setIsShowForgetPasswordPopUp(true)"
            class="my-2 font-medium hover:text-[#000000] hover:cursor-pointer"
          >
            Forget Your Password?
          </span>
          <button
            @click.prevent="signIn"
            class="group overflow-hidden relative before:absolute before:inset-0 before:bg-gray-300 before:scale-x-0 before:origin-right before:transition before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
          >
            <span class="relative font-bold text-black">Sign In</span>
          </button>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1 class="font-extrabold text-3xl">Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button
              class="hidden-button group overflow-hidden relative before:absolute before:inset-0 before:bg-gray-300 before:scale-x-0 before:origin-right before:transition before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
              id="login"
              @click="setClassAdded('')"
            >
              <span class="relative text-base text-black font-bold"> Sign In </span>
            </button>
          </div>
          <div class="toggle-panel toggle-right">
            <h1 class="font-extrabold text-3xl">Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>

            <button
              class="hidden-button group overflow-hidden relative before:absolute before:inset-0 before:bg-gray-300 before:scale-x-0 before:origin-right before:transition before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
              id="register"
              @click="setClassAdded(' active')"
            >
              <span class="relative text-base text-black font-bold"> Sign Up </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isShowForgetPasswordPopUp"
      class="forget-password absolute flex flex-col items-center justify-center w-full h-full bg-[#5525c43d] z-50"
    >
      <div
        class="max-w-[50%] bg-[#fff] h-auto rounded-lg shadow-md shadow-black p-5 py-8 text-center relative"
      >
        <p class="font-bold text-xl">Enter your Email to get new password.</p>
        <input
          class="bg-[#eee] py-2 px-3 w-full focus:outline-0 my-4 rounded-sm"
          type="email"
          placeholder="example@gmail.com"
        />

        <button
          class="group p-2 py-1 rounded-md overflow-hidden relative bg-[#512da8] before:absolute before:inset-0 before:bg-[#5a27d3] before:scale-x-0 before:origin-right before:transition before:duration-300 hover:before:scale-x-100 hover:before:origin-left"
        >
          <span class="relative text-white">Get password</span>
        </button>
        <svg
          @click="setIsShowForgetPasswordPopUp(false)"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="absolute right-[2px] top-[2px] w-5 h-5 hover:cursor-pointer"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiSignIn, apiSignUp } from '@/apis/auth.api'
import { notify } from '../utils/toast'

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

const classAdded = ref('')
const isShowForgetPasswordPopUp = ref(false)

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
  if (!signInInfo.email || !signInInfo.password) {
    notify('warning', 'Please complete all information !')
    return
  }
  apiSignIn(signInInfo)
    .then((res) => {
      console.log(res)
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
      console.log(err)
      if (err?.response?.data?.statusCode === 400) {
        notify('error', 'Email or password invalid !')
      } else {
        console.log('some thing went wrong')
        notify('error', 'Something went wrong !')
      }
    })
}

const signUp = () => {
  console.log(signUpInfo)
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
      notify('success', 'Sign up successfully, please sign in !')
      console.log(res)
      setClassAdded('')
      resetInfo()
    })
    .catch((err) => {
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
  background-color: #afafaf;
  color: #000000;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.container button.hidden-button {
  background-color: transparent;
  border-color: #000000;
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
  background: linear-gradient(to right, #f7f7f7, #818181);
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
