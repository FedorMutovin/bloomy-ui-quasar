import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useTravelStore = defineStore('TravelStore', {
  state: () => {
    return {
      travels: []
    }
  },
  getters: {
    getById: (state) => (id) => {
      return state.travels.find(travel => travel.id === id) || null
    }
  },
  actions: {
    async getForUser () {
      const response = await api.get('/api/v1/travels')
      this.travels = response.data
      return response
    },

    async create (data) {
      const params = {
        travel: data
      }
      const response = await api.post('/api/v1/travels', params)
      return response.data
    },

    async findById (id) {
      const response = await api.get(`/api/v1/travels/${id}`)
      return response.data
    }
  }
})
