import { defineStore } from 'pinia'

export const useEngagementStore = defineStore('EngagementStore', {
  state: () => ({
    engagements: [
      {
        id: 1,
        value: 0,
        name: 'out',
        icon: 'mdi-battery-charging-outline'
      },
      {
        id: 2,
        value: 1,
        name: 'low',
        icon: 'mdi-battery-charging-low'
      },
      {
        id: 3,
        value: 2,
        name: 'medium',
        icon: 'mdi-battery-charging-medium'
      },
      {
        id: 4,
        value: 3,
        name: 'high',
        icon: 'mdi-battery-charging-high'
      }
    ]
  }),
  getters: {
    getIconByValue: (state) => (value) => {
      const engagement = state.engagements.find(item => item.value === value)
      return engagement ? engagement.icon : null
    }
  }
})
