<template>
  <div class="wrapper bg-gray-50">
    <div>
      <div class="fixed top-0 z-50 w-full">
        <Suspense>
          <HeaderComponent />
          <template #fallback>
            <HeaderSkeleton />
          </template>
        </Suspense>
      </div>
      <div class="grid grid-cols-10 gap-3">
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
const ws = new WebSocket(`ws://duymt.io.vn/ws/?userId=${localStorage.getItem('uid')}`);

ws.onopen = () => {
  console.log("Kết nối được mở trong MainLayout")
}

ws.onclose = () => {
  console.log('Ngắt kết nối với websocket server')
}

</script>
<style></style>
