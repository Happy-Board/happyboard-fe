import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  apiGetMyIdeas,
  apiGetMyPublishIdeas,
  apiGetMyDraftIdeas,
  apiGetMyHideIdeas,
  apiGetMyDraftIdeaById,
  apiGetMyHideIdeaById
} from '@/apis/user.api'
import { apiDeleteIdea, apiGetDetailIdea } from '@/apis/idea.api'
import { convertTime } from '@/utils/convert-time'

export const useMyBoardStore = defineStore('my-board', () => {
  const tab = ref('all')
  const myIdeas = ref([])
  const myIdeasBackup = ref([])
  const currentPage = ref(1)
  const ideaToEdit = ref(null)
  const searchString = ref('')

  const apiMap = {
    all: apiGetMyIdeas,
    publish: apiGetMyPublishIdeas,
    hide: apiGetMyHideIdeas,
    draft: apiGetMyDraftIdeas
  }

  const resetState = () => {
    myIdeasBackup.value = []
    myIdeas.value = []
    currentPage.value = 1
  }

  function 
  (tabType) {
    tab.value = tabType
    resetState()
  }

  async function getIdeaDetails(apiFunc, id) {
    try {
      const response = await apiFunc(id)
      ideaToEdit.value = response.data.data
      console.log(ideaToEdit.value)
    } catch (err) {
      console.error(err)
    }
  }

  async function getDetailDraftIdea(id) {
    await getIdeaDetails(apiGetMyDraftIdeaById, id)
  }

  async function getDetailReleaseIdea(id) {
    await getIdeaDetails(apiGetDetailIdea, id)
  }

  async function getDetailHideIdea(id) {
    await getIdeaDetails(apiGetMyHideIdeaById, id)
  }

  async function deleteIdea(id, index) {
    try {
      await apiDeleteIdea(id)
      myIdeas.value.splice(index, 1)
    } catch (err) {
      console.error(err)
    }
  }

  async function loadMore() {
    const query = searchString.value
      ? `?q=${searchString.value}&page=${currentPage.value}&option=${tab.value}`
      : `?page=${currentPage.value}`

    const fetchApi = apiMap[tab.value]
    if (!fetchApi) return

    try {
      const response = await fetchApi(query)
      const newIdeas = response.data.data.ideas.map((idea) => ({
        ...idea,
        createdAt: convertTime(idea.createdAt)
      }))

      myIdeas.value = [...myIdeasBackup.value, ...newIdeas]
      if (newIdeas.length === 10) {
        myIdeasBackup.value = [...myIdeasBackup.value, ...newIdeas]
        currentPage.value++
      }
    } catch (err) {
      console.error(err)
    }
  }

  return {
    tab,
    myIdeas,
    ideaToEdit,
    setTab,
    loadMore,
    deleteIdea,
    getDetailDraftIdea,
    getDetailReleaseIdea,
    getDetailHideIdea
  }
})
