<template>
  <div class="col-span-5 flex z-0 bg-white px-5 min-h-screen">
    <div class="flex flex-col gap-5 w-full">
      <p class="font-semibold text-3xl">Edit your idea</p>

      <div class="">
        <div class="block text-sm font-medium leading-6 text-black mb-3">
          Category <span class="text-red-500">*</span>
        </div>

        <AnimatedPlaceholder width="40%" height="30px" border-radius="8px" />
      </div>

      <div class="">
        <label for="message" class="block text-sm font-medium text-black mb-3"
          >Title <span class="text-red-500">*</span></label
        >
        <AnimatedPlaceholder width="" height="40px" border-radius="8px" />
      </div>
      <div class="mb-10">
        <label class="block text-sm font-medium text-black mb-3" for="content"
          >Content <span class="text-red-500">*</span></label
        >
        <AnimatedPlaceholder width="" height="100px" border-radius="5px" />
      </div>
      <div class="my-10 flex justify-end">
        <button
          type="button"
          class="text-black bg-gray-200 border border-borderColor focus:outline-none hover:bg-blue-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Save
        </button>
        <button
          type="button"
          class="text-black bg-gray-200 border border-borderColor focus:outline-none hover:bg-green-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
