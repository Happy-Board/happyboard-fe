<template>
  <div class="min-w-full border-t border-t-borderColor flex mb-1 justify-between items-end mt-1">
    <div class="py-1 rounded-md flex items-center text-xs">
      <button
        @click="setTab('newest')"
        type="button"
        :class="
          tab === 'newest'
            ? 'text-gray-900 bg-backgroundButtonColor focus:outline-none hover:bg-gray-200  font-medium rounded-lg px-2 py-0.5 me-1'
            : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg px-2 py-0.5 me-1'
        "
      >
        Newest
      </button>
      <button
        @click="setTab('highvote')"
        type="button"
        :class="
          tab === 'highvote'
            ? 'text-gray-900 bg-backgroundButtonColor focus:outline-none hover:bg-gray-200  font-medium rounded-lg px-2 py-0.5 mx-1'
            : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg px-2 py-0.5 mx-1'
        "
      >
        Highest vote
      </button>
      <button
        @click="setTab('highview')"
        type="button"
        :class="
          tab === 'highview'
            ? 'text-gray-900 bg-backgroundButtonColor focus:outline-none hover:bg-gray-200  font-medium rounded-lg px-2 py-0.5 mx-1'
            : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg px-2 py-0.5 mx-1'
        "
      >
        Most view
      </button>
      <button
        @click="setTab('highcomment')"
        type="button"
        :class="
          tab === 'highcomment'
            ? 'text-gray-900 bg-backgroundButtonColor focus:outline-none hover:bg-gray-200  font-medium rounded-lg px-2 py-0.5 mx-1'
            : 'text-gray-900 bg-white focus:outline-none hover:bg-gray-200  font-medium rounded-lg px-2 py-0.5 mx-1'
        "
      >
        Most comment
      </button>
    </div>
    <div class="pt-1 rounded-lg cursor-pointer relative">
      <button
        @click="showCheckBox"
        id="dropdownSearchButton"
        data-dropdown-toggle="dropdownSearch"
        class="inline-flex items-center px-4 py-1 text-xs font-medium text-center text-black bg-backgroundColor rounded-lg hover:bg-backgroundButtonColor border border-borderColor"
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

      <!-- Dropdown menu -->
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
          <!-- <div class="flex justify-center items-center">
            <input
              id="clear"
              type="checkbox"
              value="clear"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              v-model="isClear"
            />
            <label for="clear" class="font-medium text-gray-900 rounded">
              <span class="ml-2 block truncate">Clear</span>
            </label>
          </div> -->
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
    </div>
  </div>
</template>
<script setup>
import { useCategoryStore } from '@/stores/category.store'
import { useHomePageStore } from '@/stores/home.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { getAllCategory } = categoryStore
const homePageStore = useHomePageStore()
const { tab } = storeToRefs(homePageStore)
const { setTab, setCategory, loadMore } = homePageStore
const isShowCategoryCheckbox = ref(false)
const isChooseAll = ref()
const checkedCategory = ref([])
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
const showCheckBox = () => {
  isShowCategoryCheckbox.value = !isShowCategoryCheckbox.value
}

watch(isChooseAll, () => {
  if (isChooseAll.value) {
    checkedCategory.value = categories.value.map((category) => category.title)
  }
})

const handleApply = () => {
  loadMore()
  showCheckBox()
}
</script>
