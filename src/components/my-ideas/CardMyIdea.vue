<template>
  <div class="grid grid-cols-9 pt-2 pb-4 border-t border-borderColor">
    <div class="col-span-1 flex flex-col gap-1 mt-1.5 text-[12px]">
      <div class="flex justify-end font-medium text-gray-900">
        <span class="font-medium mr-0.5">{{ props.totalComment }}</span>
        {{ props.totalComment === 1 ? 'comment' : 'comments' }}
      </div>
      <div class="flex justify-end font-medium text-green-600">
        <span class="font-medium mr-0.5">{{ props.totalVote }}</span
        >{{ props.totalVote === 1 ? 'vote' : 'votes' }}
      </div>
      <div class="flex justify-end font-medium text-red-800">
        <span class="font-medium mr-0.5">{{ props.totalView }}</span
        >{{ props.totalView === 1 ? 'view' : 'views' }}
      </div>
    </div>
    <div class="col-span-8 ms-3">
      <div class="title ms-1 flex justify-between">
        <div
          @click="viewDetailIdea()"
          class="text-wrap me-5 ms-1 font-bold text-xl text-primaryColor hover:text-secondaryColor break-words hover:underline cursor-pointer line-clamp-2"
          v-html="props?.title"
        ></div>
        <div
          v-if="props.isDraft === true"
          class="bg-gray-600 px-2 rounded-lg text-[10px] h-fit font-bold text-white"
        >
          Draft
        </div>
        <div
          v-if="props.isPublish === true"
          class="bg-green-600 px-2 rounded-lg text-[10px] h-fit font-bold text-white"
        >
          Release
        </div>
        <div
          v-if="props.isPublish === false && props.isDraft === false"
          class="bg-yellow-600 px-2 rounded-lg text-[10px] h-fit font-bold text-white"
        >
          Pending
        </div>
        <!-- <div v-if="props.author === userName" class="dropdown h-[30px]">
          <button
            class="dropbtn px-2 aspect-square rounded-full bg-gray-50 hover:bg-gray-200 font-medium"
          >
            ⋯
          </button>
          <div class="dropdown-content rounded-md text-sm font-medium">
            <p @click="handleEdit">Edit</p>
            <p @click="handleDelete">Delete</p>
          </div>
        </div> -->
        <!-- <OptionComponent
          v-if="props.author === profile.username"
          :target="'idea'"
          :targetId="props.id"
          @edit="handleEdit"
          @delete="handleDelete"
        /> -->
      </div>
      <div class="content mt-2 ms-1">
        <div class="content mt-2 mb-1 ms-1 border-0 line-clamp-3">
          <div
            class="line-clamp-3 text-sm"
            data-gram="false"
            contenteditable="false"
            readonly="true"
            v-html="props.description"
          ></div>
        </div>
      </div>

      <div class="flex flex-row justify-end items-center text-[12px] pt-1">
        <!-- <img
            :src="avatarURL"
            alt="avatar"
            class="w-[3%] aspect-square rounded-full cursor-pointer lg:w-[5%] md:w-[7%] sm:w-[8%] xl:w-[3%]"
          />
          <span class="ms-2 me-6 font-semibold cursor-pointer">{{ props.author }}</span> -->

        <div class="flex relative">
          <i
            :class="
              props?.category?.icon + ' fa-solid absolute left-[-12px] bottom-[2px] text-gray-700'
            "
          ></i>
          <span class="ps-1">{{ props?.category?.title }}</span>
        </div>

        <div class="flex">
          <span class="ms-2 text-[11px]">{{ props.updatedAt }}</span>
        </div>
        <div class="flex space-x-4 ms-5">
          <i
            v-if="props.isDraft === true || props.isPublish === false"
            @click="handleEdit"
            class="fa-solid fa-pen-to-square cursor-pointer text-secondaryColor hover:text-blue-800"
          ></i>
          <i
            v-if="props.isPublish === true"
            class="fa-solid fa-pen-to-square cursor-not-allowed text-gray-400"
          ></i>
          <i @click="onToggle" class="fa-solid fa-trash-can cursor-pointer text-red-600 hover:text-red-800"></i>
        </div>
      </div>
    </div>
  </div>
  <ModalConfirmDelete
  v-if="visible"
    title="Confirm Action"
    maxWidth="sm"
    :visible="visible"
    v-on:close="onToggle"
  >
    <p class="text-gray-800">Are you sure you want you delete this idea ?</p>

    <div class="text-right mt-4">
      <button
        @click="onToggle"
        class="px-4 py-1 text-sm text-gray-600 focus:outline-none hover:underline"
      >
        Cancel
      </button>
      <button
        class="mr-2 px-4 py-1 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
        @click="handleDelete"
      >
        Yes
      </button>
    </div>
  </ModalConfirmDelete>
</template>
<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'
import ModalConfirmDelete from './ModalConfirmDelete.vue'
import { ref } from 'vue'
import { notify } from '@/utils/toast'
import { useMyBoardStore } from '@/stores/my-board.store'
import { useUserStore } from '@/stores/user.store'

const myBoardStore = useMyBoardStore()
const userStore = useUserStore()
const { deleteIdea } = myBoardStore
const { getMyHistoryActivities } = userStore
const router = useRouter()
const props = defineProps({
  index: Number,
  id: String,
  author: String,
  title: String,
  category: Object,
  totalComment: Number,
  totalVote: Number,
  totalView: Number,
  description: String,
  updatedAt: String,
  isPublish: Boolean,
  isDraft: Boolean,
  avatar: String
})

// const avatarURL = props.avatar === '' ? 'avatar/default-avatar.jpg' : props.avatar

const visible = ref(false)

const handleEdit = () => {
  router.push({ name: 'edit', params: { type: props.isDraft ? 'draft' : 'release', id: props.id } })
}
// const handleDelete = () => {
//   console.log('delete')
// }

const onToggle = () => {
  visible.value = !visible.value
}

const handleDelete = () => {
  onToggle()

  deleteIdea(props.id, props.index)
    .then(() => {
      getMyHistoryActivities()
      notify('success', 'Idea deleted successfully')
    })
    .catch((error) => {
    if (error.response.status === 401) {
      router.push({ name: 'sign-in' })
    }
  })
}
const viewDetailIdea = () => {
  if (props.isDraft === true) {
    router.push({ name: 'edit', params: { type: 'draft', id: props.id } })
  } else if (props.isPublish === true) {
    router.push({ name: 'detail-idea', params: { type: 'publish', id: props.id } })
  } else {
    router.push({ name: 'detail-idea', params: { type: 'pending', id: props.id } })
  }
}
</script>
<style scoped>
.ql-toolbar {
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

.ql-editor {
  padding: 0 !important;
}
</style>
