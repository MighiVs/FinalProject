<template>
  <main>
      <h1 v-if="!isUserLoggedIn">Welcome to My To-Do App!</h1>
      <p v-if="!isUserLoggedIn">Please, sign in or sign up to continue.</p>
      <h1 v-if="isUserLoggedIn">Greetings!</h1>
  </main>
</template>



<script setup>
  import {useAuthStore} from '../stores/auth'
  import {computed} from 'vue'

  const authStore = useAuthStore()
  
  const isUserLoggedIn = computed(() => {
    return authStore.user !== null
  })
</script>
