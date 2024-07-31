import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetComment, apiCreateComment } from '@/apis/idea.api'
import { apiCancelReaction, apiCreateReaction } from '@/apis/comment.api'

export const useCommentStore = defineStore('comment', () => {
  const comments = ref()
  // const getAllCategory = computed(() => category)
  function getAllComments(ideaId) {
    apiGetComment(ideaId)
      .then((response) => {
        comments.value = response.data.data.comments
      })
      .catch((err) => console.log(err))
  }

  function addComment(ideaId, body) {
    apiCreateComment(ideaId, body)
      .then(() => {
        getAllComments(ideaId)
        console.log('add comment')
      })
      .catch((err) => console.log(err))
  }
  function addReplyComment(ideaId, body) {
    apiCreateComment(ideaId, body)
      .then(() => {
        getAllComments(ideaId)
      })
      .catch((err) => console.log(err))
  }

  function createReaction(commentId, body, ideaId) {
    apiCreateReaction(body, commentId)
      .then(() => {
        getAllComments(ideaId)
      })
      .catch((err) => console.log(err))
  }

  function cancelReaction(commentId, ideaId) {
    console.log('cancel');
    apiCancelReaction(commentId)
      .then(() => {
        getAllComments(ideaId)
      })
      .catch((err) => console.log(err))
  }

  return { comments, getAllComments, addComment, addReplyComment, createReaction, cancelReaction }
})
