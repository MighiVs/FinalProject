<template>
    <nav>
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <RouterLink class="nav-link" v-if="!authStore.user" to="sign-in">Sign In</RouterLink>
        <RouterLink class="nav-link" v-if="!authStore.user" to="sign-up">Sign Up</RouterLink>
        <RouterLink class="nav-link" v-if="authStore.user" to="todolist">My To-Do List</RouterLink>
        <a class="nav-link" v-if="authStore.user" @click="handleSignOut">Logout</a> 
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

  <style scoped>

    nav {
      display: flex;
      justify-content: space-around;
      margin-bottom: 4em;
    }
    .nav-link {
      text-decoration: none;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }
    .nav-link:hover {
      color: #971fce;
    }

  </style>