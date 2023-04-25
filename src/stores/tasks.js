import { defineStore } from 'pinia'
import supabase from '../supabase'
import {ref} from 'vue'

export const useTaskStore = defineStore('tasks', () =>{
  const tasks = ref(null)
  const error = ref(null)

  const fetchAllTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select()
    if (error) {
      error.value = error.message;
    } else {
      tasks.value = data;
    }
    
  }
  const addTask = async (task) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
    if (error) {
      error.value = error.message;
    } else {
      tasks.value = data;
    }
  }
  const updateTask = async (id, task) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ task })
      .match({ id })
    if (error) {
      error.value = error.message;
    } else {
      tasks.value = data;
    }
  }
  const deleteTask = async (id) => {
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .match({ id })
    if (error) {
      error.value = error.message;
    } else {
      tasks.value = data;
    }
  }


  return {
    tasks,
    error,
    fetchAllTasks,
    addTask,
    updateTask,
    deleteTask,

  }
})
