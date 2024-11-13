import { defineStore } from 'pinia'

export const useEventTypeStore = defineStore('EventTypeStore', {
  state: () => ({
    event_types: [
      { name: 'Task', icon: 'mdi-clipboard-text-outline', available: true },
      { name: 'Goal', icon: 'mdi-sprout-outline', available: true },
      { name: 'Wish', icon: 'mdi-notebook-heart-outline', available: true },
      { name: 'Action', icon: 'mdi-check-circle-outline', available: true }
    ]
  }),

  getters: {
    getIconByEventName: (state) => (eventName) => {
      const eventType = state.event_types.find(type => type.name === eventName)
      return eventType ? eventType.icon : null
    },
    eventNames: (state) => {
      return state.event_types.map(type => type.name)
    }
  }
})
