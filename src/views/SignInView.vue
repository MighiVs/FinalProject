<template>
    <main>
        <h1>Sign In</h1>
    <form @submit.prevent="signIn">
      <label>Email: </label>
        <input type="email" v-model="email" required>
      <label>Password: </label>
        <input type="password" v-model="password" required>
      <button type="submit">Sign In</button>
      <p v-if="authStore.error">{{ authStore.error }}</p>
    </form>
    </main>
  </template>
  
  
<script setup>

    import { useAuthStore } from '@/stores/auth';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');

    
    async function signIn() {
      authStore.resetError();
      await authStore.signIn(email.value, password.value);
        if (!authStore.error) {
            router.push('/');
        }
    }
    
</script>