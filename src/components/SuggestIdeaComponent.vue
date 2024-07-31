<template>
  <div class="w-[70%] bg-white p-2 px-4 rounded-lg mb-5 border shadow-xl">
    <div class="flex justify-between border-b border-b-gray-400 mb-3 items-end">
      <span class="font-semibold text-[18px]">{{ props.feature }}</span>
      <span class="hover:underline text-sm"><a href="" class="">Sea all</a></span>
    </div>
    <div
      class="my-2 text-blue-900 text-sm cursor-pointer font-medium hover:underline hover:text-blue-900 hover:font-semibold"
      v-for="(idea, index) in props.ideas"
      :key="index"
      @click="viewDetailIdea(idea.id)"
    >
      {{ idea.title }}
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  feature: String,
  ideas: Array
})
const router = useRouter()
const viewDetailIdea = (id) => {
 console.log(id)
  router.push({ name: 'detail-idea', params: { id: id } }).then(() => router.go())
  // router.go()
}
</script>
