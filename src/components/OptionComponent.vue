<template>
  <div class="dropdown h-[30px]">
    <button
      class="dropbtn px-2 aspect-square rounded-full bg-gray-50 hover:bg-gray-200 font-medium relative"
    >
      ⋯
    </button>
    <ComfirmDeletePopup
      :target="props.target"
      :targetId="props.targetId"
      v-if="wantToDelete"
      @close-delete-popup="handleCloseDeletePopup"
    />
    <div class="dropdown-content rounded-md text-sm font-medium">
      <p @click="emits('edit')">Edit</p>
      <p @click="handleDelete">Delete</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ComfirmDeletePopup from './ComfirmDeletePopup.vue'

const props = defineProps({
  target: String,
  targetId: String
})
const wantToDelete = ref(false)
const emits = defineEmits(['edit', 'delete'])
const handleDelete = () => {
  wantToDelete.value = true
  emits('delete')
}
const handleCloseDeletePopup = () => {
  wantToDelete.value = false
}
</script>
<style>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
}

.dropdown-content p {
  color: black;
  padding: 2px 10px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content p:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
