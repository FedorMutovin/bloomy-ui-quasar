import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useScheduleStore = defineStore('ScheduleStore', {
  state: () => {
    return {
      schedules: []
    }
  },
  actions: {
    async getForUser (id) {
      const response = await api.get('/api/v1/schedules', {
        params: {
          user_id: id
        }
      })
      this.schedules = response.data.map(goal => {
        const dateFormatted = new Date(goal.scheduled_at)
        return {
          ...goal,
          scheduled_at: dateFormatted.toLocaleString('en-US', {
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
