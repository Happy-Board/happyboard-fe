<template>
  <div class="w-full">
    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 xl:w-56 lg:w-48 md:w-40 h-screen pt-28 transition-transform -translate-x-full bg-white border-r border-r-gray-300 sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul class="space-y-2 font-medium">
          <li>
            <router-link
              to="/"
              :class="`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${props.active === 'home' ? 'active' : ''}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                :class="`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900  ${props.active === 'home' ? 'active' : ''}`"
              >
                <path
                  d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
                />
                <path
                  d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
                />
              </svg>

              <span class="ms-3">Home</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/create-idea"
              :class="`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${props.active === 'create-idea' ? 'active' : ''}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                :class="`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 ${props.active === 'create-idea' ? 'active' : ''}`"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="flex-1 ms-3 whitespace-nowrap">Create idea</span>
              <!-- <span
                class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                >Pro</span
              > -->
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              :class="`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${props.active === 'notification' ? 'active' : ''}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                :class="`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 ${props.active === 'notification' ? 'active' : ''}`"
              >
                <path
                  d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="flex-1 ms-3 whitespace-nowrap">Notification</span>
              <span
                class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"
                >3</span
              >
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              :class="`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${props.active === 'my-board' ? 'active' : ''}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                :class="`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 ${props.active === 'my-board' ? 'active' : ''}`"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="flex-1 ms-3 whitespace-nowrap">My board </span>
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              :class="`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${props.active === 'history-activity' ? 'active' : ''}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                :class="`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 ${props.active === 'history-activity' ? 'active' : ''}`"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="flex-1 ms-3 whitespace-nowrap">History activity</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
// import { useRoute, useRouter } from 'vue-router'

// const router = useRouter()
// const route = useRoute()
const props = defineProps({
  active: String
})
</script>
<style scoped>
.active {
  background-color: #dfdfdf;
  color: black;
}
</style>
