<template>
  <div class="w-full">
    <aside
      id="logo-sidebar"
      class="fixed bg-backgroundColor top-0 left-0 z-20 2xl:w-64 xl:w-56 lg:w-48 md:w-40 h-screen pt-24 transition-transform -translate-x-full border-r border-borderColor sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-backgroundColor">
        <ul class="space-y-2 font-medium">
          <!-- Các mục khác -->
          <li>
            <router-link
              to="/"
              :class="[
                'flex items-center p-2 text-gray-600 rounded-lg hover:bg-backgroundButtonColor group ',
                isActiveTab('home') ? 'bg-backgroundButtonColor text-primaryColor' : ''
              ]"
              exact-active-class="flex items-center p-2 rounded-lg group active"
              @click="toHome()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="flex-shrink-0 w-6 h-6 transition duration-75"
              >
                <path
                  d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
                />
                <path
                  d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
                />
              </svg>
              <span class="ms-3">Home</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/my-board"
              :class="[
                'flex items-center p-2 text-gray-600 rounded-lg hover:bg-backgroundButtonColor group',
                isActiveTab('my-board') ? 'bg-backgroundButtonColor text-primaryColor' : ''
              ]"
              active-class="flex items-center p-2 rounded-lg group active"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="flex-shrink-0 w-6 h-6 transition duration-75"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="ms-3">My Board</span>
            </router-link>
          </li>
          <!-- Đường kẻ ngăn cách -->
          <li>
            <hr class="border-gray-300 my-1" />
          </li>

          <!-- Category Dropdown -->
          <li>
            <div
              @click="toggleCategoryDropdown"
              class="flex items-center justify-between p-2 cursor-pointer text-gray-600 rounded-lg hover:bg-backgroundButtonColor"
              :class="{
                'bg-backgroundButtonColor': selectedCategory !== '',
                'hover:bg-backgroundButtonColor': selectedCategory === ''
              }"
            >
              <!-- Icon kính lúp và text Category -->
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm4.29-4.29l4.3 4.3"
                  />
                </svg>
                <span class="ml-2">Category</span>
              </div>

              <!-- Icon dropdown -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-transform duration-200"
                :class="{ 'rotate-180': isDropdownCategory }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <!-- Dropdown với hiệu ứng -->
            <transition name="dropdown">
              <div v-if="isDropdownCategory">
                <!-- Input tìm kiếm -->
                <!-- <input
                  v-model="searchText"
                  type="text"
                  placeholder="Search categories..."
                  class="w-full px-3 py-2 mb-2 text-sm border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                /> -->
                <!-- Danh sách categories -->
                <ul class="mt-2 space-y-1 overflow-hidden rounded-lg">
                  <li
                    v-for="(category, index) in displayedCategories"
                    :key="index"
                    :class="[
                      'flex items-center p-2 text-sm text-gray-600 rounded-lg group cursor-pointer',
                      selectedCategory === category.title
                        ? 'bg-backgroundButtonColor text-white'
                        : 'hover:bg-backgroundButtonColor'
                    ]"
                    @click="selectCategory(category)"
                  >
                    <i :class="category.icon + ' fa-solid'"></i>
                    <span class="ml-3 block truncate line-clamp-1 break-words">{{
                      category.title
                    }}</span>
                  </li>

                  <!-- Mục "Others" -->
                  <!-- <li
                    v-if="hasMoreCategories"
                    class="flex items-center p-2 text-sm text-gray-600 rounded-lg hover:bg-backgroundButtonColor group cursor-pointer"
                    @click="expandAllCategories"
                  >
                    <span class="ml-3">...Others</span>
                  </li> -->
                </ul>
                <!-- Nút hiển thị tất cả -->
                <!-- <button
                  v-if="!showAll"
                  @click="showAllCategories"
                  class="block w-full px-3 py-2 mb-2 text-sm text-center text-gray-600 bg-blue-500 rounded-lg hover:underline"
                >
                  Show All Categories
                </button> -->
              </div>
            </transition>
          </li>
          <li>
            <hr class="border-gray-300 my-1" />
          </li>

          <!-- Recently Dropdown -->
          <li>
            <div
              @click="toggleRecentlyDropdown"
              class="flex items-center justify-between p-2 cursor-pointer text-gray-600 rounded-lg hover:bg-backgroundButtonColor"
            >
              <!-- Icon kính lúp và text Category -->
              <div class="flex items-center">
                <span class="ml-2">Project</span>
              </div>

              <!-- Icon dropdown -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-transform duration-200"
                :class="{ 'rotate-180': isDropdownRecently }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <!-- <transition name="dropdown">
              <div v-if="isDropdownRecently">
                <div
                  class="space-y-1 overflow-hidden flex items-center p-2 text-sm text-gray-600 rounded-lg group cursor-pointer hover:bg-backgroundButtonColor"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="gray"
                    class="w-7 h-7"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" />
                  </svg>
                  <span class="px-2">Create Group</span>
                </div>
                <ul class="mt-2 space-y-1 overflow-hidden rounded-lg">
                  <li
                    v-for="(group, index) in groups?.map((group) => {
                      return { name: group.name, groupId: group.groupId }
                    })"
                    :key="index"
                    class="flex items-center p-2 text-sm text-gray-600 rounded-lg group cursor-pointer hover:bg-backgroundButtonColor"
                  >
                    <router-link
                      :to="`/group/${group.groupId}`"
                      class="ml-3 block truncate line-clamp-1 break-words"
                    >
                      <span>{{ group.name }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </transition> -->
            <transition name="dropdown">
              <div v-if="isDropdownRecently">
                <router-link
                  to="/create-group"
                  class="space-y-1 overflow-hidden flex items-center p-2 text-sm text-gray-600 rounded-lg group cursor-pointer hover:bg-backgroundButtonColor"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="gray"
                    class="w-7 h-7"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" />
                  </svg>
                  <span class="px-2">Create Group</span>
                </router-link>
                <ul class="mt-2 space-y-1 overflow-hidden rounded-lg">
                  <li
                    v-for="(group, index) in groups?.map((group) => {
                      return { name: group.name, groupId: group.groupId }
                    })"
                    :key="index"
                    class="flex items-center p-2 text-sm text-gray-600 rounded-lg group cursor-pointer hover:bg-backgroundButtonColor"
                  >
                    <router-link
                      :to="`/group/${group.groupId}`"
                      class="ml-3 block truncate line-clamp-1 break-words"
                      @click="toGroup(group.groupId)"
                    >
                      <span>{{ group.name }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </transition>
          </li>
          <li>
            <hr class="border-gray-300 my-1" />
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCategoryStore } from '@/stores/category.store'
import { useGroupStore } from '@/stores/group.store'
import { storeToRefs } from 'pinia'
import { useHomePageStore } from '@/stores/home.store'
import { useRoute } from 'vue-router'

// const router = useRouter();
const currentRoute = useRoute()

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { getAllCategory } = categoryStore
const groupStore = useGroupStore()
const { groups } = storeToRefs(groupStore)
const { getAllGroups, getGroupById } = groupStore
const homePageStore = useHomePageStore()
const { setCategory, loadMore, resetListIdea, setCurrentPage } = homePageStore

onMounted(() => {
  getAllCategory()
  getAllGroups()
})

const isDropdownCategory = ref(false)
const isDropdownRecently = ref(false)
const searchText = ref('')
const selectedCategory = ref('')
const showAll = ref(true)
const isExpanded = ref(false)
// const isModalVisible = ref(false)

// Watch for route changes
watch(
  () => currentRoute.name,
  async (newRoute) => {
    // Khi chuyển sang route khác ngoài "Home", reset selectedCategory và đóng dropdown
    if (newRoute !== 'home') {
      selectedCategory.value = ''
      setCategory('')
      isDropdownCategory.value = false
      isDropdownRecently.value = false
    } else {
      // resetListIdea()
      // await loadMore()
    }
  }
)

// Toggle dropdown
const toggleCategoryDropdown = () => {
  isDropdownCategory.value = !isDropdownCategory.value
}

const toggleRecentlyDropdown = () => {
  isDropdownRecently.value = !isDropdownRecently.value
}

// const toggleModalCreateGroup = () => {
//   isModalVisible.value = !isModalVisible.value
// }

// Filter categories based on search text
const filteredCategories = computed(() => {
  // Nếu không có nội dung tìm kiếm, trả về toàn bộ danh sách hoặc danh sách giới hạn tùy thuộc vào showAll
  if (!searchText.value) {
    return showAll.value ? categories.value : categories.value
  }
  // Nếu có nội dung tìm kiếm, chỉ trả về các category khớp với từ khóa
  return categories.value.filter((category) =>
    category.title.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

// Only show up to 5 categories, and add "Others" if there are more
const displayedCategories = computed(() => {
  if (isExpanded.value) {
    return filteredCategories.value // Hiển thị toàn bộ danh mục
  }
  return filteredCategories.value.slice(0, 5) // Hiển thị 5 mục đầu tiên
})

// const hasMoreCategories = computed(() => {
//   return !isExpanded.value && filteredCategories.value.length > 5
// })
// Xử lý khi chọn category
const selectCategory = async (categoryItem) => {
  selectedCategory.value = categoryItem.title
  searchText.value = '' // Xóa nội dung tìm kiếm
  showAll.value = false // Vô hiệu hóa chế độ hiển thị tất cả
  setCategory(categoryItem.id) // Cập nhật store
  resetListIdea()
  await loadMore()
  isDropdownCategory.value = false
  isExpanded.value = false
}

// const showAllCategories = () => {
//   selectedCategory.value = ''
//   searchText.value = ''
//   showAll.value = true // Kích hoạt chế độ hiển thị tất cả
//   setCategory('') // Gửi lên store rằng không có category nào được chọn
//   loadMore()
//   isDropdownCategory.value = false
// }

// Function to check active tab
const isActiveTab = (routeName) => {
  return (
    currentRoute.name === routeName || currentRoute.name?.startsWith(routeName) // Handle children routes like 'my-board/history'
  )
}

// const expandAllCategories = () => {
//   isExpanded.value = true // Mở rộng để hiển thị toàn bộ danh mục
// }

const toGroup = (groupId) => {
  setCurrentPage(1)
  resetListIdea()
  loadMore(groupId)
  getGroupById(groupId)
}

const toHome = () => {
  setCurrentPage(1)
  resetListIdea()
  loadMore()
}
</script>

<style>
/* Hiệu ứng dropdown mở/đóng */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}
.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 200px; /* Đặt giới hạn phù hợp với nội dung */
  opacity: 1;
}
.active {
  background-color: var(--backgroundButtonColor);
  /* color: white; */
}
</style>
