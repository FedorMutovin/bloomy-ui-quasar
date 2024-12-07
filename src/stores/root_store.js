import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useRootStore = defineStore('RootStore', {
  state: () => {
    return {
      roots: []
    }
  },
  actions: {
    async getForUser () {
      const response = await api.get('/api/v1/roots')
      this.roots = response.data
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
