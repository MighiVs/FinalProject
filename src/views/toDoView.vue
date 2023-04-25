<template>
  <h1>To-Do List</h1>
  <div>
    <ul>
      <li v-for="(task, index) in taskStore.tasks" :key="index">{{ task }}</li>
    </ul>
  </div>
  <button @click="handleAddTask">ADD</button>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import { onMounted } from 'vue'

const taskStore = useTaskStore()

const handleAddTask = async () => {
  await taskStore.addTask({
    "id": 33,
    "user_id": "1455a0b8-c220-40bf-b66b-ecdf4fa0059a",
    "title": "Even another task",
    "is_complete": true,
    "inserted_at": "2023-05-04T02:44:05+00:00"
  })
  await taskStore.fetchAllTasks()
}

onMounted(async () => {
  await taskStore.fetchAllTasks();
})
    

  //{ "id": 11, "user_id": "1455a0b8-c220-40bf-b66b-ecdf4fa0059a", "title": "Even another task", "is_complete": true, "inserted_at": "2023-05-04T02:44:04+00:00" }
  </script>
  