<template>
  <div class="col-span-5 flex z-0 bg-white min-h-screen">
    <div class="flex flex-col gap-5 w-full">
      <p class="font-semibold text-3xl">Edit your idea</p>
      <Listbox class="w-2/5" as="div" v-model="selected">
        <ListboxLabel class="block text-sm font-medium leading-6 text-black"
          >Category <span class="text-red-600">*</span></ListboxLabel
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
                    active ? 'bg-primaryColor text-white' : 'text-gray-900',
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
          >Title <span class="text-red-600">*</span>
          <span v-if="ideaData?.title?.length" class="ms-2 text-xs">{{
            `(${ideaData?.title?.length}/200)`
          }}</span>
        </label>
        <!-- <div
          id="title"
          placeholder="Write your title here..."
          class="comment-input rounded-lg border bg-white border-borderColor focus:outline-0 py-2 px-3 pe-11 w-full text-sm"
          contentEditable="true"
          spellcheck="false"
        ></div> -->
        <textarea
          v-model="ideaData.title"
          placeholder="Write your title here..."
          rows="1"
          maxlength="200"
          class="text-sm overflow-hidden h-fit border border-gray-300 focus:outline-0 px-3 py-2 resize-none rounded-lg w-full"
          id="title1"
        ></textarea>
      </div>
      <div class="mb-10">
        <label class="block text-sm font-medium text-black mb-3" for="content"
          >Content <span class="text-red-600">*</span></label
        >
        <QuillEditor
          id="content"
          theme="snow"
          toolbar="essential"
          v-model:content="ideaData.content"
          contentType="html"
        />
      </div>
      <div v-if="route.params.type === 'draft'" class="my-10 flex justify-end">
        <button
          @click.prevent="saveIdea"
          type="button"
          class="text-white bg-primaryColor border border-borderColor focus:outline-none hover:bg-secondaryColor focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2"
        >
          Save Draft
        </button>
        <button
          @click.prevent="createIdea"
          type="button"
          class="text-white bg-primaryColor border border-borderColor focus:outline-none hover:bg-secondaryColor focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2"
        >
          Create
        </button>
      </div>
      <div v-if="route.params.type === 'pending'" class="my-10 flex justify-end">
        <!-- <button
          @click.prevent="saveIdea"
          type="button"
          class="text-white bg-primaryColor border border-borderColor focus:outline-none hover:bg-secondaryColor focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2"
        >
          Cancel
        </button> -->
        <button
          @click.prevent="createIdea"
          type="button"
          class="text-white bg-primaryColor border border-borderColor focus:outline-none hover:bg-secondaryColor focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2"
        >
          Release
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, onUpdated } from 'vue'
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
import { apiCreateIdea, apiSaveIdea, apiUpdateIdea } from '@/apis/idea.api'
import { useCategoryStore } from '@/stores/category.store'
import { storeToRefs } from 'pinia'
import 'vue3-toastify/dist/index.css'
import { useUserStore } from '@/stores/user.store'
import { useRoute } from 'vue-router'
import { notify } from '@/utils/toast'
import { useMyBoardStore } from '@/stores/my-board.store'
import sanitizeHtml from 'sanitize-html'
import { SANITIZE_ALLOWED_TAGS } from '@/constants'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const route = useRoute()
const ideaId = route.params.id
const type = route.params.type

const router = useRouter()
const categoryStore = useCategoryStore()
const myBoardStore = useMyBoardStore()
const { categories } = storeToRefs(categoryStore)
const { getAllCategory } = categoryStore

const userStore = useUserStore()
const { ideaToEdit } = storeToRefs(userStore)
const { getDetailDraftIdea, getDetailReleaseIdea } = userStore
const { setTab } = myBoardStore
// const title = ref()
const ideaData = reactive({
  categoryId: '',
  title: '',
  content: ''
})

onMounted(() => {
  getAllCategory()
  // document.querySelector('#title').innerHTML = ideaToEdit.value.title
  ideaData.title = ideaToEdit.value.title
  ideaData.categoryId = ideaToEdit.value?.Category.id
  ideaData.content = ideaToEdit.value?.content
})

if (type === 'draft')
  await getDetailDraftIdea(ideaId).catch((error) => {
    if (error.response.status === 401) {
      localStorage.clear()
      router.push({ name: 'sign-in' })
    }
  })

if (type === 'pending')
  await getDetailReleaseIdea(ideaId).catch((error) => {
    if (error.response.status === 401) {
      localStorage.clear()
      router.push({ name: 'sign-in' })
    }
  })

onUpdated(() => {
  document.querySelector('#title1').style.height = '5px'
  document.querySelector('#title1').style.height =
    document.querySelector('#title1').scrollHeight + 'px'
})

watch(
  () => ideaData.title,
  () => {
    document.querySelector('#title1').style.height = '5px'
    document.querySelector('#title1').style.height =
      document.querySelector('#title1').scrollHeight + 'px'
  }
)

const saveIdea = () => {
  if (ideaData.title && !sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })) {
    notify('error', 'Invalid title!')
    return
  } else if(ideaData.title !== sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })) {
    toast.warning('Your title is not allowed to contain html tags! We will strip your html tags', {
          autoClose: 5000
        })
    ideaData.title = sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })
    return
  }
  if (!ideaData.categoryId && !ideaData.title && !ideaData.content) {
    notify('warning', 'Nothing to save')
    return
  }
  if (route.name === 'edit') {
    apiUpdateIdea(ideaId, ideaData)
      .then(() => {
        notify('success', 'Idea saved successfully')
        setTimeout(() => {
          router.push({ name: 'my-board-ideas' })
        }, 500)
      })
      .catch((error) => {
        console.error(error)
        notify('error', 'Save idea failed, some thing went wrong !')
      })
  } else {
    apiSaveIdea(ideaData)
      .then(() => {
        notify('success', 'Your idea has been saved!')
        setTab('draft')
        setTimeout(() => {
          router.push({ name: 'my-board-ideas' })
        }, 500)
      })
      .catch((err) => {
        console.log(err)
        notify('error', 'Save idea failed, some thing went wrong !')
      })
  }
}

const createIdea = () => {
  if (ideaData.title && !sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })) {
    notify('error', 'Invalid title!')
    return
  } else if(ideaData.title !== sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })) {
    toast.warning('Your title is not allowed to contain html tags! We will strip your html tags', {
          autoClose: 5000
        })
    ideaData.title = sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })
    return
  }
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
  if (route.name === 'edit') {
    apiUpdateIdea(ideaId, { ...ideaData, isPublished: false, isDrafted: false })
      .then(() => {
        setTab('hide')
        if (type === 'release') {
          notify('success', 'Update idea successfully!')
        } else {
          notify('success', 'Create idea successfully!')
        }
        setTimeout(() => {
          router.push({ name: 'my-board-ideas' })
        }, 500)
      })
      .catch((error) => {
        console.error(error)
        notify('error', 'Create idea failed, some thing went wrong!')
      })
  } else {
    apiCreateIdea(ideaData)
      .then(() => {
        setTab('hide')
        notify('success', 'Create idea successfully!')
        setTimeout(() => {
          router.push({ name: 'my-board-ideas' })
        }, 500)
      })
      .catch((error) => {
        console.log(error)
        notify('error', 'Create idea failed, some thing went wrong!')

        if (error.response.status === 403) {
          notify('warning', `You don't have permision!`)
        }
      })
  }
}
const selected = ref({
  id: ideaToEdit.value.Category.id,
  title: ideaToEdit.value.Category.title,
  icon: ideaToEdit.value.Category.icon
})

watch(selected, async () => {
  ideaData.categoryId = selected.value.id
})
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
textarea {
  resize: none;
}
textarea::placeholder {
  font-size: 14px;
}
</style>
