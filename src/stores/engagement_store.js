import { defineStore } from 'pinia'

export const useEngagementStore = defineStore('EngagementStore', {
  state: () => ({
    engagements: [
      {
        id: 1,
        value: 3,
        name: 'High',
        icon: 'mdi-battery-charging-high'
      },
      {
        id: 2,
        value: 2,
        name: 'Medium',
        icon: 'mdi-battery-charging-medium'
      },
      {
        id: 3,
        value: 1,
        name: 'Low',
        icon: 'mdi-battery-charging-low'
      },
      {
        id: 4,
        value: 0,
        name: 'Out',
        icon: 'mdi-battery-charging-outline'
      }
    ]
  }),
  getters: {
    getIconByValue: (state) => (value) => {
      const engagement = state.engagements.find(item => item.value === value)
      return engagement ? engagement.icon : null
    },
    getEngagementByValue: (state) => (value) => {
      return state.engagements.find(item => item.value === value) || null
    }
  }
})
