import { defineStore } from 'pinia'
import supabase from '../supabase'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null,
  }),
  actions: {
    async fetchUser () {
      const user = await supabase.auth.user()
      this.user = user;
    },
    async signUp(email, password, username) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        userData: {username}
      })
      if (error) {
        this.error = error.message
      }
    },
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        this.error = error.message
      } else {
        this.user = data
      }
    },
    async signOut() {
      await supabase.auth.signOut()
      this.user = null
    },

    setUser(user) {
      this.user = user
    },

    setError(error) {
      this.error = error
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  }
})



