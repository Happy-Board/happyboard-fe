import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiGetNotifications, apiMarkNotificationReaded, apiGetUnreadNotifications } from '@/apis/notification.api'
import { convertTime2 } from '@/utils/convert-time'

export const useNotificationStore = defineStore('notification', () => {
  const numNotification = ref(0)
  const notifications = ref([])
  const count = ref(0)
  function getNewNotification() {
    numNotification.value++
  }
  const handleNotification = (noti) => {
    if (noti.type === 'NI01') return `<strong>${noti.fromUser.username}</strong> đã comment vào một idea của bạn `
    if (noti.type === 'NI02') return `<strong>${noti.fromUser.username}</strong> đã vote cho idea của bạn`
    if (noti.type === 'NC01') return `<strong>${noti.fromUser.username}</strong> đã react cho một comment của bạn`
    if (noti.type === 'NI03') return `<strong>${noti.fromUser.username}</strong> bài viết của bạn đã được duyệt`
  }
  async function getAllNotifications() {
    return await apiGetNotifications().then((res) => {
      notifications.value = res.data.data
      notifications.value.forEach((item) => {
        item['title'] = handleNotification(item)
        item.updatedAt = convertTime2(item.updatedAt)
        if (item.status === 0) count.value++
      })
      numNotification.value = count.value
      count.value = 0
    })
  }

 async function getUnreadNotifications() {
    return await apiGetUnreadNotifications().then((res) => {
      notifications.value = res.data.data
      notifications.value.forEach((item) => {
        item['title'] = handleNotification(item)
        item.updatedAt = convertTime2(item.updatedAt)
        if (item.status === 0) count.value++
      })
      numNotification.value = count.value
      count.value = 0
    })
  }

  function markNotificationReaded(notificationId, notificationStatus) {
    if (notificationStatus === 0)
      apiMarkNotificationReaded(notificationId)
        .then(() => {
          numNotification.value--
        })
        .catch((err) => console.log(err))
  }

  return {
    numNotification,
    notifications,
    getAllNotifications,
    getNewNotification,
    markNotificationReaded,
    getUnreadNotifications
  }
})
