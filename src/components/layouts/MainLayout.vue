<template>
  <div class="wrapper">
    <div>
      <div class="fixed top-0 z-50 w-full">
        <Suspense>
          <HeaderComponent />
          <template #fallback>
            <HeaderSkeleton />
          </template>
        </Suspense>
      </div>
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-2">
          <SidebarComponent active="home" />
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from '../home/HeaderComponent.vue';
import SidebarComponent from '../home/SidebarComponent.vue';
import HeaderSkeleton from '../skeletons/HeaderSkeleton.vue';
</script>
<style></style>
