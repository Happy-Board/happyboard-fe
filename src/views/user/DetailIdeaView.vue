<template>
  <div class="md:col-span-7 col-span-12 pt-[100px] ms-5 z-0 bg-white min-h-screen px-3">
    <Suspense>
      <DetailIdea />
      <template #fallback>
        <DetailIdeaSkeleton />
      </template>
    </Suspense>
    <div v-if="typeIdea !== 'pending'">
      <Suspense>
        <CommentBlock :ideaId="ideaId" />
        <template #fallback>
          <CommentBlockSkeleton />
        </template>
      </Suspense>
    </div>
  </div>

  <div class="col-span-3 mt-[95px] px-2 me-5">
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
const typeIdea = route.params.type
const { relatedIdeas } = storeToRefs(ideaStore)
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
