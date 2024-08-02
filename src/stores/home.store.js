import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetIdeas, apiGetRecentIdeas } from '@/apis/idea.api'
import { convertTime } from '@/utils/convert-time'

export const useHomePageStore = defineStore('home', () => {
  const pageData = ref([])
  const searchString = ref('')
  const currentPage = ref(1)
  const tab = ref('newest')
  const query = ref()
  const hotIdeas = ref([])
  const recentIdeas = ref([])

  // const getAllCategory = computed(() => category)
  async function getPageData() {
    if (searchString.value !== '') {
      query.value = `?q=${searchString.value}&page=${currentPage.value}`
    } else {
      query.value = `?page=1`
    }
    apiGetIdeas(query.value)
      .then((response) => {
        pageData.value = response.data.data.ideas
        console.log(pageData.value)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getHotIdeas() {
    //api get hot ideas
    apiGetIdeas('?option=highvote')
      .then((response) => {
        hotIdeas.value = response.data.data.ideas
      })
      .catch((err) => console.log(err))
  }

  async function getRecentIdeas() {
    apiGetRecentIdeas()
      .then((response) => {
        recentIdeas.value = response.data.data
      })
      .catch((err) => {
        console.log(err)
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
    if (searchString.value !== '') {
      query.value = `?q=${searchString.value}&option=${tab.value}`
    } else {
      query.value = `?option=${tab.value}&page=1`
    }
    apiGetIdeas(query.value)
      .then((response) => {
        pageData.value = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function loadMore() {
    if (searchString.value !== '') {
      query.value = `?q=${searchString.value}&page=${currentPage.value}&option=${tab.value}`
    } else {
      query.value = `?page=${currentPage.value}`
    }
    apiGetIdeas(query.value)
      .then((response) => {
        response.data.data.ideas.forEach((idea) => {
          idea.createdAt = convertTime(idea.createdAt)
        })
        pageData.value = [...pageData.value, ...response.data.data.ideas]
        currentPage.value++
      })
      .catch((err) => console.log(err))
  }

  function setCurrentQuery(setCurrentQuery) {
    query.value = setCurrentQuery
  }

  return {
    pageData,
    searchString,
    currentPage,
    tab,
    hotIdeas,
    recentIdeas,
    getPageData,
    setCurrentPage,
    setSearchString,
    setTab,
    loadMore,
    setCurrentQuery,
    getHotIdeas,
    getRecentIdeas
  }
})
