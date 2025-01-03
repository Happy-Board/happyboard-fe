<template>
  <div
    class="poll-container w-full max-w-md mx-auto p-4 rounded-lg border border-gray-300 bg-white shadow-md"
  >
    <div v-for="(option, index) in optionsRef" :key="index" class="option-container mb-4">
      <label
        class="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition duration-150"
        :class="{ 'bg-yellow-700': selectedOption === option.id && hasVoted }"
      >
        <div class="flex items-center space-x-3">
          <input
            type="radio"
            :value="option.optionText"
            v-model="selectedOption"
            class="poll-radio"
            :disabled="hasVoted"
          />
          <span class="text-gray-800 font-medium text-sm">{{ option.optionText }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="text-gray-800 font-semibold">{{ option.votes }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 text-green-500"
            viewBox="0 0 20 20"
            fill="green"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </label>
      <div v-if="totalVotes > 0" class="bg-gray-300 rounded-full h-2 mt-1">
        <div
          class="bg-indigo-500 h-2 rounded-full transition-width duration-500 ease-in-out"
          :style="{ width: `${calculateVotePercentage(index)}%` }"
        ></div>
      </div>
    </div>

    <div v-if="!hasVoted" class="mt-4 text-center">
      <button
        @click="submitVote"
        class="bg-primaryColor hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:ring focus:ring-indigo-300 transition duration-150"
      >
        Submit Vote
      </button>
    </div>

    <div v-else class="mt-4 text-center text-gray-600">
      <p>
        You voted for: <strong>{{ selectedOptionText }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { apiCreatePollResponse } from '@/apis/poll.api'
const props = defineProps({
  options: Array,
  responses: Array,
  userId: String,
  pollId: String
})

const optionsRef = ref(props.options)
const responsesRef = ref(props.responses)
const userIdRef = ref(props.userId)
const pollIdRef = ref(props.pollId)

const selectedOption = ref(null)

// Tổng số phiếu
const totalVotes = ref(optionsRef.value.reduce((sum, option) => sum + option.votesCount, 0)) // Tổng số phiếu hiện có

// Trạng thái đã vote
const hasVoted = computed(() => !!selectedOption.value)

selectedOption.value = (() => {
  const response = responsesRef.value?.find(
    (response) => response.userId === userIdRef.value && response.pollId === pollIdRef.value
  )
  return response ? response.pollOptionId : null
})()

console.log('selectedOption.value: ', selectedOption.value)
console.log('props.options: ', props.options)

const selectedOptionText = computed(() => {
  const selected = optionsRef.value.find((option) => option.id === selectedOption.value)
  return selected ? selected.optionText : 'N/A'
})

// Hàm tính phần trăm phiếu cho mỗi lựa chọn
const calculateVotePercentage = (index) => {
  if (totalVotes.value === 0) return 0
  return ((optionsRef.value[index].votes / totalVotes.value) * 100).toFixed(1)
}

// Hàm xử lý khi nhấn nút Submit
const submitVote = () => {
  if (!selectedOption.value) {
    alert('Please select an option before submitting!')
    return
  }

  const selectedIndex = optionsRef.value.findIndex(
    (option) => option.optionText === selectedOption.value
  )

  if (selectedIndex !== -1) {
    optionsRef.value[selectedIndex].votes++
    totalVotes.value++
    hasVoted.value = true // Đánh dấu trạng thái đã vote
  }
}
</script>

<style scoped>
.poll-radio {
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid #4f46e5; /* Indigo */
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.poll-radio:checked {
  background-color: #4f46e5; /* Indigo */
  border: 5px solid white;
  box-shadow: 0 0 0 2px #4f46e5;
  transform: scale(1.2);
}

.option-container.bg-orange-200 {
  background-color: #fed7aa !important; /* Highlight màu cam nhạt */
}
</style>
