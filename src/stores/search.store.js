import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetIdeas } from '@/apis/idea.api'

export const useSearchStore = defineStore('search', () => {
  const searchResults = ref([])
  const searchData = ref([])
  // const getAllCategory = computed(() => category)
  async function getAllResults(url) {
    if (url === '?q=') {
      searchResults.value = []
      return
    }
    apiGetIdeas(url)
      .then((response) => {
        searchResults.value = response.data.data
        searchData.value = response.data.data.ideas
      })
      .catch((err) => console.log(err))
  }

  function resetSearchData() {
    searchData.value = [];
  }

  return { searchResults, searchData, getAllResults, resetSearchData }
})
