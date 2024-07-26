<template>
  <div id="carouselElement" ref="carouselElement">
    <carousel ref="myCarousel" :items-to-show="2" :wrap-around="true" :snap-align="'start'">
      <slide v-for="slide in 10" :key="slide">
        <HotCardideaComponenet />
      </slide>
    </carousel>
  </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { onMounted, ref } from 'vue'
import HotCardideaComponenet from './HotCardIdeaComponent.vue'

const carouselElement = ref()
const myCarousel = ref()

onMounted(() => {
  carouselElement.value.addEventListener('wheel', (event) => {
    event.preventDefault()
    console.log('scroll')
    if (event.deltaY > 0) {
      myCarousel.value.next()
    } else if (event.deltaY < 0) {
      myCarousel.value.prev()
    }
  })
})
</script>
<style scoped></style>
