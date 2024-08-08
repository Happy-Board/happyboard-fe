<template>
  <div id="comment-block" class="w-full comment-level-1 mt-5 flex items-start gap-1 min-w-[50%]">
    <AnimatedPlaceholder width="30px" height="30px" border-radius="50%" />
    <div class="w-full">
      <AnimatedPlaceholder width="50%" height="50px" border-radius="10px" />

      <div class="flex gap-1 mt-1 text-xs">
        <AnimatedPlaceholder width="20px" height="10px" border-radius="10px" />

        <AnimatedPlaceholder width="20px" height="10px" border-radius="10px" />

        <AnimatedPlaceholder width="20px" height="10px" border-radius="10px" />
      </div>
    </div>
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
