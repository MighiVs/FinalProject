<template>
  <main>
      <h1 v-if="!authStore.user">Welcome to My To-Do App!</h1>
      <p v-if="!authStore.user">Please, sign in or sign up to continue.</p>
      <h1 v-if="authStore.user">Greetings! {{ authStore.user.session.user.email}}</h1>
  </main>
</template>



<script setup>
  import {useAuthStore} from '../stores/auth'

  const authStore = useAuthStore();


</script>
