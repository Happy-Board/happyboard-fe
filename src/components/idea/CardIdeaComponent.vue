<template>
  <!-- <div class="grid grid-cols-9 pt-2 pb-1 border-t border-borderColor">
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
          @click="viewDetailIdea(props.id, 'publish')"
          class="text-wrap me-5 ms-1 font-bold text-xl text-primaryColor hover:text-secondaryColor hover:underline break-words cursor-pointer line-clamp-2"
          v-html="props?.title"
        ></div>
      </div>
      <div class="content mt-2 ms-1">
        <div class="content mt-2 mb-1 ms-1 border-0 break-words line-clamp-3">
          <div
            class="line-clamp-3 text-sm"
            data-gram="false"
            contenteditable="false"
            readonly="true"
            v-html="props.description"
          ></div>
        </div>
      </div>
      <div class="flex flex-row justify-end items-center text-[12px]">
        <img
          :src="avatarURL"
          alt="avatar"
          class="w-[3%] aspect-square rounded-full cursor-pointer lg:w-[5%] md:w-[7%] sm:w-[8%] xl:w-[3%]"
        />
        <span class="ms-2 me-6 font-semibold cursor-pointer">{{ props.author }}</span>

        <div class="flex relative">
          <i
            :class="
              props?.category?.icon + ' fa-solid absolute left-[-12px] bottom-[2px] text-gray-700'
            "
          ></i>
          <span class="ps-1">{{ props?.category?.title }}</span>
        </div>

        <div class="flex">
          <span class="ms-2 text-[11px]">{{ props.createdAt }}</span>
        </div>
      </div>
    </div>
  </div> -->
  <div class="grid grid-cols-9 pt-2 pb-1 border-t border-borderColor">
    <div class="col-span-9">
      <div class="title flex justify-between">
        <div
          @click="viewDetailIdea(props.id, 'publish')"
          class="text-wrap me-5 font-bold text-xl text-primaryColor hover:text-secondaryColor hover:underline break-words cursor-pointer line-clamp-2"
          v-html="props?.title"
        ></div>
      </div>
      <div class="content mt-2">
        <div class="content mt-2 mb-1 border-0 break-words line-clamp-3">
          <div
            class="line-clamp-3 text-sm"
            data-gram="false"
            contenteditable="false"
            readonly="true"
            v-html="props.description"
          ></div>
        </div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div class="flex items-center gap-3 mt-1.5 text-[12px]">
          <div class="flex items-center font-medium text-gray-900">
            <span class="font-medium mr-0.5 text-sm">{{ props.totalComment }}</span>
            <i class="fa-regular fa-comment-dots"></i>
          </div>
          <div class="flex items-center font-medium text-primaryColor">
            <span class="font-medium mr-0.5 text-sm">{{ props.totalVote }}</span
            >
            <i class="fa-regular fa-circle-check"></i>
          </div>
          <div class="flex items-center font-medium text-secondaryColor">
            <span class="font-medium mr-0.5 text-sm">{{ props.totalView }}</span
            >
            <i class="fa-regular fa-eye"></i>
          </div>
        </div>

        <div class="flex justify-end items-center text-[12px]">
          <img
            :src="avatarURL"
            alt="avatar"
            class="w-[3%] aspect-square rounded-full cursor-pointer lg:w-[5%] md:w-[7%] sm:w-[8%] xl:w-[3%]"
          />
          <span class="ms-2 me-6 font-semibold cursor-pointer">{{ props.author }}</span>

          <div class="flex relative">
            <i
              :class="
                props?.category?.icon + ' fa-solid absolute left-[-12px] bottom-[2px] text-gray-700'
              "
            ></i>
            <span class="ps-1">{{ props?.category?.title }}</span>
          </div>

          <div class="flex">
            <span class="ms-2 text-[11px]">{{ props.createdAt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'
// import { useUserStore } from '@/stores/user.store'
// import { storeToRefs } from 'pinia';

// const userStore = useUserStore()
// const { profile } = storeToRefs(userStore)
// import { defineEmits } from 'vue'

// const emits = defineEmits(['vote', 'unvote'])

// const vote = () => {
//   emits('vote', props.index)
// }
// const unvote = () => {
//   emits('unvote', props.index)
// }
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
  createdAt: String,
  isPublish: Boolean,
  isDraft: Boolean,
  avatar: String
})

const avatarURL = props.avatar === '' ? 'avatar/default-avatar.jpg' : props.avatar

// const handleEdit = () => {
//   router.push({ name: 'edit', params: { type: props.isDraft ? 'draft' : 'release', id: props.id } })
// }
// const handleDelete = () => {
//   console.log('delete')
// }
const viewDetailIdea = (id, type) => {
  router.push({ name: 'detail-idea', params: { type: type, id: id } })
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
