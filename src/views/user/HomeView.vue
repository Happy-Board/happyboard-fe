<template>
  <div>
    <div class="fixed top-0 z-50"><HeaderComponent /></div>
    <div class="grid grid-cols-10 gap-3">
      <div class="col-span-2">
        <SidebarComponent active="home" />
      </div>
      <div class="col-span-5 pt-[90px] z-0 bg-white px-8 border w-full">
        <div class="mb-6">
          <HotIdea />
        </div>
        <div class="flex-1">
          <div class="min-w-full flex mb-2 justify-end items-end">
            <div class="px-1.5 py-1 border border-gray-400 rounded-md flex items-center">
              <button
                @click="setTab('newest')"
                type="button"
                :class="
                  tab === 'newest'
                    ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                    : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                "
              >
                Newest
              </button>
              <button
                @click="setTab('highvote')"
                type="button"
                :class="
                  tab === 'highvote'
                    ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                    : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                "
              >
                Highest vote
              </button>
              <button
                @click="setTab('highview')"
                type="button"
                :class="
                  tab === 'highview'
                    ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                    : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                "
              >
                Most view
              </button>
              <button
                @click="setTab('highcomment')"
                type="button"
                :class="
                  tab === 'highcomment'
                    ? 'text-gray-900 bg-gray-300 focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                    : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg text-xs px-2 py-0.5 mx-1'
                "
              >
                Most comment
              </button>
            </div>
          </div>
          <div v-if="searchResults.length !== 0" class="">
            <div v-for="idea in searchResults.ideas" :key="idea.id" class="">
              <CartIdeaComponent
                :id="idea.id.toString()"
                :author="idea.User.username"
                :category="idea.Category"
                :description="idea.content"
                :title="idea.title"
                :totalComment="idea.commentCount"
                :totalVote="idea.voteCount"
                :totalView="idea.viewCount"
                :createdAt="idea.createdAt"
              />
            </div>
            <InfiniteLoading @infinite="loadMore" />
            <!-- <PaginationComponentVue
              :totalPage="searchResults.totalPage"
              :currentPage="searchResults.currentPage"
            /> -->
          </div>
          <div v-else>
            <div v-for="idea in pageData" :key="idea?.id" class="">
              <CartIdeaComponent
                :id="idea.id.toString()"
                :author="idea.User.username"
                :category="idea.Category"
                :description="idea.content"
                :title="idea.title"
                :totalComment="idea.commentCount"
                :totalVote="idea.voteCount"
                :totalView="idea.viewCount"
                :createdAt="idea.createdAt"
              />
            </div>
            <InfiniteLoading @infinite="loadMore" />
            <!-- <PaginationComponentVue
              :totalPage="pageData.totalPage"
              :currentPage="pageData.currentPage"
              @nextPage="handleGetNextPage"
              @prePage="handleGetPrePage"
              @getPage="handleGetPage"
            /> -->
          </div>
        </div>
      </div>
      <div class="col-span-3">
        <div class="col-span-3 mt-[95px] ms-14">
          <SuggestIdeaComponent
            feature="Recently ideas"
            :titleIdeas="titleIdea"
            :ideas="recentIdeas"
          />
          <SuggestIdeaComponent feature="History activity" :ideas="titleIdea" />
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
import { onMounted } from 'vue'
import { useSearchStore } from '@/stores/search.store'
// import PaginationComponentVue from '@/components/PaginationComponent.vue'
import HotIdea from '@/components/HotIdea.vue'
import InfiniteLoading from 'v3-infinite-loading'

const titleIdea = [
  'Top 10 doi hinh leo rank than toc',
  'Top 10 doi hinh leo rank than toc',
  'Top 10 doi hinh leo rank than toc',
  'Top 10 doi hinh leo rank than toc',
  'Top 10 doi hinh leo rank than toc'
]
const searchStore = useSearchStore()
const { searchResults } = storeToRefs(searchStore)
const homePageStore = useHomePageStore()
const { pageData, tab, recentIdeas } = storeToRefs(homePageStore)
const {  setTab, loadMore, getRecentIdeas } = homePageStore
onMounted(() => {
  // getPageData()
  getRecentIdeas()
})

// const handleGetNextPage = () => {
//   getPageData(`?page=${currentPage.value + 1}`)
//   setCurrentPage(currentPage.value + 1)
// }

// const handleGetPrePage = () => {
//   getPageData(`?page=${currentPage.value - 1}`)
//   setCurrentPage(currentPage.value - 1)
// }
// const handleGetPage = (page) => {
//   getPageData(`?page=${page}`)
//   setCurrentPage(page)
// }
</script>
<style>
.container.spinner {
  margin: 10px !important;
  border: blue !important;
}
</style>
