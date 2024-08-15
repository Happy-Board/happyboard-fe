import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useMyBoardStore = defineStore('my-board', () => {

const tab = ref('publish')

  function setTab(tabType) {
    tab.value = tabType
  }

  return { tab, setTab }
})
