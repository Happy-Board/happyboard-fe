<template>
  <div
    v-if="visible"
    class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50"
  >
    <div class="absolute w-full h-full bg-gray-900/50" @click="closeModal"></div>

    <div class="absolute w-[200px] md:w-auto max-h-full" :class="maxWidth">
      <div class="container bg-white overflow-hidden md:rounded">
        <div
          class="px-4 py-4 leading-none flex justify-between items-center font-medium text-sm bg-gray-100 border-b select-none"
        >
          <h3>{{ title }}</h3>
          <div @click="closeModal" class="text-2xl hover:text-gray-600 cursor-pointer">&#215;</div>
        </div>

        <div class="max-h-full px-4 py-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  maxWidth: {
    type: String,
    default: 'md'
  }
})
 console.log(props)
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>
