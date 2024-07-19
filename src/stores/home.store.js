import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetIdeas } from '@/apis/idea.api'

export const useHomePageStore = defineStore('home', () => {
  const pageData = ref({})
  const searchString = ref('')
  const currentPage = ref(1)
  const tab = ref('newest')
  const query = ref({
    query: '',
    tab: 'newest',
    page: ''
  })

  async function increaseVote(index) {
    pageData.value.data[index].totalVote += 1
    pageData.value.data[index].isVoted = true
  }
  async function reduceVote(index) {
    pageData.value.data[index].totalVote -= 1
    pageData.value.data[index].isVoted = false
  }

  // const getAllCategory = computed(() => category)
  async function getPageData(query) {
    apiGetIdeas(query)
      .then((response) => {
        pageData.value = response.data.data
        console.log(pageData.value)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function setCurrentPage(page) {
    currentPage.value = page
  }
  function setSearchString(search) {
    searchString.value = search
  }
  function setTab(tabSort) {
    tab.value = tabSort
  }

  return {
    pageData,
    query,
    searchString,
    currentPage,
    tab,
    getPageData,
    increaseVote,
    reduceVote,
    setCurrentPage,
    setSearchString,
    setTab
  }
})
