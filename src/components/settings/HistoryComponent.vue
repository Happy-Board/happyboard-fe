<script setup>
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
// import { convertHistoryCode } from '@/utils/convert-history-code'
import { ref } from 'vue'

const userStore = useUserStore()
import { useRouter } from 'vue-router'

const { historyActivities } = storeToRefs(userStore)
const { getMyHistoryActivities } = userStore

const router = useRouter()

await getMyHistoryActivities().catch((error) => {
  if (error.response.status === 401) {
    localStorage.clear()
    router.push({ name: 'sign-in' })
  }
})

const HISTORY_TYPE = {
  CI01: {
    icon: 'fa-regular fa-square-plus text-green-600',
    display: 'contentIdea',
    title: 'You created a new idea',
    path: 'detail-idea'
  },
  EI01: {
    icon: 'fa-regular fa-pen-to-square text-blue-600',
    display: 'contentIdea',
    title: 'You  changed your idea',
    path: 'detail-idea'
  },
  DI01: {
    icon: 'fa-regular fa-trash-can text-red-600',
    display: '',
    title: 'You deleted your idea'
  },
  VI01: {
    icon: 'fa-regular fa-thumbs-up text-yellow-600',
    display: 'contentIdea',
    title: 'You voted for @@@ idea',
    path: 'detail-idea'
  },
  CC01: {
    icon: 'fa-regular fa-comment-dots',
    display: 'contentComment',
    title: 'You commented on @@@ idea.',
    path: 'detail-idea'
  },
  EC01: {
    icon: 'fa-regular fa-pen-to-square text-blue-600',
    display: 'contentComment',
    title: 'You edited your comment on @@@ idea.',
    path: 'detail-idea'
  },
  DC01: {
    icon: 'fa-regular fa-trash-can text-red-600',
    display: '',
    title: 'You deleted your comment on @@@ idea.'
  },
  RC01: {
    icon: 'fa-solid fa-reply text-orange-600',
    display: 'contentComment',
    title: 'You replied to @@@ comment',
    path: 'detail-idea'
  },
  RC02: {
    icon: 'fa-regular fa-heart text-pink-600',
    display: 'contentComment',
    title: 'You reactioned to @@@ comment',
    path: 'detail-idea'
  }
}

const optionShow = ref(null)

const toggleOptionShow = (id) => {
  optionShow.value = optionShow.value === id ? null : id
}

const handleShowAction = (targetId, type) => {
  if (HISTORY_TYPE[type].path) {
    router.push({ name: HISTORY_TYPE[type].path, params: { id: targetId } })
  }
}
</script>

<template>
  <div class="block w-full overflow-x-auto border-2 rounded-md bg-slate-100 shadow-md">
    <div class="px-2 py-4 text-lg font-bold">Activity Histories</div>
    <div class="pb-2 divide-y-2 divide-gray-300">
      <div v-for="ha in historyActivities" :key="ha.id" class="flex justify-between ps-2 py-2">
        <div
          @click="handleShowAction(ha.objectTargetId, ha.type)"
          class="relative flex w-full me-2 hover:bg-slate-300 cursor-pointer rounded-md p-1"
        >
          <div class="mt-1 me-4">
            <div class="min-h-8 min-w-8 flex items-center justify-center rounded-full bg-gray-200">
              <i :class="HISTORY_TYPE[ha.type].icon"></i>
            </div>
          </div>
          <div class="mb-4">
            <div class="">
              <div class="font-bold text-sm">
                {{
                  HISTORY_TYPE[ha.type].title.replace(
                    '@@@',
                    ha.userTargetId ? ha.userTargetId + "'s" : 'your'
                  )
                }}
                <!-- Thay id -> tên -->
              </div>
              <div class="font-semibold text-xs text-gray-500 truncate-3-lines">
                {{ ha[HISTORY_TYPE[ha.type].display] }}
              </div>
            </div>
          </div>
          <div class="absolute bottom-0 right-0 font-semibold text-[10px] text-gray-600 pe-4 px-1">
            {{ ha.createdAt }}
          </div>
        </div>

        <div class="relative flex items-center justify-center px-2" ref="menuContainer">
          <p
            class="w-6 h-6 rounded-full cursor-pointer hover:bg-slate-200 flex items-center justify-center transition ease-in-out delay-150 opacity-80"
            @click="toggleOptionShow(ha.id)"
          >
            <i class="fas fa-ellipsis-h"></i>
          </p>
          <div
            v-if="optionShow === ha.id"
            class="absolute right-[100%] w-[200px] rounded-md p-2 bg-gray-300 shadow-xl divide-y transition ease-in-out delay-150"
          >
            <div class="font-semibold rounded-sm text-sm hover:bg-slate-400 py-1 px-2">
              <i class="fa fa-trash"></i> Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.truncate-3-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
