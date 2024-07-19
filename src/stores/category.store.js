import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetCategory } from '@/apis/category.api'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  // const getAllCategory = computed(() => category)
  async function getAllCategory() {
    apiGetCategory()
      .then((response) => {
        categories.value = response.data.data.categories
      })
      .catch((err) => console.log(err))
  }

  return { categories, getAllCategory }
})
