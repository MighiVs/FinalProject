<template>
  <form @submit.prevent="handleAddTask">
    <div>
      <label for="task">Task: </label>
      <input type="text" id="task" v-model="task" required />
    </div>
    <div>
      <label for="dueTo">Task is due to: </label>
      <input type="datetime-local" id="dueTo" v-model="dueTo" lang="en" />
    </div>
    <div>
      <label for="priority">Priority Level:</label>
      <input type="range" id="priority" v-model="priority" min="1" max="100" />
    </div>
    <button class="btn" type="submit">ADD</button>
  </form>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'

const taskStore = useTaskStore()
const authStore = useAuthStore()

const task = ref('')
const dueTo = ref(null)
const priority = ref(1)

const handleAddTask = async () => {
  await taskStore.addTask({
    user_id: authStore.user.session.user.id,
    title: task.value,
    priority: priority.value,
    due_to: dueTo.value,
    status: 0
  })
  if (taskStore.error) {
    console.log(taskStore.error)
  }
  taskStore.fetchAllTasks()
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
}

  
</style>
