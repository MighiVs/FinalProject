<template>
  <div class="container" :style="{ backgroundColor: cardBackgroundColor }">
    <h4>{{ task.task.title }}</h4>
    <button @click="show = !show">{{ show ? 'Min' : 'Max' }}</button>
    <div v-show="show">
      <p>
        Task added: {{ formatDate(task.task.inserted_at) }}, {{ formatTime(task.task.inserted_at) }}
      </p>
      <p v-if="task.task.due_to">
        Due to: {{ formatDate(task.task.due_to) }}, {{ formatTime(task.task.due_to) }}
      </p>
      <div>
        <button @click="advanceStatus" v-if="task.task.status < 2">Next Status</button>
        <button @click="handleDeleteTask">Delete</button>
      </div>
      <div>
        <button @click="edit = !edit">Toggle Edit</button>
        <EditTask v-if="edit" :task="task.task" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import { useTaskStore } from '@/stores/tasks.js'
import EditTask from '@/components/EditTask.vue'

const taskStore = useTaskStore()

const task = defineProps(['task'])
const edit = ref(false)
const show = ref(true)

const cardBackgroundColor = computed(() => {
  const hue = (120 - task.task.priority * 1.2) / 360 // Calculate hue value between 0 and 1
  const saturation = 1
  const lightness = 0.5
  return `hsl(${hue * 360}, ${saturation * 100}%, ${lightness * 100}%)`
})

// Helper function to format date and time
const formatDate = (dateTimeString) => {
  const dateTime = new Date(dateTimeString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return dateTime.toLocaleDateString(undefined, options)
}
const formatTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString)
  const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' }
  return dateTime.toLocaleTimeString(undefined, timeOptions)
}
/****************************************/

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
