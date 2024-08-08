<template>
  <div class="w-[70%] bg-white p-2 px-4 rounded-lg mb-5 border shadow-xl">
    <div class="flex justify-between border-b border-b-gray-400 mb-3 items-end">
      <span class="font-semibold text-[18px]">{{ props.feature }}</span>
      <span class="hover:underline text-sm"><a href="" class="">Sea all</a></span>
    </div>
    <div
      class="my-2 flex text-blue-900 text-sm cursor-pointer font-medium hover:underline hover:text-blue-900 hover:font-semibold"
      v-for="(idea, index) in props.ideas"
      :key="index"
      @click="viewDetailIdea(idea.id)"
    >
      <div class="line-clamp-2">{{ idea.title }}</div>
    </div>
  </div>
</template>
<script async setup>
import { useRouter } from 'vue-router'
import { useIdeaStore } from '@/stores/idea.store'
import { useHomePageStore } from '@/stores/home.store'

const homePageStore = useHomePageStore()
const { getRecentIdeas } = homePageStore
const ideaStore = useIdeaStore()
const { getDetailIdea } = ideaStore

const props = defineProps({
  feature: String,
  ideas: Array
})

console.log(props)
const router = useRouter()
const viewDetailIdea = (id) => {
  router.push({ name: 'detail-idea', params: { id: id } })
  getDetailIdea(id)
  // router.go()
}

await getRecentIdeas()
</script>
