<template>
  <div class="w-full mx-auto p-6 rounded-lg border border-gray-300">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-8"></h2>

    <div class="" v-for="(question, index) in poll.questions" :key="index">
      <div class="flex justify-between">
        <!-- Title and type info (optional, uncomment if needed) -->
      </div>

      <div v-if="question.type === 'radiogroup' || question.type === 'checkbox'" class="flex mb-4">
        <div class="flex flex-col flex-1 mr-8">
          <div class="mb-2">
            <div v-for="(choice, i) in question.choices" :key="i" class="flex items-center mb-2">
              <input
                type="text"
                v-model="question.choices[i]"
                placeholder="Enter choice"
                class="w-full p-2 border border-gray-300 rounded-lg mr-3 text-sm"
              />
              <button @click="removeChoice(index, i)" class="text-red-600 text-xl">×</button>
            </div>
          </div>
          <button
            @click="addChoice(index)"
            class="text-blue-700 py-2 px-4 text-sm font-bold w-auto self-start hover:bg-gray-200 rounded-3xl"
          >
            + Add Choice
          </button>

          <!-- Expire Hour Input -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-black mb-1" for="expire-hour"
              >Enter the expire hour:</label
            >
            <input
              type="text"
              v-model="poll.questions[index].expireHour"
              placeholder="e.g., 24"
              class="w-50 p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <!-- Remind Time Input -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-black mb-1" for="remind-time"
              >Enter time remind before expire:</label
            >
            <input
              type="text"
              v-model="poll.questions[index].remindBeforeExpireTime"
              placeholder="e.g., 2 hours"
              class="w-50 p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>

        <!-- Sidebar for tips -->
        <div class="flex-shrink-0 w-60 bg-gray-100 rounded-lg">
          <h3 class="font-semibold text-lg text-gray-700 mb-2">Tips on Better Polls</h3>
          <ul class="list-disc pl-5 text-sm text-gray-600">
            <li>Suggest short clear options</li>
            <li>The more options, the better</li>
            <li>Choose the poll duration</li>
            <li>Options can't be edited after post creation</li>
          </ul>
        </div>
      </div>

      <div v-if="question.type === 'text'" class="mt-4">
        <input
          type="text"
          placeholder="Enter your answer"
          class="w-full p-3 border border-gray-300 rounded-lg text-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const emit = defineEmits(['updatePollData'])
// Define the poll data model
const poll = reactive({
  questions: [
    {
      type: 'radiogroup', // Type of question, can be 'radiogroup', 'checkbox', or 'text'
      choices: ['', ''], // Choices for radio or checkbox questions
      expireHour: '', // Expiry time in hours
      remindBeforeExpireTime: '' // Time to remind before expiry (in hours)
    }
  ]
})
const addChoice = (index) => {
  poll.questions[index].choices.push('')
  emit('updatePollData', poll.value)
}

const removeChoice = (questionIndex, choiceIndex) => {
  poll.questions[questionIndex].choices.splice(choiceIndex, 1)
}

watch(
  poll,
  () => {
    emit('updatePollData', poll)
  },
  { deep: true }
)
</script>
