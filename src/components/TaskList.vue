<template>
    <div>
        <TaskComp v-for="(task, index) in taskStore.tasks"
        :key="index" :task="task" />
    
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import TaskComp from './TaskComp.vue';

const taskStore = useTaskStore()


/*
<ul>
      <li v-for="(task, index) in taskStore.tasks" :key="index">{{ task }}</li>
    </ul>
*/

</script>