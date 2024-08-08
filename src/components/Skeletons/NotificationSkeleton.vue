<template>
  <div class="mx-2 w-full">
    <div
      class="flex border items-start my-1 rounded-lg hover:bg-gray-100 w-full ps-3 pe-8 py-1 cursor-pointer line-clamp-1 gap-1"
    >
      <AnimatedPlaceholder width="48px" height="48px" border-radius="50%" />

      <div class="w-full space-y-1">
        <AnimatedPlaceholder width="100%" height="50px" border-radius="10px" />
        <AnimatedPlaceholder width="50px" height="5px" border-radius="10px" />
      </div>
    </div>
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
<style></style>
