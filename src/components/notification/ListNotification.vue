<template>
  <NotificationNotFound v-if="notifications.length === 0" />
  <div v-else>
    <div class="mx-2" v-for="(notification, index) in notifications" :key="index">
    <div
      class="flex border border-borderColor items-start my-1 rounded-lg hover:bg-backgroundColor w-full ps-3 pe-8 py-1 cursor-pointer relative line-clamp-1"
      @click="handleOnclickNotification(notification.id, notification.target, notification.status)"
    >
      <div
        v-if="notification.status === 0"
        class="absolute w-3 aspect-square rounded-full bg-blue-900 top-3 right-2"
      ></div>
      <img
        :src="notification.fromUser.avatar === '' ? '/avatar/default-avatar.jpg': notification.fromUser.avatar "
        class="w-12 aspect-square rounded-full me-2"
        alt="avatar"
      />
      <div class="">
        <div v-html="notification.title"></div>
        <div class="text-[10px] font-semibold text-blue-900">
          {{ notification.updatedAt }}
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script async setup>
import { useNotificationStore } from '@/stores/notification.store'
import { useIdeaStore } from '@/stores/idea.store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import NotificationNotFound from '../notfound-data/NotificationNotFound.vue'



const router = useRouter()
const ideaStore = useIdeaStore()
const { getDetailIdea } = ideaStore
const notificationStore = useNotificationStore()

const { notifications } = storeToRefs(notificationStore)
const { getAllNotifications, getUnreadNotifications, markNotificationReaded } = notificationStore

const props = defineProps({
  type: String,
  avatar: String
})
const emits = defineEmits(['closeNotification'])

if (props.type === 'all') {
  console.log(props.type)
  await getAllNotifications().catch(error => {
  if(error.response.status === 401){
          router.push({ name: 'sign-in' })
        }
})
} else if (props.type === 'unread') {
  console.log(props.type)
  await getUnreadNotifications().catch(error => {
  if(error.response.status === 401){
          router.push({ name: 'sign-in' })
        }
})
}

const handleOnclickNotification = (notiId, ideaId, notificationStatus) => {
  emits('closeNotification')
  markNotificationReaded(notiId, notificationStatus)
  router.push({ name: 'detail-idea', params: { id: ideaId } })
  getDetailIdea(ideaId)
}

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
