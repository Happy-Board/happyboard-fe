<template>
  <div class="col-span-5 pt-[100px] z-0 bg-white px-5 h-screen overflow-hidden space-y-5">
    <!-- <HotIdeaSkeleton />
    <CardIdeaSkeleton />
    <ListIdea /> -->
    <!-- <CommentSkeleton />
    <NotificationSkeleton /> -->
    <DetailIdeaSkeleton />
  </div>
  <div class="col-span-3">
    <div class="col-span-3 mt-[95px] ms-14">
      <SuggestIdeaSkeleton />
    </div>
  </div>
</template>
<script setup>
// import HotIdeaSkeleton from '@/components/Skeletons/HotIdeaSkeleton.vue'
import SuggestIdeaSkeleton from '@/components/Skeletons/SuggestIdeaSkeleton.vue'
// import CardIdeaSkeleton from '@/components/Skeletons/CardIdeaSkeleton.vue'
// import CommentSkeleton from '@/components/Skeletons/CommentSkeleton.vue'
// import NotificationSkeleton from '@/components/Skeletons/NotificationSkeleton.vue'
// import ListIdea from '@/components/ListIdea.vue'
import DetailIdeaSkeleton from '@/components/Skeletons/DetailIdeaSkeleton.vue'
</script>
<style scoped></style>
