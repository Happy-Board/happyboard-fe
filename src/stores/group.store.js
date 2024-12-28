import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGroupStore = defineStore('group', () => {
  const groups = ref([])

  groups.value = ['mfx-nhóm ăn chơi', 'myfpt-nhóm học tiếng nhật', 'billard club']

  return { groups }
})
