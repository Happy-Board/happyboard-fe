<template>
  <div class="col-span-5 flex pt-[90px] z-0 bg-white px-5 min-h-screen">
    <div class="flex flex-col gap-5 w-full">
      <p class="font-semibold text-3xl">Let's create your idea</p>
      <Listbox class="w-2/5" as="div" v-model="selected">
        <ListboxLabel class="block text-sm font-medium leading-6 text-black"
          >Category <span class="text-red-500">*</span></ListboxLabel
        >
        <div class="relative mt-2">
          <ListboxButton
            class="relative w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 cursor-pointer focus:ring-gray-500 sm:text-sm sm:leading-6"
          >
            <span class="flex items-center">
              <i :class="selected.icon + ' fa-solid'" v-if="selected.id"></i>
              <span :class="selected.id ? 'ml-3 block truncate' : 'block truncate'">{{
                selected.title
              }}</span>
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
            >
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute cursor-pointer z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="category in categories"
                :key="category.id"
                :value="category"
                v-slot="{ active, selected }"
              >
                <li
                  :class="[
                    active ? 'bg-gray-500 text-white' : 'text-gray-900',
                    'relative cursor-pointer select-none py-2 pl-3 pr-9'
                  ]"
                >
                  <div class="flex items-center">
                    <i :class="category.icon + ' fa-solid'"></i>

                    <span
                      :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']"
                      >{{ category.title }}</span
                    >
                  </div>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-black',
                      'absolute inset-y-0 right-0 flex items-center pr-4'
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
      <div class="">
        <label for="message" class="block text-sm font-medium text-black mb-3"
          >Title <span class="text-red-500">*</span></label
        >
        <div
          id="title"
          placeholder="Write your title here..."
          class="comment-input rounded-lg border bg-white border-gray-400 focus:outline-0 py-2 px-3 pe-11 w-full text-sm"
          contentEditable="true"
          spellcheck="false"
        ></div>
      </div>
      <div class="mb-10">
        <label class="block text-sm font-medium text-black mb-3" for="content"
          >Content <span class="text-red-500">*</span></label
        >
        <QuillEditor
          id="content"
          theme="snow"
          toolbar="essential"
          v-model:content="ideaData.content"
          contentType="html"
        />

      </div>
      <div class="my-10 flex justify-end">
        <button
        @click.prevent="saveIdea"
          type="button"
          class="text-black bg-gray-200 border border-gray-400 focus:outline-none hover:bg-blue-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Save Draft
        </button>
        <button
          @click.prevent="createIdea"
          type="button"
          class="text-black bg-gray-200 border border-gray-400 focus:outline-none hover:bg-green-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { apiCreateIdea, apiSaveIdea } from '@/apis/idea.api'
import { useCategoryStore } from '@/stores/category.store'
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const router = useRouter()
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { getAllCategory } = categoryStore

console.log(categories.value)

onMounted(() => {
  getAllCategory()
})

const ideaData = reactive({
  categoryId: '',
  title: '',
  content: ''
})

const saveIdea = () => {
  const title = document.querySelector('#title').innerHTML
  ideaData.title = title
  if (!ideaData.categoryId && !ideaData.title && !ideaData.content) {
    notify('warning', 'Nothing to save')
    return
  }
  apiSaveIdea(ideaData).then(() => {
      notify('success', 'Your idea has been saved!')
      setTimeout(() => {
        router.push('/')
      }, 1000)
    })
    .catch((err) => {
      console.log(err)
      notify('error', 'Save idea failed, some thing went wrong !')
    })
}
const createIdea = () => {
  const title = document.querySelector('#title').innerHTML
  ideaData.title = title

  if (!ideaData.categoryId) {
    notify('warning', 'Category is not empty !')
    return
  } else if (!ideaData.title) {
    notify('warning', 'Title is not empty !')
    return
  } else if (!ideaData.content) {
    notify('warning', 'Content is not empty !')
    return
  }
  apiCreateIdea(ideaData)
    .then(() => {
      notify('success', 'Create idea successfully !')
      setTimeout(() => {
        router.push('/')
      }, 1000)
    })
    .catch((err) => {
      console.log(err)
      notify('error', 'Create idea failed, some thing went wrong !')
    })
}
const selected = ref({
  title: 'Choose a category for your idea',
  icon: ''
})
watch(selected, async () => {
  ideaData.categoryId = selected.value.id
})

const notify = (type, message) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        autoClose: 1000
      })
      break
    case 'warning':
      toast.warning(message, {
        autoClose: 1000
      })
      break
    case 'error':
      toast.error(message, {
        autoClose: 1500
      })
      break
    case 'info':
      toast.info(message, {
        autoClose: 1000
      })
      break

    default:
      break
  }
}
</script>
<style scoped>
a {
  cursor: pointer !important;
}

.ql-editor {
  margin-bottom: 50px;
}

.comment-input[contentEditable='true']:empty:before {
  content: attr(placeholder);
  color: gray;
  cursor: text;
}
</style>
