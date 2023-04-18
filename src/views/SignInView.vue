<template>
    <main>
        <h1>Sign In</h1>
    <form @submit.prevent="signIn">
      <label>
        Email:
        <input type="email" v-model="email" required>
      </label>
      <br>
      <label>
        Password:
        <input type="password" v-model="password" required>
      </label>
      <br>
      <button type="submit">Sign In</button>
      <div v-if="error">{{ error }}</div>
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
      console.log(authStore.user)
        if (!error.value) {
            router.push('/');
        }
    }
    
</script>