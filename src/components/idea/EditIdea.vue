<template>
    <Suspense>
        <EditIdeaForm />
        <template #fallback>
                <EditIdeaSkeleton />
        </template>
    </Suspense>
</template>
<script setup>
import EditIdeaForm from './EditIdeaForm.vue';
import EditIdeaSkeleton from '../skeletons/EditIdeaSkeleton.vue';
</script>

