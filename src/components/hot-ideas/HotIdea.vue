<template>
  <div v-if="hotIdeas.length >= 3" id="carouselElement" ref="carouselElement">
    <carousel ref="myCarousel" :autoplay="hotIdeas.length === 3 ? 0 : 2000" :items-to-show="2" :wrap-around="true" :snap-align="'center'" :pauseAutoplayOnHover="true">
      <slide v-for="(idea, index) in hotIdeas" :key="index">
        <HotCardideaComponenet
          :id="idea.id"
          :content="idea.content"
          :author="idea?.User?.username"
          :title="idea.title"
          :avatar="idea?.User.avatar"
        />
      </slide>
    </carousel>
  </div>
</template>
<script async setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { onMounted, ref } from 'vue'
import HotCardideaComponenet from './HotCardIdeaComponent.vue'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'

const homeStore = useHomePageStore()
const { hotIdeas } = storeToRefs(homeStore)
const { getHotIdeas } = homeStore

const carouselElement = ref()
const myCarousel = ref()

// onMounted(() => {
//   getHotIdeas()
//   carouselElement.value.addEventListener('wheel', (event) => {
//     event.preventDefault()
//     if (event.deltaY > 0) {
//       myCarousel.value.next()
//     } else if (event.deltaY < 0) {
//       myCarousel.value.prev()
//     }
//   })
// })

await getHotIdeas()
onMounted(() => {
  carouselElement.value.addEventListener('wheel', (event) => {
    event.preventDefault()
    if (event.deltaY > 0) {
      myCarousel.value.next()
    } else if (event.deltaY < 0) {
      myCarousel.value.prev()
    }
  })
})
</script>
<style scoped></style>
