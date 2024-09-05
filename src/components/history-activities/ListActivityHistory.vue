<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { historyActivities } = storeToRefs(userStore)

const router = useRouter()

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
    router.push({ name: HISTORY_TYPE[type].path, params: { id: targetId, type: 'publish' } })
  }
}
</script>

<template>
  <div class="pb-2 max-h-[330px] overflow-x-auto">
    <div v-for="ha in historyActivities" :key="ha.id" class="flex justify-between px-1 py-1">
      <div
        @click="handleShowAction(ha.objectTargetId, ha.type)"
        class="items-center w-full hover:bg-backgroundColor cursor-pointer rounded-md py-1"
      >
        <div
          class="flex items-center w-full hover:bg-backgroundColor cursor-pointer rounded-md px-1 pt-1"
        >
          <div class="me-1">
            <div class="flex items-center justify-center rounded-full bg-white p-2 aspect-square">
              <i :class="HISTORY_TYPE[ha.type].icon" class=""></i>
            </div>
          </div>
          <div class="w-[80%]">
            <div class="font-semibold text-sm text-primaryColor">
              {{
                HISTORY_TYPE[ha.type].title.replace(
                  '@@@',
                  ha.userTargetId ? ha.userTarget.username + "'s" : 'your'
                )
              }}
              <!-- Thay id -> tên -->
            </div>
            <div
              v-html="ha[HISTORY_TYPE[ha.type].display]"
              class="break-words font-semibold text-xs text-gray-500 line-clamp-2 text-wrap"
            ></div>
          </div>
        </div>
        <div class="font-semibold text-[10px] text-gray-600 ms-10">
          {{ ha.createdAt }}
        </div>
      </div>
    </div>
  </div>
</template>
