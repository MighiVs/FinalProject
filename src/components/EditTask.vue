<template>
  <div class="toggle-section">
    <div class="btn-container">
    <button @click="edit = !edit" class="toggleEdit">
      <img v-if="!edit" src="../assets/icons/edit.png" alt="" />
    <img v-else src="../assets/icons/minus.png" alt="" />
    </button>
  </div>
    <div v-if="edit" class="mt-3">
      <h5>Edit task:</h5>
      <form @submit.prevent="handleEditTask">
        <div class="row mb-3">
          <label for="title" class="form-label col-sm-3">Title:</label>
          <div class="col-sm-9">
            <input type="text" id="title" class="form-control" v-model="editTitle">
          </div>
        </div>
        <div class="row mb-3">
          <label for="description" class="form-label col-sm-3">Description:</label>
          <div class="col-sm-9">
            <input type="text" id="description" class="form-control" v-model="editDescription">
          </div>
        </div>
        <div class="row mb-3">
          <label for="dueTo" class="form-label col-sm-3">Due date:</label>
          <div class="col-sm-9">
            <input type="datetime-local" id="dueTo" class="form-control" v-model="editDueTo">
          </div>
        </div>
        <div class="row mb-3">
          <label for="priority" class="form-label col-sm-3">Priority:</label>
          <div class="col-sm-9">
            <input type="range" id="priority" class="form-range" v-model="editPriority" min="1" max="100">
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn">Confirm Edit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks.js'
import { defineProps, ref } from 'vue'

const taskStore = useTaskStore()

const task = defineProps(['task'])
const edit = ref(false)

const editTitle = ref(task.task.title)
const editDescription = ref(task.task.description)
const editPriority = ref(task.task.priority)
const editDueTo = ref(task.task.due_to)

const handleEditTask = async () => {
  const editedTask = {
    title: editTitle.value,
    description: editDescription.value,
    priority: editPriority.value,
    due_to: editDueTo.value
  }

  await taskStore.updateTask(task.task.id, editedTask)
  if (taskStore.error) {
    console.log(taskStore.error)
  } else {
    edit.value = false
  }
  taskStore.fetchAllTasks()
}
</script>

<style scoped>
img {
  width: 20px;
}

.toggleEdit {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.toggleEdit:hover {
  transform: scale(1.1);
}

.btn-container {
  display: flex;
  justify-content: flex-end;
}
</style>
