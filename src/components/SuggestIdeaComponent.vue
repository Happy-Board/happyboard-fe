<template>
  <div class="w-[70%] bg-white p-2 px-4 rounded-lg mb-10 border shadow-xl">
    <div class="flex justify-between border-b border-b-gray-400 mb-3 items-end">
      <span class="font-medium text-lg">{{ props.feature }}</span>
      <span class="hover:underline text-sm"><a href="" class="">Sea all</a></span>
    </div>
    <div
      class="my-2 text-blue-900 text-sm cursor-pointer font-medium hover:underline hover:text-blue-900 hover:font-bold"
      v-for="(item, index) in props.titleIdeas"
      :key="index"
    >
      {{ item }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  feature: String,
  titleIdeas: Array
})
</script>
