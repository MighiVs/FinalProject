<template>
  <h5>Edit task</h5>
  <form @submit.prevent="handleEditTask">
    <div>
      <label for="description">Edit task description: </label>
      <input type="text" id="description" v-model="editTitle" />
    </div>
    <div>
        <label for="dueTo">Edit due date: </label>
        <input type="datetime-local" id="dueTo" v-model="editDueTo" />
    </div>
    <div>
        <label for="priority">Edit Priority: </label>
      <input type="range" id="priority" v-model="editPriority" min="1" max="100" />
    </div>
    <br />
    <button type="submit">Confirm Edit</button>
  </form>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import { defineProps, ref } from 'vue'

const taskStore = useTaskStore()

const task = defineProps(['task'])

const editTitle = ref(task.task.title)
const editPriority = ref(task.task.priority)
const editDueTo = ref(task.task.due_to)

const handleEditTask = async () => {
    const editedTask = {
        title: editTitle.value,
        priority: editPriority.value,
        due_to: editDueTo.value
    }

  await taskStore.updateTask(task.task.id,  editedTask)
  if (taskStore.error) {
    console.log(taskStore.error)
  }
  taskStore.fetchAllTasks()
}
</script>

<style scoped></style>
