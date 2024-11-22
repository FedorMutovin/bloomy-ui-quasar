import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useTaskStore = defineStore('TaskStore', {
  state: () => {
    return {
      tasks: []
    }
  },
  getters: {
    getById: (state) => (id) => {
      return state.tasks.find(task => task.id === id) || null
    }
  },
  actions: {
    async getForUser () {
      const response = await api.get('/api/v1/tasks')
      this.tasks = response.data
      return response
    },
    async create (data) {
      const params = {
        task: data
      }
      const response = await api.post('/api/v1/tasks', params)
      return response.data
    },
    async findById (taskId) {
      const response = await api.get(`/api/v1/tasks/${taskId}`)
      return response.data
    }
  }
})
