import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetNotifications } from '@/apis/notification.api'

export const useNotificationStore = defineStore('notification', () => {
  const numNotification = ref(0)
  const notifications = ref([])

  function getNewNotification() {
    numNotification.value++
  }
  const handleNotification = (noti) => {
    if (noti.type === 'NI01') return `Bạn có 1 comment mới từ ${noti.fromUser.username}`
    if (noti.type === 'NI02') return `Bạn có thêm 1 vote mới từ ${noti.fromUser.username}`
    if (noti.type === 'NC01') return `Bạn có 1 react mới từ ${noti.fromUser.username}`
  }
  function getAllNotifications(url) {
    apiGetNotifications(url).then((res) => {
      notifications.value = res.data.data
      notifications.value.forEach((item) => (item['title'] = handleNotification(item)))
      console.log(notifications.value);
    })
  }

  return { numNotification, notifications, getAllNotifications, getNewNotification }
})
