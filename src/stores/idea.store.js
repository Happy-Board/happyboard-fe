import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetIdeas } from '@/apis/idea.api'

export const useIdeaStore = defineStore('idea', () => {
  const idea = ref({
    id: '1',
    author: 'nguyen van a',
    title: 'Top 10 doi hinh leo rank than toc mua 14.3B',
    category: {
      title: 'work',
      icon: 'fa-laptop'
    },
    totalComment: 500,
    totalVote: 200,
    totalView: 1000,
    description:
      '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi autem voluptates quod sint alias vitae numquam mollitia veniam fuga cumque, ullam recusandae! Ex voluptatibus ullam quasi debitis quo? Ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi autem voluptates quod sint alias vitae numquam mollitia veniam fuga cumque, ullam recusandae! Ex voluptatibus ullam quasi debitis quo? Ratione.</p>',
    statusVote: 'increse',
    createAt: '13/7/2024',
    comments: [
      {
        id: '1',
        author: 'nguyen van a',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi autem volupt',
        createAt: '13/7/2024',
        reply: [
          {
            id: '1',
            author: 'nguyen van b',
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi autem volupt',
            createAt: '13/7/2024',
            replyFor: 'nguyen van a'
          },
          {
            id: '1',
            author: 'nguyen van c',
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi autem volupt',
            createAt: '13/7/2024',
            replyFor: 'nguyen van a'
          }
        ]
      }
    ]
  })

  async function increaseVote() {
    //call api increaseVote
    if (idea.value.statusVote === 'decrese') {
      idea.value.totalVote += 1
      idea.value.statusVote = ''
    } else if(idea.value.statusVote === '') {
      idea.value.totalVote += 1
      idea.value.statusVote = 'increse'
    } else return
  }
  async function decreaseVote() {
    //call api decreaseVote

    if (idea.value.statusVote === 'increse') {
      idea.value.totalVote -= 1
      idea.value.statusVote = ''
    } else if( idea.value.statusVote === '') {
      idea.value.totalVote -= 1
      idea.value.statusVote = 'decrese'
    } else return
  }

  async function addComment({ ideaId, author, content, createAt, replyFor }) {
    idea.value.comments.push({
      id: '1',
      author: author,
      content: content,
      createAt: createAt,
      replyFor: replyFor
    })

    getIdea(ideaId)
  }

  // const getAllCategory = computed(() => category)
  async function getIdea(id) {
    try {
      const response = await apiGetIdeas(id)
      idea.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  return { idea, getIdea, increaseVote, decreaseVote, addComment }
})
