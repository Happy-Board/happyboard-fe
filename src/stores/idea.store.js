import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  apiGetDetailIdea,
  apiCancelVoteIdea,
  apiVoteDownIdea,
  apiVoteUpIdea,
  apiGetRelatedIdeas
} from '@/apis/idea.api'

export const useIdeaStore = defineStore('idea', () => {
  const idea = ref({})
  const hotIdeas = ref([])
  const recentIdeas = ref([])
  const relatedIdeas = ref([])

  
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

  async function getRelatedIdeas(ideaId) {
    apiGetRelatedIdeas(ideaId)
      .then((response) => {
        relatedIdeas.value = response.data.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    idea,
    hotIdeas,
    recentIdeas,
    relatedIdeas,
    getDetailIdea,
    increaseVote,
    decreaseVote,
    getRelatedIdeas
  }
})
