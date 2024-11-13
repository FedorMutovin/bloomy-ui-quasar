import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useUserStore = defineStore('UserStore', {
  state: () => {
    return {
      id: null,
      email: null,
      timezone: null
    }
  },
  actions: {
    async getCurrent () {
      const response = await api.get('/api/v1/users/current')
      this.setUser(response.data)
      return response
    },
    setUser (userData) {
      Object.assign(this, userData)
    }
  },
  persist: true
})
