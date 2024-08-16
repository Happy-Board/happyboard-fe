<template>
  <div
    ref="confirmDelete"
    class="p-3 w-48 rounded-lg bg-white border shadow-sm shadow-gray-400 absolute top-0 right-0 z-50"
  >
    <p class="text-center font-semibold mb-5">Delete this {{ props.target }} ?</p>
    <div class="flex justify-around">
      <button
        @click="emits('closeDeletePopup')"
        class="px-4 py-0.5 bg-gray-300 rounded-md font-semibold"
      >
        No
      </button>
      <button
        @click="handleDelete"
        class="px-4 py-0.5 bg-red-500 rounded-md font-semibold text-white"
      >
        Yes
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { apiDeleteIdea } from '@/apis/idea.api'
import { notify } from '@/utils/toast'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import { useMyBoardStore } from '@/stores/my-board.store'
const userStore = useUserStore()
const myBoardStore = useMyBoardStore()
const { tab } = storeToRefs(myBoardStore)
const { getMyHideIdeas, getMyPublishIdeas, getMyDraftIdeas } = userStore
const confirmDelete = ref(null)
const props = defineProps({ target: String, targetId: String })
const emits = defineEmits(['closeDeletePopup'])

onClickOutside(confirmDelete, () => emits('closeDeletePopup'))

const handleDelete = () => {
  emits('closeDeletePopup')
  apiDeleteIdea(props.targetId)
    .then(() => {
      if (tab.value === 'publish') {
        getMyPublishIdeas()
      }
      if (tab.value === 'hide') {
        getMyHideIdeas()
      }
      if (tab.value === 'draft') {
        getMyDraftIdeas()
      }
      notify('success', 'Idea deleted successfully')
      emits('closeDeletePopup')
    })
    .catch((err) => console.log(err))
}
</script>
<style></style>
