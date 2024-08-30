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
      <div class="col-span-7 flex w-full gap-2 ms-5 px-5 justify-between items-center">
        <SearchComponent />
        <div class="w-fit pe-5">
          <router-link
            to="/"
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
          </router-link>
        </div>
      </div>

      <div class="col-span-3 flex me-5 items-center gap-8 px-5">
        <AnimatedPlaceholder width="36px" height="36px" border-radius="50%" />
        <div class="flex items-center object-fill">
          <AnimatedPlaceholder width="37px" height="37px" border-radius="50%" />

          <span class="ms-2 font-semibold text-lg cursor-pointer">
            <AnimatedPlaceholder width="142px" height="18px" border-radius="5px" />
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
import SearchComponent from '../home/SearchComponent.vue'
</script>
