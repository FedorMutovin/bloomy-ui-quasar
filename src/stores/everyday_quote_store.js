import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useEverydayQuoteStore = defineStore('EverydayQuoteStore', {
  state: () => {
    return {
      quotes: []
    }
  },
  actions: {
    async getForUser () {
      const response = await api.get('/api/v1/everyday_quotes')
      this.quotes = response.data
      return response
    }
  }
})
