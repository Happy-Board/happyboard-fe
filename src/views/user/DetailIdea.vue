<template>
  <div>
    <div class="fixed top-0 z-50"><HeaderComponent /></div>
    <div class="grid grid-cols-10 gap-3">
      <div class="col-span-2">
        <SidebarComponent active="home" />
      </div>
      <div class="col-span-5 flex pt-[100px] px-3 border z-0 bg-white">
        <div class="">
          <div class="flex items-center border-b">
            <div class="flex flex-col items-center pr-2 border-r gap-2">
              <svg
                @click="increaseVote"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                :class="
                  idea.statusVote === 'increse'
                    ? 'size-7 text-gray-900 cursor-pointer hover:text-gray-900'
                    : 'size-7 text-gray-400 cursor-pointer hover:text-gray-900'
                "
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-4.75a.75.75 0 0 0 1.5 0V8.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 9.74a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="px-2 font-medium text-green-900">{{ idea?.totalVote }}</div>
              <svg
                @click="decreaseVote"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                :class="
                  idea.statusVote === 'decrese'
                    ? 'size-7 text-gray-900 cursor-pointer hover:text-gray-900'
                    : 'size-7 text-gray-400 cursor-pointer hover:text-gray-900'
                "
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v4.59L7.3 9.24a.75.75 0 0 0-1.1 1.02l3.25 3.5a.75.75 0 0 0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02l-1.95 2.1V6.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="pb-3 ps-2">
              <h1 class="text-3xl font-bold">Top 8 đội hình leo rank thần tốc phiên bản 14.13B</h1>
              <div class="flex justify-between">
                <div class="flex items-end mt-2">
                  <img
                    src="@/assets/default-avatar.jpg"
                    alt="avatar"
                    class="w-[2%] aspect-square rounded-full cursor-pointer lg:w-[3%] md:w-[4%] sm:w-[6%] xl:w-[3%]"
                  />
                  <span class="ms-2 text-[12px] cursor-pointer">{{ idea.author }}</span>
                  <div class="flex gap-5 ms-5">
                    <div class="flex items-end text-[12px]">
                      <i :class="idea?.category?.icon + ' fa-solid text-gray-700'"></i>
                      <span class="ps-1 ">{{ idea?.category?.title }}</span>
                    </div>
                    <div class="flex">
                      <span class="text-[12px] font-thin">{{ idea?.createAt }}</span>
                    </div>
                    <div class="flex">
                      <span class="text-[12px] font-thin">{{
                        `${idea?.totalComment} comments`
                      }}</span>
                    </div>
                    <div class="flex">
                      <span class="text-[12px] font-thin">{{ `${idea?.totalView} views` }}</span>
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
              v-html="contentHTML"
            ></div>
          </div>
          <div class="bg-gray-100 p-4 rounded-xl mb-10">
            <div class="relative">
              <div
                id="comment-input"
                placeholder="Write a comment…"
                class="comment-input rounded-lg border-0 bg-white border-white focus:border-0 focus:outline-0 p-3 pe-12"
                contentEditable="true"
                spellcheck="false"
                @keypress="handleComment"
                ref="editorRef"
              ></div>

              <button @click="commitComment" class="absolute top-3 right-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6 text-gray-600 hover:text-black"
                >
                  <path
                    d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
                  />
                </svg>
              </button>
            </div>
            <div class="">
              <CommentComponent />
              <div class="ms-[3%] lg:ms-[5%] md:ms-[7%] sm:ms-[8%] xl:ms-[3.5%]">
                <CommentComponent />
              </div>
            </div>

            <CommentComponent />
            <CommentComponent />
          </div>
        </div>
      </div>

      <div class="col-span-3">
        <h1></h1>
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import CommentComponent from '@/components/CommentComponent.vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { onMounted, ref } from 'vue'
import { useIdeaStore } from '@/stores/idea.store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const route = useRoute()
const userName = localStorage.getItem('uname')
const ideaStore = useIdeaStore()
const ideaId = route.params.id
const { idea } = storeToRefs(ideaStore)
const { getIdea, addComment, increaseVote, decreaseVote } = ideaStore

onMounted(() => {
  getIdea(ideaId)
})
const contentHTML = `<pre class="ql-syntax" spellcheck="false">hhjdjfhas </pre><h1>gasdhf</h1><ol><li>dfsgd</li><li>sghfds</li><li>dfsagfd</li></ol><p>sdhdhsdfgsdfggsd</p>
`
// const handleIncreaseVote = () => {
//   increaseVote()
// }

// const handleReduceVote = () => {
//   reduceVote()
// }

const editorRef = ref()
const handleComment = (event) => {
  if (!event.ctrlKey || event.code !== 'Enter') return
  commitComment()
}

const commitComment = () => {
  addComment({ id: '', content: editorRef.value.innerHTML, author: userName, replyFor: '' })
  const comment = document.querySelector('#comment-input')
  comment.innerHTML = ''
}
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
