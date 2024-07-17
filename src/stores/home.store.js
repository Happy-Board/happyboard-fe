import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetIdeas } from '@/apis/idea.api'

export const useHomePageStore = defineStore('home', () => {
  const pageData = ref({
    total: 30,
    totalPage: 3,
    currentPage: 1,
    pageSize: 10,
    data: [
      {
        id: '1',
        author: 'nguyen van a',
        title: 'Top 10 doi hinh leo rank than toc mua 14.3B',
        category: {
          id: '1',
          title: 'Work',
          icon: 'fa-laptop'
        },
        totalComment: 500,
        totalVote: 200,
        totalView: 1000,
        description:
          '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi autem voluptates quod sint alias vitae numquam mollitia veniam fuga cumque, ullam recusandae! Ex voluptatibus ullam quasi debitis quo? Ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi autem voluptates quod sint alias vitae numquam mollitia veniam fuga cumque, ullam recusandae! Ex voluptatibus ullam quasi debitis quo? Ratione.</p>',
        isVoted: true,
        createAt: '13/7/2024'
      },
      {
        id: '2',
        author: 'nguyen van b',
        title: 'Top 10 doi hinh leo rank than toc mua 14.3B',
        category: {
          id: '1',
          title: 'Entertainment',
          icon: 'fa-icons'
        },
        totalComment: 800,
        totalVote: 200,
        totalView: 1000,
        description:
          '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi autem voluptates quod sint alias vitae numquam mollitia veniam fuga cumque, ullam recusandae! Ex voluptatibus ullam quasi debitis quo? Ratione.Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eligendi autem voluptates quod sint alias vitae numquam mollitia veniam fuga cumque, ullam recusandae! Ex voluptatibus ullam quasi debitis quo? Ratione.</p>',
        isVoted: false,
        createAt: '13/7/2024'
      }
    ]
  })

  async function increaseVote(index) {
    pageData.value.data[index].totalVote += 1
    pageData.value.data[index].isVoted = true
  }
  async function reduceVote(index) {
    pageData.value.data[index].totalVote -= 1
    pageData.value.data[index].isVoted = false
  }

  // const getAllCategory = computed(() => category)
  async function getPageData(query) {
    apiGetIdeas(query)
      .then((response) => {
        pageData.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { pageData, getPageData, increaseVote, reduceVote }
})
