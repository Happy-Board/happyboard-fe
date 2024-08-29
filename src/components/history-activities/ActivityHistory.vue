<script setup>
// import { useRouter } from 'vue-router'
// import { useUserStore } from '@/stores/user.store'
// import { storeToRefs } from 'pinia'
import ListActivityHistory from './ListActivityHistory.vue';

// const userStore = useUserStore()

// const { historyActivities } = storeToRefs(userStore)
// const { getMyHistoryActivities } = userStore

// const router = useRouter()

// await getMyHistoryActivities().catch((error) => {
//   if (error.response.status === 401) {
//     router.push({ name: 'sign-in' })
//   }
// })

// const HISTORY_TYPE = {
//   CI01: {
//     icon: 'fa-regular fa-square-plus text-green-600',
//     display: 'contentIdea',
//     title: 'You created a new idea',
//     path: 'detail-idea'
//   },
//   EI01: {
//     icon: 'fa-regular fa-pen-to-square text-blue-600',
//     display: 'contentIdea',
//     title: 'You  changed your idea',
//     path: 'detail-idea'
//   },
//   DI01: {
//     icon: 'fa-regular fa-trash-can text-red-600',
//     display: '',
//     title: 'You deleted your idea'
//   },
//   VI01: {
//     icon: 'fa-regular fa-circle-check text-green-600',
//     display: 'contentIdea',
//     title: 'You voted for @@@ idea',
//     path: 'detail-idea'
//   },
//   CC01: {
//     icon: 'fa-regular fa-comment-dots',
//     display: 'contentComment',
//     title: 'You commented on @@@ idea.',
//     path: 'detail-idea'
//   },
//   EC01: {
//     icon: 'fa-regular fa-pen-to-square text-blue-600',
//     display: 'contentComment',
//     title: 'You edited your comment on @@@ idea.',
//     path: 'detail-idea'
//   },
//   DC01: {
//     icon: 'fa-regular fa-trash-can text-red-600',
//     display: '',
//     title: 'You deleted your comment on @@@ idea.'
//   },
//   RC01: {
//     icon: 'fa-solid fa-reply text-orange-600',
//     display: 'contentComment',
//     title: 'You replied to @@@ comment',
//     path: 'detail-idea'
//   },
//   RC02: {
//     icon: 'fa-regular fa-thumbs-up text-secondaryColor',
//     display: 'contentComment',
//     title: 'You reactioned to @@@ comment',
//     path: 'detail-idea'
//   }
// }

// // const optionShow = ref(null)

// // const toggleOptionShow = (id) => {
// //   optionShow.value = optionShow.value === id ? null : id
// // }

// const handleShowAction = (targetId, type) => {
//   if (HISTORY_TYPE[type].path) {
//     router.push({ name: HISTORY_TYPE[type].path, params: { id: targetId } })
//   }
// }
</script>

<template>
  <div class="w-full border border-borderColor rounded-md bg-slate-100 mb-5">
    <div class="px-4 pt-2 text-lg font-semibold border-b border-borderColor bg-white rounded-tl-lg rounded-tr-lg">
      Activity Histories
    </div>
    <ListActivityHistory/>
  </div>
</template>

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
