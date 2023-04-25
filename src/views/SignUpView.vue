<template>
  <main>
    <h1>Sign Up</h1>
    <form v-if="!signedUp" @submit.prevent="handleSignUp">
      <label for="email">Email: </label>
      <input type="email" id="email" v-model="email" required />
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="password" required />
      <button>Sign Up</button>
      <p v-if="error.length > 0">{{ error }}</p>
    </form>
    <h3 v-if="signedUp">Thank you for Signing Up, now proceed to Sign In.</h3>
  </main>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js'
import { ref } from 'vue'

const authStore = useAuthStore()

const error = ref('')
const email = ref('')
const password = ref('')


const signedUp = ref(false)

// validate the email using a regular expression (regex)
const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

const handleSignUp = async () => {
  error.value = '';
  authStore.resetError();
  if (!isValidEmail(email.value)) {
    error.value = 'Please enter a valid email address.'
    console.log(error.value)
    return
  }
  await authStore.signUp(email.value, password.value)
  error.value = authStore.error
  if (error.value.length === 0) {
    signedUp.value = true;
  }
}
</script>
