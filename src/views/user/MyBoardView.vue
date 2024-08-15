<template>
  <div class="col-span-6 pt-[100px] z-0 bg-white px-5 min-h-screen overflow-hidden space-y-5">
    <router-view></router-view>
    <!-- <div v-if="tab === 'publish'">
      <Suspense>
        <ListMyIdea :tab="tab" />
        <template #fallback>
          <ListIdeaSkeleton />
        </template>
      </Suspense>
    </div>
    <div v-if="tab === 'hide'">
      <Suspense>
        <ListMyIdea :tab="tab" />
        <template #fallback>
          <ListIdeaSkeleton />
        </template>
      </Suspense>
    </div>
    <div v-if="tab === 'draft'">
      <Suspense>
        <ListMyIdea :tab="tab" />
        <template #fallback>
          <ListIdeaSkeleton />
        </template>
      </Suspense>
    </div>
    <div v-if="tab === 'my-actions'">
      <Suspense>
        <ListHistory />
        <template #fallback>
          <HistoryActivitySkeleton />
        </template>
      </Suspense>
    </div>
    <div v-if="tab === 'my-credential'">
      <CardProfile />
    </div> -->
  </div>
  <div class="col-span-2">
    <LeftbarComponent />
  </div>
</template>
<script setup>
import LeftbarComponent from '@/components/LeftbarComponent.vue'
</script>
<style scoped></style>
