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
import HistoryActivitySkeleton from '@/components/Skeletons/HistoryActivitySkeleton.vue'
import ListHistory from '@/components/ListHistory.vue'

</script>
<style scoped></style>
