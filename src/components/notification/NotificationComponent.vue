<template>
  <div class="mx-10 relative scroll-smooth">
    <div
      @click="handleOpenNotificationList"
      class="p-1  hover:bg-secondaryColor/20 rounded-full relative"
      :class="isShowNotificationList === true ? '!bg-secondaryColor/20' : ''"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="flex-shrink-0 w-7 h-7 text-primaryColor transition duration-75 hover:text-secondaryColor cursor-pointer"
        :class="isShowNotificationList === true ? '!text-secondaryColor' : ''"
      >
        <path
          d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z"
        />
        <path
          fill-rule="evenodd"
          d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div
      v-if="numNotification !== 0"
      class="absolute w-5 h-5 bg-red-700 border border-white p-1 top-[-8px] right-[-4px] rounded-full"
    >
      <span class="absolute text-white text-xs top-[1px] right-[6px]">{{ numNotification }}</span>
    </div>
    <div
      v-if="isShowNotificationList"
      class="absolute w-fit min-w-[350px] border border-borderColor bg-white shadow-lg shadow-gray-400 py-1 rounded-lg left-1/2 transform -translate-x-1/2 top-10 max-h-[550px] overflow-y-scroll mb-5"
      ref="notificationList"
    >
      <div class="ps-3">
        <p class="font-bold text-xl">Notification</p>
        <div class="flex gap-1 mt-2 mb-4">
          <div
            class="px-2 rounded-lg font-semibold cursor-pointer"
            :class="typeNotification === 'all' ? 'bg-backgroundButtonColor' : 'hover:bg-backgroundColor'"
            @click="setType('all')"
          >
            All
          </div>
          <div
            class="px-2 rounded-lg font-semibold cursor-pointer"
            :class="typeNotification === 'unread' ? 'bg-backgroundButtonColor' : 'hover:bg-backgroundColor'"
            @click="setType('unread')"
          >
            Unread
          </div>
        </div>
      </div>
      <div v-if="typeNotification === 'all'">
        <Suspense>
          <ListNotification :type="typeNotification" @closeNotification="closeNotificationList" />
          <template #fallback>
            <NotificationSkeleton />
          </template>
        </Suspense>
      </div>
      <div v-if="typeNotification === 'unread'">
        <Suspense>
          <ListNotification :type="typeNotification" @closeNotification="closeNotificationList" />
          <template #fallback>
            <NotificationSkeleton />
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { requestPermission } from '../../configs/firebase.config'
import { getMessaging, onMessage } from 'firebase/messaging'
import { useNotificationStore } from '@/stores/notification.store'
import { storeToRefs } from 'pinia'
import ListNotification from './ListNotification.vue'
import NotificationSkeleton from '../skeletons/NotificationSkeleton.vue'

const messaging = getMessaging()
onMounted(() => {
  requestPermission()
  onMessage(messaging, (payload) => {
    console.log(payload)
    getNewNotification()
  })
})

const notificationStore = useNotificationStore()

const { numNotification } = storeToRefs(notificationStore)
const { getNewNotification, getAllNotifications, getUnreadNotifications } = notificationStore
const isShowNotificationList = ref(false)
const notificationList = ref(null)
const check = ref(false)
const typeNotification = ref('all')

const setType = (type) => {
  typeNotification.value = type
  if (type === 'unread') {
    getUnreadNotifications('')
  }
}

onMounted(() => {
  getAllNotifications('')
})


const handleOpenNotificationList = () => {
  getAllNotifications('')
  if (!check.value) {
    isShowNotificationList.value = true
    check.value = true
  } else {
    isShowNotificationList.value = false
    check.value = false
  }
}

const closeNotificationList = () => {
  isShowNotificationList.value = false
}
onClickOutside(notificationList, () => {
  closeNotificationList()
})
onClickOutside(notificationList, () => {
  closeNotificationList()
})
</script>
<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
