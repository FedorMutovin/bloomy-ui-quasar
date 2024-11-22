import { defineStore } from 'pinia'

export const useEventTypeStore = defineStore('EventTypeStore', {
  state: () => ({
    event_types: [
      {
        id: 1,
        name: 'wish',
        icon: 'mdi-notebook-heart-outline'
      },
      {
        id: 2,
        name: 'goal',
        icon: 'mdi-sprout-outline'
      },
      {
        id: 3,
        name: 'task',
        icon: 'mdi-clipboard-text-outline'
      },
      {
        id: 4,
        name: 'action',
        icon: 'mdi-check-circle-outline'
      },
      {
        id: 5,
        name: 'thought',
        icon: 'mdi-thought-bubble-outline'
      }
    ]
  }),

  getters: {
    getIconByEventName: (state) => (eventName) => {
      const eventType = state.event_types.find(type => type.name === eventName)
      return eventType ? eventType.icon : null
    },
    eventNames: (state) => {
      return state.event_types.map(type => type.name)
    },
    getEventTypeByName: (state) => (eventName) => {
      return state.event_types.find(type => type.name === eventName) || null
    }
  }
})
