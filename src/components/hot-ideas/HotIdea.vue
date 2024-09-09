<template>
  <div v-if="hotIdeas.length >= 3" id="carouselElement" ref="carouselElement">
    <carousel
      ref="myCarousel"
      :autoplay="hotIdeas.length === 3 ? 0 : 2000"
      :items-to-show="2"
      :wrap-around="true"
      :snap-align="'center'"
      :pauseAutoplayOnHover="true"
    >
      <slide v-for="(idea, index) in hotIdeas" :key="index">
        <HotCardideaComponenet
          :id="idea.id"
          :content="idea.content"
          :author="idea?.User?.username"
          :title="idea.title"
          :avatar="idea?.User.avatar"
          :total-comment="idea?.commentCount"
          :total-view="idea?.viewCount"
          :total-vote="idea?.voteCount"
        />
      </slide>
      <template #addons>
      <pagination />
    </template>
    </carousel>
  </div>
</template>
<script async setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination  } from 'vue3-carousel'
import { onMounted, ref, watch } from 'vue'
import HotCardideaComponenet from './HotCardIdeaComponent.vue'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'

const homeStore = useHomePageStore()
const { hotIdeas } = storeToRefs(homeStore)
const { getHotIdeas } = homeStore

const carouselElement = ref()
const myCarousel = ref()
let isAddEvent = false
let addEvent = () => {
  if (isAddEvent || !carouselElement.value) {
    return
  }
  carouselElement.value.addEventListener('wheel', (event) => {
    event.preventDefault()
    if (event.deltaY > 0) {
      myCarousel.value.next()
    } else if (event.deltaY < 0) {
      myCarousel.value.prev()
    }
  })
  isAddEvent = true
}

watch(hotIdeas, () => {
  addEvent()
})

await getHotIdeas()
onMounted(() => {
  addEvent()
})
</script>

<style scoped>

.carousel__pagination{
  margin: 2px 0 0 !important;
}

.carousel__pagination :deep(.carousel__pagination-button--active)::after {
  background-color: #310cda !important;
}
.carousel__pagination :deep(.carousel__pagination-button)::after {
  border-radius: 50%;

}
</style>
