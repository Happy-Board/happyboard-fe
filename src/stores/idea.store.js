import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  apiGetDetailIdea,
  apiCancelVoteIdea,
  apiVoteDownIdea,
  apiVoteUpIdea,
  apiCreateComment
} from '@/apis/idea.api'

export const useIdeaStore = defineStore('idea', () => {
  const idea = ref({})

  async function increaseVote(id) {
    //call api increaseVote
    console.log(idea.value.vote)
    if (idea.value.vote === 'down') {
      apiCancelVoteIdea(id)
        .then(() => {
          idea.value.voteCount += 1
          idea.value.vote = null
        })
        .catch((err) => console.log(err))
    } else if (idea.value.vote === null) {
      apiVoteUpIdea(id)
        .then(() => {
          idea.value.voteCount += 1
          idea.value.vote = 'up'
        })
        .catch((err) => console.log(err))
    } else return
  }
  async function decreaseVote(id) {
    //call api decreaseVote
    if (idea.value.vote === 'up') {
      apiCancelVoteIdea(id)
        .then(() => {
          idea.value.voteCount -= 1
          idea.value.vote = null
        })
        .catch((err) => console.log(err))
    } else if (idea.value.vote === null) {
      apiVoteDownIdea(id)
        .then(() => {
          idea.value.voteCount -= 1
          idea.value.vote = 'down'
        })
        .catch((err) => console.log(err))
    } else return
  }

  async function addComment( ideaId,  body ) {
    apiCreateComment(ideaId, body)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
    // idea.value.comments.push({
    //   id: '1',
    //   author: author,
    //   content: content,
    //   createAt: createAt,
    //   replyFor: replyFor
    // })
  }

  // const getAllCategory = computed(() => category)
  async function getDetailIdea(id) {
    apiGetDetailIdea(id)
      .then((response) => {
        idea.value = response.data.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { idea, getDetailIdea, increaseVote, decreaseVote, addComment }
})
