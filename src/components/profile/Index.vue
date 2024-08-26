<script setup>
import { ref } from 'vue'
import Account from './Account.vue'
import ChangePassword from './ChangePassword.vue'
import SkeletonView from '@/views/user/SkeletonView.vue'
import History from './History.vue'

const tabs = [
  {
    name: 'Account',
    component: Account
  },
  {
    name: 'Change Password',
    component: ChangePassword
  }
  // {
  //   name: 'History',
  //   component: History
  // }
]

// Define the active tab
const activeTab = ref(0)

// Function to switch tabs
const switchTab = (tabId) => {
  activeTab.value = tabId
}
</script>

<template>
  <div class="w-full col-span-8 md:col-span-6 pt-[80px]">
    <div class="profile-setting">
      <h5 class="pt-1 font-bold text-xl">Profile Setting</h5>
      <div class="relative right-0">
        <ul
          class="relative flex flex-wrap list-none rounded-t-md text-gray-400 border-b-2"
          role="list"
        >
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            class="z-30 text-center font-bold p-2"
            :class="{
              'border-purple-600 border-b-2 text-purple-600': activeTab === index
            }"
          >
            <a
              class="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 border-0 rounded-lg cursor-pointer bg-inherit"
              @click="switchTab(index)"
              role="tab"
              :aria-selected="activeTab === index"
              :aria-controls="tab.name.toLowerCase()"
            >
              <span class="ml-1 capitalize">{{ tab.name }}</span>
            </a>
          </li>
        </ul>
        <div class="p-5">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            v-show="activeTab === index"
            class="block opacity-100"
            :id="tab.name.toLowerCase()"
            role="tabpanel"
          >
            <suspense>
              <component :is="tab.component" />
              <template #fallback>
                <SkeletonView />
              </template>
            </suspense>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
