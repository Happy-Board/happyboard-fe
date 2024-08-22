<template>
    <div>
      <Suspense>
        <ListHistory />
        <template #fallback>
          <HistoryActivitySkeleton />
        </template>
      </Suspense>
    </div>
</template>
<script setup>
import HistoryActivitySkeleton from '@/components/skeletons/HistoryActivitySkeleton.vue'
import ListHistory from '@/components/history-activities/ListHistory.vue'

</script>
<style scoped></style>
