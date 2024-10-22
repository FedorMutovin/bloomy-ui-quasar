import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useUserStore = defineStore('UserStore', {
  state: () => {
    return {
      id: null,
      email: null
    }
  },
  actions: {
    async getCurrent () {
      const response = await api.get('/api/v1/users/current')
      console.log(response.data)
      this.setUser(response.data)
      return response
    },
    setUser (userData) {
      Object.assign(this, userData)
    }
  },
  persist: true
})
