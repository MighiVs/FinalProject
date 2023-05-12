<template>
  <div class="container">
    <h4 v-if="status === 0">Waitlist: {{ filteredTasks.length }} tasks</h4>
    <h4 v-if="status === 1">In Process: {{ filteredTasks.length }} tasks</h4>
    <h4 v-if="status === 2">Completed: {{ filteredTasks.length }} tasks</h4>
    
    <div class="task-list">
      <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" />
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
h4 {
  text-align: center;
}
.task-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1em;
}


</style>
