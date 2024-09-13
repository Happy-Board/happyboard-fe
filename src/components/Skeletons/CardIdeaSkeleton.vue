<template>
  <!-- <div class="grid grid-cols-9 pt-2 pb-1 border-t border-borderColor w-full">
    <div class="col-span-9">
      <div class="title flex justify-between">
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
  </div> -->
  <div class="grid grid-cols-9 pt-2 pb-1 border-t border-borderColor">
    <div class="col-span-9">
      <div class="title flex justify-between">
        <AnimatedPlaceholder width="100%" height="25px" border-radius="10px" />
      </div>
      <div class="content mt-2">
        <div class="content mt-2 mb-1 border-0 break-words line-clamp-3">
          <AnimatedPlaceholder width="100%" height="60px" border-radius="10px" />
        </div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div class="flex items-center gap-3 mt-1.5 text-[12px]">
          <div class="flex items-center font-medium text-gray-900">
            <AnimatedPlaceholder width="30px" height="10px" border-radius="10px" />
          </div>
          <div class="flex items-center font-medium text-primaryColor">
            <AnimatedPlaceholder width="30px" height="10px" border-radius="10px" />
          </div>
          <div class="flex items-center font-medium text-secondaryColor">
            <AnimatedPlaceholder width="30px" height="10px" border-radius="10px" />
          </div>
        </div>

        <div class="flex justify-end items-center text-[12px]">
          <AnimatedPlaceholder width="20px" height="20px" border-radius="50%" />

          <AnimatedPlaceholder width="50px" height="8px" border-radius="10px" />

          <div class="flex relative justify-end items-center">
            <AnimatedPlaceholder width="20px" height="15px" border-radius="10px" />

            <AnimatedPlaceholder width="50px" height="8px" border-radius="10px" />
          </div>

          <div class="flex">
            <AnimatedPlaceholder width="100px" height="8px" border-radius="10px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
