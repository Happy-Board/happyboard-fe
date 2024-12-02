<template>
    <div class="flex items-center gap-x-6 my-10">
      <!-- Avatar -->
      <img :src="avatar" alt="Profile Picture" class="w-20 h-20 rounded-full object-cover" />
  
      <!-- User Information -->
      <div>
        <h1 class="text-xl font-bold text-gray-800">{{ fullName }}</h1>
        <p class="text-gray-500">{{ email }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  })
  </script>
  