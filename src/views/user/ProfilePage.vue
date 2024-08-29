<script setup>
import { defineAsyncComponent, ref } from 'vue'

const tabs = [
  {
    name: 'Account',
    component: defineAsyncComponent(async () => {
      return import('@/components/profile/AccountTab.vue')
    }),
    skeleton: defineAsyncComponent(() => import('@/components/skeletons/TabAccountSkeleton.vue'))
  },
  {
    name: 'Change Password',
    component: defineAsyncComponent(async () => {
      return import('@/components/profile/ChangePassword.vue')
    }),
    skeleton: defineAsyncComponent(() => import('@/components/skeletons/TabChangePasswordSkeleton.vue'))
  }
]

const activeTab = ref(0)

// Function to switch tabs
const switchTab = (tabId) => {
  activeTab.value = tabId
}
</script>

<template>
  <div class="w-full col-span-8 md:col-span-6 pt-[90px] ms-5">
    <div class="profile-setting">
      <h5 class="pt-1 font-bold text-xl">Profile Setting</h5>
      <div class="relative right-0">
        <ul class="relative flex flex-wrap list-none rounded-t-md text-gray-400" role="list">
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            class="z-30 text-center font-bold p-2"
            :class="{
              'border-primaryColor border-b-2 text-primaryColor': activeTab === index
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
          <suspense>
            <component :is="tabs[activeTab].component" />
            <template #fallback>
              <component :is="tabs[activeTab].skeleton" />
            </template>
          </suspense>
        </div>
      </div>
    </div>
  </div>
</template>
