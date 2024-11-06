import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useWishStore = defineStore('WishStore', {
  state: () => {
    return {
      wishes: []
    }
  },
  actions: {
    async getForUser (id) {
      const response = await api.get('/api/v1/wishes', {
        params: {
          user_id: id
        }
      })
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
