<template>
    <nav
      class="block w-full px-[2%] py-3 mx-auto text-black shadow-md bg-gradient-to-tr from-blue-gray-900 to-blue-gray-800 border-b border-b-gray-400 bg-white"
    >
      <div class="grid grid-cols-10 items-center justify-between text-black gap-y-4">
        <div class="col-span-2">
          <a
            href="/"
            class="w-fit block cursor-pointer py-1.5 font-sans text-2xl font-bold leading-relaxed tracking-normal text-inherit antialiased"
          >
            Happy Board
          </a>
        </div>
        <div class="col-span-4 relative flex w-full gap-2">
          <SearchComponent
          />
        </div>
        <div class="col-span-4 flex justify-end gap-1">
          <div class="flex justify-end items-center object-fill">
            <AnimatedPlaceholder width="30px" height="30px" border-radius="50%"/>
            <span class="w-[30px]"></span>
            <AnimatedPlaceholder width="30px" height="30px" border-radius="50%"/>
            <span  class="ms-2 font-semibold text-lg cursor-pointer"
              >
              <AnimatedPlaceholder width="150px" height="30px" border-radius="5px"/>
              
            </span>
          </div>
        </div>
      </div>
    </nav>
  </template>
  <script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
</script>