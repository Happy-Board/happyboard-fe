<template>
  <div class="col-span-6 flex pt-[90px] z-0 bg-white px-5 min-h-screen">
    <Suspense>
      <ProfileForm />
      <template #fallback>
          <ProfileSkeleton />
      </template>
    </Suspense>
  </div>
</template>
<script setup>
import ProfileForm from "@/components/ProfileForm.vue";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton.vue";
</script>
<style scoped></style>
