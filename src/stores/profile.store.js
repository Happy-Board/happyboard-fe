import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetMyPublishIdeas } from '@/apis/user.api'
import { apiGetMyComments } from '@/apis/comment.api'
import { apiGetAllUpvotedIdeas, apiGetAllDownvotedIdeas } from '@/apis/idea.api'
import { convertTime } from '@/utils/convert-time'

export const useProfileStore = defineStore('profile', () => {
  const tab = ref('Posts')
  const option = ref('newest')
  const myComments = ref([])
  const myCommentsBackup = ref([])
  const myIdeas = ref([])
  const myIdeasBackup = ref([])
  const currentPage = ref(1)
  const ideaToEdit = ref(null)
  const searchString = ref('')

  // Map API functions based on the current tab
  const apiMap = {
    Posts: apiGetMyPublishIdeas,
    Comments: apiGetMyComments,
    Upvoted: apiGetAllUpvotedIdeas,
    Downvoted: apiGetAllDownvotedIdeas
  }

  // Reset state when switching tab or filter
  const resetState = () => {
    myCommentsBackup.value = []
    myComments.value = []
    myIdeasBackup.value = []
    myIdeas.value = []
    currentPage.value = 1
  }

  // Set the active tab and reset data
  function setTab(tabType) {
    if (tab.value !== tabType) {
      resetState()
      tab.value = tabType
      loadMore()
    }
  }

  // Set the filter option and reset data
  function setOption(filterOption) {
    if (option.value !== filterOption) {
      resetState()
      option.value = filterOption
    }
    loadMore()
  }

  async function loadMore() {
    const fetchApi = apiMap[tab.value]
    if (!fetchApi) return

    const query = searchString.value
      ? `?q=${searchString.value}&page=${currentPage.value}&option=${option.value}`
      : `?page=${currentPage.value}&option=${option.value}`

    try {
      const response = await fetchApi(query)
      if (tab.value === 'Comments') {
        console.log('tab.value in loadmore function: ', tab.value)
        const newComments = response.data.data.comments.map((comment) => ({
          ...comment,
          updatedAt: convertTime(comment.updatedAt),
          createdAt: convertTime(comment.createdAt)
        }))
        myComments.value = [...newComments] // Cập nhật trực tiếp vào myComments
        myCommentsBackup.value = [...newComments]
        if (newComments.length === 10) {
          myCommentsBackup.value = [...myCommentsBackup.value, ...newComments]
          currentPage.value++
        }
        console.log('myComments: ', myComments.value)
      } else {
        const newIdeas = response.data.data.ideas.map((idea) => ({
          ...idea,
          createdAt: convertTime(idea.createdAt)
        }))
        myIdeas.value = [...myIdeasBackup.value, ...newIdeas]
        if (newIdeas.length === 10) {
          myIdeasBackup.value = [...myIdeasBackup.value, ...newIdeas]
          currentPage.value++
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return {
    tab,
    option,
    myComments,
    myIdeas,
    ideaToEdit,
    setTab,
    setOption,
    loadMore
  }
})
