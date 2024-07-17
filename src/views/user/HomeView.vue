<template>
  <div>
    <div class="fixed top-0 z-50"><HeaderComponent /></div>
    <div class="grid grid-cols-10 gap-3">
      <div class="col-span-2">
        <SidebarComponent active="home" />
      </div>
      <div class="col-span-5 flex pt-[100px] z-0 bg-white px-8 border">
        <div class="">
          <div class="flex mb-5 justify-between items-end">
            <div class="font-medium text-2xl">{{ `${pageData.total} ideas` }}</div>
            <div class="px-1.5 py-1 border border-gray-400 rounded-md flex items-center">
              <button
                @click="sortIdea('newest')"
                type="button"
                :class="
                  sort === 'newest'
                    ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-sm px-2 py-0.5 mx-1'
                    : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-sm px-2 py-0.5 mx-1'
                "
              >
                Newest
              </button>
              <button
                @click="sortIdea('highest-vote')"
                type="button"
                :class="
                  sort === 'highest-vote'
                    ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-sm px-2 py-0.5 mx-1'
                    : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-sm px-2 py-0.5 mx-1'
                "
              >
                Highest vote
              </button>
              <button
                @click="sortIdea('most-view')"
                type="button"
                :class="
                  sort === 'most-view'
                    ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-sm px-2 py-0.5 mx-1'
                    : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-sm px-2 py-0.5 mx-1'
                "
              >
                Most view
              </button>
              <button
                @click="sortIdea('most-comment')"
                type="button"
                :class="
                  sort === 'most-comment'
                    ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-sm px-2 py-0.5 mx-1'
                    : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-sm px-2 py-0.5 mx-1'
                "
              >
                Most comment
              </button>
            </div>
          </div>
          <div v-for="idea in pageData.data" :key="idea.id" class="">
            <CartIdeaComponent
              :id="idea.id"
              :index="pageData.data.indexOf(idea)"
              :author="idea.author"
              :category="idea.category"
              :description="idea.description"
              :title="idea.title"
              :totalComment="idea.totalComment"
              :totalVote="idea.totalVote"
              :totalView="idea.totalView"
              :isVoted="idea.isVoted"
              :createAt="idea.createAt"
              @vote="handleIncreaseVote"
              @unvote="handleReduceVote"
            />
          </div>
        </div>
      </div>
      <div class="col-span-3">
        <div class="col-span-3 mt-[95px] ms-14">
          <SuggestIdeaComponent feature="Hot ideas" :titleIdeas="titleIdea" />
          <SuggestIdeaComponent feature="Related ideas" :titleIdeas="titleIdea" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CartIdeaComponent from '@/components/CartIdeaComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SuggestIdeaComponent from '@/components/SuggestIdeaComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const titleIdea = [
  'Top 10 doi hinh leo rank than toc',
  'Top 10 doi hinh leo rank than toc',
  'Top 10 doi hinh leo rank than toc',
  'Top 10 doi hinh leo rank than toc',
  'Top 10 doi hinh leo rank than toc',
]
const homePageStore = useHomePageStore()
const { pageData } = storeToRefs(homePageStore)
const { getPageData, increaseVote, reduceVote } = homePageStore
const query = ''
const sort = ref('newest')
onMounted(() => {
  getPageData(query)
})

const handleIncreaseVote = (index) => {
  console.log(index)
  increaseVote(index)
}

const handleReduceVote = (index) => {
  reduceVote(index)
}

const sortIdea = (query) => {
  sort.value = query
}
</script>
<style scoped></style>
