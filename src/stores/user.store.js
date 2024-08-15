import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  apiGetProfile,
  apiUpdateProfile,
  apiGetMyIdeas,
  apiGetMyHistoryActivities,
  apiGetMyPublishIdeas,
  apiGetMyDraftIdeas,
  apiGetMyHideIdeas,
  apiGetMyDraftIdeaById,
  apiGetMyHideIdeaById
} from '@/apis/user.api'
import { apiGetDetailIdea } from '@/apis/idea.api'
import { convertTime } from '@/utils/convert-time'
export const useUserStore = defineStore('user', () => {
  const profile = ref()
  const myIdeas = ref([])
  const historyActivities = ref([])
  const ideaToEdit = ref()

  async function getProfile() {
    await apiGetProfile()
      .then((response) => {
        profile.value = response.data.data
      })
      .catch((err) => console.log(err))
  }

  async function updateProfile() {
    await apiUpdateProfile()
      .then((response) => {
        profile.value = response.data.data
      })
      .catch((err) => console.log(err))
  }

  async function getMyIdeas() {
    await apiGetMyIdeas()
      .then((response) => {
        myIdeas.value = response.data.data.ideas
        console.log(response.data.data)
      })
      .catch((err) => console.log(err))
  }

  async function getMyHideIdeas() {
    await apiGetMyHideIdeas()
      .then((response) => {
        response.data.data.ideas.forEach((idea) => {
          idea.createdAt = convertTime(idea.createdAt)
        })
        myIdeas.value = response.data.data.ideas
      })
      .catch((err) => console.log(err))
  }

  async function getMyPublishIdeas() {
    await apiGetMyPublishIdeas()
      .then((response) => {
        response.data.data.ideas.forEach((idea) => {
          idea.createdAt = convertTime(idea.createdAt)
        })
        myIdeas.value = response.data.data.ideas
      })
      .catch((err) => console.log(err))
  }

  async function getMyDraftIdeas() {
    await apiGetMyDraftIdeas()
      .then((response) => {
        response.data.data.ideas.forEach((idea) => {
          idea.createdAt = convertTime(idea.createdAt)
        })
        myIdeas.value = response.data.data.ideas
      })
      .catch((err) => console.log(err))
  }

  async function getMyHistoryActivities() {
    await apiGetMyHistoryActivities()
      .then((response) => {
        response.data.data.forEach((history) => {
          history.createdAt = convertTime(history.createdAt)
        })
        historyActivities.value = response.data.data
      })
      .catch((err) => console.log(err))
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


  return {
    profile,
    historyActivities,
    myIdeas,
    ideaToEdit,
    getProfile,
    updateProfile,
    getMyIdeas,
    getMyHistoryActivities,
    getMyHideIdeas,
    getMyPublishIdeas,
    getMyDraftIdeas,
    getDetailDraftIdea,
    getDetailHideIdea,
    getDetailReleaseIdea
  }
})
