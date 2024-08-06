<template>
  <div class="px-2 py-1 my-3 mx-2 border border-gray-300 rounded-lg shadow-md shadow-gray-300 overflow-visible">
    <i class="fa-solid fa-fire text-red-600 fa-lg absolute top-4 right-1 "></i>

    <div class="title ms-1 cursor-grab active:cursor-grabbing ">
      <div
        @click="viewDetailIdea(props.id)"
        class="ms-1 font-bold text-xl text-blue-900 hover:text-blue-900 hover:underline cursor-pointer w-fit !line-clamp-1 text-left"
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
      <div class="content mt-2 mb-1 ms-1 border-0 line-clamp-2 cursor-default active:cursor-grabbing">
        <div
          class="line-clamp-2 text-sm text-left min-h-[40px]"
          data-gram="false"
          contenteditable="false"
          readonly="true"
          v-html="props.content"
        ></div>
      </div>
    </div>
    <div class="flex flex-row justify-start items-center text-[12px] pt-1 ms-2">
        <img
          src="../assets/default-avatar.jpg"
          alt="avatar"
          class="w-[6%] aspect-square rounded-full cursor-pointer"
        />
        <span class="ms-1 me-6 font-semibold cursor-pointer text-xs">{{ props.author }}</span>

      
      </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
  title: String,
  content: String,
  author: String,
  id: Number
})
const router = useRouter()
const viewDetailIdea = (id) => {
  router.push(`idea/${id}`)
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
