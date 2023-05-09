<template>
  <div class="hero">
    <img src="../assets/pictures/to-do-list.png" height="100" alt="todo">
    <h1>To-Do List</h1>
  </div>
  <TaskInput />
  <div class="list-container">
    <TaskList :status="0" />
    <TaskList :status="1" />
    <TaskList :status="2" />
  </div>
  <FooterView />
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import { onMounted } from 'vue'
import TaskInput from '@/components/TaskInput.vue'
import TaskList from '@/components/TaskList.vue'
import FooterView from './FooterView.vue'

const taskStore = useTaskStore()

onMounted(async () => {
  await taskStore.fetchAllTasks()
})
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  margin-bottom: 2em;
}

h1 {
  font-weight: bolder;
  font-size: 40px;
  margin-left: 10px;
}

.list-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
