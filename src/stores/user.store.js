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

  async function getProfile() {
    await apiGetProfile()
      .then((response) => {
        profile.value = response.data.data
      })
      .catch((err) => console.log(err))
  }

  function updateProfileState(newProfile) {
    profile.value = newProfile
  }

  async function updateProfile(formData) {
    return await apiUpdateProfile(formData)
  }


  async function getMyHistoryActivities() {
    return await apiGetMyHistoryActivities()
      .then((response) => {
        response.data.data.forEach((history) => {
          history.updatedAt = convertTime(history.updatedAt)
        })
        historyActivities.value = response.data.data
      })

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
    getMyHistoryActivities,
    getDetailDraftIdea,
    getDetailHideIdea,
    getDetailReleaseIdea,
    updateProfileState
  }
})
