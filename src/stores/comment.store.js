import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetComment, apiCreateComment } from '@/apis/idea.api'

export const useCommentStore = defineStore('comment', () => {
  const comments = ref()
  // const getAllCategory = computed(() => category)
  async function getAllComments(ideaId) {
    apiGetComment(ideaId)
      .then((response) => {
        comments.value = response.data.data.comments
      })
      .catch((err) => console.log(err))
  }

  async function addComment(ideaId, body) {
    apiCreateComment(ideaId, body)
      .then(() => {
        getAllComments(ideaId)
      })
      .catch((err) => console.log(err))
  }
  async function addReplyComment(ideaId, body) {
    apiCreateComment(ideaId, body)
    getAllComments(ideaId)
      .then(() => {})
      .catch((err) => console.log(err))
    // comments.value.push({
    //   id: '1',
    //   author: author,
    //   content: content,
    //   createAt: createAt,
    //   replyFor: replyFor
    // })
  }

  return { comments, getAllComments, addComment, addReplyComment }
})
