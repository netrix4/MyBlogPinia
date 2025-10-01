import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const userRole = ref(null) // 'admin' o 'user'

  function login(username, role = 'user') {
    isAuthenticated.value = true
    user.value = username
    userRole.value = role
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
    userRole.value = null
  }

  return { isAuthenticated, user, userRole, login, logout }
})