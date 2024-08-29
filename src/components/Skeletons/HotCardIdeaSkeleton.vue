<template>
  <div
    class="w-[36%] h-fit px-2 py-1 my-3 mx-2 border border-borderColor rounded-lg shadow-md shadow-gray-300 overflow-visible relative"
  >
    <img src="/animations/fire.gif" class="absolute -top-3 -right-3 w-7 h-7" alt="" />

    <div class="title ms-1 cursor-grab active:cursor-grabbing">
      <AnimatedPlaceholder width="100%" height="20px" border-radius="8px" />
    </div>
    <div class="content mt-2 ms-1">
      <AnimatedPlaceholder width="100%" height="50px" border-radius="8px" />
    </div>
    <div class="flex flex-row justify-start items-center text-[12px] pt-1 ms-1 gap-1">
      <AnimatedPlaceholder width="16px" height="16px" border-radius="50%" />

      <AnimatedPlaceholder width="40px" height="5px" border-radius="8px" />
    </div>
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
