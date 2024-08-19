<template>
  <div class="flex items-start border-b pb-2 w-full">
    <div class="flex flex-col items-center pr-2 border-r gap-1 w-16">
      <div class="border border-gray-500 px-2 py-1 rounded-full">
        <i class="fa-solid fa-caret-up fa-xl"></i>
      </div>
      <AnimatedPlaceholder width="20px" height="10px" border-radius="5px" />

      <div class="px-2 py-1 border border-gray-500 rounded-full">
        <i class="fa-solid fa-caret-down fa-xl"></i>
      </div>
    </div>
    <div class="flex flex-col items-start ps-2 w-full justify-between">
      <AnimatedPlaceholder width="100%" height="40px" border-radius="5px" />
      <div class="flex justify-between mt-5">
        <div class="flex items-center mt-2">
          <AnimatedPlaceholder width="20px" height="20px" border-radius="50%" />
          <AnimatedPlaceholder width="50px" height="8px" border-radius="5px" />
          <div class="flex gap-5 ms-5 items-center">
            <div class="flex items-center text-[12px]">
              <AnimatedPlaceholder width="15px" height="15px" border-radius="5px" />
              <AnimatedPlaceholder width="50px" height="8px" border-radius="5px" />
            </div>
            <AnimatedPlaceholder width="80px" height="8px" border-radius="5px" />
            <AnimatedPlaceholder width="50px" height="8px" border-radius="5px" />
            <AnimatedPlaceholder width="50px" height="8px" border-radius="5px" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="border-0 pb-5 border-b mb-3 ps-2 w-full">
    <AnimatedPlaceholder width="100%" height="150px" border-radius="5px" />
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
