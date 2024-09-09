<template>
  <div class="flex items-start border-b border-borderColor pb-2">
    <!-- <div class="flex flex-col items-center pr-2 border-r gap-1 w-32">
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
    </div> -->
    <div class="flex flex-col items-start w-full">
      <div
        class="!text-3xl !font-bold overflow-hidden break-words line-clamp-2 w-[90%]"
        v-html="idea?.title"
      ></div>
      <div class="flex justify-between items-center">
        <div class="flex items-center mt-2">
          <img
            :src="idea?.User?.avatar === '' ? '/avatar/default-avatar.jpg' : idea?.User?.avatar"
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
              <span class="text-[12px]">{{ idea?.createdAt }}</span>
            </div>
            <div v-if="typeIdea !== 'pending'" class="flex">
              <span class="text-[12px]">{{
                idea?.commentCount === 1
                  ? `${idea?.commentCount} comment`
                  : `${idea?.commentCount} comments`
              }}</span>
            </div>
            <div v-if="typeIdea !== 'pending'" class="flex">
              <span class="text-[12px]">{{
                idea?.viewCount === 0
                  ? `${idea?.viewCount + 1} view`
                  : `${idea?.viewCount + 1} views`
              }}</span>
            </div>
          </div>
        </div>
        <button
          v-if="typeIdea !== 'pending'"
          @click="handleVote"
          class="text-sm font-semibold px-3 rounded-full border border-primaryColor min-w-[73px]"
          :class="
            vote === null
              ? 'bg-white hover:bg-backgroundButtonColor text-black'
              : 'bg-primaryColor text-white'
          "
        >
          {{ idea?.voteCount === 1 ? `${idea?.voteCount} Vote` : `${idea?.voteCount} Votes` }}
        </button>
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
</template>
<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useIdeaStore } from '@/stores/idea.store'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const ideaStore = useIdeaStore()
const ideaId = route.params.id
const typeIdea = route.params.type
const { idea } = storeToRefs(ideaStore)
const { getDetailIdea, increaseVote, decreaseVote, getRelatedIdeas, getDetailPendingIdea } =
  ideaStore

if (typeIdea === 'pending') {
  await getDetailPendingIdea(ideaId)
}
if (typeIdea === 'publish') {
  await getDetailIdea(ideaId)
}

await getRelatedIdeas(ideaId).catch((error) => {
  if (error.response.status === 401) {
    router.push({ name: 'sign-in' })
  }
})
const vote = ref(idea.value?.vote)
const handleVote = () => {
  if (vote.value === null) {
    increaseVote(ideaId)
    vote.value = 'up'
  } else {
    decreaseVote(ideaId)
    vote.value = null
  }
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
.ql-editor {
  padding: 12px 0px;
}
.ql-toolbar.ql-snow {
  padding: 0 !important;
}
</style>
