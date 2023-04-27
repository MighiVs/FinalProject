<template>
    <div>
      <h4 :style="{ color: titleColor }">{{ task.task.title }}</h4>
    </div>
    <div>
      <button @click="handleDeleteTask">Delete</button>
      <button @click="swapTaskList">Swap List</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue'
  import { useTaskStore } from '@/stores/tasks.js'

  const taskStore = useTaskStore()

  const task  = defineProps(['task'])
  
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
    taskStore.fetchAllTasks();
  }

  const swapTaskList = async () => {
    await taskStore.updateTask(task.task.id, {is_complete: !task.task.is_complete})
    if (taskStore.error) {
      console.log(taskStore.error)
    } 
    taskStore.fetchAllTasks();
  }
  </script>
  