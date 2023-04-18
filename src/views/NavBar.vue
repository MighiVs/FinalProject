<template>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li v-if="!isUserLoggedIn"><RouterLink to="sign-in">Sign In</RouterLink></li>
        <li v-if="!isUserLoggedIn"><RouterLink to="sign-up">Sign Up</RouterLink></li>
        <li v-if="isUserLoggedIn"><RouterLink to="todolist">Todos</RouterLink></li>
        <li v-if="isUserLoggedIn" @click="handleSignOut">Logout</li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useAuthStore } from '../stores/auth'
  
  const authStore = useAuthStore()
  
  const isUserLoggedIn = computed(() => {
    return authStore.user !== null
  }) 
 
  
  const handleSignOut = async () => {
    await authStore.signOut()
  }
  
  </script>