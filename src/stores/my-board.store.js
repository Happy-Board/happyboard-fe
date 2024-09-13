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
  const ideaToEdit = ref()
  const searchString = ref('')
  const query = ref()
  const tab = ref('all')
  const myIdeas = ref([])
  const myIdeasBackup = ref([])
  const currentPage = ref(1)
  const ideaToEdit = ref()
  const searchString = ref('')
  const query = ref()

  function setTab(tabType) {
    tab.value = tabType
    myIdeasBackup.value = []
    currentPage.value = 1
  }

 

  async function getDetailDraftIdea(id) {
    await apiGetMyDraftIdeaById(id)
      .then((response) => {
        ideaToEdit.value = response.data.data
        console.log(ideaToEdit.value)
      })
      .catch((err) => console.log(err))
  }
  async function getDetailReleaseIdea(id) {
    await apiGetDetailIdea(id)
      .then((response) => {
        ideaToEdit.value = response.data.data
        console.log(ideaToEdit.value)
      })
      .catch((err) => console.log(err))
  }
  async function getDetailHideIdea(id) {
    await apiGetMyHideIdeaById(id)
      .then((response) => {
        ideaToEdit.value = response.data.data
        console.log(response.data.data)
      })
      .catch((err) => console.log(err))
  }

  async function deleteIdea(id, index) {
    return await apiDeleteIdea(id)
    .then(() => {
      myIdeas.value.splice(index, 1)
      })
  }

  async function loadMore() {
    if (searchString.value !== '') {
      query.value = `?q=${searchString.value}&page=${currentPage.value}&option=${tab.value}`
    } else {
      query.value = `?page=${currentPage.value}`
    }
    if (tab.value === 'all') {
      return await apiGetMyIdeas(query.value).then((response) => {
        response.data.data.ideas.forEach((idea) => {
          idea.createdAt = convertTime(idea.createdAt)
        })
        myIdeas.value = [...myIdeasBackup.value, ...response.data.data.ideas]
        if (response.data.data.ideas.length === 5) {
          myIdeasBackup.value = [...myIdeasBackup.value, ...response.data.data.ideas]
          currentPage.value++
        }
      })
    }
    if (tab.value === 'publish') {
      return await apiGetMyPublishIdeas(query.value).then((response) => {
        response.data.data.ideas.forEach((idea) => {
          idea.createdAt = convertTime(idea.createdAt)
        })
        myIdeas.value = [...myIdeasBackup.value, ...response.data.data.ideas]
        if (response.data.data.ideas.length === 5) {
          myIdeasBackup.value = [...myIdeasBackup.value, ...response.data.data.ideas]
          currentPage.value++
        }
      })
    }
    if (tab.value === 'hide') {
      return await apiGetMyHideIdeas(query.value).then((response) => {
        response.data.data.ideas.forEach((idea) => {
          idea.createdAt = convertTime(idea.createdAt)
        })
        myIdeas.value = [...myIdeasBackup.value, ...response.data.data.ideas]
        if (response.data.data.ideas.length === 5) {
          myIdeasBackup.value = [...myIdeasBackup.value, ...response.data.data.ideas]
          currentPage.value++
        }
      })
    }
    if (tab.value === 'draft') {
      return await apiGetMyDraftIdeas(query.value).then((response) => {
        response.data.data.ideas.forEach((idea) => {
          idea.createdAt = convertTime(idea.createdAt)
        })
        myIdeas.value = [...myIdeasBackup.value, ...response.data.data.ideas]
        if (response.data.data.ideas.length === 5) {
          myIdeasBackup.value = [...myIdeasBackup.value, ...response.data.data.ideas]
          currentPage.value++
        }
      })
    }
  }

  return {
    tab,
    myIdeas,
    ideaToEdit,
    getDetailDraftIdea,
    getDetailHideIdea,
    getDetailReleaseIdea,
    setTab,
    loadMore,
    deleteIdea
  }
})
