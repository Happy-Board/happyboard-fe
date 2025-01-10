<template>
  <div class="col-span-12 md:col-span-10 flex pt-[90px] z-0 bg-white px-5 min-h-screen md:ms-5">
    <div class="flex flex-col gap-5 md:w-[80%]">
      <p class="font-semibold text-3xl">Let's create idea in your group</p>
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
      <TabTypeCreateIdea :tab="tab" @setTab="handleSetTab"> </TabTypeCreateIdea>
      <div class="">
        <label for="message" class="block text-sm font-medium text-black mb-3"
          >Title <span class="text-red-600">*</span>
          <span v-if="ideaData?.title?.length" class="ms-2 text-xs">{{
            `(${ideaData?.title?.length}/200)`
          }}</span>
        </label>
        <textarea
          v-model="ideaData.title"
          placeholder="Write your title here..."
          rows="1"
          maxlength="200"
          class="text-sm overflow-hidden border border-gray-300 focus:outline-0 px-3 py-2 rounded-lg w-full"
          id="title1"
        ></textarea>
      </div>
      <div v-if="tab === 'text' || tab === 'poll'" class="mb-10">
        <label class="block text-sm font-medium text-black mb-3" for="content"
          >Content <span class="text-red-600">*</span></label
        >
        <QuillEditor
          id="content"
          theme="snow"
          :toolbar="toolbar"
          v-model:content="ideaData.content"
          contentType="html"
          @ready="onEditorReady"
          ref="quillEditor"
        />
      </div>
      <div v-if="tab === 'poll'" class="mt-10">
        <label class="block text-sm font-medium text-black mb-3" for="content"
          >Poll <span class="text-red-600">*</span></label
        >
        <PollEditor @updatePollData="updatePollData" />
      </div>

      <div v-if="tab === 'media'" class="">
        <label class="block text-sm font-medium text-black mb-3" for="content">
          Upload Image/Video <span class="text-red-600">*</span>
        </label>
        <div
          class="relative flex flex-col items-center justify-center w-full border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600"
        >
          <div v-if="preDisplayImage.length > 0" class="flex items-center justify-center">
            <button @click="prevImage" class="p-2 m-2 bg-gray-300 rounded-full hover:bg-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6 text-gray-700 hover:text-gray-500 transition-colors duration-300"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 12H7m0 0l5-5m-5 5l5 5"
                />
              </svg>
            </button>
            <div
              class="relative border-solid border-2 rounded-2xl bg-gray-700"
              style="width: 800px; height: 380px"
            >
              <!-- Hiển thị hình ảnh hoặc video tùy vào loại file -->
              <button
                v-if="isImageUpload"
                @click="triggerFileInput"
                class="absolute top-2 left-2 p-2 bg-primaryColor text-white rounded-2xl hover:bg-blue-800 z-10"
              >
                Add
              </button>
              <template v-if="isImage(preDisplayImage[currentImageIndex])">
                <img
                  :src="preDisplayImage[currentImageIndex]"
                  alt="Upload Image Preview"
                  class="w-full h-full object-contain"
                />
              </template>
              <template v-else>
                <video
                  :src="preDisplayImage[currentImageIndex]"
                  controls
                  class="w-full h-full object-contain"
                ></video>
              </template>
              <button
                @click="removeFile(currentImageIndex)"
                class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
                title="Delete Image/Video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-6 h-6 text-white hover:text-gray-200 transition-colors duration-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-2-2m0 0L12 12 7 7M15 5h5a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h5"
                  />
                </svg>
              </button>
            </div>
            <button @click="nextImage" class="p-2 m-2 bg-gray-300 rounded-full hover:bg-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6 text-gray-700 hover:text-gray-500 transition-colors duration-300"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 12h10m0 0l-5-5m5 5l-5 5"
                />
              </svg>
            </button>
          </div>
          <div
            v-else
            class="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer"
            @click="triggerFileInput"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG, GIF, MP4, MOV, AVI (MAX. 800x400px for images)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            multiple
            @change="onFilesChange"
            accept="image/*,video/*"
            class="hidden"
          />
        </div>
      </div>

      <div class="my-10 flex justify-end">
        <button
          @click.prevent="saveIdea"
          type="button"
          class="text-white bg-primaryColor border border-borderColor focus:outline-none hover:bg-secondaryColor focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 md:mb-2 mt-5"
        >
          Save Draft
        </button>
        <button
          @click.prevent="createIdea"
          type="button"
          class="text-white bg-primaryColor border border-borderColor focus:outline-none hover:bg-secondaryColor focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 md:mb-2 mt-5"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
import {
  apiCreateIdea,
  apiCreateMediaIdea,
  apiSaveIdea,
  apiDeleteIdea,
  apiUploadImageInContent,
  apiCreatePollIdea
} from '@/apis/idea.api'
import { useCategoryStore } from '@/stores/category.store'
import { storeToRefs } from 'pinia'
import 'vue3-toastify/dist/index.css'
import { notify } from '@/utils/toast'
import { useMyBoardStore } from '@/stores/my-board.store'
import sanitizeHtml from 'sanitize-html'
import { SANITIZE_ALLOWED_TAGS } from '@/constants'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import TabTypeCreateIdea from '../../components/idea/TabTypeCreateIdea.vue'
import PollEditor from '../../components/idea/PollEditor.vue'
// import TabAccountSkeleton from '@/components/skeletons/TabAccountSkeleton.vue'

const router = useRouter()
const route = useRoute()
const groupId = route.params.groupId
const categoryStore = useCategoryStore()
const myBoardStore = useMyBoardStore()
const { categories } = storeToRefs(categoryStore)
const { getAllCategory } = categoryStore
const { setTab } = myBoardStore

onMounted(() => {
  getAllCategory()
})

const tab = ref('text')

const handleSetTab = (newTab) => {
  tab.value = newTab
}

const ideaData = reactive({
  categoryId: '',
  title: '',
  content: '',
  type: '',
  linkMedia: '',
  groupId: groupId ? groupId : 1,
  pollOptions: [],
  endDate: ''
})

const pollData = ref({ questions: [] })
const updatePollData = (data) => {
  pollData.value = data
}

watch(
  () => ideaData.title,
  () => {
    document.querySelector('#title1').style.height = '5px'
    document.querySelector('#title1').style.height =
      document.querySelector('#title1').scrollHeight + 'px'
  }
)

let selectedFiles = ref([])
const preDisplayImage = ref([])
const currentImageIndex = ref(0)
const isImageUpload = ref(false)

const onFilesChange = (event) => {
  const files = Array.from(event.target.files)
  const images = files.filter((file) => file.type.startsWith('image/'))
  const videos = files.filter((file) => file.type.startsWith('video/'))

  if (images.length > 0 && videos.length > 0) {
    // Nếu người dùng upload cả ảnh và video
    preDisplayImage.value = [] // Reset danh sách hiển thị trước
    alert('Please upload only images or only videos, not both at the same time.') // Thông báo lỗi
    isImageUpload.value = false
    return
  }

  if (images.length > 0) {
    isImageUpload.value = true
    selectedFiles.value = Array.from(files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        preDisplayImage.value.push(e.target.result)
      }
      reader.readAsDataURL(file)
    })
  } else if (videos.length > 0) {
    isImageUpload.value = false
    selectedFiles.value = Array.from(files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        preDisplayImage.value.push(e.target.result)
      }
      reader.readAsDataURL(file)
    })
  }
}

const isImage = (fileData) => {
  return fileData && fileData.startsWith('data:image/')
}

const removeFile = (index) => {
  preDisplayImage.value.splice(index, 1)
  if (currentImageIndex.value >= preDisplayImage.value.length) {
    currentImageIndex.value = Math.max(0, preDisplayImage.value.length - 1)
  }
}

const nextImage = () => {
  if (currentImageIndex.value < preDisplayImage.value.length - 1) {
    currentImageIndex.value++
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const triggerFileInput = () => {
  const fileInput = document.getElementById('dropzone-file')
  fileInput.setAttribute('accept', 'image/*')
  fileInput.click()
}

const saveIdea = () => {
  ideaData.type = tab.value == 'text' ? 'text' : 'media'

  if (ideaData.title && !sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })) {
    notify('error', 'Invalid title!')
    return
  } else if (
    ideaData.title !== sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })
  ) {
    toast.warning('Your title is not allowed to contain html tags! We will strip your html tags', {
      autoClose: 5000
    })
    ideaData.title = sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })
    return
  }
  if (
    !ideaData.categoryId &&
    !ideaData.title &&
    !ideaData.content &&
    preDisplayImage.value.length === 0
  ) {
    notify('warning', 'Nothing to save')
    return
  }

  if (ideaData.type === 'text') {
    if (!ideaData.content || !(ideaData.content && preDisplayImage.value.length === 0)) {
      notify('warning', 'Content is not empty !')
      return
    }
    const formData = new FormData()
    formData.append('type', ideaData.type)
    formData.append('title', ideaData.title)
    formData.append('categoryId', ideaData.categoryId)
    formData.append('content', ideaData.content)

    apiSaveIdea(formData)
      .then(() => {
        setTab('draft')
        notify('success', 'Create idea successfully !')
        setTimeout(() => {
          router.push({ name: 'my-board-ideas' })
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
        notify('error', 'Create idea failed, some thing went wrong !')
      })
    apiDeleteIdea()
  }

  if (ideaData.type === 'media') {
    if (!preDisplayImage.value || !(ideaData.content && preDisplayImage.value.length === 0)) {
      notify('warning', 'Media is not empty !')
      return
    }
    const formData = new FormData()

    formData.append('title', ideaData.title)
    formData.append('categoryId', ideaData.categoryId)
    formData.append('type', ideaData.type)
    selectedFiles.value.forEach((file) => {
      formData.append('files', file)
    })
    apiSaveIdea(formData)
      .then(() => {
        setTab('draft')
        notify('success', 'Create media content idea successfully !')
        setTimeout(() => {
          router.push({ name: 'my-board-ideas' })
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
        notify('error', 'Create idea failed, some thing went wrong !')
      })
  }
}

const createIdea = () => {
  if (ideaData.title && !sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })) {
    notify('error', 'Invalid title!')
    return
  } else if (
    ideaData.title !== sanitizeHtml(ideaData.title, { allowedTags: SANITIZE_ALLOWED_TAGS })
  ) {
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
  }

  if (tab.value === 'text' || tab.value === 'poll') {
    if (tab.value === 'text') {
      ideaData.type = 'text'
      if (!ideaData.content) {
        notify('warning', 'Content is not empty !')
      }

      apiCreateIdea(ideaData)
        .then(() => {
          setTab('hide')
          notify('success', 'Create idea in group successfully !')
          setTimeout(() => {
            router.push({ name: 'my-board-ideas' })
          }, 1000)
        })
        .catch((err) => {
          console.log(err)
          notify('error', 'Create idea failed, some thing went wrong !')
        })
    }

    if (tab.value === 'poll') {
      if (
        !pollData.value.questions[0].expireDays &&
        !pollData.value.questions[0].expireHours &&
        !pollData.value.questions[0].expireMinutes
      ) {
        notify('warning', 'Poll is not empty !')
        return
      }
      const currentDate = new Date()
      const question = pollData.value.questions[0]

      const endDate = new Date(
        currentDate.getTime() +
          question.expireDays * 24 * 60 * 60 * 1000 +
          question.expireHours * 60 * 60 * 1000 +
          question.expireMinutes * 60 * 1000
      )
      ideaData.endDate = endDate
      ideaData.pollOptions = pollData.value.questions[0].choices

      apiCreatePollIdea(ideaData)
        .then(() => {
          setTab('hide')
          notify('success', 'Create idea in group successfully !')
          setTimeout(() => {
            router.push({ name: 'my-board-ideas' })
          }, 1000)
        })
        .catch((err) => {
          console.log(err)
          notify('error', 'Create idea failed, some thing went wrong !')
        })
    }
  } else if (tab.value === 'media') {
    ideaData.type = tab.value
    if (!preDisplayImage.value) {
      notify('warning', 'Media is not empty !')
      return
    }
    const formData = new FormData()

    formData.append('title', ideaData.title)
    formData.append('groupId', ideaData.groupId)
    formData.append('categoryId', ideaData.categoryId)
    formData.append('type', ideaData.type)
    selectedFiles.value.forEach((file) => {
      formData.append('files', file)
    })

    apiCreateMediaIdea(formData)
      .then(() => {
        setTab('hide')
        notify('success', 'Create media idea in group successfully!')
        setTimeout(() => {
          router.push({ name: 'my-board-ideas' })
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
        notify('error', 'Create idea failed, some thing went wrong !')
      })
  }
}
const selected = ref({
  title: 'Choose a category for your idea',
  icon: ''
})
watch(selected, async () => {
  ideaData.categoryId = selected.value.id
})

// Cấu hình toolbar
const toolbar = [
  ['bold', 'italic', 'underline', 'strike'], // Basic formatting
  ['blockquote', 'code-block'], // Block formatting
  [{ list: 'ordered' }, { list: 'bullet' }], // List
  [{ indent: '-1' }, { indent: '+1' }], // Indentation
  ['link', 'image', 'video'], // Adding image and video
  [{ align: [] }], // Align
  ['clean'] // Clear formatting
]

const quillEditor = ref(null)

// Lấy đối tượng quill từ QuillEditor
const onEditorReady = (editor) => {
  const imageButton = editor.theme.modules.toolbar.controls[11][1]
  // imageButton: <button class=ql-image>
  imageButton?.addEventListener('click', () => {
    const fileInput = document.querySelector('input[type="file"]')

    fileInput.onchange = async () => {
      const file = fileInput.files[0]
      if (file) {
        const formData = new FormData()
        formData.append('file', file)

        apiUploadImageInContent(formData)
          .then((response) => {
            const imageUrl = response.data.data.image_url
            const range = editor.getSelection()
            if (range) {
              // editor.deleteText(range.index, range.length)

              // editor.insertEmbed(range.index, 'image', imageUrl)

              const editorContent = editor.root.innerHTML
              const updatedContent = editorContent.replace(
                /src="data:image\/png;base64,([^"]+)"/g,
                `src="${imageUrl}"`
              )

              // Cập nhật lại nội dung của Quill editor
              editor.root.innerHTML = updatedContent
            }
          })
          .catch((err) => {
            console.error('Error uploading image:', err)
          })
      }
    }
  })
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

textarea::placeholder {
  font-size: 14px;
}
</style>
