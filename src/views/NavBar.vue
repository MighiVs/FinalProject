<template>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li v-if="!authStore.user"><RouterLink to="sign-in">Sign In</RouterLink></li>
        <li v-if="!authStore.user"><RouterLink to="sign-up">Sign Up</RouterLink></li>
        <li v-if="authStore.user"><RouterLink to="todolist">Todos</RouterLink></li>
        <li v-if="authStore.user" @click="handleSignOut">Logout</li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const handleSignOut = async () => {
    await authStore.signOut();
    localStorage.clear();
    router.push('/');
  }
  
  </script>