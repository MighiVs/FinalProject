<template>
    <main>
        <h1>Sign In</h1>
    <form @submit.prevent="signIn">
      <label>Email: </label>
        <input type="email" v-model="email" required>
      <label>Password: </label>
        <input type="password" v-model="password" required>
      <button type="submit">Sign In</button>
      <span v-if="error">{{ error }}</span>
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
    const error = ref(authStore.error)

    
    async function signIn() {
      await authStore.signIn(email.value, password.value);
        if (!error.value) {
            router.push('/');
        }
    }
    
</script>