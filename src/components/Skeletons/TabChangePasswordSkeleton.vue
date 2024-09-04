<template>
  <div>
    <AnimatedPlaceholder height="72px" width="100%" borderRadius="8px" class="mb-8" />
    <AnimatedPlaceholder height="72px" width="100%" borderRadius="8px" class="mb-8" />
    <AnimatedPlaceholder height="72px" width="100%" borderRadius="8px" class="mb-8" />
    <div class="mt-8 flex flex-col md:flex-row justify-center md:justify-end gap-2">
      <AnimatedPlaceholder
        height="40px"
        width="100px"
        borderRadius="8px"
        class="w-full md:w-auto"
      />
      <AnimatedPlaceholder
        height="40px"
        width="150px"
        borderRadius="8px"
        class="w-full md:w-auto"
      />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>

<style scoped>
/* Custom styling, if needed */
</style>
