import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetCategory } from '@/apis/category.api'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([
    {
      id: 1,
      title: 'Work',
      icon: 'fa-laptop'
    },
    {
      id: 2,
      title: 'health',
      icon: 'fa-heart-pulse'
    },
    {
      id: 3,
      title: 'Entertainment',
      icon: 'fa-icons'
    },
    {
      id: 4,
      title: 'Food',
      icon: 'fa-utensils'
    },
    {
      id: 5,
      title: 'Sports',
      icon: 'fa-futbol'
    },
    {
      id: 6,
      title: 'Technique',
      icon: 'fa-compass-drafting'
    }
  ])
  // const getAllCategory = computed(() => category)
  async function getAllCategory() {
    try {
      const response = await apiGetCategory()
      categories.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  return { categories, getAllCategory }
})
