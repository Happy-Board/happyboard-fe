<template>
  <div class="col-span-6 pt-[100px] z-0 bg-white px-5 h-screen overflow-hidden space-y-5">
    <!-- <HotIdeaSkeleton />
    <CardIdeaSkeleton />
    <ListIdea /> -->
    <!-- <CommentSkeleton />
    <NotificationSkeleton /> -->
    <ProfileSkeleton />
  </div>
  <!-- <div class="col-span-2">
    <div class="col-span-3 mt-[95px] ms-14">
      <SuggestIdeaSkeleton />
    </div>
  </div> -->
</template>
<script setup>
import { useUserStore } from '@/stores/user.store';
// import HotIdeaSkeleton from '@/components/Skeletons/HotIdeaSkeleton.vue'
// import SuggestIdeaSkeleton from '@/components/Skeletons/SuggestIdeaSkeleton.vue'
// import CardIdeaSkeleton from '@/components/Skeletons/CardIdeaSkeleton.vue'
// import CommentSkeleton from '@/components/Skeletons/CommentSkeleton.vue'
// import NotificationSkeleton from '@/components/Skeletons/NotificationSkeleton.vue'
// import ListIdea from '@/components/ListIdea.vue'
// import DetailIdeaSkeleton from '@/components/Skeletons/DetailIdeaSkeleton.vue'
// import ListNotification from '@/components/ListNotification.vue'
import ProfileSkeleton from '@/components/Skeletons/ProfileSkeleton.vue';

const userStore = useUserStore()
const { getMyIdeas, getMyHistoryActivities } = userStore

getMyIdeas()
getMyHistoryActivities()

</script>
<style scoped></style>
