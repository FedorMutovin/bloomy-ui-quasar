import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useGoalStore = defineStore('GoalStore', {
  state: () => {
    return {
      goals: []
    }
  },
  getters: {
    getById: (state) => (id) => {
      return state.goals.find(goal => goal.id === id) || null
    }
  },
  actions: {
    async getForUser () {
      const response = await api.get('/api/v1/goals')
      this.goals = response.data
      return response
    },
    async findById (goalId) {
      const response = await api.get(`/api/v1/goals/${goalId}`)
      return response.data
    },
    async create (data) {
      const params = {
        goal: data
      }
      const response = await api.post('/api/v1/goals', params)
      return response.data
    }
  }
})
