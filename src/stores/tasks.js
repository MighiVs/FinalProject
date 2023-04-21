import { defineStore } from 'pinia'
import supabase from '../supabase'
import {ref} from 'vue'

export const useTaskStore = defineStore('task', () =>{
  const tasks = ref(null)
  const error = ref(null)

  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: false });
    tasks.value = tasks;
  }
  const addTask = async (task) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        { task }
      ])
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
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,

  }
})

/*
import { defineStore } from 'pinia'
import supabase from '../supabase'

export const useTaskStore = defineStore('tasks',  {
  state: () => ({
    tasks: null
  }),
  actions: {
    async fetchTasks () {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
    }
  }
})
*/