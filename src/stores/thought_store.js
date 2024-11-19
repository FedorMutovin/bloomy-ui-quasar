import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useThoughtStore = defineStore('ThoughtStore', {
  state: () => {
    return {
      thoughts: []
    }
  },
  actions: {
    async getForUser (id) {
      const response = await api.get('/api/v1/thoughts')
      this.thoughts = response.data
      return response
    },

    async create (data) {
      const params = {
        thought: data
      }
      const response = await api.post('/api/v1/thoughts', params)
      return response.data
    },

    async findById (id) {
      const response = await api.get(`/api/v1/thoughts/${id}`)
      return response.data
    }
  }
})
