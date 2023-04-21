import { defineStore } from 'pinia'
import supabase from '../supabase'
import {ref, watch} from 'vue'

export const useAuthStore = defineStore('user', () =>{
  const user = ref(null)
  const error = ref(null)

  const fetchUser = async () => {
     user.value = await supabase.auth.user();

  }
  const signUp = async (email, password, username) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      userData: {username}
    })
    if (error) {
      error.value = error.message;
    }
  }
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      error.value = error.message;
    } else {
      user.value = data;
    }
  }
  const signOut = async () => {
    await supabase.auth.signOut();
    user.value = null;
  }

  /******************PERSIST USER*************************/
  if (localStorage.getItem("user")) {
    user.value = JSON.parse(localStorage.getItem("user"));
  }
  watch(user, (userVal) => {
    localStorage.setItem("user", JSON.stringify(userVal));
  },
  {deep: true});
  /********************************************************/
  return {
    user,
    error,
    fetchUser,
    signUp,
    signIn,
    signOut,

  }
})
/*
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null,
  }),
  actions: {
    async fetchUser () {
      const user = await supabase.auth.user()
      this.setUser(user);
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
        this.setUser(data)
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

*/

