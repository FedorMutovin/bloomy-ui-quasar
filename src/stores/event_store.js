import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useEventStore = defineStore('EventStore', {
  state: () => {
    return {
      events: []
    }
  },
  actions: {
    async getForUser (id) {
      const response = await api.get('/api/v1/events')
      this.events = response.data
      return response
    }
  }
})
