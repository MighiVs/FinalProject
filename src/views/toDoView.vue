<template>
  <h1>To-Do List</h1>
  <TaskInput/>
  <div class="list-container">
    <TaskList :status="0"/>
    <TaskList :status="1" />
    <TaskList :status="2" />
  </div>
  

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
  
<style scoped>
  .list-ontainer {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>
