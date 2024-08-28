<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { historyActivities } = storeToRefs(userStore)
const { getMyHistoryActivities } = userStore

const router = useRouter()

await getMyHistoryActivities().catch((error) => {
  if (error.response.status === 401) {
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
    icon: 'fa-regular fa-circle-check text-green-600',
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
    icon: 'fa-regular fa-thumbs-up text-secondaryColor',
    display: 'contentComment',
    title: 'You reactioned to @@@ comment',
    path: 'detail-idea'
  }
}

// const optionShow = ref(null)

// const toggleOptionShow = (id) => {
//   optionShow.value = optionShow.value === id ? null : id
// }

const handleShowAction = (targetId, type) => {
  if (HISTORY_TYPE[type].path) {
    router.push({ name: HISTORY_TYPE[type].path, params: { id: targetId } })
  }
}
</script>

<template>
  <div class="block w-full overflow-x-auto border border-borderColor rounded-md bg-slate-100">
    <div class="px-4 pt-2 text-lg font-semibold border-b border-borderColor bg-white">
      Activity Histories
    </div>
    <div class="pb-2 max-h-[480px]">
      <div v-for="ha in historyActivities" :key="ha.id" class="flex justify-between px-2 py-2">
        <div
          @click="handleShowAction(ha.objectTargetId, ha.type)"
          class="items-center w-full hover:bg-backgroundColor cursor-pointer rounded-md p-1"
        >
          <div
            class="flex items-center w-full hover:bg-backgroundColor cursor-pointer rounded-md p-1"
          >
            <div class="me-2">
              <div
                class="flex items-center justify-center rounded-full bg-white p-2 aspect-square"
              >
                <i :class="HISTORY_TYPE[ha.type].icon" class="fa-lg"></i>
              </div>
            </div>
            <div class="">
              <div class="font-semibold text-sm text-primaryColor">
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
          <div class="font-semibold text-[10px] text-gray-600 ms-11 ps-1">
            {{ ha.createdAt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.truncate-3-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
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
