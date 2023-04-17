import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('tasks', () => {
  const tasks = ref([])

  return { count }
})
