<template>
  <div class="grid grid-cols-6 pt-2 pb-4 border-t border-borderColor w-full">
    <div class="col-span-1 flex flex-col gap-3 mt-1.5 mr-3 text-[12px] items-end">
      <AnimatedPlaceholder width="100%" height="8px" border-radius="10px" />
      <AnimatedPlaceholder width="50%" height="8px" border-radius="10px" />
      <AnimatedPlaceholder width="60%" height="8px" border-radius="10px" />
    </div>
    <div class="col-span-5">
      <div class="title ms-1">
        <AnimatedPlaceholder width="100%" height="25px" border-radius="10px" />
      </div>
      <div class="content mt-2 ms-1">
        
          <AnimatedPlaceholder width="100%" height="40px" border-radius="10px" />
       
      </div>
      <div class="flex flex-row justify-end items-center text-[12px] pt-1">
        <AnimatedPlaceholder width="20px" height="20px" border-radius="50%" />

        <AnimatedPlaceholder width="8%" height="8px" border-radius="10px" />

        <div class="flex items-center mx-2">
          <AnimatedPlaceholder width="20px" height="15px" border-radius="10px" />

          <AnimatedPlaceholder width="50px" height="8px" border-radius="10px" />
        </div>

        <div class="flex">
          <AnimatedPlaceholder width="50px" height="8px" border-radius="10px" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
