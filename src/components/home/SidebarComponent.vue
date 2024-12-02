<template>
  <div class="w-full">
    <aside
      id="logo-sidebar"
      class="fixed bg-backgroundColor top-0 left-0 z-20 2xl:w-64 xl:w-56 lg:w-48 md:w-40 h-screen pt-24 transition-transform -translate-x-full border-r border-borderColor sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-backgroundColor">
        <ul class="space-y-2 font-medium">
          <!-- Home -->
          <li>
            <router-link
              to="/"
              :class="`flex items-center p-2 text-gray-600 rounded-lg hover:bg-backgroundButtonColor group`"
              exact-active-class="flex items-center p-2 rounded-lg group active"
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

          <!-- My Board -->
          <li>
            <router-link
              to="/my-board"
              :class="`flex items-center p-2 text-gray-600 rounded-lg hover:bg-backgroundButtonColor group`"
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
            <hr class="border-gray-300 my-3" />
          </li>

          <!-- Category Dropdown -->
          <li>
            <div @click="toggleCategoryDropdown" class="flex items-center justify-between p-2 cursor-pointer text-gray-600 rounded-lg hover:bg-backgroundButtonColor">
              <span class="font-semibold">Category</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 transition-transform"
                :class="{ 'rotate-180': isDropdownOpen }"
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

            <ul v-if="isDropdownOpen" class="mt-2 space-y-1">
              <li
                v-for="(category, index) in categories"
                :key="index"
                class="flex items-center p-2 text-sm text-gray-600 rounded-lg hover:bg-backgroundButtonColor group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>{{ category.title }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Dữ liệu categories
const categories = ref([
  { id: 1, title: "Work" },
  { id: 2, title: "Study" },
  { id: 3, title: "Happy Break" },
  { id: 4, title: "Travel" },
  { id: 5, title: "Other" },
]);

const isDropdownOpen = ref(false);

// Toggle dropdown
const toggleCategoryDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>
