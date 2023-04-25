<template>
  <h1>To-Do List</h1>
  <TaskInput/>
  <TaskList/>

</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import { onMounted } from 'vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskList from '@/components/TaskList.vue'


const taskStore = useTaskStore()

onMounted(async () => {
  await taskStore.fetchAllTasks();
})
    
</script>
  