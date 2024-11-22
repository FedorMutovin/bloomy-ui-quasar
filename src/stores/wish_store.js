import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useWishStore = defineStore('WishStore', {
  state: () => {
    return {
      wishes: []
    }
  },
  getters: {
    getById: (state) => (id) => {
      return state.wishes.find(wish => wish.id === id) || null
    }
  },
  actions: {
    async getForUser () {
      const response = await api.get('/api/v1/wishes')
      this.wishes = response.data
      return response
    },

    async create (data) {
      const params = {
        wish: data
      }
      const response = await api.post('/api/v1/wishes', params)
      return response.data
    },

    async findById (id) {
      const response = await api.get(`/api/v1/wishes/${id}`)
      return response.data
    }
  }
})
