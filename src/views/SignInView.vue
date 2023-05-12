<template>
  <main>
    <h1>Sign In</h1>
    <form class="form" @submit.prevent="signIn">
      <div class="form-group">
        <label class="form-label" for="email">Email:</label>
        <input class="form-input" type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="password">Password:</label>
        <input class="form-input" type="password" v-model="password" id="password" required />
      </div>
      <p class="form-error" v-if="authStore.error">{{ authStore.error}}!</p>
      <button class="btn" type="submit">Sign In</button>
    </form>
  </main>
  <FooterView />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FooterView from './FooterView.vue'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

authStore.resetError();

async function signIn() {
  authStore.resetError()
  await authStore.signIn(email.value, password.value)
  if (!authStore.error) {
    router.push('/')
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
}
@media only screen and (min-width: 768px) {
  .form {
    max-width: 400px; /* reduced max-width for larger screens */
    margin: auto;
  }
}
</style>
