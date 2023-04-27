<template>
  <div class="container">
    <h4 v-if="status === 0">Waitlist</h4>
    <h4 v-if="status === 1">In Process</h4>
    <h4 v-if="status === 2">Completed</h4>
    <p>Number of tasks: {{ filteredTasks.length }}</p>
    <div class="task-list">
      <TaskCard v-for="(task, index) in filteredTasks" :key="index" :task="task" />
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import TaskCard from './TaskCard.vue'
import { defineProps, computed } from 'vue'

const taskStore = useTaskStore()

const { status } = defineProps(['status'])

const filteredTasks = computed(() => {
  switch (status) {
    case 0:
      return taskStore.tasks.filter((task) => task.status === 0)
    case 1:
      return taskStore.tasks.filter((task) => task.status === 1)
    default:
      return taskStore.tasks.filter((task) => task.status === 2)
  }
})
</script>

<style scoped>
.container {
  background-color: aliceblue;
  padding: 2em;
  text-align: center;
}
.task-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 400px;
  overflow: auto;
}
</style>
