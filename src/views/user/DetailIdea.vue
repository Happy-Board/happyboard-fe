<template>
  <div>
    <div class="fixed top-0 z-50"><HeaderComponent /></div>
    <div class="grid grid-cols-10 gap-3">
      <div class="col-span-2">
        <SidebarComponent active="home" />
      </div>
      <div class="col-span-5 flex pt-[100px] px-3 border z-0 bg-white">
        <div class="">
          <div class="flex items-start border-b pb-2">
            <div class="flex flex-col items-center pr-2 border-r gap-1 w-32">
 
                <div class="border border-gray-500 px-2 py-1 rounded-full "
                :class="
                      idea.vote === 'up'
                        ? ' text-gray-900 cursor-pointer hover:text-gray-900 bg-blue-300'
                        : ' text-gray-900  cursor-pointer hover:text-gray-900 hover:bg-blue-100'
                    ">
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

              <div class="px-2 py-1 border border-gray-500 rounded-full" :class="
                    idea.vote === 'down'
                      ? ' text-gray-900 cursor-pointer hover:text-gray-900 bg-blue-300'
                      : ' text-gray-900 cursor-pointer hover:text-gray-900 hover:bg-blue-100'
                  ">
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
                      <span class="text-[12px] font-thin">{{
                        `${idea?.commentCount} comments`
                      }}</span>
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
          <!-- <div class="bg-gray-100 p-4 rounded-xl mb-10">
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
            <div v-for="(comment, index) in idea.comments" :key="index" class="">
              <CommentComponent
                :content="comment.content"
                :author="comment.User.username"
                :id="comment.id"
                :ideaId="ideaId"
                :createdAt="comment.createdAt"
              />
              <div
                v-for="(reply, index) in comment.children"
                :key="index"
                class="ms-[3%] lg:ms-[5%] md:ms-[7%] sm:ms-[8%] xl:ms-[3.5%]"
              >
                <CommentComponent
                  :content="reply.content"
                  :author="reply.User.username"
                  :id="reply.id"
                  :ideaId="ideaId"
                  :createdAt="comment.createdAt"
                />
              </div>
            </div>
          </div> -->
          <CommentBlock :ideaId="ideaId" />
        </div>
      </div>

      <div class="col-span-3 mt-[95px] ms-14">
          <SuggestIdeaComponent
            feature="Related ideas"
            :ideas="relatedIdeas"
          />
        </div>
    </div>
  </div>
</template>
<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
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
