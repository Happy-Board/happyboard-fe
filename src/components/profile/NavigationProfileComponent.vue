<template>
    <nav class="flex gap-1">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="px-4 py-2 text-sm font-medium rounded-2xl hover:bg-gray-200"
        :class="{ 'bg-gray-200': tab === activeTab }"
        @click="onTabClick(tab)"
      >
        {{ tab }}
      </button>
    </nav>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    },
    onTabClick: {
      type: Function,
      required: true
    }
  })
  </script>