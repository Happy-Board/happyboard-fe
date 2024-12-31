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
        <input type="file" accept="image/*" class="hidden" @change="onFileChangeBackground" />
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
        <img :src="avatarImage" alt="Group Avatar" class="w-full h-full object-cover" />

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
        <router-link
          :to="`/create-group-idea/${groupId}`"
          class="flex items-center justify-center py-2 px-4 bg-blue-600 text-black text-sm font-semibold rounded-full border-2 hover:bg-gray-300 bg-opacity-50 group-hover:opacity-100 cursor-pointer transition-opacity"
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
          <span class="ml-2">Create Idea</span>
        </router-link>
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
              class="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm"
            >
              {{ item }}
            </li>
          </ul>

          <!-- Modal to Add Member -->
          <div
            v-if="isAddMemberModalOpen"
            class="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-20"
          >
            <div
              class="bg-white p-6 rounded-lg w-1/3 shadow-lg transform transition-all duration-300 ease-in-out scale-95 hover:scale-100"
            >
              <h2 class="text-2xl font-semibold mb-4 text-gray-800">Add Member</h2>

              <!-- Search Bar -->
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search User"
                class="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <!-- User List -->
              <ul class="max-h-60 overflow-y-auto">
                <li
                  v-for="(user, index) in filteredUsers"
                  :key="index"
                  @click="addMember(user)"
                  class="px-4 py-2 hover:bg-indigo-100 cursor-pointer text-sm transition-colors duration-200 ease-in-out flex items-center hover:bg-gray-200 rounded-full"
                >
                  <!-- Avatar -->
                  <img :src="user.avatar" alt="User Avatar" class="w-8 h-8 rounded-full mr-4" />
                  <!-- Username -->
                  <span class="text-gray-800">{{ user.username }}</span>
                </li>
              </ul>

              <div class="mt-4 flex justify-end">
                <button
                  @click="closeAddMemberModal"
                  class="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Confirm Leave Group -->
          <div
            v-if="isLeaveGroupModalOpen"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
          >
            <div class="bg-white rounded-lg p-6 w-80 shadow-md">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Leave Group</h3>
              <p class="text-sm text-gray-600 mb-6">
                Are you sure you want to leave this group? This action cannot be undone.
              </p>
              <div class="flex justify-end space-x-4">
                <button
                  @click="closeLeaveGroupModal"
                  class="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-700 text-sm"
                >
                  No
                </button>
                <button
                  @click="confirmLeaveGroup"
                  class="px-4 py-2 bg-red-500 rounded-full hover:bg-red-600 text-white text-sm"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { apiGetAllUserForAddMember, apiAddMember, apiLeaveGroup } from '@/apis/user.api'
import { notify } from '@/utils/toast'

// Props
const props = defineProps({
  groupId: { String, required: true },
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
const router = useRouter()
const isDropdownOpen = ref(false)
const dropdownItems = ref(['Add member', 'Leave Group'])
const avatarImage = ref(props.avatar)
const backgroundImage = ref(props.backgroundImage)
const isAddMemberModalOpen = ref(false)
const isLeaveGroupModalOpen = ref(false)
const searchQuery = ref('')
const groupIdRef = ref(props.groupId ? props.groupId : 1)
const query = ref(`?groupId=${groupIdRef.value}`)
const allUsers = ref([])

const confirmLeaveGroup = async () => {
  await apiLeaveGroup(groupIdRef.value).then(() => {
    notify('success', 'Leave group successfully !')
    setTimeout(() => {
      router.push({ name: 'home' })
    }, 1000)
  })
  isLeaveGroupModalOpen.value = false
  router.push()
}

const closeLeaveGroupModal = () => {
  isLeaveGroupModalOpen.value = false
}

const onDropdownSelect = (item) => {
  if (item === 'Add member') {
    isAddMemberModalOpen.value = true
  } else if (item === 'Leave Group') {
    isLeaveGroupModalOpen.value = true
  }
  isDropdownOpen.value = false
}

const toggleDropdown = async () => {
  const response = await apiGetAllUserForAddMember(query.value)
  allUsers.value = response.data.data.users
  isDropdownOpen.value = !isDropdownOpen.value
}

const filteredUsers = computed(() => {
  return allUsers.value?.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const closeAddMemberModal = () => {
  isAddMemberModalOpen.value = false
  searchQuery.value = ''
}

const addMember = async (user) => {
  const newUser = await apiAddMember({ memberId: user.id, groupId: groupIdRef.value })
  console.log('newUser: ', newUser)
  closeAddMemberModal()
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      avatarImage.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const onFileChangeBackground = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      backgroundImage.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}
</script>
