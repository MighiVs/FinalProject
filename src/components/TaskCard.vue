<template>
  <div class="container">
    <div>
      <h4 :style="{ color: titleColor }">{{ task.task.title }}</h4>
    </div>
    <div>
      <button @click="advanceStatus" v-if="task.task.status < 2">Next Status</button>
      <button @click="handleDeleteTask">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useTaskStore } from '@/stores/tasks.js'

const taskStore = useTaskStore()

const task = defineProps(['task'])

const titleColor = computed(() => {
  if (task.task.is_urgent) {
    return 'red'
  } else {
    return 'inherit'
  }
})

const handleDeleteTask = async () => {
  await taskStore.deleteTask(task.task.id)
  if (taskStore.error) {
    console.log(taskStore.error)
  }
  taskStore.fetchAllTasks()
}

const advanceStatus = async () => {
  let newStatus
  switch (task.task.status) {
    case 0:
      newStatus = 1
      break
    case 1:
      newStatus = 2
      break
    default:
      newStatus = 0
  }

  await taskStore.updateTask(task.task.id, { status: newStatus })
  if (taskStore.error) {
    console.log(taskStore.error)
  }
  taskStore.fetchAllTasks()
}
</script>

<style scoped>
.container {
  border: 1px solid black;
  border-radius: 10px;
  margin: 1em;
}
</style>
