<template>
  <main>
    <div v-if="!isUserLoggedIn">
      <h1>Welcome to My To-Do App!</h1>
      <p>Please, sign in or sign up to continue.</p>
    </div>
    <div v-if="isUserLoggedIn">
      <h1>Welcome back, {{ username }}</h1>
    </div>

  </main>
</template>



<script setup>
  import {useAuthStore} from '../stores/auth'
  import {computed} from 'vue'

  const authStore = useAuthStore()
  
  const username = computed(() => {
    return authStore.user?.displayName
  })
  
  const isUserLoggedIn = computed(() => {
    return authStore.user !== null
  })
</script>
