<template>
  <div>
    <div class="">
      <div>
        <div id="comment-block" class="comment-level-1 mt-5 flex items-start gap-1">
          <img
            src="@/assets/default-avatar.jpg"
            alt="avatar"
            class="w-[3%] aspect-square rounded-full cursor-pointer lg:w-[5%] md:w-[7%] sm:w-[8%] xl:w-[3.5%]"
          />
          <div>
            <div
              class="comment-input rounded-lg border-0 bg-white border-white focus:border-0 focus:outline-0 px-4 py-2 w-fit"
              contentEditable="false"
              data-lexical-editor="false"
              role="textbox"
              spellcheck="false"
              v-html="
                '<div><strong>Khaipn2</strong><br>Comment1jasdhfkaskdfhasdkfhasdkfksadhkfhskadfhkjsdasddsfs</div><p>continute</p>'
              "
            ></div>
            <div class="flex gap-3 mt-1">
              <span
                class="font-medium text-gray-600 cursor-pointer text-sm mx-2 hover:text-gray-800 hover:underline"
                >Like</span
              >
              <span
                @click="handleOpenReply"
                class="font-medium text-gray-600 cursor-pointer text-sm mx-2 hover:text-gray-800 hover:underline"
                >Reply</span
              >
              <span class="font-medium text-gray-600 text-sm mx-2">30m ago</span>
            </div>
            <div v-if="isOpenReply" class="comment-level-1 mt-5 flex items-start gap-1">
              <img
                src="@/assets/default-avatar.jpg"
                alt="avatar"
                class="w-[3%] lg:w-[5%] md:w-[7%] sm:w-[8%] xl:w-[3.5%] aspect-square rounded-full cursor-pointer"
              />
              <div class="w-full">
                <div class="relative input-box">
                  <div
                    placeholder="Reply to ..."
                    class="comment-input rounded-lg border-0 bg-white border-white focus:border-0 focus:outline-0 py-2 px-3 pe-11 w-full"
                    contentEditable="true"
                    tabindex="0"
                    data-lexical-editor="true"
                    style="user-select: text; white-space: pre-wrap; word-break: break-word"
                    role="textbox"
                    spellcheck="false"
                    @keypress="handleComment"
                    ref="editorRef"
                  ></div>
                  <button @click.prevent.stop="commitComment" class="absolute top-2 right-2 cursor-pointer">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const editorRef = ref()

const handleComment = (event) => {
  if (!event.ctrlKey || event.code !== 'Enter') return
  commitComment(event)
}

const commitComment = (event) => {
  // console.log(
  //   event.target.closest('.input-box').querySelector('.comment-input').innerHTML
  // )
  event.target.closest('.input-box').querySelector('.comment-input').innerHTML = ''

  // console.log(editorRef.value.innerHTML)
  // const comment = document.querySelector('#comment-input')
  // comment.innerHTML = ''
}
const isOpenReply = ref(false)

const handleOpenReply = () => {
  isOpenReply.value = true
}
</script>
<style scoped>
.comment-input[contentEditable='true']:empty:before {
  content: attr(placeholder);
  color: gray;
  cursor: text;
}
</style>
