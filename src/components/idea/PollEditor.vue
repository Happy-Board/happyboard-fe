<template>
  <div class="w-full mx-auto p-6 rounded-lg border border-gray-300">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-8"></h2>

    <div class="" v-for="(question, index) in poll.questions" :key="index">
      <div class="flex justify-between"></div>

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

          <!-- New Expiry Time Inputs -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-black mb-1">Set Poll Expiry Time:</label>
            <div class="flex items-center space-x-2">
              <input
                type="number"
                v-model="poll.questions[index].expireDays"
                placeholder="Days"
                class="w-20 p-2 border border-gray-300 rounded-lg text-sm"
              />
              <span>Days</span>
              <input
                type="number"
                v-model="poll.questions[index].expireHours"
                placeholder="Hours"
                class="w-20 p-2 border border-gray-300 rounded-lg text-sm"
              />
              <span>Hours</span>
              <input
                type="number"
                v-model="poll.questions[index].expireMinutes"
                placeholder="Minutes"
                class="w-20 p-2 border border-gray-300 rounded-lg text-sm"
              />
              <span>Minutes</span>
            </div>
          </div>
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

// Emits updated poll data to parent component
const emit = defineEmits(['updatePollData'])

// Define the poll data model
const poll = reactive({
  questions: [
    {
      type: 'radiogroup',
      choices: ['', ''],
      expireDays: 0,
      expireHours: 0,
      expireMinutes: 0,
    }
  ]
})

// Automatically emit changes
watch(
  poll,
  () => {
    emit('updatePollData', poll)
  },
  { deep: true }
)

// Functions for adding/removing choices
const addChoice = (index) => {
  poll.questions[index].choices.push('')
}

const removeChoice = (questionIndex, choiceIndex) => {
  poll.questions[questionIndex].choices.splice(choiceIndex, 1)
}
</script>
