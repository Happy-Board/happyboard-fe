<template>
  <div class="grid grid-cols-6 pt-2 pb-4 border-t border-slate-400">
    <div class="col-span-1 flex flex-col gap-1 mt-1.5 mr-3 text-[12px]">
      <div class="flex justify-end font-medium text-gray-900">
        <span class="font-medium mr-0.5">{{ props.totalComment }}</span>
        {{ props.totalComment === 1 ? 'comment' : 'comments' }}
      </div>
      <div class="flex justify-end font-medium text-green-900">
        <span class="font-medium mr-0.5">{{ props.totalVote }}</span
        >{{ props.totalVote === 1 ? 'vote' : 'votes' }}
      </div>
      <div class="flex justify-end font-medium text-red-900">
        <span class="font-medium mr-0.5">{{ props.totalView }}</span
        >{{ props.totalView === 1 ? 'view' : 'views' }}
      </div>
    </div>
    <div class="col-span-5">
      <div class="title ms-1 flex justify-between">
        <div
          @click="viewDetailIdea(props.id)"
          class="ms-1 font-bold text-xl text-blue-900 hover:text-blue-900 hover:underline cursor-pointer w-fit line-clamp-2"
          v-html="props?.title"
        ></div>
        <div v-if="props.author === userName" class="dropdown h-[30px]">
          <button
            class="dropbtn px-2 aspect-square rounded-full bg-gray-50 hover:bg-gray-200 font-medium"
          >
            ⋯
          </button>
          <div class="dropdown-content rounded-md text-sm font-medium">
            <p @click="handleEdit">Edit</p>
            <p @click="handleDelete">Delete</p>
          </div>
        </div>
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
        <img
          src="../assets/default-avatar.jpg"
          alt="avatar"
          class="w-[3%] aspect-square rounded-full cursor-pointer lg:w-[5%] md:w-[7%] sm:w-[8%] xl:w-[3%]"
        />
        <span class="ms-2 me-6 font-semibold cursor-pointer">{{ props.author }}</span>

        <div class="flex relative">
          <i
            :class="
              props.category.icon + ' fa-solid absolute left-[-12px] bottom-[2px] text-gray-700'
            "
          ></i>
          <span class="ps-1">{{ props.category.title }}</span>
        </div>

        <div class="flex">
          <span class="ms-2 text-[11px]">{{ props.createdAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'
// import { defineEmits } from 'vue'

// const emits = defineEmits(['vote', 'unvote'])

// const vote = () => {
//   emits('vote', props.index)
// }
// const unvote = () => {
//   emits('unvote', props.index)
// }
const userName = localStorage.getItem('uname')
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
  isDraft: Boolean
})

const handleEdit = () => {
  router.push({ name: 'edit', params: { type: props.isDraft ? 'draft' : 'release', id: props.id } })
}
const handleDelete = () => {
  console.log('delete')
}
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

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
}

.dropdown-content p {
  color: black;
  padding: 2px 10px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content p:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
