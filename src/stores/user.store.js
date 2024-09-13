import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  apiGetProfile,
  apiUpdateProfile,
  apiGetMyHistoryActivities,
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
  const accessToken = ref()

  async function getProfile() {
    return await apiGetProfile()
      .then((response) => {
        profile.value = response.data.data
      })
  }

  function updateProfileState(newProfile) {
    profile.value = newProfile
  }

  async function updateProfile(formData) {
    return await apiUpdateProfile(formData)
  }

  async function getMyHistoryActivities() {
    return await apiGetMyHistoryActivities().then((response) => {
      response.data.data.forEach((history) => {
        history.createdAt = convertTime(history.createdAt)
      })
      historyActivities.value = response.data.data
    })
  }

  async function getDetailDraftIdea(id) {
    return await apiGetMyDraftIdeaById(id).then((response) => {
      ideaToEdit.value = response.data.data
      console.log(ideaToEdit.value)
    })
  }
  async function getDetailReleaseIdea(id) {
    return await apiGetDetailIdea(id).then((response) => {
      ideaToEdit.value = response.data.data
      console.log(ideaToEdit.value)
    })
  }
  async function getDetailHideIdea(id) {
    await apiGetMyHideIdeaById(id)
      .then((response) => {
        ideaToEdit.value = response.data.data
        console.log(response.data.data)
      })
      .catch((err) => console.log(err))
  }
  function setAccessToken(token) {
    accessToken.value = token
  }
  return {
    profile,
    historyActivities,
    myIdeas,
    ideaToEdit,
    accessToken,
    getProfile,
    updateProfile,
    getMyHistoryActivities,
    getDetailDraftIdea,
    getDetailHideIdea,
    getDetailReleaseIdea,
    updateProfileState,
    setAccessToken
  }
})
