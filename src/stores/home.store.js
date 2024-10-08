import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetIdeas, apiGetRecentIdeas, apiGetHotIdeas } from '@/apis/idea.api'
import { convertTime } from '@/utils/convert-time'
import { useRouter } from 'vue-router'

const router = useRouter()

export const useHomePageStore = defineStore('home', () => {
  const pageData = ref([])
  const pageDataBackup = ref([])
  const searchString = ref('')
  const category = ref('')
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
        if (error.response.status === 401) {
          localStorage.clear()
          router.push({ name: 'sign-in' })
        }
      })
  }

  async function getHotIdeas() {
    //api get hot ideas
    await apiGetHotIdeas()
    await apiGetHotIdeas()
      .then((response) => {
        hotIdeas.value = response.data.data
        hotIdeas.value = response.data.data
      })
      .catch((err) => console.log(err))
  }

  async function getRecentIdeas() {
    await apiGetRecentIdeas()
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
  function setCategory(checkedCategory) {
    category.value = checkedCategory
  }

  async function loadMore() {
    if (searchString.value !== '') {
      query.value = `?q=${searchString.value}&page=${currentPage.value}`
    } else {
      query.value = `?page=${currentPage.value}`
    }
    if (category.value !== '') {
      query.value = `${query.value}&categories=${category.value}`
    }
    if (tab.value !== '') {
      query.value = `${query.value}&option=${tab.value}`
    }
    return await apiGetIdeas(query.value).then((response) => {
      response.data.data.ideas.forEach((idea) => {
        idea.createdAt = convertTime(idea.createdAt)
      })
      pageData.value = [...pageDataBackup.value, ...response.data.data.ideas]
      if (response.data.data.ideas.length === 10) {
        pageDataBackup.value = [...pageDataBackup.value, ...response.data.data.ideas]
        currentPage.value++
      }
    })
  }

  function setTab(tabSort) {
    tab.value = tabSort
    currentPage.value = 1
    loadMore()
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
    getRecentIdeas,
    setCategory
  }
})
