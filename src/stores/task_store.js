import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useTaskStore = defineStore('TaskStore', {
  state: () => {
    return {
      tasks: []
    }
  },
  actions: {
    async getForUser (id) {
      const response = await api.get('/api/v1/tasks', {
        params: {
          user_id: id
        }
      })
      this.tasks = response.data
      return response
    },
    async create (data) {
      const params = {
        tasks: data
      }
      const response = await api.post('/api/v1/tasks', params)
      return response.data
    }
  }
})
