import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useActionStore = defineStore('ActionStore', {
  state: () => {
    return {
      actions: []
    }
  },
  getters: {
    getById: (state) => (id) => {
      return state.actions.find(action => action.id === id) || null
    }
  },
  actions: {
    async getForUser () {
      const response = await api.get('/api/v1/actions')
      this.actions = response.data
      return response
    },
    async create (data) {
      const params = {
        event_action: data
      }
      const response = await api.post('/api/v1/actions', params)
      return response.data
    }
  }
})
