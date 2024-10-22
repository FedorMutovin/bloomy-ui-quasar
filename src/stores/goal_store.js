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
      this.goals = response.data.map(goal => {
        const dateFormatted = new Date(goal.created_at)
        return {
          ...goal,
          created_at: dateFormatted.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      })
      return response
    }
  }
})
