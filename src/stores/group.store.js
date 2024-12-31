import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetGroupById, apiGetGroupByUser } from '@/apis/group.api'

export const useGroupStore = defineStore('group', () => {
  const groups = ref([])
  const headerGroup = ref()

  async function getAllGroups() {
    apiGetGroupByUser()
      .then((response) => {
        groups.value = response.data.data.groups?.map((group) => {
          return { groupId: group.groupId, name: group.group.name, avatar: group.group.avatar }
        })
      })
      .catch((err) => console.log(err))
  }

  async function getGroupById(id) {
    apiGetGroupById(id)
      .then((response) => {
        headerGroup.value = response.data.data
      })
      .catch((err) => console.log(err))
  }

  return { groups, headerGroup, getAllGroups, getGroupById }
})
