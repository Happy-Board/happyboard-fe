<template>
  <div class="min-w-full flex mb-1 justify-between md:items-end items-center mt-1">
    <!-- Dropdown menu for sorting -->
    <div class="md:pt-1 rounded-lg cursor-pointer relative">
      <button
        @click="toggleSortMenu"
        id="dropdownSortButton"
        data-dropdown-toggle="dropdownSort"
        class="inline-flex items-center px-4 py-1 text-[9px] md:text-xs font-medium text-center text-black bg-backgroundColor rounded-2xl hover:bg-backgroundButtonColor"
        type="button"
        :class="isShowSortMenu ? '!bg-backgroundButtonColor' : ''"
      >
        Sort by
        <svg
          class="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div
        v-if="isShowSortMenu"
        id="dropdownSort"
        class="z-10 bg-white rounded-lg shadow absolute left-0 top-10 border border-borderColor min-w-40"
      >
        <ul class="px-3 py-2 text-sm text-gray-700" aria-labelledby="dropdownSortButton">
          <li
            v-for="(sortOption, index) in sortOptions"
            :key="index"
            @click="selectSortOption(sortOption)"
            class="flex items-center p-2 rounded hover:bg-backgroundColor cursor-pointer text-xs"
          >
            <span :class="sortOption.value === tab ? 'font-bold text-primaryColor' : ''">
              {{ sortOption.label }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- filter by category -->
    <!-- <div class="md:pt-1 rounded-lg cursor-pointer relative">
      
      <button
        @click="showCheckBox"
        id="dropdownSearchButton"
        data-dropdown-toggle="dropdownSearch"
        class="inline-flex items-center px-4 py-1 text-[9px] md:text-xs font-medium text-center text-black bg-backgroundColor rounded-lg hover:bg-backgroundButtonColor border border-borderColor"
        type="button"
        :class="isShowCategoryCheckbox ? '!bg-backgroundButtonColor' : ''"
      >
        Category
        <svg
          class="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        v-if="isShowCategoryCheckbox"
        id="dropdownSearch"
        class="z-10 bg-white rounded-lg shadow absolute right-0 top-10 border border-borderColor min-w-40"
      >
        <ul
          class="max-h-48 h-fit px-3 pb-2 pt-2 overflow-y-auto text-sm text-gray-700"
          aria-labelledby="dropdownSearchButton"
        >
          <li v-for="(category, index) in categories" :key="index">
            <div class="flex items-center p-2 rounded hover:bg-backgroundColor text-xs">
              <input
                :id="category.id"
                type="checkbox"
                :value="category.title"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                v-model="checkedCategory"
              />
              <label :for="category.id" class="ms-2 font-medium text-gray-900 rounded"
                ><div class="flex items-center">
                  <i :class="category.icon + ' fa-solid'"></i>

                  <span class="ml-3 block truncate line-clamp-1 break-words">{{
                    category.title
                  }}</span>
                </div></label
              >
            </div>
          </li>
        </ul>
        <div class="flex px-5 justify-between text-xs my-3 border-t-borderColor">
          <div class="flex justify-center items-center">
            <input
              id="all"
              type="checkbox"
              value="all"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              v-model="isChooseAll"
            />
            <label for="all" class="font-medium text-gray-900 rounded">
              <span class="ml-2 block truncate font-bold">Choose All</span>
            </label>
          </div>
        </div>
        <div class="flex justify-center py-2">
          <button
            @click="handleApply"
            class="flex items-center px-4 py-1 text-sm text-white font-medium bg-primaryColor/90 rounded-lg hover:bg-secondaryColor/90"
          >
            Apply
          </button>
        </div>
      </div>
      <div v-if="isShowCategoryCheckbox" class="absolute top-10 right-0 w-full"></div>
    </div> -->
  </div>
</template>


<script setup>
import { useCategoryStore } from '@/stores/category.store'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
})

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { getAllCategory } = categoryStore
const { tab } = storeToRefs(props.store)
const { setOption, setCategory } = props.store
const isShowCategoryCheckbox = ref(false)
const isChooseAll = ref()
const checkedCategory = ref([])
const dropdownRef = ref(null)

onMounted(() => {
  getAllCategory()
})

watch(checkedCategory, (newCheckedCategory) => {
  if (checkedCategory.value.length === categories.value.length) {
    isChooseAll.value = true
  } else {
    isChooseAll.value = false
  }
  setCategory(newCheckedCategory.toString())
})

// const showCheckBox = () => {
//   isShowCategoryCheckbox.value = !isShowCategoryCheckbox.value
// } 

watch(isChooseAll, () => {
  if (isChooseAll.value) {
    checkedCategory.value = categories.value.map((category) => category.title)
  }
})

// const handleApply = () => {
//   loadMore()
//   showCheckBox()
// }

const isShowSortMenu = ref(false)
const sortOptions = ref([
  { label: 'Newest', value: 'newest' },
  { label: 'Highest vote', value: 'highvote' },
  { label: 'Most view', value: 'highview' },
  { label: 'Most comment', value: 'highcomment' }
])

const toggleSortMenu = () => {
  isShowSortMenu.value = !isShowSortMenu.value
}

const selectSortOption = (option) => {
  setOption(option.value) 
  isShowSortMenu.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isShowSortMenu.value = false
    isShowCategoryCheckbox.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
