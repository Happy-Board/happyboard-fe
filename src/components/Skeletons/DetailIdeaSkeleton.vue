<template>
  <div class="flex items-start border-b border-borderColor pb-2 w-full">
    <div class="flex flex-col items-start w-full justify-between">
      <AnimatedPlaceholder width="100%" height="40px" border-radius="5px" />
      <div class="flex justify-between mt-5 w-full">
        <div class="flex items-center">          
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
        <div class="">
            <AnimatedPlaceholder width="80px" height="30px" border-radius="30%" />
        </div>
      </div>
    </div>
  </div>
  <div class="border-0 pb-5 border-b mb-3 w-full">
    <AnimatedPlaceholder width="100%" height="150px" border-radius="5px" />
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
