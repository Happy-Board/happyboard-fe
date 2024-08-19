<template>
  <div v-for="(activity, index) in historyActivities" :key="index">
    <div
      @click="handleShowAction(activity.objectTargetId)"
      class="flex my-2 py-2 bg-blue-50 justify-between gap-5 px-5 rounded-lg cursor-pointer hover:bg-blue-100 hover:shadow-sm"
    >
      <div class="me-5">
        <div class="flex">
          <div class="font-semibold me-5">{{ convertHistoryCode(activity.type) }}</div>
          <div class="flex" v-if="activity.contentComment !== null">
            <div v-html="`(`"></div>
            <div class="line-clamp-1 text-gray-600 font-semibold" v-html="activity.contentComment"></div>
            <div v-html="`)`"></div>
          </div>
        </div>
        <div
          class="font-bold text-lg text-blue-900 w-fit line-clamp-1 max-w-[90%]"
          v-html="activity.contentIdea"
        ></div>
      </div>
      <div class="text-sm font-semibold w-fit">{{ activity.createdAt }}</div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import { convertHistoryCode } from '@/utils/convert-history-code'
import { useRouter } from 'vue-router'

const userStore = useUserStore()

const { historyActivities } = storeToRefs(userStore)
const { getMyHistoryActivities } = userStore

const router = useRouter()

await getMyHistoryActivities().catch(error => {
  if(error.response.status === 401){
          router.push({ name: 'sign-in' })
        }
})
const handleShowAction = (ideaId) => {
  router.push({ name: 'detail-idea', params: { id: ideaId } })
}
</script>
<style scoped></style>
