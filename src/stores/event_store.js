import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useEventStore = defineStore('EventStore', {
  state: () => {
    return {
      events: []
    }
  },
  actions: {
    async getForUser () {
      const response = await api.get('/api/v1/events')
      this.events = response.data
      return response
    },
    async unite (data) {
      const params = {
        roots_unite: {
          source: data.source,
          target: data.target,
          reason: data.reason
        }
      }
      return await api.post('/api/v1/roots/unite', params)
    }
  }
})
