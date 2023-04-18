import { defineStore } from 'pinia'
import supabase from '../supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null,
  }),
  actions: {
    async fetchUser () {
      const { data: { user } } = await supabase.auth.getUser()
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        this.error = error.message
      } else {
        this.user = user
      }
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        this.error = error.message
      } else {
        this.user = user
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
