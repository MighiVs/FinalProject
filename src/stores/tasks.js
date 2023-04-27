import { defineStore } from 'pinia'
import supabase from '../supabase'
import {ref} from 'vue'

export const useTaskStore = defineStore('tasks', () =>{
  const tasks = ref([])
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
    const { error } = await supabase
      .from('tasks')
      .insert(task)
    if (error) {
      error.value = error.message;
    }
  }
  const updateTask = async (id, mod) => {
    const { error } = await supabase
      .from('tasks')
      .update(mod)
      .eq('id', id)
    if (error) {
      error.value = error.message;
      console.log(error.value)
    } 
  }
  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .match({ id })
    if (error) {
      error.value = error.message;
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
