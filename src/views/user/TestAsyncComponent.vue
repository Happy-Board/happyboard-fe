<template>
  <div>
    <h1>{{ test }}</h1>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const test = ref('')

await new Promise((resolve, reject) => {
  setTimeout(() => {
    test.value = 'Hello, World!'
    resolve(true)
  }, 3000)
})
</script>
<style lang=""></style>
