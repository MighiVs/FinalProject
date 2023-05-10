<template>
  <form class="row g-3" @submit.prevent="handleAddTask">
    <div class="col-md-6">
      <label for="task" class="form-label">Task:</label>
      <input type="text" id="task" v-model="task" class="form-control" required />
    </div>
    <div class="col-md-6">
      <label for="description" class="form-label">Description:</label>
      <input type="text" id="description" v-model="description" class="form-control" />
    </div>
    <div class="col-md-6">
      <label for="dueTo" class="form-label">Task is due to:</label>
      <input type="datetime-local" id="dueTo" v-model="dueTo" class="form-control" placeholder="Select a due date and time"/>
    </div>
    <div class="col-md-6">
      <label for="priority" class="form-label">Priority Level:</label>
      <input type="range" id="priority" v-model="priority" class="form-range" min="1" max="100" />
    </div>
    <div class="col-md-12">
      <button class="btn btn-primary" type="submit">ADD</button>
    </div>
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
const description = ref('')

const handleAddTask = async () => {
  await taskStore.addTask({
    user_id: authStore.user.session.user.id,
    title: task.value,
    description: description.value,
    priority: priority.value,
    due_to: dueTo.value,
    status: 0
  })
  if (taskStore.error) {
    console.log(taskStore.error)
  } else {
    task.value = ''
    dueTo.value = null
    priority.value = 1
    description.value = ''
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

.form-label {
  font-weight: bold;
}

.form-range {
  width: 100%;
}

.btn {
  margin-top: 1em;
}
.col-md-12 {
  display: flex;
  justify-content: center;
}

</style>

