<template>
  <div class="col-span-6 pt-[100px] z-0 bg-white px-5 h-screen overflow-hidden space-y-5">
    <EditIdea />
  </div>
  <div class="col-span-2">
    <LeftbarComponent />
  </div>
</template>
<script setup>
import EditIdea from '@/components/idea/EditIdea.vue'
import LeftbarComponent from '@/components/my-ideas/LeftbarComponent.vue'
</script>
<style></style>
