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
  const isLoading = ref(false)
  const hasMoreComments = ref(true)

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
    if (isLoading.value) return
    isLoading.value = true

    const fetchApi = apiMap[tab.value]
    if (!fetchApi) {
      isLoading.value = false
      return
    }

    const query = searchString.value
      ? `?q=${searchString.value}&page=${currentPage.value}&option=${option.value}`
      : `?page=${currentPage.value}&option=${option.value}`

    try {
      const response = await fetchApi(query)
      if (tab.value === 'Comments') {
        const newComments = response.data.data.comments.map((comment) => ({
          ...comment,
          updatedAt: convertTime(comment.updatedAt),
          createdAt: convertTime(comment.createdAt)
        }))
        if (newComments.length === 0) {
          hasMoreComments.value = false
        } else {
          // Lọc các comment mới chưa có trong myComments
          const newUniqueComments = newComments.filter(
            (comment) =>
              !myComments.value.some((existingComment) => existingComment.id === comment.id)
          )

          // Cập nhật myComments với các comment mới
          myComments.value = [...myComments.value, ...newUniqueComments]

          // Kiểm tra và chuyển trang nếu có đủ 10 comment
          if (newUniqueComments.length === 10) {
            currentPage.value++
          }
        }
      } else {
        const newIdeas = response.data.data.ideas.map((idea) => ({
          ...idea,
          createdAt: convertTime(idea.createdAt)
        }))

        // Lọc các ý tưởng mới chưa có trong myIdeas
        const newUniqueIdeas = newIdeas.filter(
          (idea) => !myIdeas.value.some((existingIdea) => existingIdea.id === idea.id)
        )

        // Cập nhật myIdeas với các ý tưởng mới
        myIdeas.value = [...myIdeas.value, ...newUniqueIdeas]

        // Kiểm tra và chuyển trang nếu có đủ 10 ý tưởng
        if (newUniqueIdeas.length === 10) {
          currentPage.value++
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false // Kết thúc tải
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
