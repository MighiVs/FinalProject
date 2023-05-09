<template>
  <main>
    <h1 class="main-title">My To-Do List App</h1>
    <h1 v-if="!authStore.user">Welcome!</h1>
    <p v-if="!authStore.user">Please, sign in or sign up to continue.</p>
    <div v-else>
      <h5>You are currently logged in as:</h5>
      <h5>{{ authStore.user.session.user.email }}</h5>
      <h5>You logged in:</h5>
      <h5> {{ formatDate(timestamp) }} {{ formatTime(timestamp) }}</h5>
    </div>

    <div class="hero">
      <img src="../assets/pictures/task.png" alt="task-pic" width="250" />
      <p>
        A task list application is a useful tool for anyone who wants to stay organized and keep
        track of their daily tasks. With this app, you can easily create a list of tasks you need to
        complete, set deadlines, and prioritize your tasks based on their importance.
      </p>
    </div>
    <div class="button-container">
      <RouterLink class="btn" v-if="!authStore.user" to="/sign-in">Sign In</RouterLink>
      <RouterLink class="btn" v-if="!authStore.user" to="/sign-up">Sign Up</RouterLink>
      <RouterLink class="btn" v-if="authStore.user" to="/todolist">My To-Do List</RouterLink>
    </div>
  </main>
  <FooterView />
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import FooterView from './FooterView.vue'
import {ref} from 'vue'

const authStore = useAuthStore()
const timestamp = ref(authStore.user?.session?.user?.last_sign_in_at);

const formatDate = (dateTimeString) => {
  const dateTime = new Date(dateTimeString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return dateTime.toLocaleDateString(undefined, options)
}
const formatTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString)
  const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' }
  return dateTime.toLocaleTimeString(undefined, timeOptions)
}

</script>

<style scoped>
h1 {
  text-align: center;
}
h5 {
  text-align: center;
}
.main-title {
  font-family: 'Pacifico', cursive;
  font-size: 60px;
  margin-bottom: 1em;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.hero {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}
.hero p {
  margin: 1em;
}
p {
  text-align: center;
}
</style>
