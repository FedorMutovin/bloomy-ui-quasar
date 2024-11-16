import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useWorkStore = defineStore('WorkStore', {
  state: () => {
    return {
      works: []
    }
  },
  actions: {
    async getCurrent () {
      const response = await api.get('/api/v1/works')
      this.works = response.data
      return response
    }
  }
})
