<template>
  <div
    class="poll-container w-full max-w-md mx-auto p-4 rounded-lg border border-gray-300 bg-white shadow-md"
  >
    <div v-for="(option, index) in optionsRef" :key="index" class="option-container mb-4">
      <label
        class="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition duration-150"
        :class="{ 'bg-yellow-700': selectedOption === option.id && (hasVoted || isVoteSubmitted) }"
      >
        <div class="flex items-center space-x-3">
          <input
            type="radio"
            :value="option.id"
            v-model="selectedOption"
            class="poll-radio"
            :disabled="hasVoted || isVoteSubmitted || diff <= 0 || isSubmitting"
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

    <div class="mt-4 text-center">
      <button
        v-if="!isSubmitting && diff > 0 && !hasVoted && !isVoteSubmitted"
        @click="submitVote"
        :disabled="isSubmitting || diff <= 0"
        class="bg-primaryColor hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:ring focus:ring-indigo-300 transition duration-150"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit Vote' }}
      </button>
      <div class="text-gray-500 text-sm mt-2">
        {{ timeLeft }}
      </div>
    </div>

    <div v-if="hasVoted || isVoteSubmitted" class="mt-4 text-center text-gray-600">
      <p>
        You voted for: <strong>{{ selectedOptionText }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { apiCreatePollResponse } from '@/apis/poll.api'

const props = defineProps({
  options: Array,
  responses: Array,
  userId: String,
  pollId: String,
  endDate: Date
})

const optionsRef = ref(props.options)
const responsesRef = ref(props.responses)
const userIdRef = ref(props.userId)
const pollIdRef = ref(props.pollId)
const endDateRef = ref(props.endDate)

const selectedOption = ref(null)
const isSubmitting = ref(false)
const diff = ref(0)
const isVoteSubmitted = ref(false) // Trạng thái vote trong phiên

const timeLeft = computed(() => {
  if (diff.value <= 0) return 'Poll has ended'

  const days = Math.floor(diff.value / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff.value % (1000 * 60)) / (1000 * 60))
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} left before expiration`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left before expiration`
  return `Less than 1 hour left before expiration`
  // return `${minutes} minute${minutes > 1 ? 's' : ''} left before expiration`
})

watch(
  () => endDateRef.value,
  (newEndDate) => {
    const now = new Date()
    diff.value = new Date(newEndDate) - now
  },
  { immediate: true }
)

const totalVotes = computed(() => optionsRef.value.reduce((sum, option) => sum + option.votes, 0))

const hasVoted = computed(() => {
  const response = responsesRef.value?.find(
    (response) => response.userId === userIdRef.value && response.pollId === pollIdRef.value
  )
  return !!response
})

const selectedOptionText = computed(() => {
  const selected = optionsRef.value.find((option) => option.id === selectedOption.value)
  return selected ? selected.optionText : 'N/A'
})

const initializeSelectedOption = () => {
  const response = responsesRef.value?.find(
    (response) => response.userId === userIdRef.value && response.pollId === pollIdRef.value
  )
  selectedOption.value = response ? response.pollOptionId : null
}

const calculateVotePercentage = (index) => {
  if (totalVotes.value === 0) return 0
  return ((optionsRef.value[index].votes / totalVotes.value) * 100).toFixed(1)
}

const submitVote = async () => {
  if (!selectedOption.value || hasVoted.value || isVoteSubmitted.value) {
    return
  }

  isSubmitting.value = true

  try {
    await apiCreatePollResponse({
      userId: userIdRef.value,
      pollId: pollIdRef.value,
      pollOptionId: selectedOption.value
    })
    const selectedIndex = optionsRef.value.findIndex((option) => option.id === selectedOption.value)
    if (selectedIndex !== -1) {
      optionsRef.value[selectedIndex].votes++
    }
    isVoteSubmitted.value = true
  } catch (err) {
    console.error('Error submitting vote:', err)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  initializeSelectedOption()
})
</script>
