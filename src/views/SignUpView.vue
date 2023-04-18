<template>
  <main>
    <h1>Sign Up</h1>
    <form v-if="!signedUp" @submit.prevent="handleSignUp">
      <div v-if="error">{{ error }}</div>
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>
      <button>Sign Up</button>
    </form>
    <h3 v-if="signedUp">Thank you for Signing Up, now proceed to Sign In.</h3>
  </main>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js'
import { ref } from 'vue'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref(authStore.error)
const signedUp = ref(false)

const handleSignUp = async () => {
  await authStore.signUp(email.value, password.value)
  if (!error.value) {
    signedUp.value = true;
  }
}
</script>
