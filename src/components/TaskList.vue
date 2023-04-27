<template>
    <div class="container">
        <h4 v-if="!listOfComplete">Tasks in Process</h4>
        <h4 v-if="listOfComplete">Tasks Completed</h4>
        <p>Number of tasks: {{ filteredTasks.length }}</p>
        <TaskComp v-for="(task, index) in filteredTasks"
        :key="index" :task="task" />
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import TaskComp from './TaskComp.vue';
import {defineProps, computed} from 'vue'

const taskStore = useTaskStore()

const {listOfComplete} = defineProps(['listOfComplete'])

 const filteredTasks = computed(() =>{
  if (listOfComplete) {
    return taskStore.tasks.filter(task => task.is_complete)
  } else {
    return taskStore.tasks.filter(task => !task.is_complete)
  }
 })

</script>

<style scoped>
</style>