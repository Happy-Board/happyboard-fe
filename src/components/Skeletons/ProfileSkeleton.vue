<template>
  <div class="mx-20 w-full">
    <div class="flex mb-10">
      <div class="">
        <div class="rounded-full w-36 overflow-hidden border border-gray-300 shadow-md relative">
          <AnimatedPlaceholder width="144px" height="144px" border-radius="50%" />
        </div>
      </div>
      <div class="ms-5 flex flex-col justify-center gap-1">
        <div class="font-bold text-xl justify-center">
          <AnimatedPlaceholder width="150px" height="" border-radius="5px" />
        </div>
        <div class="flex gap-1 font-semibold text-sm justify-start items-center">
          <span class="flex font-semibold text-xs justify-center">
            <AnimatedPlaceholder width="100px" height="15px" border-radius="5px" />
          </span>
        </div>
        <div class="flex gap-1 font-semibold text-sm justify-start items-center">
          <span class="flex font-semibold text-xs justify-center">
            <AnimatedPlaceholder width="150px" height="15px" border-radius="5px" />
          </span>
        </div>
        <div class="mt-2 font-bold text-gray-600">
          <AnimatedPlaceholder width="400px" height="50px" border-radius="5px" />
        </div>
      </div>
    </div>
    <div class="my-5 space-y-5">
      <p class="font-bold text-gray-700 text-2xl border-t-2 pt-2 mb-5 mx-auto">
        <AnimatedPlaceholder width="40%" height="" border-radius="5px" />
      </p>
      <div class="flex justify-between">
        <div class="text-center space-y-2">
          <Label class="font-semibold flex justify-center">
            <AnimatedPlaceholder width="80px" height="10px" border-radius="5px" />
          </Label>
          <div class="rounded-full w-36 overflow-hidden border border-gray-300 shadow-md relative">
            <AnimatedPlaceholder width="144px" height="144px" border-radius="50%" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="space-y-1">
            <Label for="name" class="font-semibold text-sm">
                <AnimatedPlaceholder width="80px" height="10px" border-radius="5px" />

            </Label>
            <AnimatedPlaceholder width="300px" height="35px" border-radius="5px" />
          </div>
          <div class="space-y-1">
            <Label for="position" class="font-semibold text-sm">
                <AnimatedPlaceholder width="80px" height="10px" border-radius="5px" />

            </Label>
            <AnimatedPlaceholder width="300px" height="35px" border-radius="5px" />

          </div>
          <div class="space-y-1">
            <Label for="email" class="font-semibold text-sm">
                <AnimatedPlaceholder width="80px" height="10px" border-radius="5px" />

            </Label>
            <AnimatedPlaceholder width="300px" height="35px" border-radius="5px" />

          </div>
        </div>
      </div>
      <div class="mx-auto">
        <label for="message" class="block text-sm font-medium text-black mb-3">
          <AnimatedPlaceholder width="100px" height="10px" border-radius="5px" />
        </label>
        <AnimatedPlaceholder width="" height="80px" border-radius="5px" />
      </div>
      <div class="text-center">
        <button
          @click.prevent="handleUpdateProfile"
          class="text-black bg-gray-200 border border-gray-400 focus:outline-none hover:bg-blue-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
