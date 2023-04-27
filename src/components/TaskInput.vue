<template>
  <form @submit.prevent="handleAddTask">
    <div>
      <label for="task">Task: </label>
      <input type="text" id="task" v-model="task" required/>
      <label for="urgency">Is it urgent?</label>
      <input type="checkbox" id="urgency" v-model="urgency">
    </div>
    <button type="submit">ADD</button>
  </form>

  
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue'

const taskStore = useTaskStore()
const authStore = useAuthStore()


const task = ref('')
const urgency = ref(false)


const handleAddTask = async () => {
  await taskStore.addTask({
    user_id: authStore.user.session.user.id,
    title: task.value,
    is_urgent: urgency.value,
    is_complete: false,
  })
  if (taskStore.error) {
    console.log(taskStore.error)
  }
  taskStore.fetchAllTasks();
}
</script>
