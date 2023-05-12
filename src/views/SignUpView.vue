<template>
  <main>
    <h1>Sign Up</h1>
    <form class="form" v-show="!signedUp" @submit.prevent="handleSignUp">
      <div class="form-group">
        <label class="form-label" for="email">Email: </label>
      <input class="form-input" type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="password">Password: </label>
      <input class="form-input" type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="password">Confirm password: </label>
      <input class="form-input" type="password" id="confirm" v-model="confirm" required />
      </div>
      <button class="btn">Sign Up</button>
      <p class="form-error" v-if="error.length > 0">{{ error }}!</p>
    </form>
    <h4 v-if="signedUp">Thank you for Signing Up, now proceed to Sign In.</h4>
    <p v-if="signedUp">Confirmation email feature is not activated.</p>
    <div class="void"></div>
  </main>
  <FooterView />
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js'
import { ref } from 'vue'
import FooterView from './FooterView.vue'

const authStore = useAuthStore()

const error = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')

authStore.resetError();
const signedUp = ref(false)

// validate the email using a regular expression (regex)
const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
const passwordCoincides = (password, confirm) => {
  return password === confirm;
}

const handleSignUp = async () => {
  error.value = '';
  authStore.resetError();
  if (!isValidEmail(email.value)) {
    error.value = 'Please enter a valid email address.'
    console.log(error.value)
    return
  }
  if (!passwordCoincides(password.value, confirm.value)) {
    error.value = 'Passwords do not coincide'
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
<style scoped>
h1 {
  font-weight: bolder;
  font-size: 40px;
  margin-bottom: 2em;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border-radius: 5px;
  background-color: rgba(235, 218, 218, 0.2);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}


.form-error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

.void {
  height: 30vh;
}
@media only screen and (min-width: 768px) {
  .form {
    max-width: 400px; /* reduced max-width for larger screens */
    margin: auto;
  }
}
</style>