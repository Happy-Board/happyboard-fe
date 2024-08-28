<template>
  <div class="w-full bg-white p-2 px-4 rounded-lg mb-5 border border-borderColor mx-auto shadow-xl">
    <div class="flex justify-between border-b border-b-gray-200 mb-3 items-end pb-1">
      <AnimatedPlaceholder width="100px" height="20px" border-radius="10px" />
    </div>
    <div class="space-y-3 pb-2">
      <AnimatedPlaceholder width="100%" height="20px" border-radius="10px" />
      <AnimatedPlaceholder width="100%" height="20px" border-radius="10px" />
      <AnimatedPlaceholder width="100%" height="20px" border-radius="10px" />
      <AnimatedPlaceholder width="100%" height="20px" border-radius="10px" />
      <AnimatedPlaceholder width="100%" height="20px" border-radius="10px" />
    </div>
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
