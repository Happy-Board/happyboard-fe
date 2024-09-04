<template>
  <!-- Avatar Skeleton -->
  <div class="avatar flex items-center flex-col md:flex-row gap-2 mb-4">
    <AnimatedPlaceholder
      height="128px"
      width="128px"
      borderRadius="8px"
      class="w-32 h-32 md:w-28 md:h-28 object-cover rounded-lg shadow-2xl"
    />
    <div class="addition md:ms-5 flex flex-col">
      <AnimatedPlaceholder
        height="24px"
        width="150px"
        borderRadius="4px"
        class="font-semibold text-lg mb-3 mx-auto md:mx-0"
      />
      <div class="action mb-2 flex flex-col md:flex-row items-center gap-3">
        <AnimatedPlaceholder
          height="32px"
          width="150px"
          borderRadius="4px"
          class="w-[150px] md:w-auto"
        />
      </div>
      <AnimatedPlaceholder
        height="16px"
        width="200px"
        borderRadius="4px"
        class="font-thin text-sm md:text-md"
      />
    </div>
  </div>
  <!-- End Avatar Skeleton -->

  <!-- Form Information Skeleton -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <AnimatedPlaceholder
      v-for="index in 4"
      :key="index"
      height="48px"
      width="100%"
      borderRadius="8px"
      class="w-full"
    />
  </div>

  <div class="col-span-1 md:col-span-2 mt-4">
    <AnimatedPlaceholder
      height="64px"
      width="100%"
      borderRadius="8px"
      class="w-full min-h-[2.5rem]"
    />
  </div>
  <!-- End Form Information Skeleton -->

  <!-- Button Skeletons -->
  <div class="mt-8 flex flex-col md:flex-row justify-center md:justify-end gap-2">
    <AnimatedPlaceholder height="40px" width="100px" borderRadius="8px" class="w-full md:w-auto" />
    <AnimatedPlaceholder height="40px" width="100px" borderRadius="8px" class="w-full md:w-auto" />
  </div>
  <!-- End Button Skeletons -->
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>

<style scoped>
/* Custom styling, if needed */
</style>
