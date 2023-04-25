import { defineStore } from 'pinia'
import supabase from '../supabase'
import {ref, watch} from 'vue'

export const useAuthStore = defineStore('user', () =>{
  const user = ref(null)
  const error = ref('')

  const fetchUser = async () => {
     user.value = await supabase.auth.user();

  }
  const resetError = () => {
    error.value = '';
  }

  const signUp = async (email, password) => {
    const result = await supabase.auth.signUp({
      email,
      password,
    },
    )
    if (result.error) {
      error.value = result.error.message;
    }
    
  }
  const signIn = async (email, password) => {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (result.error) {
      error.value = result.error.message;
    } else {
      user.value = result.data;
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
    resetError,
    fetchUser,
    signUp,
    signIn,
    signOut,
  }
})

