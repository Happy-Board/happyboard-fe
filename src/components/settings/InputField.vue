<template>
  <div class="">
    <label :for="label" class="block text-sm font-medium leading-6 text-purple-800 cursor-pointer">
      {{ name }} <span v-if="required" class="text-red-600 font-bold text-lg">*</span>
    </label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        :id="label"
        :name="label"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :disabled="readonly"
        @input="$emit('update:value', $event.target.value)"
        @blur="stopEditing"
        class="font-semibold block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :style="{
          cursor: readonly ? 'not-allowed' : 'text',
          color: readonly ? 'gray' : ''
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

let label = computed(() => {
  return props.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
})
</script>

<style></style>
