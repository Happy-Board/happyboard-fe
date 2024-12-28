<template>
  <div class="relative w-full">
    <!-- Background Image with Edit Icon -->
    <div class="relative w-full h-48 bg-gray-300 rounded-md group">
      <!-- Background Image -->
      <img
        v-if="backgroundImage"
        :src="backgroundImage"
        alt="Group Background"
        class="w-full h-full object-cover rounded-md"
      />

      <!-- Edit Icon for Background (top-right corner) -->
      <label
        class="absolute top-2 right-2 w-10 h-10 bg-gray-600 bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer transition-opacity z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="white"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z"
          />
        </svg>
        <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
      </label>
    </div>

    <!-- Overlay Content (optional if needed for additional overlay) -->
    <div class="absolute top-0 left-0 w-full h-48"></div>

    <!-- Main Content -->
    <div class="relative z-10 flex items-center px-6 py-4">
      <div
        class="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden -mt-10 flex-shrink-0 group"
      >
        <!-- Avatar -->
        <img :src="avatar" alt="Group Avatar" class="w-full h-full object-cover" />

        <!-- Edit Icon -->
        <label
          class="absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="white"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z"
            />
          </svg>
          <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
        </label>
      </div>

      <!-- Group Details -->
      <div class="ml-4 flex-grow">
        <h1 class="text-2xl font-bold text-black">{{ groupName }}</h1>
        <p class="text-black text-sm">{{ groupDescription }}</p>
      </div>

      <!-- Actions -->
      <div class="flex space-x-2">
        <!-- Create Action Icon -->
        <label
          class="py-2 px-4 bg-blue-600 text-black text-sm font-semibold rounded-full border-2 hover:bg-gray-300 bg-opacity-50 group-hover:opacity-100 cursor-pointer transition-opacity flex items-center justify-center"
          @click="onCreateAction"
        >
          <router-link
            to="/create-group-idea"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="black"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" />
            </svg>
          </router-link>
          <span class="ml-2">Create Idea</span>
        </label>
        <div class="relative">
          <!-- Label with Dropdown -->
          <label
            class="py-2 px-2 bg-blue-600 text-black text-sm font-semibold rounded-full border-2 hover:bg-gray-300 bg-opacity-50 cursor-pointer transition-opacity flex items-center justify-center"
            @click="toggleDropdown"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12h12M6 6h12M6 18h12" />
            </svg>
          </label>

          <!-- Dropdown -->
          <ul
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-300 z-10"
          >
            <li
              v-for="(item, index) in dropdownItems"
              :key="index"
              @click="onDropdownSelect(item)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Props
const props = defineProps({
  avatar: {
    type: String,
    required: true,
    default:
      'https://res.cloudinary.com/daokqrkdk/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734993530/idea/media/4_1734993530539.png'
  },
  backgroundImage: {
    type: String,
    required: true,
    default:
      'https://res.cloudinary.com/daokqrkdk/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1734963702/idea/media/4_1734963699969.png'
  },
  groupName: {
    type: String,
    required: true,
    default: 'Group Name'
  },
  groupDescription: {
    type: String,
    required: false,
    default: 'description of group'
  }
})
// State variables
const isDropdownOpen = ref(false)
const dropdownItems = ref(['Action 1', 'Action 2', 'Action 3'])

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const onDropdownSelect = (item) => {
  console.log('Selected:', item) // Handle dropdown item selection
  isDropdownOpen.value = false // Close dropdown after selection
}

// Emit Events
const emit = defineEmits(['createAction', 'otherAction', 'avatarUpdated'])

// Handlers
const onCreateAction = () => emit('createAction')
// const onOtherAction = () => emit('otherAction')

// File Input Handler
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      emit('avatarUpdated', reader.result) // Gửi ảnh mới về parent component
    }
    reader.readAsDataURL(file)
  }
}
</script>
