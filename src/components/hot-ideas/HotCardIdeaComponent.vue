<template>
  <div
    @click="viewDetailIdea(props.id)"
    class="px-2 py-1 mt-3 mx-2 border border-borderColor rounded-lg overflow-hidden cursor-pointer hover:bg-slate-50 bg-backgroundColor"
  >
    <img src="/animations/fire.gif" class="absolute top-0 right-0 w-7 h-7" alt="" />

    <div class="title ms-1 me-3 overflow-hidden">
      <div
        class="ms-1 font-bold text-xl text-primaryColor hover:text-blue-900 hover:underline cursor-pointer w-fit !line-clamp-1 text-left me-2"
        v-html="props.title"
      ></div>
    </div>
    <div class="content mt-2 ms-1">
      <!-- <div class="content mt-2 mb-2 ms-1 ql-toolbar ql-snow border-0 pb-2 border-b line-clamp-3">
          <div
            class="ql-editor line-clamp-3 text-sm"
            data-gram="false"
            contenteditable="false"
            readonly="true"
            v-html="props.description"
          ></div>
        </div> -->
      <div class="content mt-2 mb-1 ms-1 border-0 line-clamp-2">
        <div
          class="break-words line-clamp-2 text-sm text-left min-h-[40px]"
          data-gram="false"
          contenteditable="false"
          readonly="true"
          v-html="props.content"
        ></div>
      </div>
    </div>
    <div class="flex justify-between items-center text-[12px] pt-1 mx-2">
      <div class="flex justify-start items-center text-[12px]">
        <img :src="avatarURL" alt="avatar" class="w-[6%] aspect-square rounded-full" />
        <span class="ms-1 me-6 font-semibold text-xs">{{ props.author }}</span>
      </div>
      <div class="flex items-center gap-3 mt-1.5s text-[12px]">
        <div class="flex items-center font-medium text-gray-900">
          <span class="font-medium mr-0.5 text-sm">{{ props.totalComment }}</span>
          <i class="fa-regular fa-comment-dots"></i>
        </div>
        <div class="flex items-center font-medium text-primaryColor">
          <span class="font-medium mr-0.5 text-sm">{{ props.totalVote }}</span>
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="flex items-center font-medium text-secondaryColor">
          <span class="font-medium mr-0.5 text-sm">{{ props.totalView }}</span>
          <i class="fa-regular fa-eye"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  title: String,
  content: String,
  author: String,
  id: Number,
  avatar: String,
  totalComment: Number,
  totalView: Number,
  totalVote: Number
})

const avatarURL = props.avatar === '' ? 'avatar/default-avatar.jpg' : props.avatar
const router = useRouter()
const viewDetailIdea = (id) => {
  router.push({ name: 'detail-idea', params: { type: 'publish', id: id } })
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
