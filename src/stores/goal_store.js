import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useGoalStore = defineStore('GoalStore', {
  state: () => {
    return {
      goals: []
    }
  },
  actions: {
    async getForUser (id) {
      const response = await api.get('/api/v1/goals', {
        params: {
          user_id: id
        }
      })
      this.goals = response.data
      return response
    },
    async findGoalById (goalId) {
      const response = await api.get(`/api/v1/goals/${goalId}`)
      return response.data
    }
  }
})
