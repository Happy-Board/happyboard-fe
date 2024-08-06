<template>
  <div class="col-span-5 flex pt-[100px] px-3 border z-0 bg-white">
    <div class="">
      <div class="flex items-start border-b pb-2">
        <div class="flex flex-col items-center pr-2 border-r gap-1 w-32">
          <div
            class="border border-gray-500 px-2 py-1 rounded-full"
            :class="
              idea.vote === 'up'
                ? ' text-gray-900 cursor-pointer hover:text-gray-900 bg-blue-300'
                : ' text-gray-900  cursor-pointer hover:text-gray-900 hover:bg-blue-100'
            "
          >
            <i
              @click="increaseVote(ideaId)"
              class="fa-solid fa-caret-up fa-xl"
              :class="
                idea.vote === 'up'
                  ? ' text-gray-900 cursor-pointer hover:text-gray-900'
                  : ' text-gray-900  cursor-pointer hover:text-gray-900'
              "
            ></i>
          </div>
          <div class="px-2 font-medium text-green-900">{{ idea?.voteCount }}</div>

          <div
            class="px-2 py-1 border border-gray-500 rounded-full"
            :class="
              idea.vote === 'down'
                ? ' text-gray-900 cursor-pointer hover:text-gray-900 bg-blue-300'
                : ' text-gray-900 cursor-pointer hover:text-gray-900 hover:bg-blue-100'
            "
          >
            <i
              @click="decreaseVote(ideaId)"
              class="fa-solid fa-caret-down fa-xl"
              :class="
                idea.vote === 'down'
                  ? ' text-gray-900 cursor-pointer hover:text-gray-900'
                  : ' text-gray-900 cursor-pointer hover:text-gray-900'
              "
            ></i>
          </div>
        </div>
        <div class="flex flex-col items-start ps-2">
          <div class="!text-3xl !font-bold" v-html="idea?.title"></div>
          <div class="flex justify-between items-center">
            <div class="flex items-center mt-2">
              <img
                src="@/assets/default-avatar.jpg"
                alt="avatar"
                class="w-[2%] aspect-square rounded-full cursor-pointer lg:w-[3%] md:w-[4%] sm:w-[6%] xl:w-[3%]"
              />
              <span class="ms-2 text-[12px] cursor-pointer">{{ idea?.User?.username }}</span>
              <div class="flex gap-5 ms-5">
                <div class="flex items-center text-[12px]">
                  <i :class="idea?.Category?.icon + ' fa-solid text-gray-700'"></i>
                  <span class="ps-1">{{ idea?.Category?.title }}</span>
                </div>
                <div class="flex">
                  <span class="text-[12px] font-thin">{{ idea?.createdAt }}</span>
                </div>
                <div class="flex">
                  <span class="text-[12px] font-thin">{{ `${idea?.commentCount} comments` }}</span>
                </div>
                <div class="flex">
                  <span class="text-[12px] font-thin">{{ `${idea?.viewCount} views` }}</span>
                </div>
              </div>
              <div class=""></div>
            </div>
          </div>
        </div>
      </div>
      <div class="ql-toolbar ql-snow border-0 pb-5 border-b mb-3">
        <div
          class="ql-editor"
          data-gram="false"
          contenteditable="false"
          readonly="true"
          v-html="idea?.content"
        ></div>
      </div>
      <CommentBlock :ideaId="ideaId" />
    </div>
  </div>

  <div class="col-span-3 mt-[95px] ms-14">
    <SuggestIdeaComponent feature="Related ideas" :ideas="relatedIdeas" />
  </div>
</template>
<script setup>
import SuggestIdeaComponent from '@/components/SuggestIdeaComponent.vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { onMounted } from 'vue'
import { useIdeaStore } from '@/stores/idea.store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import CommentBlock from '@/components/CommentBlock.vue'

const route = useRoute()
// const router = useRouter()
const ideaStore = useIdeaStore()
const ideaId = route.params.id
const { idea, relatedIdeas } = storeToRefs(ideaStore)
const { getDetailIdea, increaseVote, decreaseVote, getRelatedIdeas } = ideaStore



onMounted(() => {
  getDetailIdea(ideaId)
  getRelatedIdeas(ideaId)
})

// const editorRef = ref()
// const handleComment = (event) => {
//   if (!event.ctrlKey || event.code !== 'Enter') return
//   commitComment()
// }

// const commitComment = () => {
//   addComment(ideaId, { content: editorRef.value.innerHTML })
//   const comment = document.querySelector('#comment-input')
//   comment.innerHTML = ''
//   router.go()
// }
</script>
<style scoped>
.ql-toolbar {
  border: 0 !important;
  border-bottom: 1px solid rgb(218, 218, 218) !important;
}
.comment-input[contentEditable='true']:empty:before {
  content: attr(placeholder);
  color: gray;
  cursor: text;
}
</style>
