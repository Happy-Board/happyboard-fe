<template>
  <div class="tabs flex bg-white font-semibold text-base w-full space-x-3">
    <div
      @click="handleSetTab('text')"
      class="cursor-pointer hover:text-secondaryColor hover:underline hover:decoration-blue-700 hover:underline-offset-8 hover:decoration-4 px-2 bg-white w-fit"
      :class="
        tab === 'text'
          ? 'underline decoration-blue-700 underline-offset-8 decoration-4 text-secondaryColor'
          : ''
      "
    >
      Text
    </div>
    <div
      @click="handleSetTab('media')"
      class="cursor-pointer hover:text-gray-700 hover:underline hover:decoration-gray-700 hover:underline-offset-8 hover:decoration-4 px-2 bg-white w-fit flex items-center gap-2"
      :class="
        tab === 'media'
          ? 'underline decoration-gray-700 underline-offset-8 decoration-4 text-gray-700'
          : ''
      "
    >
      Image & Video
    </div>
    <div
      @click="handleSetTab('link')"
      class="cursor-pointer hover:text-red-700 hover:underline hover:decoration-red-700 hover:underline-offset-8 hover:decoration-4 px-2 bg-white w-fit flex items-center gap-2"
      :class="
        tab === 'link'
          ? 'underline decoration-red-700 underline-offset-8 decoration-4 text-red-700'
          : ''
      "
    >
      Link
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  tab: String
})
const emit = defineEmits(['setTab'])
const handleSetTab = (selectedTab) => {
  emit('setTab', selectedTab)
}
</script>
<style scoped></style>
