<script setup>
import { RouterView, useRoute } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'

const route = useRoute()

</script>

<template>
  <div v-if="route.name === 'sign-in'" class="wrapper bg-gray-50"><RouterView /></div>
  <div v-else class="wrapper bg-gray-50">
    <div>
      <div class="fixed top-0 z-50"><HeaderComponent /></div>
      <div class="grid grid-cols-10 gap-3">
        <div class="col-span-2">
          <SidebarComponent active="home" />
        </div>
        <RouterView />
      </div>
    </div>
  </div>
</template>
