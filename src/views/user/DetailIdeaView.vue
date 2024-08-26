<template>
  <div class="col-span-7 pt-[100px] px-3 ms-10 z-0 bg-white min-h-screen">
      <Suspense>
        <DetailIdea />
        <template #fallback>
          <DetailIdeaSkeleton />
        </template>
      </Suspense>
      <Suspense>
        <CommentBlock :ideaId="ideaId" />
        <template #fallback>
          <CommentBlockSkeleton />
        </template>
      </Suspense>
  </div>

  <div class="col-span-3 mt-[95px]">
    <Suspense>
      <SuggestIdeaComponent feature="Related ideas" :ideas="relatedIdeas" />
      <template #fallback>
        <SuggestIdeaSkeleton />
      </template>
    </Suspense>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useIdeaStore } from '@/stores/idea.store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import SuggestIdeaSkeleton from '@/components/skeletons/SuggestIdeaSkeleton.vue'
import DetailIdeaSkeleton from '@/components/skeletons/DetailIdeaSkeleton.vue'
import CommentBlockSkeleton from '@/components/skeletons/CommentBlockSkeleton.vue'
const CommentBlock = defineAsyncComponent(() => import('@/components/comments/CommentBlock.vue'))
const DetailIdea = defineAsyncComponent(() => import('@/components/idea/DetailIdea.vue'))
const SuggestIdeaComponent = defineAsyncComponent(
  () => import('@/components/home/SuggestIdeaComponent.vue')
)
const route = useRoute()
// const router = useRouter()
const ideaStore = useIdeaStore()
const ideaId = route.params.id
const { relatedIdeas } = storeToRefs(ideaStore)

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
